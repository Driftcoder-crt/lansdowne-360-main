import { NextResponse } from 'next/server'
import { createBooking } from '@/lib/booking-engine'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action = 'create', bookingPayload } = body

    if (action !== 'create') {
      return NextResponse.json({ error: 'Unsupported action' }, { status: 400 })
    }

    const result = await createBooking(bookingPayload)
    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    console.error('Sync booking error', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}