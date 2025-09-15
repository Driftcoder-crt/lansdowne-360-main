"use client"

import { useState, useEffect } from "react"
import { HeadingXL, BodyLG } from "@/components/ui/typography"
import { ButtonPrimary } from "@/components/ui/buttons"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/cards"
import { 
  Calendar, 
  Users, 
  Star, 
  Heart, 
  MapPin, 
  Clock,
  Utensils,
  Car,
  Sparkles,
  Camera,
  Mountain
} from "lucide-react"

interface Package {
  id: string
  name: string
  duration: string
  price: number
  originalPrice?: number
  description: string
  includes: string[]
  highlights: string[]
  image: string
  popular?: boolean
  category: string
  maxGuests: number
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // Fetch packages data
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages')
        if (response.ok) {
          const data = await response.json()
          setPackages(data.map((pkg: any) => ({
            id: pkg.id.toString(),
            name: pkg.name,
            duration: pkg.duration,
            price: pkg.price,
            originalPrice: pkg.original_price,
            description: pkg.description,
            includes: pkg.includes,
            highlights: pkg.highlights,
            image: pkg.image,
            popular: pkg.popular,
            category: pkg.category,
            maxGuests: pkg.max_guests
          })))
        }
      } catch (error) {
        console.error('Error fetching packages:', error)
        // Fallback to empty array or static data
        setPackages([])
      }
    }

    fetchPackages()
  }, [])

  const categories = [
    { id: "all", name: "All Packages" },
    { id: "romance", name: "Romance" },
    { id: "family", name: "Family" },
    { id: "adventure", name: "Adventure" },
    { id: "wellness", name: "Wellness" },
    { id: "business", name: "Business" }
  ]

  const filteredPackages = selectedCategory === "all" 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-amber-500/20 text-amber-100 border-amber-400/30">
            <Sparkles className="w-4 h-4 mr-1" />
            Special Packages
          </Badge>
          <HeadingXL className="text-white mb-6">
            Curated Experience Packages
          </HeadingXL>
          <BodyLG className="text-amber-100 max-w-2xl mx-auto">
            Discover our specially crafted packages designed to create unforgettable memories 
            for every type of traveler and occasion.
          </BodyLG>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {pkg.popular && (
                      <Badge className="bg-red-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    <Badge className="bg-amber-600 text-white capitalize">
                      {pkg.category}
                    </Badge>
                  </div>
                  {pkg.originalPrice && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">
                        Save ₹{pkg.originalPrice - pkg.price}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-neutral-900">{pkg.name}</h3>
                    <div className="flex items-center text-neutral-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">Up to {pkg.maxGuests}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-neutral-600 mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{pkg.duration}</span>
                  </div>

                  <p className="text-neutral-600 mb-4 line-clamp-2">{pkg.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-neutral-900 mb-2">Package Includes:</h4>
                    <ul className="space-y-1">
                      {pkg.includes.slice(0, 3).map((item, index) => (
                        <li key={index} className="text-sm text-neutral-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></div>
                          {item}
                        </li>
                      ))}
                      {pkg.includes.length > 3 && (
                        <li className="text-sm text-amber-600 font-medium">
                          +{pkg.includes.length - 3} more inclusions
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {pkg.originalPrice && (
                        <span className="text-sm text-neutral-500 line-through mr-2">
                          ₹{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-amber-600">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    </div>
                    <ButtonPrimary size="sm">
                      Book Package
                    </ButtonPrimary>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <HeadingXL className="mb-6">Can't Find the Perfect Package?</HeadingXL>
          <BodyLG className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Our team can create a customized package tailored to your specific needs and preferences.
          </BodyLG>
          <ButtonPrimary size="lg">
            Create Custom Package
          </ButtonPrimary>
        </div>
      </section>
    </div>
  )
}