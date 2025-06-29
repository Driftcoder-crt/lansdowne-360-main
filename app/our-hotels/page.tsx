import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Users, ExternalLink, Star } from "lucide-react"

const BOOKING_URL = "https://live.ipms247.com/booking/book-rooms-a1360degree"

const HOTELS = [
  {
    id: "lansdowne",
    name: "AI Hotel Lansdowne",
    slug: "lansdowne",
    location: "Lansdowne, Uttarakhand",
    description: "Luxury mountain resort with AI-powered hospitality in the heart of Garhwal Himalayas",
    heroImage: "/images/hero-ai-hotel.jpg",
    rooms: 24,
    established: "2024",
    status: "active",
    rating: 4.8,
    price: "₹8,999",
    amenities: ["Mountain View", "AI Concierge", "Spa", "Restaurant", "Adventure Sports", "Nature Walks"],
  },
]

const COMING_SOON_HOTELS = [
  {
    id: "shimla",
    name: "AI Hotel Shimla",
    location: "Shimla, Himachal Pradesh",
    heroImage: "/placeholder.svg?height=300&width=400",
    rooms: 32,
    established: "2025",
    status: "coming-soon",
  },
  {
    id: "manali",
    name: "AI Hotel Manali",
    location: "Manali, Himachal Pradesh",
    heroImage: "/placeholder.svg?height=300&width=400",
    rooms: 28,
    established: "2025",
    status: "coming-soon",
  },
  {
    id: "mussoorie",
    name: "AI Hotel Mussoorie",
    location: "Mussoorie, Uttarakhand",
    heroImage: "/placeholder.svg?height=300&width=400",
    rooms: 36,
    established: "2025",
    status: "coming-soon",
  },
  {
    id: "nainital",
    name: "AI Hotel Nainital",
    location: "Nainital, Uttarakhand",
    heroImage: "/placeholder.svg?height=300&width=400",
    rooms: 30,
    established: "2025",
    status: "coming-soon",
  },
  {
    id: "rishikesh",
    name: "AI Hotel Rishikesh",
    location: "Rishikesh, Uttarakhand",
    heroImage: "/placeholder.svg?height=300&width=400",
    rooms: 40,
    established: "2026",
    status: "coming-soon",
  },
  {
    id: "dharamshala",
    name: "AI Hotel Dharamshala",
    location: "Dharamshala, Himachal Pradesh",
    heroImage: "/placeholder.svg?height=300&width=400",
    rooms: 26,
    established: "2026",
    status: "coming-soon",
  },
  {
    id: "kasauli",
    name: "AI Hotel Kasauli",
    location: "Kasauli, Himachal Pradesh",
    heroImage: "/placeholder.svg?height=300&width=400",
    rooms: 22,
    established: "2026",
    status: "coming-soon",
  },
  {
    id: "almora",
    name: "AI Hotel Almora",
    location: "Almora, Uttarakhand",
    heroImage: "/placeholder.svg?height=300&width=400",
    rooms: 24,
    established: "2026",
    status: "coming-soon",
  },
]

export default function OurHotelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ai-hotel.jpg"
            alt="AI Hotels Portfolio"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Hotels</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Discover our portfolio of tech-enabled luxury properties across India's most beautiful destinations
          </p>
        </div>
      </section>

      {/* Active Hotels */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Now Open</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {HOTELS.map((hotel) => (
              <div
                key={hotel.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={hotel.heroImage || "/placeholder.svg"}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Now Open
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-sm font-semibold ml-1">{hotel.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-neutral-900">{hotel.name}</h3>
                    <span className="text-lg font-bold text-amber-600">{hotel.price}/night</span>
                  </div>

                  <div className="flex items-center text-neutral-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>

                  <p className="text-neutral-700 mb-4 text-sm leading-relaxed">{hotel.description}</p>

                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">
                          +{hotel.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-neutral-600 mb-6">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{hotel.rooms} Rooms</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Est. {hotel.established}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/${hotel.slug}`}
                      className="flex-1 bg-neutral-900 text-white text-center py-3 px-4 rounded-lg hover:bg-neutral-800 transition-colors duration-200 text-sm font-medium"
                    >
                      Explore Hotel
                    </Link>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-4 rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 text-sm font-medium min-w-[100px]"
                    >
                      Book Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Hotels */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Coming Soon</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
            <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
              Expanding across India's most sought-after destinations in 2025-2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {COMING_SOON_HOTELS.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={hotel.heroImage || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Coming {hotel.established}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-neutral-900 mb-1 text-lg">{hotel.name}</h3>
                  <div className="flex items-center text-neutral-600 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="text-xs">{hotel.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-600">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{hotel.rooms} Rooms</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{hotel.established}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Ready to Experience AI Hospitality?</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Book your stay at our flagship Lansdowne property and discover the future of luxury hospitality
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Now
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  )
}
