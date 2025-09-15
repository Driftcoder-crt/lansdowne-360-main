import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const eventType = searchParams.get('type')
    
    let sqlQuery = `
      SELECT * FROM events 
      WHERE status = 'active'
    `
    
    const params = []
    if (eventType) {
      sqlQuery += ' AND event_type = ?'
      params.push(eventType)
    }
    
    sqlQuery += ' ORDER BY title'
    
    const events = await query(sqlQuery, params)
    
    // Parse JSON fields
    const processedEvents = events.map((event: any) => ({
      ...event,
      features: event.features ? JSON.parse(event.features) : [],
      price: event.price ? parseFloat(event.price) : null
    }))

    return NextResponse.json(processedEvents)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      eventType,
      capacity,
      price,
      image,
      features = []
    } = body

    if (!title || !description || !eventType) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const result = await run(`
      INSERT INTO events (
        title, slug, description, event_type, capacity, price, image, features
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, slug, description, eventType, capacity, price, image,
      JSON.stringify(features)
    ])

    const newEvent = await get('SELECT * FROM events WHERE id = ?', [result.lastID])

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}