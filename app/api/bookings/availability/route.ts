import { NextResponse } from 'next/server'
import { checkAvailability } from '@/lib/booking-engine'

export async function POST(req: Request) {
  try {
    const { startDate, endDate, roomTypeId } = await req.json()
    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'startDate and endDate required' }, { status: 400 })
    }
    const data = await checkAvailability(startDate, endDate, roomTypeId)
    return NextResponse.json({ data })
  } catch (e: any) {
    console.error('Availability error', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}