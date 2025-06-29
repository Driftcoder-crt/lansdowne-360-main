import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const hotels = await query(`
      SELECT 
        h.*,
        COUNT(r.id) as room_count,
        COUNT(CASE WHEN r.status = 'occupied' THEN 1 END) as occupied_rooms,
        COUNT(CASE WHEN r.status = 'available' THEN 1 END) as available_rooms
      FROM hotels h
      LEFT JOIN rooms r ON h.id = r.hotel_id
      WHERE h.status = 'active'
      GROUP BY h.id
      ORDER BY h.created_at DESC
    `)
    
    return NextResponse.json(hotels)
  } catch (error) {
    console.error('Error fetching frontend hotels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 }
    )
  }
}