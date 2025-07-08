import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/event-venues
export async function GET() {
  try {
    const venues = await query(`
      SELECT * FROM event_venues
      ORDER BY created_at DESC
    `)
    return NextResponse.json(venues)
  } catch (error) {
    console.error('Error fetching event venues:', error)
    return NextResponse.json({ error: 'Failed to fetch event venues' }, { status: 500 })
  }
}

// POST /api/admin/event-venues
export async function POST(request: Request) {
  try {
    const {
      name,
      capacity,
      description,
      features,
      image,
      status = 'active'
    } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features || '[]'

    const result = await run(
      `INSERT INTO event_venues (name, capacity, description, features, image, status)
       VALUES (?,?,?,?,?,?)`,
      [name, capacity, description, featuresJson, image, status]
    )

    const newVenue = await get('SELECT * FROM event_venues WHERE id = ?', [result.lastID])
    return NextResponse.json(newVenue, { status: 201 })
  } catch (error) {
    console.error('Error creating event venue:', error)
    return NextResponse.json({ error: 'Failed to create event venue' }, { status: 500 })
  }
}

// PUT /api/admin/event-venues
export async function PUT(request: Request) {
  try {
    const {
      id,
      name,
      capacity,
      description,
      features,
      image,
      status
    } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Venue ID is required' }, { status: 400 })
    }

    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features

    await run(
      `UPDATE event_venues SET
        name = COALESCE(?, name),
        capacity = COALESCE(?, capacity),
        description = COALESCE(?, description),
        features = COALESCE(?, features),
        image = COALESCE(?, image),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [name, capacity, description, featuresJson, image, status, id]
    )

    const updatedVenue = await get('SELECT * FROM event_venues WHERE id = ?', [id])
    return NextResponse.json(updatedVenue)
  } catch (error) {
    console.error('Error updating event venue:', error)
    return NextResponse.json({ error: 'Failed to update event venue' }, { status: 500 })
  }
}

// DELETE /api/admin/event-venues?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Venue ID is required' }, { status: 400 })
    }

    await run('DELETE FROM event_venues WHERE id = ?', [id])
    return NextResponse.json({ message: 'Event venue deleted successfully' })
  } catch (error) {
    console.error('Error deleting event venue:', error)
    return NextResponse.json({ error: 'Failed to delete event venue' }, { status: 500 })
  }
}