import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/activities
export async function GET() {
  try {
    const activities = await query(`
      SELECT * FROM activities
      ORDER BY created_at DESC
    `)
    return NextResponse.json(activities)
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}

// POST /api/admin/activities
export async function POST(request: Request) {
  try {
    const {
      name,
      description,
      image,
      category,
      features,
      status = 'active'
    } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features || '[]'

    const result = await run(
      `INSERT INTO activities (name, slug, description, image, category, features, status)
       VALUES (?,?,?,?,?,?,?)`,
      [name, slug, description, image, category, featuresJson, status]
    )

    const newActivity = await get('SELECT * FROM activities WHERE id = ?', [result.lastID])
    return NextResponse.json(newActivity, { status: 201 })
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 })
  }
}

// PUT /api/admin/activities
export async function PUT(request: Request) {
  try {
    const {
      id,
      name,
      description,
      image,
      category,
      features,
      status
    } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 })
    }

    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined
    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features

    await run(
      `UPDATE activities SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description),
        image = COALESCE(?, image),
        category = COALESCE(?, category),
        features = COALESCE(?, features),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [name, slug, description, image, category, featuresJson, status, id]
    )

    const updatedActivity = await get('SELECT * FROM activities WHERE id = ?', [id])
    return NextResponse.json(updatedActivity)
  } catch (error) {
    console.error('Error updating activity:', error)
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 })
  }
}

// DELETE /api/admin/activities?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 })
    }

    await run('DELETE FROM activities WHERE id = ?', [id])
    return NextResponse.json({ message: 'Activity deleted successfully' })
  } catch (error) {
    console.error('Error deleting activity:', error)
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 })
  }
}