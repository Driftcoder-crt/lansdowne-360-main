import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const hotels = await query(`
      SELECT 
        id,
        name,
        slug,
        location,
        description,
        status,
        hero_image as heroImage,
        address,
        phone,
        email,
        latitude,
        longitude,
        check_in_time as checkInTime,
        check_out_time as checkOutTime,
        created_at as createdAt,
        updated_at as updatedAt
      FROM hotels 
      ORDER BY created_at DESC
    `)

    // Add room count for each hotel
    const hotelsWithCounts = await Promise.all(
      hotels.map(async (hotel: any) => {
        const roomCount = await query(
          'SELECT COUNT(*) as count FROM rooms WHERE hotel_id = ?',
          [hotel.id]
        )
        return {
          ...hotel,
          rooms: roomCount[0]?.count || 0,
          established: new Date(hotel.createdAt).getFullYear()
        }
      })
    )

    return NextResponse.json(hotelsWithCounts)
  } catch (error) {
    console.error('Error fetching hotels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      slug,
      location,
      description,
      address,
      phone,
      email,
      latitude,
      longitude,
      heroImage,
      status = 'active'
    } = body

    const result = await query(`
      INSERT INTO hotels (
        name, slug, location, description, address, phone, email,
        latitude, longitude, hero_image, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, slug, location, description, address, phone, email, latitude, longitude, heroImage, status])

    return NextResponse.json({ 
      message: 'Hotel created successfully',
      id: result.lastID 
    })
  } catch (error) {
    console.error('Error creating hotel:', error)
    return NextResponse.json(
      { error: 'Failed to create hotel' },
      { status: 500 }
    )
  }
}