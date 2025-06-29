import { NextResponse } from 'next/server'
import { query, run } from '@/lib/database'

export async function GET() {
  try {
    const guests = await query(`
      SELECT g.*, 
             COUNT(b.id) as booking_count,
             MAX(b.created_at) as last_booking
      FROM guests g
      LEFT JOIN bookings b ON g.id = b.guest_id
      GROUP BY g.id
      ORDER BY g.created_at DESC
    `)

    return NextResponse.json(guests)
  } catch (error) {
    console.error('Error fetching guests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { first_name, last_name, email, phone, is_vip, loyalty_tier } = data

    const result = await run(`
      INSERT INTO guests (first_name, last_name, email, phone, is_vip, loyalty_tier)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [first_name, last_name, email, phone, is_vip || false, loyalty_tier || 'Bronze'])

    return NextResponse.json({ 
      id: result.lastID,
      message: 'Guest created successfully' 
    })
  } catch (error) {
    console.error('Error creating guest:', error)
    return NextResponse.json(
      { error: 'Failed to create guest' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, first_name, last_name, email, phone, is_vip, loyalty_tier, loyalty_points } = data

    await run(`
      UPDATE guests 
      SET first_name = ?, last_name = ?, email = ?, phone = ?, is_vip = ?, 
          loyalty_tier = ?, loyalty_points = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [first_name, last_name, email, phone, is_vip, loyalty_tier, loyalty_points, id])

    return NextResponse.json({ message: 'Guest updated successfully' })
  } catch (error) {
    console.error('Error updating guest:', error)
    return NextResponse.json(
      { error: 'Failed to update guest' },
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
        { error: 'Guest ID is required' },
        { status: 400 }
      )
    }

    await run('DELETE FROM guests WHERE id = ?', [id])

    return NextResponse.json({ message: 'Guest deleted successfully' })
  } catch (error) {
    console.error('Error deleting guest:', error)
    return NextResponse.json(
      { error: 'Failed to delete guest' },
      { status: 500 }
    )
  }
}