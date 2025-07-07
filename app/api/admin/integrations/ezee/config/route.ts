import { NextResponse } from 'next/server'
import { run, query } from '@/lib/database'

// Mini helper to upsert system setting
async function upsert(category: string, key: string, value: string) {
  await run(
    `INSERT INTO system_settings (category, key, value) VALUES (?, ?, ?) 
     ON CONFLICT(category, key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [category, key, value]
  )
}

export async function GET() {
  const rows = await query('SELECT key, value FROM system_settings WHERE category = ?', ['ezee'])
  return NextResponse.json({ config: rows })
}

export async function POST(req: Request) {
  try {
    const cfg = await req.json()
    for (const key of Object.keys(cfg)) {
      await upsert('ezee', key, cfg[key])
    }
    return NextResponse.json({ success: true })
  } catch (e: any) {
    console.error('Config save error', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}