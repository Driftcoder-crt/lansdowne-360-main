import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  const totalLogs = await query('SELECT COUNT(*) as cnt FROM system_settings WHERE category = ?', ['ezee_webhook'])
  const lastLog = await query('SELECT key, updated_at FROM system_settings WHERE category = ? ORDER BY updated_at DESC LIMIT 1', ['ezee_webhook'])
  return NextResponse.json({
    webhookEvents: totalLogs[0]?.cnt || 0,
    lastEvent: lastLog[0] || null
  })
}