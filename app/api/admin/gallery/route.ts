import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET() {
  try {
    const galleryItems = await query(`
      SELECT 
        g.*,
        h.name as hotel_name,
        h.location as hotel_location
      FROM gallery g
      LEFT JOIN hotels h ON g.hotel_id = h.id
      ORDER BY g.featured DESC, g.order_index ASC, g.created_at DESC
    `)
    
    return NextResponse.json(galleryItems)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      hotelId,
      title,
      description,
      image,
      category,
      altText,
      featured = false,
      orderIndex = 0
    } = body

    if (!title || !image || !category) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const result = await run(`
      INSERT INTO gallery (
        hotel_id, title, description, image, category, alt_text, featured, order_index
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      hotelId, title, description, image, category, altText, featured, orderIndex
    ])

    const newGalleryItem = await get('SELECT * FROM gallery WHERE id = ?', [result.lastID])

    return NextResponse.json(newGalleryItem, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      hotelId,
      title,
      description,
      image,
      category,
      altText,
      featured,
      orderIndex,
      status
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Gallery item ID is required' },
        { status: 400 }
      )
    }

    await run(`
      UPDATE gallery 
      SET hotel_id = ?, title = ?, description = ?, image = ?, category = ?, 
          alt_text = ?, featured = ?, order_index = ?, status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      hotelId, title, description, image, category, altText, featured, orderIndex, status, id
    ])

    const updatedGalleryItem = await get('SELECT * FROM gallery WHERE id = ?', [id])

    return NextResponse.json(updatedGalleryItem)
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Gallery item ID is required' },
        { status: 400 }
      )
    }

    await run('DELETE FROM gallery WHERE id = ?', [id])

    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}