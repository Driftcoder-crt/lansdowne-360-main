import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let sqlQuery = `
      SELECT * FROM activities 
      WHERE status = 'active'
    `
    
    const params = []
    if (category && category !== 'all') {
      sqlQuery += ' AND category = ?'
      params.push(category)
    }
    
    sqlQuery += ' ORDER BY category, name'
    
    const activities = await query(sqlQuery, params)
    
    // Parse JSON fields
    const processedActivities = activities.map((activity: any) => ({
      ...activity,
      includes: activity.includes ? JSON.parse(activity.includes) : [],
      price: parseFloat(activity.price)
    }))

    return NextResponse.json(processedActivities)
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      duration,
      difficulty,
      price,
      image,
      category,
      includes = []
    } = body

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      )
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const result = await run(`
      INSERT INTO activities (
        name, slug, description, duration, difficulty, price, image, category, includes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, slug, description, duration, difficulty, price, image, category,
      JSON.stringify(includes)
    ])

    const newActivity = await get('SELECT * FROM activities WHERE id = ?', [result.lastID])

    return NextResponse.json(newActivity, { status: 201 })
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    )
  }
}