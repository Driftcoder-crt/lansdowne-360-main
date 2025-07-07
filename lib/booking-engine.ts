import EZeeClient, {
  EZeeClientConfig,
  BookingResponse
} from './ezee-client'
import { query, run } from './database'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
declare const process: { env: Record<string, string | undefined> }

// Build configuration from environment variables stored in system settings.
async function getConfig(): Promise<EZeeClientConfig> {
  const rows = await query(
    'SELECT key, value FROM system_settings WHERE category = ? ',
    ['ezee']
  )
  const map: Record<string, string> = {}
  rows.forEach((r: any) => {
    map[r.key] = r.value
  })
  return {
    baseUrl: map['baseUrl'] || process.env.EZEE_API_BASE_URL || '',
    hotelCode: map['hotelCode'] || process.env.EZEE_HOTEL_CODE || '',
    username: map['username'] || process.env.EZEE_USERNAME || '',
    password: map['password'] || process.env.EZEE_PASSWORD || '',
    webhookSecret: map['webhookSecret'] || process.env.EZEE_WEBHOOK_SECRET
  }
}

export async function checkAvailability(
  startDate: string,
  endDate: string,
  roomTypeId?: string
) {
  const cfg = await getConfig()
  const client = new EZeeClient(cfg)
  return client.availability(startDate, endDate, roomTypeId)
}

// Shape expected from the UI when creating a booking
export const BookingPayloadSchema = z.object({
  checkIn: z.string(), // YYYY-MM-DD
  checkOut: z.string(),
  guestsCount: z.number().int().positive(),
  nights: z.number().int().positive(),
  subtotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
  roomTypeId: z.string().optional(),
  notes: z.string().optional()
})
export type BookingPayload = z.infer<typeof BookingPayloadSchema>

export async function createBooking(payload: BookingPayload): Promise<BookingResponse> {
  const cfg = await getConfig()
  const client = new EZeeClient(cfg)
  // Validate inbound payload to avoid corrupt data
  const data = BookingPayloadSchema.parse(payload)

  const response = await client.createBooking(data)

  // Persist basic booking data locally for dashboards / offline reference
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
        created_at,
        updated_at
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [
      response.confirmationNumber,
      data.checkIn,
      data.checkOut,
      data.guestsCount,
      data.nights,
      data.subtotal,
      data.total,
      response.status,
      'pending'
    ]
  )

  return response
}