
import { NextRequest, NextResponse } from 'next/server'

// Simulated database
let reservations = [
  {
    id: "RES001",
    guestName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    roomType: "Super Deluxe Valley View",
    checkIn: "2024-06-25",
    checkOut: "2024-06-28",
    guests: 2,
    amount: "₹13,500",
    status: "confirmed",
    bookingDate: "2024-06-20",
  },
  {
    id: "RES002",
    guestName: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    roomType: "Deluxe Room",
    checkIn: "2024-06-26",
    checkOut: "2024-06-29",
    guests: 3,
    amount: "₹10,500",
    status: "pending",
    bookingDate: "2024-06-21",
  },
]

export async function GET() {
  return NextResponse.json(reservations)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newReservation = {
    id: `RES${String(reservations.length + 1).padStart(3, '0')}`,
    ...body,
    bookingDate: new Date().toISOString().split('T')[0],
  }
  reservations.push(newReservation)
  return NextResponse.json(newReservation)
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const reservationIndex = reservations.findIndex(res => res.id === body.id)
  if (reservationIndex !== -1) {
    reservations[reservationIndex] = { ...reservations[reservationIndex], ...body }
    return NextResponse.json(reservations[reservationIndex])
  }
  return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const reservationId = searchParams.get('id')
  reservations = reservations.filter(res => res.id !== reservationId)
  return NextResponse.json({ success: true })
}
import { NextResponse } from 'next/server'
import { query, run } from '@/lib/database'

export async function GET() {
  try {
    const reservations = await query(`
      SELECT 
        b.*,
        g.first_name || ' ' || g.last_name as guest_name,
        g.email as guest_email,
        g.phone as guest_phone,
        h.name as hotel_name,
        h.location as hotel_location,
        r.number as room_number,
        r.name as room_name,
        r.type as room_type
      FROM bookings b
      LEFT JOIN guests g ON b.guest_id = g.id
      LEFT JOIN hotels h ON b.hotel_id = h.id
      LEFT JOIN rooms r ON b.room_id = r.id
      ORDER BY b.created_at DESC
    `)
    
    return NextResponse.json(reservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { 
      guest_id, hotel_id, room_id, check_in, check_out, guests_count, 
      subtotal, service_fee, taxes, total, payment_method, special_requests 
    } = data
    
    // Calculate nights
    const checkInDate = new Date(check_in)
    const checkOutDate = new Date(check_out)
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    
    // Generate confirmation number
    const confirmation_number = 'AI' + Date.now().toString().slice(-8)
    
    const result = await run(`
      INSERT INTO bookings (
        confirmation_number, guest_id, hotel_id, room_id, check_in, check_out, 
        guests_count, nights, subtotal, service_fee, taxes, total, 
        payment_method, special_requests
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      confirmation_number, guest_id, hotel_id, room_id, check_in, check_out,
      guests_count, nights, subtotal, service_fee || 0, taxes || 0, total,
      payment_method, special_requests
    ])
    
    return NextResponse.json({ 
      id: result.lastID,
      confirmation_number,
      message: 'Reservation created successfully' 
    })
  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { 
      id, check_in, check_out, guests_count, status, payment_status, 
      special_requests 
    } = data
    
    // Calculate nights if dates changed
    let updateFields = []
    let updateValues = []
    
    if (check_in && check_out) {
      const checkInDate = new Date(check_in)
      const checkOutDate = new Date(check_out)
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
      
      updateFields.push('check_in = ?', 'check_out = ?', 'nights = ?')
      updateValues.push(check_in, check_out, nights)
    }
    
    if (guests_count !== undefined) {
      updateFields.push('guests_count = ?')
      updateValues.push(guests_count)
    }
    
    if (status) {
      updateFields.push('status = ?')
      updateValues.push(status)
    }
    
    if (payment_status) {
      updateFields.push('payment_status = ?')
      updateValues.push(payment_status)
    }
    
    if (special_requests !== undefined) {
      updateFields.push('special_requests = ?')
      updateValues.push(special_requests)
    }
    
    updateFields.push('updated_at = CURRENT_TIMESTAMP')
    updateValues.push(id)
    
    await run(`
      UPDATE bookings 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `, updateValues)
    
    return NextResponse.json({ message: 'Reservation updated successfully' })
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to update reservation' },
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
        { error: 'Reservation ID is required' },
        { status: 400 }
      )
    }
    
    await run('DELETE FROM bookings WHERE id = ?', [id])
    
    return NextResponse.json({ message: 'Reservation deleted successfully' })
  } catch (error) {
    console.error('Error deleting reservation:', error)
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    )
  }
}
