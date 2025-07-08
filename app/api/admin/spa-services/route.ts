import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/spa-services
export async function GET() {
  try {
    const services = await query(`
      SELECT * FROM spa_services
      ORDER BY created_at DESC
    `)
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching spa services:', error)
    return NextResponse.json({ error: 'Failed to fetch spa services' }, { status: 500 })
  }
}

// POST /api/admin/spa-services
export async function POST(request: Request) {
  try {
    const {
      name,
      description,
      duration,
      price,
      image,
      status = 'active'
    } = await request.json()

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 })
    }

    const result = await run(
      `INSERT INTO spa_services (name, description, duration, price, image, status)
       VALUES (?,?,?,?,?,?)`,
      [name, description, duration, price, image, status]
    )

    const newService = await get('SELECT * FROM spa_services WHERE id = ?', [result.lastID])
    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    console.error('Error creating spa service:', error)
    return NextResponse.json({ error: 'Failed to create spa service' }, { status: 500 })
  }
}

// PUT /api/admin/spa-services
export async function PUT(request: Request) {
  try {
    const {
      id,
      name,
      description,
      duration,
      price,
      image,
      status
    } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    await run(
      `UPDATE spa_services SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        duration = COALESCE(?, duration),
        price = COALESCE(?, price),
        image = COALESCE(?, image),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [name, description, duration, price, image, status, id]
    )

    const updatedService = await get('SELECT * FROM spa_services WHERE id = ?', [id])
    return NextResponse.json(updatedService)
  } catch (error) {
    console.error('Error updating spa service:', error)
    return NextResponse.json({ error: 'Failed to update spa service' }, { status: 500 })
  }
}

// DELETE /api/admin/spa-services?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    await run('DELETE FROM spa_services WHERE id = ?', [id])
    return NextResponse.json({ message: 'Spa service deleted successfully' })
  } catch (error) {
    console.error('Error deleting spa service:', error)
    return NextResponse.json({ error: 'Failed to delete spa service' }, { status: 500 })
  }
}