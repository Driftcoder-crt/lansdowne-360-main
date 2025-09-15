"use client"

import { HeadingXL, BodyLG } from "@/components/ui/typography"
import { RoomCard } from "@/components/ui/cards"
import { Badge } from "@/components/ui/badge"
import type { Room } from "@/lib/types"
import { useEffect, useState } from "react"
import { useVisibilityRefresh } from "@/lib/hooks/useDataRefresh"

interface ApiRoom {
  id: number
  name: string
  description: string
  size?: string
  occupancy?: string
  price: number
  image?: string
  amenities?: string[]
  hotel_name?: string
  hotel_location?: string
}

export const RoomsSection = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRooms = async () => {
    try {
      console.log('Fetching rooms from API...')
      const response = await fetch('/api/frontend/rooms')
      if (!response.ok) {
        throw new Error('Failed to fetch rooms')
      }
      const data: ApiRoom[] = await response.json()
      console.log('Rooms fetched:', data)
      
      // Transform API data to match Room interface
      const transformedRooms: Room[] = data.map(room => ({
        id: room.id?.toString() || Math.random().toString(),
        hotelId: '1', // Default hotel ID
        name: room.name,
        slug: room.name.toLowerCase().replace(/\s+/g, '-'),
        type: 'room',
        category: 'deluxe' as const,
        price: room.price,
        originalPrice: undefined,
        size: room.size || 350,
        maxGuests: room.max_guests || 2,
        bedType: 'King Size',
        bathrooms: 1,
        floor: undefined,
        description: room.description,
        shortDescription: room.description.substring(0, 100) + '...',
        heroImage: room.hero_image || '/images/deluxe-room.jpg',
        images: room.images ? JSON.parse(room.images) : [room.hero_image || '/images/deluxe-room.jpg'],
        amenities: (room.amenities ? JSON.parse(room.amenities) : ['Free WiFi', 'Air Conditioning', 'Room Service']).map((amenity: any) => ({
          name: typeof amenity === 'string' ? amenity : amenity.name || amenity,
          icon: 'check',
          category: 'comfort' as const
        })),
        features: room.features ? JSON.parse(room.features) : ['Free WiFi', 'Air Conditioning', 'Room Service'],
        views: ['Mountain View'],
        status: 'available' as const,
        popular: room.popular || false,
        rating: room.rating || 4.5,
        reviewCount: room.review_count || 10
      }))
      
      setRooms(transformedRooms)
    } catch (err) {
      console.error('Error fetching rooms:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      // Fallback to static data
      setRooms([
        {
          id: '1',
          hotelId: '1',
          name: "Super Deluxe Room",
          slug: 'super-deluxe-room',
          type: 'room',
          category: 'deluxe',
          price: 8000,
          originalPrice: undefined,
          size: 450,
          maxGuests: 3,
          bedType: 'King Size',
          bathrooms: 1,
          floor: undefined,
          description: "Spacious luxury room with mountain views and premium amenities",
          shortDescription: "Spacious luxury room with mountain views and premium amenities",
          heroImage: "/images/luxury-suite.jpg",
          images: ["/images/luxury-suite.jpg"],
          amenities: [
            { name: "Mountain View", icon: "mountain", category: "comfort" },
            { name: "King Size Bed", icon: "bed", category: "comfort" },
            { name: "Mini Bar", icon: "wine", category: "service" },
            { name: "Balcony", icon: "door", category: "comfort" },
            { name: "Premium Toiletries", icon: "sparkles", category: "bathroom" },
            { name: "Free WiFi", icon: "wifi", category: "technology" }
          ],
          features: ["Mountain View", "King Size Bed", "Mini Bar", "Balcony", "Premium Toiletries", "Free WiFi"],
          views: ["Mountain View"],
          status: "available",
          popular: true,
          rating: 4.8,
          reviewCount: 25
        },
        {
          id: '2',
          hotelId: '1',
          name: "Deluxe Room",
          slug: 'deluxe-room',
          type: 'room',
          category: 'deluxe',
          price: 6000,
          originalPrice: undefined,
          size: 350,
          maxGuests: 2,
          bedType: 'Queen Size',
          bathrooms: 1,
          floor: undefined,
          description: "Comfortable room with modern amenities and garden views",
          shortDescription: "Comfortable room with modern amenities and garden views",
          heroImage: "/images/deluxe-room.jpg",
          images: ["/images/deluxe-room.jpg"],
          amenities: [
            { name: "Garden View", icon: "tree", category: "comfort" },
            { name: "Queen Size Bed", icon: "bed", category: "comfort" },
            { name: "Work Desk", icon: "desk", category: "comfort" },
            { name: "Tea/Coffee Maker", icon: "coffee", category: "service" },
            { name: "Free WiFi", icon: "wifi", category: "technology" },
            { name: "Air Conditioning", icon: "snowflake", category: "comfort" }
          ],
          features: ["Garden View", "Queen Size Bed", "Work Desk", "Tea/Coffee Maker", "Free WiFi", "Air Conditioning"],
          views: ["Garden View"],
          status: "available",
          popular: false,
          rating: 4.5,
          reviewCount: 18
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Use visibility refresh hook for real-time updates
  const { manualRefresh } = useVisibilityRefresh(fetchRooms, 30000)

  useEffect(() => {
    fetchRooms()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading rooms...</div>
          </div>
        </div>
      </section>
    )
  }
  const handleBooking = (room: Room) => {
    console.log("Booking room:", room)
    // Handle booking logic
  }

  const handleViewDetails = (room: Room) => {
    console.log("View details:", room)
    // Handle view details logic
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="default" className="mb-4 bg-amber-100 text-amber-800">
            Accommodations
          </Badge>
          <HeadingXL className="mb-4">Rooms & Suites</HeadingXL>
          <BodyLG className="max-w-2xl mx-auto">
            Each room is a masterpiece of design, comfort, and luxury amenities
          </BodyLG>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onBook={handleBooking} onViewDetails={handleViewDetails} />
          ))}
        </div>
      </div>
    </section>
  )
}
