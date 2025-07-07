import { NextResponse } from 'next/server'
import { createBooking } from '@/lib/booking-engine'

export async function POST(req: Request) {
  try {
    const bookingPayload = await req.json()
    const result = await createBooking(bookingPayload)
    return NextResponse.json({ success: true, result })
  } catch (e: any) {
    console.error('Booking create error', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}