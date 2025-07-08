/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file lib/booking-engine.ts
 * @description
 *   High-level orchestration layer that bridges our local database with the
 *   remote eZee Absolute PMS via {@link EZeeClient}.  This module exposes
 *   helpers that the Next.js API routes and UI components can call without
 *   worrying about authentication details or request/response validation.
 *
 *   Responsibilities
 *   ───────────────────────────────────────────────────────────────────────────
 *   • Pull eZee credentials from the `system_settings` table (or env fallbacks)
 *   • Provide `searchAvailability`, `createReservation`, `fetchReservation`,
 *     and `cancelReservation` helpers with strong typing & runtime validation
 *   • Persist a minimal local shadow-copy of each booking for dashboards and
 *     offline analytics
 */

import { z } from 'zod'
import EZeeClient, {
  AvailabilityResponse,
  Booking,
  EZeeClientConfig,
  SingleBookingResponse
} from './ezee-client'
import { query, run } from './database'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
declare const process: { env: Record<string, string | undefined> }

/* ──────────────────────────────────────────────────────────────────────────
 * 1. Runtime Schemas & Types
 * ─────────────────────────────────────────────────────────────────────── */

/** Schema for the availability search request coming from the UI/API. */
export const AvailabilitySearchSchema = z.object({
  startDate: z.string().regex(/\d{4}-\d{2}-\d{2}/, 'YYYY-MM-DD'),
  endDate: z.string().regex(/\d{4}-\d{2}-\d{2}/, 'YYYY-MM-DD'),
  roomTypeId: z.string().optional()
})
export type AvailabilitySearch = z.infer<typeof AvailabilitySearchSchema>

/** Schema for the booking creation payload (simplified). */
export const BookingCreateSchema = z.object({
  checkIn: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  checkOut: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  guestsCount: z.number().int().positive(),
  nights: z.number().int().positive(),
  subtotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
  roomTypeId: z.string(),
  guestName: z.string(),
  guestEmail: z.string().email(),
  notes: z.string().max(1000).optional()
})
export type BookingCreate = z.infer<typeof BookingCreateSchema>

/* ──────────────────────────────────────────────────────────────────────────
 * 2. Internal helpers
 * ─────────────────────────────────────────────────────────────────────── */

/** Fetch eZee credentials – 1st preference DB, fallback to ENV vars. */
async function getEZeeConfig(): Promise<EZeeClientConfig> {
  const rows = await query(
    'SELECT key, value FROM system_settings WHERE category = ?',
    ['ezee']
  )
  const map: Record<string, string> = {}
  rows.forEach((r: any) => (map[r.key] = r.value))

  return {
    baseUrl: map.baseUrl || process.env.EZEE_API_BASE_URL || '',
    hotelCode: map.hotelCode || process.env.EZEE_HOTEL_CODE || '',
    username: map.username || process.env.EZEE_USERNAME || '',
    password: map.password || process.env.EZEE_PASSWORD || '',
    webhookSecret: map.webhookSecret || process.env.EZEE_WEBHOOK_SECRET
  }
}

/** Lazily instantiate EZeeClient – avoids creating multiple tokens per request. */
let client: EZeeClient | null = null
async function getClient(): Promise<EZeeClient> {
  if (client) return client
  client = new EZeeClient(await getEZeeConfig())
  return client
}

/* ──────────────────────────────────────────────────────────────────────────
 * 3. Public API
 * ─────────────────────────────────────────────────────────────────────── */

/**
 * Search availability for a date-range (and optional room-type).
 */
export async function searchAvailability(
  search: AvailabilitySearch
): Promise<AvailabilityResponse> {
  const parsed = AvailabilitySearchSchema.parse(search)
  const ez = await getClient()
  return ez.availability(parsed.startDate, parsed.endDate, parsed.roomTypeId)
}

/**
 * Create a reservation in eZee and persist a local shadow-copy.
 */
export async function createReservation(
  data: BookingCreate
): Promise<Booking> {
  const payload = BookingCreateSchema.parse(data)
  const ez = await getClient()
  const booking = await ez.createBooking(payload)

  // Persist minimal record locally
  await run(
    `INSERT INTO bookings (
      confirmation_number,
      check_in,
      check_out,
      guests_count,
      nights,
      subtotal,
      total,
      status,
      payment_status,
      guest_name,
      guest_email,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [
      booking.confirmationNumber,
      payload.checkIn,
      payload.checkOut,
      payload.guestsCount,
      payload.nights,
      payload.subtotal,
      payload.total,
      booking.status,
      payload.guestName,
      payload.guestEmail
    ]
  )

  return booking
}

/** Fetch a reservation by confirmation number (from eZee). */
export async function fetchReservation(
  confirmationNumber: string
): Promise<SingleBookingResponse> {
  const ez = await getClient()
  return ez.getBooking(confirmationNumber)
}

/** Cancel a reservation (remote + mark local copy). */
export async function cancelReservation(
  confirmationNumber: string
): Promise<Booking> {
  const ez = await getClient()
  const updated = await ez.cancelBooking(confirmationNumber)

  await run(
    `UPDATE bookings SET status = ? , updated_at = CURRENT_TIMESTAMP WHERE confirmation_number = ?`,
    [updated.status, confirmationNumber]
  )

  return updated
}