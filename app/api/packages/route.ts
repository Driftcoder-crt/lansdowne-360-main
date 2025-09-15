import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let sqlQuery = `
      SELECT * FROM packages 
      WHERE status = 'active'
    `
    
    const params = []
    if (category && category !== 'all') {
      sqlQuery += ' AND category = ?'
      params.push(category)
    }
    
    sqlQuery += ' ORDER BY popular DESC, price ASC'
    
    const packages = await query(sqlQuery, params)
    
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