import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hotelId = searchParams.get('hotelId')
    
    let sqlQuery = `
      SELECT 
        r.id,
        r.hotel_id as hotelId,
        r.number,
        r.name,
        r.slug,
        r.type,
        r.category,
        r.price,
        r.original_price as originalPrice,
        r.size,
        r.max_guests as maxGuests,
        r.bed_type as bedType,
        r.bathrooms,
        r.floor,
        r.description,
        r.short_description as shortDescription,
        r.hero_image as heroImage,
        r.images,
        r.amenities,
        r.features,
        r.views,
        r.status,
        r.popular,
        r.rating,
        r.review_count as reviewCount,
        h.name as hotelName,
        h.location as hotelLocation
      FROM rooms r
      LEFT JOIN hotels h ON r.hotel_id = h.id
      WHERE r.status = 'available'
    `
    
    const params = []
    if (hotelId) {
      sqlQuery += ' AND r.hotel_id = ?'
      params.push(hotelId)
    }
    
    sqlQuery += ' ORDER BY r.popular DESC, r.rating DESC'
    
    const rooms = await query(sqlQuery, params)
    
    // Parse JSON fields
    const processedRooms = rooms.map((room: any) => ({
      ...room,
      images: room.images ? JSON.parse(room.images) : [],
      amenities: room.amenities ? JSON.parse(room.amenities) : [],
      features: room.features ? JSON.parse(room.features) : [],
      views: room.views ? JSON.parse(room.views) : [],
      price: parseFloat(room.price),
      originalPrice: room.originalPrice ? parseFloat(room.originalPrice) : null,
      rating: parseFloat(room.rating),
      occupancy: `${room.maxGuests} Adult${room.maxGuests > 1 ? 's' : ''}`,
      size: `${room.size} sq ft`
    }))

    return NextResponse.json(processedRooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      hotelId,
      number,
      name,
      slug,
      type,
      category,
      price,
      originalPrice,
      size,
      maxGuests,
      bedType,
      bathrooms,
      floor,
      description,
      shortDescription,
      heroImage,
      images = [],
      amenities = [],
      features = [],
      views = [],
      popular = false
    } = body

    const result = await query(`
      INSERT INTO rooms (
        hotel_id, number, name, slug, type, category, price, original_price,
        size, max_guests, bed_type, bathrooms, floor, description, 
        short_description, hero_image, images, amenities, features, views, popular
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      hotelId, number, name, slug, type, category, price, originalPrice,
      size, maxGuests, bedType, bathrooms, floor, description,
      shortDescription, heroImage, JSON.stringify(images), 
      JSON.stringify(amenities), JSON.stringify(features), 
      JSON.stringify(views), popular
    ])

    return NextResponse.json({ 
      message: 'Room created successfully',
      id: result.lastID 
    })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    )
  }
}