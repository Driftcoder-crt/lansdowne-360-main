import { NextResponse } from 'next/server'
import { run } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, phone, message } = await request.json()

    if (!first_name && !last_name && !email && !phone && !message) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 })
    }

    await run(
      `INSERT INTO contact_messages (first_name, last_name, email, phone, message)
       VALUES (?,?,?,?,?)`,
      [first_name, last_name, email, phone, message]
    )

    return NextResponse.json({ message: 'Message received, thank you!' }, { status: 201 })
  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}