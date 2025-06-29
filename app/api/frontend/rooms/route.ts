import { NextResponse } from 'next/server'
import { query } from '@/lib/database'
import { Room, RoomAmenity } from '@/lib/types'

export async function GET() {
  try {
    const roomsData = await query(`
      SELECT 
        r.*,
        h.name as hotel_name,
        h.location as hotel_location
      FROM rooms r
      LEFT JOIN hotels h ON r.hotel_id = h.id
      WHERE r.status IN ('available', 'occupied')
      ORDER BY r.price ASC
    `)
    
    // Transform the data to match the Room interface
    const rooms = roomsData.map((room: any) => {
      return {
        id: room.id.toString(),
        hotelId: room.hotel_id.toString(),
        name: room.name,
        slug: room.slug,
        type: room.type.toLowerCase(),
        category: room.category.toLowerCase(),
        price: parseFloat(room.price),
        originalPrice: room.original_price ? parseFloat(room.original_price) : undefined,
        size: room.size,
        maxGuests: room.max_guests,
        bedType: room.bed_type,
        bathrooms: room.bathrooms,
        floor: room.floor,
        description: room.description,
        shortDescription: room.short_description,
        heroImage: room.hero_image,
        images: JSON.parse(room.images || '[]'),
        amenities: JSON.parse(room.amenities || '[]'),
        features: JSON.parse(room.features || '[]'),
        views: JSON.parse(room.views || '[]'),
        status: room.status,
        popular: room.popular === 1,
        rating: parseFloat(room.rating),
        reviewCount: room.review_count,
        createdAt: room.created_at,
        updatedAt: room.updated_at
      } as Room
    })
    
    return NextResponse.json(rooms)
  } catch (error) {
    console.error('Error fetching frontend rooms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    )
  }
}