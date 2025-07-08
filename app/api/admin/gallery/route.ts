import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

// GET /api/admin/gallery
export async function GET() {
  try {
    const images = await query(`
      SELECT * FROM gallery_images
      ORDER BY created_at DESC
    `)
    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
  }
}

// POST /api/admin/gallery
export async function POST(request: Request) {
  try {
    const { title, src, category, status = 'active' } = await request.json()

    if (!src) {
      return NextResponse.json({ error: 'Image src is required' }, { status: 400 })
    }

    const result = await run(
      `INSERT INTO gallery_images (title, src, category, status)
       VALUES (?,?,?,?)`,
      [title, src, category, status]
    )

    const newImage = await get('SELECT * FROM gallery_images WHERE id = ?', [result.lastID])
    return NextResponse.json(newImage, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 })
  }
}

// PUT /api/admin/gallery
export async function PUT(request: Request) {
  try {
    const { id, title, src, category, status } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    await run(
      `UPDATE gallery_images SET
        title = COALESCE(?, title),
        src = COALESCE(?, src),
        category = COALESCE(?, category),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [title, src, category, status, id]
    )

    const updatedImage = await get('SELECT * FROM gallery_images WHERE id = ?', [id])
    return NextResponse.json(updatedImage)
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 })
  }
}

// DELETE /api/admin/gallery?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    await run('DELETE FROM gallery_images WHERE id = ?', [id])
    return NextResponse.json({ message: 'Gallery image deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 })
  }
}