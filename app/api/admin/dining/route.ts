import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/dining
export async function GET() {
  try {
    const restaurants = await query(`
      SELECT * FROM dining_restaurants
      ORDER BY created_at DESC
    `)
    return NextResponse.json(restaurants)
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 })
  }
}

// POST /api/admin/dining
export async function POST(request: Request) {
  try {
    const {
      name,
      cuisine,
      timing,
      specialty,
      description,
      image,
      status = 'active'
    } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const result = await run(
      `INSERT INTO dining_restaurants (name, cuisine, timing, specialty, description, image, status)
       VALUES (?,?,?,?,?,?,?)`,
      [name, cuisine, timing, specialty, description, image, status]
    )

    const newRestaurant = await get('SELECT * FROM dining_restaurants WHERE id = ?', [result.lastID])
    return NextResponse.json(newRestaurant, { status: 201 })
  } catch (error) {
    console.error('Error creating restaurant:', error)
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 })
  }
}

// PUT /api/admin/dining
export async function PUT(request: Request) {
  try {
    const {
      id,
      name,
      cuisine,
      timing,
      specialty,
      description,
      image,
      status
    } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Restaurant ID is required' }, { status: 400 })
    }

    await run(
      `UPDATE dining_restaurants SET
        name = COALESCE(?, name),
        cuisine = COALESCE(?, cuisine),
        timing = COALESCE(?, timing),
        specialty = COALESCE(?, specialty),
        description = COALESCE(?, description),
        image = COALESCE(?, image),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [name, cuisine, timing, specialty, description, image, status, id]
    )

    const updatedRestaurant = await get('SELECT * FROM dining_restaurants WHERE id = ?', [id])
    return NextResponse.json(updatedRestaurant)
  } catch (error) {
    console.error('Error updating restaurant:', error)
    return NextResponse.json({ error: 'Failed to update restaurant' }, { status: 500 })
  }
}

// DELETE /api/admin/dining?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Restaurant ID is required' }, { status: 400 })
    }

    await run('DELETE FROM dining_restaurants WHERE id = ?', [id])
    return NextResponse.json({ message: 'Restaurant deleted successfully' })
  } catch (error) {
    console.error('Error deleting restaurant:', error)
    return NextResponse.json({ error: 'Failed to delete restaurant' }, { status: 500 })
  }
}