import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const restaurants = await query(`
      SELECT * FROM dining_restaurants
      WHERE status = 'active'
      ORDER BY created_at DESC
    `)
    return NextResponse.json(restaurants)
  } catch (error) {
    console.error('Error fetching frontend restaurants:', error)
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 })
  }
}