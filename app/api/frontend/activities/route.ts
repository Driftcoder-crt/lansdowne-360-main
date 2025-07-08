import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const activities = await query(`
      SELECT * FROM activities
      WHERE status = 'active'
      ORDER BY created_at DESC
    `)
    return NextResponse.json(activities)
  } catch (error) {
    console.error('Error fetching frontend activities:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}