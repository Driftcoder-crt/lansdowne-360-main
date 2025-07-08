import { NextResponse } from 'next/server'
import { query, run } from '@/lib/database'

// GET /api/admin/contact-messages
export async function GET() {
  try {
    const messages = await query(`
      SELECT * FROM contact_messages
      ORDER BY created_at DESC
    `)
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json({ error: 'Failed to fetch contact messages' }, { status: 500 })
  }
}

// DELETE /api/admin/contact-messages?id=123
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 })
    }

    await run('DELETE FROM contact_messages WHERE id = ?', [id])
    return NextResponse.json({ message: 'Contact message deleted successfully' })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return NextResponse.json({ error: 'Failed to delete contact message' }, { status: 500 })
  }
}