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
      // For now, using static data. In real implementation, this would be an API call
      const packagesData: Package[] = [
        {
          id: "honeymoon-special",
          name: "Honeymoon Special",
          duration: "3 days / 2 nights",
          price: 25999,
          originalPrice: 29999,
          description: "A romantic getaway designed for newlyweds with luxury amenities and intimate experiences",
          includes: [
            "Presidential Suite accommodation",
            "Candlelight dinner for two",
            "Couples spa session",
            "Room decoration with flowers",
            "Champagne on arrival",
            "Late checkout"
          ],
          highlights: [
            "Private balcony with mountain views",
            "Personalized butler service",
            "Photography session",
            "Special honeymoon cake"
          ],
          image: "/images/presidential-suite.jpg",
          popular: true,
          category: "romance",
          maxGuests: 2
        },
        {
          id: "weekend-getaway",
          name: "Weekend Getaway",
          duration: "2 days / 1 night",
          price: 18999,
          description: "Perfect weekend escape from city life with adventure and relaxation",
          includes: [
            "Deluxe Room accommodation",
            "All meals included",
            "Adventure activities",
            "Bonfire evening",
            "Nature walk guided tour"
          ],
          highlights: [
            "Trekking expedition",
            "Local cuisine tasting",
            "Sunrise point visit",
            "Cultural performance"
          ],
          image: "/images/deluxe-room.jpg",
          category: "adventure",
          maxGuests: 4
        },
        {
          id: "family-vacation",
          name: "Family Vacation Package",
          duration: "4 days / 3 nights",
          price: 45999,
          description: "Comprehensive family package with activities for all age groups",
          includes: [
            "Two connecting deluxe rooms",
            "All meals and snacks",
            "Kids activity program",
            "Family game sessions",
            "Outdoor adventure activities"
          ],
          highlights: [
            "Kids club activities",
            "Family photography",
            "Outdoor games",
            "Movie night"
          ],
          image: "/images/luxury-suite.jpg",
          category: "family",
          maxGuests: 6
        },
        {
          id: "wellness-retreat",
          name: "Wellness & Spa Retreat",
          duration: "5 days / 4 nights",
          price: 52999,
          description: "Rejuvenate your mind, body, and soul with our comprehensive wellness program",
          includes: [
            "Super Deluxe Room",
            "Daily spa treatments",
            "Yoga and meditation sessions",
            "Healthy organic meals",
            "Wellness consultation"
          ],
          highlights: [
            "Personalized spa treatments",
            "Meditation by the river",
            "Detox meal plans",
            "Wellness certificate"
          ],
          image: "/images/spa.jpg",
          popular: true,
          category: "wellness",
          maxGuests: 2
        },
        {
          id: "adventure-special",
          name: "Adventure Special",
          duration: "3 days / 2 nights",
          price: 22999,
          description: "Adrenaline-pumping adventure package for thrill seekers",
          includes: [
            "Standard room accommodation",
            "Adventure gear provided",
            "Professional guides",
            "All meals",
            "Adventure certificate"
          ],
          highlights: [
            "Rock climbing",
            "River rafting",
            "Trekking expedition",
            "Zip-lining"
          ],
          image: "/images/hero-ai-hotel.jpg",
          category: "adventure",
          maxGuests: 4
        },
        {
          id: "corporate-retreat",
          name: "Corporate Retreat",
          duration: "2 days / 1 night",
          price: 35999,
          description: "Perfect for team building and corporate events with business facilities",
          includes: [
            "Conference hall access",
            "Audio-visual equipment",
            "Business center facilities",
            "Team building activities",
            "Corporate lunch and dinner"
          ],
          highlights: [
            "Professional meeting setup",
            "Team building games",
            "Network dinner",
            "Corporate photography"
          ],
          image: "/images/restaurant.jpg",
          category: "business",
          maxGuests: 20
        }
      ]
      setPackages(packagesData)
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