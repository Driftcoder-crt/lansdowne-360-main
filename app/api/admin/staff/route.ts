import { NextResponse } from 'next/server'
import { query, run } from '@/lib/database'

export async function GET() {
  try {
    const staff = await query(`
      SELECT s.*, h.name as hotel_name, h.location as hotel_location
      FROM staff s
      LEFT JOIN hotels h ON s.hotel_id = h.id
      ORDER BY h.name, s.department, s.name
    `)

    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { hotel_id, name, role, department, email, phone, shift } = data

    const result = await run(`
      INSERT INTO staff (hotel_id, name, role, department, email, phone, shift)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [hotel_id, name, role, department, email, phone, shift || 'morning'])

    return NextResponse.json({ 
      id: result.lastID,
      message: 'Staff member created successfully' 
    })
  } catch (error) {
    console.error('Error creating staff member:', error)
    return NextResponse.json(
      { error: 'Failed to create staff member' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, hotel_id, name, role, department, email, phone, shift, status } = data

    await run(`
      UPDATE staff 
      SET hotel_id = ?, name = ?, role = ?, department = ?, email = ?, phone = ?, 
          shift = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [hotel_id, name, role, department, email, phone, shift, status, id])

    return NextResponse.json({ message: 'Staff member updated successfully' })
  } catch (error) {
    console.error('Error updating staff member:', error)
    return NextResponse.json(
      { error: 'Failed to update staff member' },
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
        { error: 'Staff ID is required' },
        { status: 400 }
      )
    }

    await run('DELETE FROM staff WHERE id = ?', [id])

    return NextResponse.json({ message: 'Staff member deleted successfully' })
  } catch (error) {
    console.error('Error deleting staff member:', error)
    return NextResponse.json(
      { error: 'Failed to delete staff member' },
      { status: 500 }
    )
  }
}