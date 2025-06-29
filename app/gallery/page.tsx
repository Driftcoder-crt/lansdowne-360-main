"use client"

import Image from "next/image"
import { useState } from "react"
import { Camera, MapPin, Calendar, ExternalLink } from "lucide-react"
import { BOOKING_URL } from "@/lib/constants"

const galleryCategories = [
  { id: "all", name: "All Photos", count: 24 },
  { id: "hotel", name: "Hotel Exterior", count: 6 },
  { id: "rooms", name: "Rooms & Suites", count: 8 },
  { id: "dining", name: "Dining", count: 4 },
  { id: "views", name: "Mountain Views", count: 6 },
]

const galleryImages = [
  {
    id: 1,
    src: "/images/hero-ai-hotel.jpg",
    alt: "AI Hotel Lansdowne Exterior",
    category: "hotel",
    title: "Hotel Exterior",
    description: "Beautiful mountain setting",
  },
  {
    id: 2,
    src: "/images/luxury-suite.jpg",
    alt: "Luxury Suite",
    category: "rooms",
    title: "Super Deluxe Suite",
    description: "Spacious luxury accommodation",
  },
  {
    id: 3,
    src: "/images/restaurant.jpg",
    alt: "Rooftop Restaurant",
    category: "dining",
    title: "Rooftop Restaurant",
    description: "Multi-cuisine dining with views",
  },
  {
    id: 4,
    src: "/images/presidential-suite.jpg",
    alt: "Presidential Suite",
    category: "rooms",
    title: "Presidential Suite",
    description: "Ultimate luxury experience",
  },
  {
    id: 5,
    src: "/images/deluxe-room.jpg",
    alt: "Deluxe Room",
    category: "rooms",
    title: "Deluxe Room",
    description: "Comfortable and elegant",
  },
  {
    id: 6,
    src: "/images/spa.jpg",
    alt: "Mountain Views",
    category: "views",
    title: "Himalayan Panorama",
    description: "360° mountain views",
  },
  {
    id: 7,
    src: "/images/pool.jpg",
    alt: "Hotel Facilities",
    category: "hotel",
    title: "Hotel Facilities",
    description: "Modern amenities",
  },
  {
    id: 8,
    src: "/images/hero-ai-hotel.jpg",
    alt: "Sunset Views",
    category: "views",
    title: "Sunset Views",
    description: "Golden hour magic",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)

  const filteredImages =
    activeCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ai-hotel.jpg"
            alt="AI Hotel Gallery"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Explore the beauty and luxury of AI Hotel Lansdowne through our curated photo collection
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Camera className="w-4 h-4 text-neutral-700" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-neutral-600">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-neutral-300 text-2xl font-light"
            >
              ×
            </button>
            <div className="relative h-[80vh] w-full">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-neutral-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">200+</h3>
              <p className="text-neutral-600">Professional Photos</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">360°</h3>
              <p className="text-neutral-600">Mountain Views</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">24/7</h3>
              <p className="text-neutral-600">Scenic Beauty</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Experience It Yourself</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Pictures can only capture so much. Come and experience the breathtaking beauty of AI Hotel Lansdowne in
            person
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Your Stay
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  )
}
