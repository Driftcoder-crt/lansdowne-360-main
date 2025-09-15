import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MapPin, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/buttons"
import { BOOKING_URL } from "@/lib/constants"

interface Hotel {
  id: number
  name: string
  slug: string
  location: string
  description: string
  status: 'active' | 'coming-soon'
  heroImage: string
  room_count: number
  established: number
  current_bookings: number
  monthly_revenue: number
}

export const HotelsOverview = () => {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/api/frontend/hotels')
        if (response.ok) {
          const data = await response.json()
          setHotels(data)
        } else {
          // Fallback to constants if API fails
          const { HOTELS } = await import('@/lib/constants')
          setHotels(HOTELS.map(h => ({
            ...h,
            room_count: h.rooms,
            current_bookings: 0,
            monthly_revenue: 0
          })))
        }
      } catch (error) {
        console.error('Error fetching hotels:', error)
        // Fallback to constants if API fails
        const { HOTELS } = await import('@/lib/constants')
        setHotels(HOTELS.map(h => ({
          ...h,
          room_count: h.rooms,
          current_bookings: 0,
          monthly_revenue: 0
        })))
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-neutral-200 rounded w-96 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-64 bg-neutral-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-neutral-200 rounded mb-3 animate-pulse"></div>
                    <div className="h-4 bg-neutral-200 rounded mb-6 animate-pulse"></div>
                    <div className="flex gap-3">
                      <div className="h-10 bg-neutral-200 rounded flex-1 animate-pulse"></div>
                      <div className="h-10 bg-neutral-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-amber-100 text-amber-800">Our Properties</Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Discover Our Hotels</h2>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          From the serene hills of Lansdowne to the royal heritage of Udaipur, each AI Hotel offers a unique blend of
          luxury, technology, and natural beauty
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={hotel.heroImage || "/placeholder.svg?height=256&width=400"}
                alt={hotel.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className={hotel.status === "active" ? "bg-green-600 text-white" : "bg-amber-600 text-white"}>
                  {hotel.status === "active" ? (
                    <>
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      Live Now
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3 h-3 mr-1" />
                      Coming Soon
                    </>
                  )}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-neutral-900">{hotel.name}</h3>
                <div className="flex items-center text-neutral-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hotel.location ? hotel.location.split(",")[0] : "India"}
                </div>
              </div>

              <p className="text-neutral-600 mb-6 line-clamp-2">{hotel.description}</p>

              <div className="flex gap-3">
                <Link href={`/${hotel.slug}`} className="flex-1">
                  <ButtonSecondary className="w-full">Explore Hotel</ButtonSecondary>
                </Link>

                {hotel.status === "active" && (
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <ButtonPrimary className="flex items-center">
                      Book
                      <ExternalLink className="ml-1 w-4 h-4" />
                    </ButtonPrimary>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/our-hotels">
          <ButtonPrimary size="lg">View All Properties</ButtonPrimary>
        </Link>
      </div>
    </div>
  </section>
  )
}
