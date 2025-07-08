import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/testimonials
export async function GET() {
  try {
    const testimonials = await query(`
      SELECT * FROM testimonials
      ORDER BY created_at DESC
    `)
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

// POST /api/admin/testimonials
export async function POST(request: Request) {
  try {
    const { name, location, rating, comment, date, status = 'active' } = await request.json()

    if (!name || !rating || !comment) {
      return NextResponse.json({ error: 'Name, rating and comment are required' }, { status: 400 })
    }

    const result = await run(
      `INSERT INTO testimonials (name, location, rating, comment, date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, location, rating, comment, date, status]
    )

    const testimonial = await get('SELECT * FROM testimonials WHERE id = ?', [result.lastID])
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}

// PUT /api/admin/testimonials
export async function PUT(request: Request) {
  try {
    const { id, name, location, rating, comment, date, status } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 })
    }

    await run(
      `UPDATE testimonials
       SET name = COALESCE(?, name),
           location = COALESCE(?, location),
           rating = COALESCE(?, rating),
           comment = COALESCE(?, comment),
           date = COALESCE(?, date),
           status = COALESCE(?, status),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, location, rating, comment, date, status, id]
    )

    const updatedTestimonial = await get('SELECT * FROM testimonials WHERE id = ?', [id])
    return NextResponse.json(updatedTestimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

// DELETE /api/admin/testimonials?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 })
    }

    await run('DELETE FROM testimonials WHERE id = ?', [id])
    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}