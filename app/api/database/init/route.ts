
import { NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/database'

export async function POST() {
  try {
    await initializeDatabase()
    return NextResponse.json({ 
      message: 'Database initialized successfully',
      details: {
        tables: ['hotels', 'rooms', 'guests', 'bookings', 'admin_users', 'staff', 'service_requests'],
        defaultAdmin: {
          username: 'admin',
          password: 'ai360hotel'
        }
      }
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { error: 'Failed to initialize database', details: error.message },
      { status: 500 }
    )
  }
}
