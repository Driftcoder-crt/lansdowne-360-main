import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const hotelId = searchParams.get('hotelId')
    const featured = searchParams.get('featured')
    
    let sqlQuery = `
      SELECT 
        g.*,
        h.name as hotel_name,
        h.location as hotel_location
      FROM gallery g
      LEFT JOIN hotels h ON g.hotel_id = h.id
      WHERE g.status = 'active'
    `
    
    const params = []
    
    if (category && category !== 'all') {
      sqlQuery += ' AND g.category = ?'
      params.push(category)
    }
    
    if (hotelId) {
      sqlQuery += ' AND g.hotel_id = ?'
      params.push(hotelId)
    }
    
    if (featured === 'true') {
      sqlQuery += ' AND g.featured = true'
    }
    
    sqlQuery += ' ORDER BY g.featured DESC, g.order_index ASC, g.created_at DESC'
    
    const galleryItems = await query(sqlQuery, params)

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