import EZeeClient, { EZeeClientConfig } from './ezee-client'
import { query, run } from './database'

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

export async function createBooking(payload: any) {
  const cfg = await getConfig()
  const client = new EZeeClient(cfg)
  const response = await client.createBooking(payload)

  // We assume the payload contains room/guest details; map to local DB if needed.
  await run(
    `INSERT INTO bookings (confirmation_number, guest_id, hotel_id, room_id, check_in, check_out, guests_count, nights, subtotal, total, status, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      response?.confirmationNumber || '',
      null,
      null,
      null,
      payload.checkIn,
      payload.checkOut,
      payload.guestsCount,
      payload.nights,
      payload.subtotal,
      payload.total,
      'confirmed',
      'pending'
    ]
  )

  return response
}