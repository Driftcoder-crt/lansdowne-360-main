import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/amenities
export async function GET() {
  try {
    const amenities = await query(`
      SELECT * FROM amenities
      ORDER BY category, name
    `)
    return NextResponse.json(amenities)
  } catch (error) {
    console.error('Error fetching amenities:', error)
    return NextResponse.json({ error: 'Failed to fetch amenities' }, { status: 500 })
  }
}

// POST /api/admin/amenities
export async function POST(request: Request) {
  try {
    const { name, description, icon, category, status = 'active' } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const result = await run(
      `INSERT INTO amenities (name, description, icon, category, status)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description, icon, category, status]
    )

    const amenity = await get('SELECT * FROM amenities WHERE id = ?', [result.lastID])
    return NextResponse.json(amenity, { status: 201 })
  } catch (error) {
    console.error('Error creating amenity:', error)
    return NextResponse.json({ error: 'Failed to create amenity' }, { status: 500 })
  }
}

// PUT /api/admin/amenities
export async function PUT(request: Request) {
  try {
    const { id, name, description, icon, category, status } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Amenity ID is required' }, { status: 400 })
    }

    await run(
      `UPDATE amenities
       SET name = COALESCE(?, name),
           description = COALESCE(?, description),
           icon = COALESCE(?, icon),
           category = COALESCE(?, category),
           status = COALESCE(?, status),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, description, icon, category, status, id]
    )

    const updatedAmenity = await get('SELECT * FROM amenities WHERE id = ?', [id])
    return NextResponse.json(updatedAmenity)
  } catch (error) {
    console.error('Error updating amenity:', error)
    return NextResponse.json({ error: 'Failed to update amenity' }, { status: 500 })
  }
}

// DELETE /api/admin/amenities?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Amenity ID is required' }, { status: 400 })
    }

    await run('DELETE FROM amenities WHERE id = ?', [id])
    return NextResponse.json({ message: 'Amenity deleted successfully' })
  } catch (error) {
    console.error('Error deleting amenity:', error)
    return NextResponse.json({ error: 'Failed to delete amenity' }, { status: 500 })
  }
}