/*
 * Lightweight client for eZee Absolute PMS REST APIs (live.ipms247.com).
 * This is **NOT** an exhaustive implementation – only the few endpoints we
 * need for availability lookup and booking sync are included. Feel free to
 * extend this class as your integration grows.
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

  async availability(startDate: string, endDate: string, roomTypeId?: string) {
    await this.ensureToken()
    const params = new URLSearchParams({
      hotel_code: this.cfg.hotelCode,
      start: startDate,
      end: endDate
    })
    if (roomTypeId) params.append('room_type_id', roomTypeId)

    return this.request('GET', `/availability?${params.toString()}`)
  }

  async createBooking(data: Record<string, unknown>) {
    await this.ensureToken()
    return this.request('POST', '/booking', data)
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

  private async request(method: 'GET' | 'POST', endpoint: string, body?: unknown) {
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
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`eZee request failed ${res.status} – ${text}`)
    }
    return res.json()
  }
}