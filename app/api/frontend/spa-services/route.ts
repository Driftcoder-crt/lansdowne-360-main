import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const services = await query(`
      SELECT * FROM spa_services
      WHERE status = 'active'
      ORDER BY created_at DESC
    `)
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching frontend spa services:', error)
    return NextResponse.json({ error: 'Failed to fetch spa services' }, { status: 500 })
  }
}