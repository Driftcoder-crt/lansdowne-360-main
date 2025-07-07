import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  const logs = await query('SELECT key as eventType, value as payload, updated_at as receivedAt FROM system_settings WHERE category = ? ORDER BY updated_at DESC LIMIT 100', ['ezee_webhook'])
  return NextResponse.json({ logs })
}