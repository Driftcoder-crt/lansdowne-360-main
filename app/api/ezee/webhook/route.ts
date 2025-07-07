import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { run } from '@/lib/database'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
declare const process: { env: Record<string, string | undefined> }

// Helper to verify signature header 'x-ezee-signature'
function verifySignature(secret: string, payload: string, signature: string) {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const digest = hmac.digest('hex')
  return digest === signature
}

export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-ezee-signature') || ''

  // Get secret from env or DB system settings (simplified)
  const secret = process.env.EZEE_WEBHOOK_SECRET || 'secret'

  if (!verifySignature(secret, rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody)

  // Persist webhook log
  await run(
    `INSERT INTO system_settings (category, key, value) VALUES ('ezee_webhook', ?, ?) ON CONFLICT(category, key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`,
    [event.eventType || 'unknown', rawBody]
  )

  return NextResponse.json({ received: true })
}