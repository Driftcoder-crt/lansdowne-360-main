"use client"

import { HeadingXL, BodyLG } from "@/components/ui/typography"
import { FeatureCard } from "@/components/ui/cards"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useVisibilityRefresh } from "@/lib/hooks/useDataRefresh"

interface Amenity {
  id: number
  name: string
  description: string
  icon: string
  category: string
}

export const AmenitiesSection = () => {
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAmenities = async () => {
    try {
      console.log('Fetching amenities from API...')
      const response = await fetch('/api/frontend/amenities')
      if (!response.ok) {
        throw new Error('Failed to fetch amenities')
      }
      const data = await response.json()
      console.log('Amenities fetched:', data)
      setAmenities(data)
    } catch (err) {
      console.error('Error fetching amenities:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      // Fallback to static data
      setAmenities([
        {
          id: 1,
          name: "Multi-Cuisine Restaurant",
          description: "Fine dining with local and international cuisines",
          icon: "UtensilsCrossed",
          category: "dining",
        },
        {
          id: 2,
          name: "Spa & Wellness Center",
          description: "Rejuvenating treatments and wellness therapies",
          icon: "Sparkles",
          category: "wellness",
        },
        {
          id: 3,
          name: "Adventure Activities",
          description: "Trekking, rock climbing, and outdoor adventures",
          icon: "Mountain",
          category: "activities",
        },
        {
          id: 4,
          name: "Nature Walks",
          description: "Guided walks through pristine mountain trails",
          icon: "TreePine",
          category: "activities",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Use visibility refresh hook for real-time updates
  const { manualRefresh } = useVisibilityRefresh(fetchAmenities, 30000)

  useEffect(() => {
    fetchAmenities()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading amenities...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge variant="default" className="mb-4 bg-amber-100 text-amber-800">
          World-Class Facilities
        </Badge>
        <HeadingXL className="mb-4">Luxury Amenities</HeadingXL>
        <BodyLG className="max-w-2xl mx-auto">
          Indulge in our comprehensive collection of premium facilities and services
        </BodyLG>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {amenities.map((amenity) => (
          <FeatureCard 
            key={amenity.id} 
            feature={{
              id: amenity.id.toString(),
              title: amenity.name,
              description: amenity.description,
              icon: amenity.icon
            }} 
          />
        ))}
      </div>
    </div>
  </section>
  )
}
