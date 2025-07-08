import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/experiences
export async function GET() {
  try {
    const experiences = await query(`
      SELECT * FROM experiences
      ORDER BY created_at DESC
    `)
    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

// POST /api/admin/experiences
export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      image,
      icon,
      features,
      status = 'active'
    } = await request.json()

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features || '[]'

    const result = await run(
      `INSERT INTO experiences (title, slug, description, image, icon, features, status)
       VALUES (?,?,?,?,?,?,?)`,
      [title, slug, description, image, icon, featuresJson, status]
    )

    const newExperience = await get('SELECT * FROM experiences WHERE id = ?', [result.lastID])
    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

// PUT /api/admin/experiences
export async function PUT(request: Request) {
  try {
    const {
      id,
      title,
      description,
      image,
      icon,
      features,
      status
    } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 })
    }

    const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined
    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : features

    await run(
      `UPDATE experiences SET
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description),
        image = COALESCE(?, image),
        icon = COALESCE(?, icon),
        features = COALESCE(?, features),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [title, slug, description, image, icon, featuresJson, status, id]
    )

    const updatedExperience = await get('SELECT * FROM experiences WHERE id = ?', [id])
    return NextResponse.json(updatedExperience)
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

// DELETE /api/admin/experiences?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 })
    }

    await run('DELETE FROM experiences WHERE id = ?', [id])
    return NextResponse.json({ message: 'Experience deleted successfully' })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}