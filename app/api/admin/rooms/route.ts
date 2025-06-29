
import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET() {
  try {
    const rooms = await query(`
      SELECT 
        r.*,
        h.name as hotel_name,
        h.location as hotel_location
      FROM rooms r
      LEFT JOIN hotels h ON r.hotel_id = h.id
      ORDER BY h.name, r.number
    `)
    
    return NextResponse.json(rooms)
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
      hotel_id, number, name, type, category, price, max_guests, 
      bed_type, description, short_description, size, bathrooms,
      hero_image, images, amenities, features, views, status = 'available',
      popular = false, rating = 0, review_count = 0
    } = body
    
    if (!hotel_id || !number || !name || !type || !category || !price || !max_guests) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }
    
    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Convert arrays and objects to JSON strings
    const imagesJson = Array.isArray(images) ? JSON.stringify(images) : '[]';
    const amenitiesJson = Array.isArray(amenities) ? JSON.stringify(amenities) : 
                         typeof amenities === 'string' ? amenities : '[]';
    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : '[]';
    const viewsJson = Array.isArray(views) ? JSON.stringify(views) : '[]';
    
    const result = await run(`
      INSERT INTO rooms (
        hotel_id, number, name, slug, type, category, price, size, max_guests, 
        bed_type, bathrooms, description, short_description, hero_image, 
        images, amenities, features, views, status, popular, rating, review_count
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      hotel_id, number, name, slug, type, category, price, size, max_guests, 
      bed_type, bathrooms, description, short_description, hero_image, 
      imagesJson, amenitiesJson, featuresJson, viewsJson, status, popular, rating, review_count
    ])
    
    const newRoom = await get('SELECT * FROM rooms WHERE id = ?', [result.lastID])
    
    return NextResponse.json(newRoom, { status: 201 })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { 
      id, hotel_id, number, name, type, category, price, max_guests, 
      bed_type, description, short_description, size, bathrooms,
      hero_image, images, amenities, features, views, status, popular, rating, review_count
    } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Room ID is required' },
        { status: 400 }
      )
    }
    
    // Update slug if name is provided
    let slug = '';
    if (name) {
      slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    // Convert arrays and objects to JSON strings
    const imagesJson = Array.isArray(images) ? JSON.stringify(images) : images;
    const amenitiesJson = Array.isArray(amenities) ? JSON.stringify(amenities) : amenities;
    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features;
    const viewsJson = Array.isArray(views) ? JSON.stringify(views) : views;
    
    await run(`
      UPDATE rooms 
      SET hotel_id = ?, number = ?, name = ?, slug = ?, type = ?, category = ?, price = ?, size = ?,
          max_guests = ?, bed_type = ?, bathrooms = ?, description = ?, short_description = ?, 
          hero_image = ?, images = ?, amenities = ?, features = ?, views = ?, 
          status = ?, popular = ?, rating = ?, review_count = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      hotel_id, number, name, slug, type, category, price, size,
      max_guests, bed_type, bathrooms, description, short_description,
      hero_image, imagesJson, amenitiesJson, featuresJson, viewsJson,
      status, popular, rating, review_count, id
    ])
    
    const updatedRoom = await get('SELECT * FROM rooms WHERE id = ?', [id])
    
    return NextResponse.json(updatedRoom)
  } catch (error) {
    console.error('Error updating room:', error)
    return NextResponse.json(
      { error: 'Failed to update room' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Room ID is required' },
        { status: 400 }
      )
    }
    
    await run('DELETE FROM rooms WHERE id = ?', [id])
    
    return NextResponse.json({ message: 'Room deleted successfully' })
  } catch (error) {
    console.error('Error deleting room:', error)
    return NextResponse.json(
      { error: 'Failed to delete room' },
      { status: 500 }
    )
  }
}
