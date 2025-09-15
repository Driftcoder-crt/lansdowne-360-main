import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET() {
  try {
    const packages = await query(`
      SELECT * FROM packages 
      ORDER BY popular DESC, created_at DESC
    `)
    
    // Parse JSON fields
    const processedPackages = packages.map((pkg: any) => ({
      ...pkg,
      includes: pkg.includes ? JSON.parse(pkg.includes) : [],
      highlights: pkg.highlights ? JSON.parse(pkg.highlights) : [],
      price: parseFloat(pkg.price),
      originalPrice: pkg.original_price ? parseFloat(pkg.original_price) : null
    }))
    
    return NextResponse.json(processedPackages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      duration,
      price,
      originalPrice,
      description,
      includes = [],
      highlights = [],
      image,
      popular = false,
      category,
      maxGuests = 2
    } = body

    if (!name || !duration || !price || !description) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const result = await run(`
      INSERT INTO packages (
        name, slug, duration, price, original_price, description, 
        includes, highlights, image, popular, category, max_guests
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, slug, duration, price, originalPrice, description,
      JSON.stringify(includes), JSON.stringify(highlights), 
      image, popular, category, maxGuests
    ])

    const newPackage = await get('SELECT * FROM packages WHERE id = ?', [result.lastID])

    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      name,
      duration,
      price,
      originalPrice,
      description,
      includes = [],
      highlights = [],
      image,
      popular = false,
      category,
      maxGuests,
      status
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Package ID is required' },
        { status: 400 }
      )
    }

    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined

    await run(`
      UPDATE packages 
      SET name = ?, slug = ?, duration = ?, price = ?, original_price = ?, 
          description = ?, includes = ?, highlights = ?, image = ?, 
          popular = ?, category = ?, max_guests = ?, status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      name, slug, duration, price, originalPrice, description,
      JSON.stringify(includes), JSON.stringify(highlights), image,
      popular, category, maxGuests, status, id
    ])

    const updatedPackage = await get('SELECT * FROM packages WHERE id = ?', [id])

    return NextResponse.json(updatedPackage)
  } catch (error) {
    console.error('Error updating package:', error)
    return NextResponse.json(
      { error: 'Failed to update package' },
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
        { error: 'Package ID is required' },
        { status: 400 }
      )
    }

    await run('DELETE FROM packages WHERE id = ?', [id])

    return NextResponse.json({ message: 'Package deleted successfully' })
  } catch (error) {
    console.error('Error deleting package:', error)
    return NextResponse.json(
      { error: 'Failed to delete package' },
      { status: 500 }
    )
  }
}