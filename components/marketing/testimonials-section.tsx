"use client"
import { HeadingXL, BodyLG } from "@/components/ui/typography"
import { TestimonialCard } from "@/components/ui/cards"
import { Badge } from "@/components/ui/badge"

import { useEffect, useState } from "react"
import { useVisibilityRefresh } from "@/lib/hooks/useDataRefresh"

interface Testimonial {
  id: number
  name: string
  location?: string
  rating: number
  comment: string
  date?: string
  title?: string
  content?: string
  avatar?: string
}

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTestimonials = async () => {
    try {
      console.log('Fetching testimonials from API...')
      const response = await fetch('/api/frontend/testimonials')
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials')
      }
      const data = await response.json()
      console.log('Testimonials fetched:', data)
      setTestimonials(data)
    } catch (err) {
      console.error('Error fetching testimonials:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      // Fallback to static data
      setTestimonials([
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
      ])
    } finally {
      setLoading(false)
    }
  }

  // Use visibility refresh hook for real-time updates
  const { manualRefresh } = useVisibilityRefresh(fetchTestimonials, 30000)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading testimonials...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
  <section className="py-20 bg-neutral-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge variant="default" className="mb-4 bg-amber-100 text-amber-800">
          Guest Experiences
        </Badge>
        <HeadingXL className="mb-4">What Our Guests Say</HeadingXL>
        <BodyLG className="max-w-2xl mx-auto">
          Discover why discerning travelers choose Élite Palace for their luxury stays
        </BodyLG>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => {
          // Transform data to match TestimonialCard expected format
          const transformedTestimonial = {
            id: testimonial.id.toString(),
            name: testimonial.name,
            title: testimonial.location || 'Guest',
            content: testimonial.comment,
            rating: testimonial.rating,
            avatar: testimonial.avatar || "/placeholder.svg?height=48&width=48",
          }
          return (
            <TestimonialCard key={testimonial.id} testimonial={transformedTestimonial} />
          )
        })}
      </div>
    </div>
  </section>
  )
}
