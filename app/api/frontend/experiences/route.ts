import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const experiences = await query(`
      SELECT * FROM experiences
      WHERE status = 'active'
      ORDER BY created_at DESC
    `)
    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Error fetching frontend experiences:', error)
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}