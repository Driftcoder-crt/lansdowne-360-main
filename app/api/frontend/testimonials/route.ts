import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // First check if testimonials table exists, if not return static data
    const tableExists = await query(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='testimonials'
    `)
    
    if (tableExists.length === 0) {
      // Return static testimonials data if table doesn't exist
      const staticTestimonials = [
        {
          id: 1,
          name: "Priya Sharma",
          location: "Delhi",
          rating: 5,
          comment: "Absolutely stunning location with exceptional service. The mountain views from our room were breathtaking!",
          date: "December 2024",
        },
        {
          id: 2,
          name: "Rajesh Kumar",
          location: "Mumbai",
          rating: 5,
          comment: "Perfect getaway from city life. The staff was incredibly helpful and the amenities exceeded our expectations.",
          date: "November 2024",
        },
        {
          id: 3,
          name: "Anita Gupta",
          location: "Bangalore",
          rating: 5,
          comment: "A truly luxurious experience in the heart of nature. Will definitely return for our next vacation!",
          date: "October 2024",
        },
      ]
      return NextResponse.json(staticTestimonials)
    }
    
    const testimonials = await query(`
      SELECT * FROM testimonials 
      WHERE status = 'active'
      ORDER BY created_at DESC
      LIMIT 10
    `)
    
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching frontend testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}