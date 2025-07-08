import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    const images = await query(`
      SELECT * FROM gallery_images
      WHERE status = 'active'
      ORDER BY created_at DESC
    `)
    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching frontend gallery images:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
  }
}