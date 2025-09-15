import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hotelId = searchParams.get('hotelId')
    
    let sqlQuery = `
      SELECT 
        dv.*,
        h.name as hotel_name,
        h.location as hotel_location
      FROM dining_venues dv
      LEFT JOIN hotels h ON dv.hotel_id = h.id
      WHERE dv.status = 'active'
    `
    
    const params = []
    if (hotelId) {
      sqlQuery += ' AND dv.hotel_id = ?'
      params.push(hotelId)
    }
    
    sqlQuery += ' ORDER BY dv.name'
    
    const venues = await query(sqlQuery, params)
    
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