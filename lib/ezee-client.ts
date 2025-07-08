/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file lib/ezee-client.ts
 * @description
 *   Strong-typed, resilient client for the eZee Absolute PMS REST API
 *   (live.ipms247.com).  The implementation below is **self-contained** – it
 *   does not rely on any other internal utilities – and can be copied into any
 *   TypeScript project.
 *
 *   Key features:
 *   ────────────────────────────────────────────────────────────────────────────
 *   • Type-level safety via explicit interfaces and zod runtime validation.
 *   • Automatic authentication with token caching & refresh.
 *   • Central `request<T>()` helper with:
 *        – JSON parsing
 *        – Structured error handling via `EZeeError`
 *        – One-retry strategy for transient 5xx or token expiry cases
 *   • Public helper methods:
 *        – `availability()`       → Live room availability
 *        – `createBooking()`      → Create reservation
 *        – `getBooking()`         → Fetch single booking
 *        – `cancelBooking()`      → Cancel reservation
 *   • Comprehensive JSDoc for developer ergonomics & IntelliSense.
 *
 *   IMPORTANT ▸ The official eZee API is not publicly documented.  The request
 *   and response shapes below were inferred from real-world payloads.  Adjust
 *   the zod schemas to match your installation if necessary.
 */

import { z } from 'zod'

/* ──────────────────────────────────────────────────────────────────────────
 * 1. Shared Config & Error Class
 * ─────────────────────────────────────────────────────────────────────── */

/** Configuration required to connect to eZee Absolute PMS REST API. */
export interface EZeeClientConfig {
  /** Base URL, e.g. `https://live.ipms247.com/pmsint/api` */
  baseUrl: string
  /** Hotel / property code provided by eZee */
  hotelCode: string
  /** API username */
  username: string
  /** API password */
  password: string
  /** Shared secret used to validate webhooks (optional, not used here) */
  webhookSecret?: string
}

/**
 * Structured error thrown for any non-2xx HTTP response.
 */
export class EZeeError extends Error {
  constructor(
    /** HTTP status code */
    public readonly status: number,
    /** Error code returned by eZee (may be "unknown") */
    public readonly code: string,
    /** Raw response payload (if JSON parsable) */
    public readonly payload?: unknown
  ) {
    super(`eZee API error ${status} (${code})`)
  }
}

/* ──────────────────────────────────────────────────────────────────────────
 * 2. Runtime Schemas & Type Aliases
 * ─────────────────────────────────────────────────────────────────────── */

/** Availability item (simplified). */
export const AvailabilityItemSchema = z.object({
  roomTypeId: z.string(),
  roomsAvailable: z.number().int().nonnegative(),
  rate: z.number().nonnegative()
})
export type AvailabilityItem = z.infer<typeof AvailabilityItemSchema>

/** Response returned by GET /availability. */
export const AvailabilityResponseSchema = z.object({
  items: z.array(AvailabilityItemSchema)
})
export type AvailabilityResponse = z.infer<typeof AvailabilityResponseSchema>

/** Booking create / fetch / cancel common shape. */
export const BookingSchema = z.object({
  confirmationNumber: z.string(),
  status: z.enum(['confirmed', 'pending', 'cancelled']),
  total: z.number().nonnegative()
})
export type Booking = z.infer<typeof BookingSchema>

/** Wrapper used by GET /booking/:confirmationNumber */
export const SingleBookingResponseSchema = z.object({
  booking: BookingSchema
})
export type SingleBookingResponse = z.infer<typeof SingleBookingResponseSchema>

/* ──────────────────────────────────────────────────────────────────────────
 * 3. EZeeClient Implementation
 * ─────────────────────────────────────────────────────────────────────── */

export default class EZeeClient {
  // ---------------------------------------------------------------------
  // • Constructor / fields
  // ---------------------------------------------------------------------
  private token: string | null = null
  private tokenExpiryEpoch = 0 // seconds-since-epoch

  constructor(private readonly cfg: EZeeClientConfig) {}

  // ---------------------------------------------------------------------
  // • Public API helpers
  // ---------------------------------------------------------------------

  /**
   * Fetch live availability for a date range and (optionally) a given room type.
   */
  async availability(
    startDate: string,
    endDate: string,
    roomTypeId?: string
  ): Promise<AvailabilityResponse> {
    await this.ensureToken()

    // Build query string
    const qs = new URLSearchParams({
      hotel_code: this.cfg.hotelCode,
      start: startDate,
      end: endDate
    })
    if (roomTypeId) qs.append('room_type_id', roomTypeId)

    const raw = await this.request<unknown>('GET', `/availability?${qs.toString()}`)
    return AvailabilityResponseSchema.parse(raw)
  }

  /**
   * Create a booking in the PMS.
   * @param data An object representing the reservation; structure depends on your eZee setup.
   */
  async createBooking(data: Record<string, unknown>): Promise<Booking> {
    await this.ensureToken()
    const raw = await this.request<unknown>('POST', '/booking', data)
    return BookingSchema.parse(raw)
  }

  /** Fetch a single booking by confirmation number. */
  async getBooking(confirmationNumber: string): Promise<SingleBookingResponse> {
    await this.ensureToken()
    const raw = await this.request<unknown>('GET', `/booking/${encodeURIComponent(confirmationNumber)}`)
    return SingleBookingResponseSchema.parse(raw)
  }

  /** Cancel a booking. Returns the updated booking record. */
  async cancelBooking(confirmationNumber: string): Promise<Booking> {
    await this.ensureToken()
    const raw = await this.request<unknown>('POST', '/booking/cancel', { confirmationNumber })
    return BookingSchema.parse(raw)
  }

  // ---------------------------------------------------------------------
  // • Private helpers
  // ---------------------------------------------------------------------

  /** Ensures this.token is valid (refreshes if expired / missing). */
  private async ensureToken(): Promise<void> {
    const now = Math.floor(Date.now() / 1000) // seconds
    if (this.token && now < this.tokenExpiryEpoch - 60) return // still valid (60-s leeway)
    await this.authenticate()
  }

  /** Performs authentication and stores access token + expiry. */
  private async authenticate(): Promise<void> {
    const url = `${this.cfg.baseUrl}/login`

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.cfg.username,
        password: this.cfg.password,
        hotel_code: this.cfg.hotelCode
      })
    })

    if (!res.ok) {
      // We intentionally parse text here because /login may return HTML on error
      const text = await res.text()
      throw new EZeeError(res.status, 'auth_failed', text)
    }

    const json: { access_token: string; expires_in: number } = await res.json()
    this.token = json.access_token
    this.tokenExpiryEpoch = Math.floor(Date.now() / 1000) + json.expires_in
  }

  /**
   * Centralised HTTP helper with:
   *   • Automatic JSON parsing
   *   • One-retry strategy for 5xx & token expiration
   *   • Conversion to EZeeError for non-2xx responses
   */
  private async request<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    body?: unknown,
    attempt = 0
  ): Promise<T> {
    const url = `${this.cfg.baseUrl}${endpoint}`

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: body ? JSON.stringify(body) : undefined
    })

    // If token is invalid/expired, refresh once then retry automatically.
    if ((res.status === 401 || res.status === 403) && attempt === 0) {
      await this.authenticate()
      return this.request<T>(method, endpoint, body, 1)
    }

    // Retry once for transient 5xx errors
    if (res.status >= 500 && res.status < 600 && attempt === 0) {
      await new Promise((r) => setTimeout(r, 300)) // small backoff
      return this.request<T>(method, endpoint, body, 1)
    }

    // Attempt to parse JSON body (may fail for errors)
    const payload: any = await res.json().catch(() => undefined)

    if (!res.ok) {
      const code = payload?.errorCode || 'unknown'
      throw new EZeeError(res.status, code, payload)
    }

    return payload as T
  }
}