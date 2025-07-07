import { NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
declare const process: { env: Record<string, string | undefined> }

export async function POST(req: Request) {
  try {
    const { amount, currency = 'usd', metadata } = await req.json()
    if (!amount) {
      return NextResponse.json({ error: 'amount required' }, { status: 400 })
    }

    const stripeSecret = process.env.STRIPE_SECRET_KEY
    if (!stripeSecret) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const res = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        amount: String(amount),
        currency,
        ...(metadata ? { metadata: JSON.stringify(metadata) } : {})
      })
    })

    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || 'Stripe error' }, { status: 500 })
    }

    return NextResponse.json({ clientSecret: data.client_secret })
  } catch (e: any) {
    console.error('Payment intent error', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}