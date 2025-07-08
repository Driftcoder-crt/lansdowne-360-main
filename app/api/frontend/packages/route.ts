import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const packages = await query(`
      SELECT * FROM packages
      WHERE status = 'active'
      ORDER BY created_at DESC
    `)
    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching frontend packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}