import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET() {
  try {
    const venues = await query(`
      SELECT 
        dv.*,
        h.name as hotel_name,
        h.location as hotel_location
      FROM dining_venues dv
      LEFT JOIN hotels h ON dv.hotel_id = h.id
      ORDER BY h.name, dv.name
    `)
    
    // Parse JSON fields
    const processedVenues = venues.map((venue: any) => ({
      ...venue,
      specialties: venue.specialties ? JSON.parse(venue.specialties) : [],
      features: venue.features ? JSON.parse(venue.features) : []
    }))
    
    return NextResponse.json(processedVenues)
  } catch (error) {
    console.error('Error fetching dining venues:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dining venues' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      hotelId,
      name,
      cuisine,
      timing,
      location,
      description,
      image,
      specialties = [],
      features = []
    } = body

    if (!hotelId || !name || !cuisine) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const result = await run(`
      INSERT INTO dining_venues (
        hotel_id, name, slug, cuisine, timing, location, description, 
        image, specialties, features
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      hotelId, name, slug, cuisine, timing, location, description,
      image, JSON.stringify(specialties), JSON.stringify(features)
    ])

    const newVenue = await get('SELECT * FROM dining_venues WHERE id = ?', [result.lastID])

    return NextResponse.json(newVenue, { status: 201 })
  } catch (error) {
    console.error('Error creating dining venue:', error)
    return NextResponse.json(
      { error: 'Failed to create dining venue' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      hotelId,
      name,
      cuisine,
      timing,
      location,
      description,
      image,
      specialties = [],
      features = [],
      status
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Venue ID is required' },
        { status: 400 }
      )
    }

    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined

    await run(`
      UPDATE dining_venues 
      SET hotel_id = ?, name = ?, slug = ?, cuisine = ?, timing = ?, 
          location = ?, description = ?, image = ?, specialties = ?, 
          features = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      hotelId, name, slug, cuisine, timing, location, description,
      image, JSON.stringify(specialties), JSON.stringify(features), status, id
    ])

    const updatedVenue = await get('SELECT * FROM dining_venues WHERE id = ?', [id])

    return NextResponse.json(updatedVenue)
  } catch (error) {
    console.error('Error updating dining venue:', error)
    return NextResponse.json(
      { error: 'Failed to update dining venue' },
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
        { error: 'Venue ID is required' },
        { status: 400 }
      )
    }

    await run('DELETE FROM dining_venues WHERE id = ?', [id])

    return NextResponse.json({ message: 'Dining venue deleted successfully' })
  } catch (error) {
    console.error('Error deleting dining venue:', error)
    return NextResponse.json(
      { error: 'Failed to delete dining venue' },
      { status: 500 }
    )
  }
}