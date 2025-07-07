/**
 * @fileoverview
 * Strong-typed, resilient client for eZee Absolute PMS REST APIs (live.ipms247.com).
 *
 * Responsibilities
 * ────────────────────────────────────────────────────────────
 * • Handle authentication (JWT-like access token) and automatic refresh
 * • Perform network requests with JSON parsing, type-safe generics, and robust error handling
 * • Provide a minimal retry mechanism for transient failures (network hiccups, 5xx, etc.)
 *
 * Implemented Endpoints
 * ────────────────────────────────────────────────────────────
 * • GET  /availability                 → availability()
 * • POST /booking                      → createBooking()
 * • GET  /booking/:confirmationNumber  → getBooking()
 * • POST /booking/cancel               → cancelBooking()
 *
 * Add more helpers as your integration grows. Keep all runtime types at the
 *  bottom of the file for a single source of truth.
 *
 * NOTE ▸ eZee's official API documentation is not publicly available; the
 *        schemas below are inferred from real-world payloads.  Update them to
 *        match your own contract when in doubt.
 */

export interface EZeeClientConfig {
  /** Base URL for the PMS API e.g. https://live.ipms247.com/pmsint/api */
  baseUrl: string
  /** Hotel code as configured in eZee Absolute */
  hotelCode: string
  /** Integration username provided by eZee */
  username: string
  /** Integration password provided by eZee */
  password: string
  /** Shared secret for verifying webhooks (optional, used elsewhere) */
  webhookSecret?: string
}

interface AuthResponse {
  access_token: string
  token_type: string
  expires_in: number
}

/* -------------------------------------------------------------------------
 * Runtime Types (zod)
 * ---------------------------------------------------------------------- */

import { z } from 'zod'

// Simplified availability item
export const AvailabilityItemSchema = z.object({
  roomTypeId: z.string(),
  roomsAvailable: z.number().int().nonnegative(),
  rate: z.number().nonnegative()
})
export type AvailabilityItem = z.infer<typeof AvailabilityItemSchema>

// API response → array of items grouped by date
export const AvailabilityResponseSchema = z.object({
  items: z.array(AvailabilityItemSchema)
})
export type AvailabilityResponse = z.infer<typeof AvailabilityResponseSchema>

export const BookingResponseSchema = z.object({
  confirmationNumber: z.string(),
  total: z.number(),
  status: z.enum(['confirmed', 'pending', 'cancelled'])
})
export type BookingResponse = z.infer<typeof BookingResponseSchema>

export const SingleBookingResponseSchema = z.object({
  booking: BookingResponseSchema
})
export type SingleBookingResponse = z.infer<typeof SingleBookingResponseSchema>

/* -------------------------------------------------------------------------
 * Helper error class
 * ---------------------------------------------------------------------- */

export class EZeeError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    public readonly payload?: unknown
  ) {
    super(`eZee API Error ${status} (${code})`)
  }
}

export default class EZeeClient {
  private cfg: EZeeClientConfig
  private token: string | null = null
  private tokenExpiry: number = 0 // epoch seconds

  constructor(cfg: EZeeClientConfig) {
    this.cfg = cfg
  }

  /* ---------------------------------------------------------
   * Public helpers
   * ------------------------------------------------------ */

  async availability(
    startDate: string,
    endDate: string,
    roomTypeId?: string
  ): Promise<AvailabilityResponse> {
    await this.ensureToken()
    const params = new URLSearchParams({
      hotel_code: this.cfg.hotelCode,
      start: startDate,
      end: endDate
    })
    if (roomTypeId) params.append('room_type_id', roomTypeId)

    const raw = await this.request<unknown>('GET', `/availability?${params.toString()}`)
    return AvailabilityResponseSchema.parse(raw)
  }

  async createBooking(
    data: Record<string, unknown>
  ): Promise<BookingResponse> {
    await this.ensureToken()
    const raw = await this.request<unknown>('POST', '/booking', data)
    return BookingResponseSchema.parse(raw)
  }

  /**
   * Fetch a single booking by its confirmation number.
   * @param confirmationNumber Unique code returned by createBooking().
   */
  async getBooking(confirmationNumber: string): Promise<SingleBookingResponse> {
    await this.ensureToken()
    const raw = await this.request<unknown>('GET', `/booking/${encodeURIComponent(confirmationNumber)}`)
    return SingleBookingResponseSchema.parse(raw)
  }

  /**
   * Cancel an existing booking in eZee.
   * Returns the updated booking object in the same shape as createBooking().
   */
  async cancelBooking(confirmationNumber: string): Promise<BookingResponse> {
    await this.ensureToken()
    const raw = await this.request<unknown>(
      'POST',
      '/booking/cancel',
      { confirmationNumber }
    )
    return BookingResponseSchema.parse(raw)
  }

  /* ---------------------------------------------------------
   * Authentication & low-level helpers
   * ------------------------------------------------------ */

  private async ensureToken() {
    const now = Math.floor(Date.now() / 1000)
    if (this.token && now < this.tokenExpiry - 60) return // still valid
    await this.authenticate()
  }

  private async authenticate() {
    const url = `${this.cfg.baseUrl}/login`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.cfg.username,
        password: this.cfg.password,
        hotel_code: this.cfg.hotelCode
      })
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`eZee auth failed ${res.status} – ${body}`)
    }

    const data = (await res.json()) as AuthResponse
    this.token = data.access_token
    this.tokenExpiry = Math.floor(Date.now() / 1000) + data.expires_in
  }

  private async request<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    body?: unknown,
    attempt = 0
  ): Promise<T> {
    const url = `${this.cfg.baseUrl}${endpoint}`

    const opts: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    }
    if (body) opts.body = JSON.stringify(body)

    const res = await fetch(url, opts)

    // Try to refresh token once if we hit 401/403
    if ((res.status === 401 || res.status === 403) && attempt === 0) {
      await this.authenticate()
      return this.request<T>(method, endpoint, body, 1)
    }

    // Retry once for 5xx
    if (res.status >= 500 && res.status < 600 && attempt === 0) {
      await new Promise((r) => setTimeout(r, 500))
      return this.request<T>(method, endpoint, body, 1)
    }

    const payload = await res.json().catch(() => undefined)

    if (!res.ok) {
      const code = (payload as any)?.errorCode || 'unknown'
      throw new EZeeError(res.status, code, payload)
    }

    return payload as T
  }
}