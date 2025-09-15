import { NextResponse } from 'next/server'
import { query, run, get } from '@/lib/database'

export async function GET() {
  try {
    const activities = await query(`
      SELECT * FROM activities 
      ORDER BY category, name
    `)
    
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

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      name,
      description,
      duration,
      difficulty,
      price,
      image,
      category,
      includes = [],
      status
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Activity ID is required' },
        { status: 400 }
      )
    }

    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined

    await run(`
      UPDATE activities 
      SET name = ?, slug = ?, description = ?, duration = ?, difficulty = ?, 
          price = ?, image = ?, category = ?, includes = ?, status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      name, slug, description, duration, difficulty, price, image, category,
      JSON.stringify(includes), status, id
    ])

    const updatedActivity = await get('SELECT * FROM activities WHERE id = ?', [id])

    return NextResponse.json(updatedActivity)
  } catch (error) {
    console.error('Error updating activity:', error)
    return NextResponse.json(
      { error: 'Failed to update activity' },
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
        { error: 'Activity ID is required' },
        { status: 400 }
      )
    }

    await run('DELETE FROM activities WHERE id = ?', [id])

    return NextResponse.json({ message: 'Activity deleted successfully' })
  } catch (error) {
    console.error('Error deleting activity:', error)
    return NextResponse.json(
      { error: 'Failed to delete activity' },
      { status: 500 }
    )
  }
}