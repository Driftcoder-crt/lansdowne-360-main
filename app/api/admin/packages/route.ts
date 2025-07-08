import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/packages
export async function GET() {
  try {
    const packages = await query(`
      SELECT * FROM packages
      ORDER BY created_at DESC
    `)
    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}

// POST /api/admin/packages
export async function POST(request: Request) {
  try {
    const {
      name,
      duration,
      price,
      original_price,
      description,
      includes,
      highlights,
      image,
      category,
      max_guests,
      popular = false,
      status = 'active'
    } = await request.json()

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const includesJson = Array.isArray(includes) ? JSON.stringify(includes) : includes || '[]'
    const highlightsJson = Array.isArray(highlights) ? JSON.stringify(highlights) : highlights || '[]'

    const result = await run(
      `INSERT INTO packages (name, slug, duration, price, original_price, description, includes, highlights, image, category, max_guests, popular, status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [name, slug, duration, price, original_price, description, includesJson, highlightsJson, image, category, max_guests, popular, status]
    )

    const newPackage = await get('SELECT * FROM packages WHERE id = ?', [result.lastID])
    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 })
  }
}

// PUT /api/admin/packages
export async function PUT(request: Request) {
  try {
    const {
      id,
      name,
      duration,
      price,
      original_price,
      description,
      includes,
      highlights,
      image,
      category,
      max_guests,
      popular,
      status
    } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 })
    }

    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined

    const includesJson = Array.isArray(includes) ? JSON.stringify(includes) : includes
    const highlightsJson = Array.isArray(highlights) ? JSON.stringify(highlights) : highlights

    await run(
      `UPDATE packages SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        duration = COALESCE(?, duration),
        price = COALESCE(?, price),
        original_price = COALESCE(?, original_price),
        description = COALESCE(?, description),
        includes = COALESCE(?, includes),
        highlights = COALESCE(?, highlights),
        image = COALESCE(?, image),
        category = COALESCE(?, category),
        max_guests = COALESCE(?, max_guests),
        popular = COALESCE(?, popular),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        name,
        slug,
        duration,
        price,
        original_price,
        description,
        includesJson,
        highlightsJson,
        image,
        category,
        max_guests,
        popular,
        status,
        id
      ]
    )

    const updatedPackage = await get('SELECT * FROM packages WHERE id = ?', [id])
    return NextResponse.json(updatedPackage)
  } catch (error) {
    console.error('Error updating package:', error)
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 })
  }
}

// DELETE /api/admin/packages?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 })
    }

    await run('DELETE FROM packages WHERE id = ?', [id])
    return NextResponse.json({ message: 'Package deleted successfully' })
  } catch (error) {
    console.error('Error deleting package:', error)
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 })
  }
}