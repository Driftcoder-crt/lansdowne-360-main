import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const venues = await query(`
      SELECT * FROM event_venues
      WHERE status = 'active'
      ORDER BY created_at DESC
    `)
    return NextResponse.json(venues)
  } catch (error) {
    console.error('Error fetching frontend event venues:', error)
    return NextResponse.json({ error: 'Failed to fetch event venues' }, { status: 500 })
  }
}