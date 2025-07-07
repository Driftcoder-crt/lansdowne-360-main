import { NextResponse } from 'next/server'
import { query } from '@/lib/database'
import EZeeClient from '@/lib/ezee-client'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
declare const process: { env: Record<string, string | undefined> }

export async function POST() {
  try {
    // Fetch config from DB
    const rows = await query('SELECT key, value FROM system_settings WHERE category = ?', ['ezee'])
    const cfg: Record<string, string> = {}
    rows.forEach((r: any) => (cfg[r.key] = r.value))

    const client = new EZeeClient({
      baseUrl: cfg.baseUrl || process.env.EZEE_API_BASE_URL || '',
      hotelCode: cfg.hotelCode || process.env.EZEE_HOTEL_CODE || '',
      username: cfg.username || process.env.EZEE_USERNAME || '',
      password: cfg.password || process.env.EZEE_PASSWORD || '',
      webhookSecret: cfg.webhookSecret || process.env.EZEE_WEBHOOK_SECRET
    })

    // Simple ping: try to fetch availability for today/tomorrow
    const today = new Date().toISOString().slice(0, 10)
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
    await client.availability(today, tomorrow)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}