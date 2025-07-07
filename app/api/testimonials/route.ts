import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For now, return the testimonials data
    // In a full implementation, this would query a testimonials table
    const testimonials = [
      {
        id: 1,
        name: "Priya Sharma",
        location: "Delhi",
        rating: 5,
        comment: "Absolutely stunning location with exceptional service. The mountain views from our room were breathtaking!",
        date: "December 2024",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: 2,
        name: "Rajesh Kumar",
        location: "Mumbai",
        rating: 5,
        comment: "Perfect getaway from city life. The staff was incredibly helpful and the amenities exceeded our expectations.",
        date: "November 2024",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: 3,
        name: "Anita Gupta",
        location: "Bangalore",
        rating: 5,
        comment: "A truly luxurious experience in the heart of nature. Will definitely return for our next vacation!",
        date: "October 2024",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: 4,
        name: "Vikram Singh",
        location: "Pune",
        rating: 5,
        comment: "The AI-powered services were amazing! Room controls, concierge, everything was seamlessly integrated.",
        date: "September 2024",
        avatar: "/placeholder-user.jpg"
      },
      {
        id: 5,
        name: "Kavya Menon",
        location: "Chennai",
        rating: 5,
        comment: "Family-friendly environment with activities for everyone. The kids loved the nature walks!",
        date: "August 2024",
        avatar: "/placeholder-user.jpg"
      }
    ]

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, location, rating, comment, guestId } = body

    // In a real implementation, you would save to database
    // For now, just return success
    return NextResponse.json({ 
      message: 'Testimonial submitted successfully',
      id: Date.now() // Temporary ID
    })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}