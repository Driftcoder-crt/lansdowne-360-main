
import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET() {
  try {
    const hotels = await query(`
      SELECT 
        h.*,
        COUNT(r.id) as room_count,
        COUNT(CASE WHEN r.status = 'occupied' THEN 1 END) as occupied_rooms
      FROM hotels h
      LEFT JOIN rooms r ON h.id = r.hotel_id
      GROUP BY h.id
      ORDER BY h.created_at DESC
    `)
    
    return NextResponse.json(hotels)
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
    const { name, location, description, address, phone, email, status = 'active' } = body
    
    if (!name || !location) {
      return NextResponse.json(
        { error: 'Name and location are required' },
        { status: 400 }
      )
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    const result = await run(`
      INSERT INTO hotels (name, slug, location, description, address, phone, email, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, slug, location, description, address, phone, email, status])
    
    const newHotel = await get('SELECT * FROM hotels WHERE id = ?', [result.lastID])
    
    return NextResponse.json(newHotel, { status: 201 })
  } catch (error) {
    console.error('Error creating hotel:', error)
    return NextResponse.json(
      { error: 'Failed to create hotel' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, location, description, address, phone, email, status } = body
    
    if (!id || !name || !location) {
      return NextResponse.json(
        { error: 'ID, name and location are required' },
        { status: 400 }
      )
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    await run(`
      UPDATE hotels 
      SET name = ?, slug = ?, location = ?, description = ?, address = ?, phone = ?, email = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [name, slug, location, description, address, phone, email, status, id])
    
    const updatedHotel = await get('SELECT * FROM hotels WHERE id = ?', [id])
    
    return NextResponse.json(updatedHotel)
  } catch (error) {
    console.error('Error updating hotel:', error)
    return NextResponse.json(
      { error: 'Failed to update hotel' },
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
        { error: 'Hotel ID is required' },
        { status: 400 }
      )
    }
    
    await run('DELETE FROM hotels WHERE id = ?', [id])
    
    return NextResponse.json({ message: 'Hotel deleted successfully' })
  } catch (error) {
    console.error('Error deleting hotel:', error)
    return NextResponse.json(
      { error: 'Failed to delete hotel' },
      { status: 500 }
    )
  }
}
