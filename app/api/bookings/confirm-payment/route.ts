import { NextResponse } from 'next/server'
import { run } from '@/lib/database'

export async function POST(req: Request) {
  try {
    const { confirmationNumber, paymentId } = await req.json()
    if (!confirmationNumber) {
      return NextResponse.json({ error: 'confirmationNumber required' }, { status: 400 })
    }

    await run(
      `UPDATE bookings SET payment_status = 'paid', status = 'confirmed' WHERE confirmation_number = ?`,
      [confirmationNumber]
    )

    return NextResponse.json({ success: true })
  } catch (e: any) {
    console.error('Confirm payment error', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}