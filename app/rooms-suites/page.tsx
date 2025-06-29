import Image from "next/image"
import { Wifi, Lock, Refrigerator, Shield, Tv, Coffee, Bath, Bed, Users, ExternalLink } from "lucide-react"
import { BOOKING_URL } from "@/lib/constants"

const roomTypes = [
  {
    id: 1,
    name: "Super Deluxe Valley View",
    description: "Spacious rooms with breathtaking 360° Himalayan views from private balconies",
    image: "/images/luxury-suite.jpg",
    size: "450 sq ft",
    occupancy: "2-3 Guests",
    features: [
      "360° Mountain Views",
      "Private Balcony",
      "Smart Electric Lock",
      "Mini Refrigerator",
      "Electronic Safety Locker",
      "Premium Bathroom",
    ],
    amenities: [
      "High-Speed WiFi",
      "LED TV",
      "Tea/Coffee Maker",
      "Room Service",
      "Daily Housekeeping",
      "Laundry Service",
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Comfortable and well-appointed rooms with modern amenities and partial valley views",
    image: "/images/deluxe-room.jpg",
    size: "350 sq ft",
    occupancy: "2 Guests",
    features: [
      "Partial Valley View",
      "Modern Furnishing",
      "Smart Electric Lock",
      "Mini Refrigerator",
      "Electronic Safety Locker",
      "Attached Bathroom",
    ],
    amenities: [
      "High-Speed WiFi",
      "LED TV",
      "Tea/Coffee Maker",
      "Room Service",
      "Daily Housekeeping",
      "Laundry Service",
    ],
  },
  {
    id: 3,
    name: "Standard Room",
    description: "Cozy and comfortable rooms perfect for budget-conscious travelers without compromising on quality",
    image: "/images/presidential-suite.jpg",
    size: "280 sq ft",
    occupancy: "2 Guests",
    features: [
      "Garden View",
      "Contemporary Design",
      "Smart Electric Lock",
      "Mini Refrigerator",
      "Safety Locker",
      "Modern Bathroom",
    ],
    amenities: ["High-Speed WiFi", "LED TV", "Tea/Coffee Maker", "Room Service", "Housekeeping", "Laundry Service"],
  },
]

const hotelAmenities = [
  { icon: Wifi, name: "High-Speed WiFi", description: "Complimentary internet throughout the property" },
  { icon: Lock, name: "Smart Electric Locks", description: "Keyless entry with smartphone control" },
  { icon: Refrigerator, name: "Mini Refrigerator", description: "In-room refrigerator in every room" },
  { icon: Shield, name: "Electronic Safety Locker", description: "Secure storage for valuables" },
  { icon: Tv, name: "LED Television", description: "Smart TV with premium channels" },
  { icon: Coffee, name: "Tea/Coffee Maker", description: "In-room beverage facilities" },
  { icon: Bath, name: "Premium Bathrooms", description: "Modern bathrooms with premium fixtures" },
  { icon: Bed, name: "Luxury Bedding", description: "Premium mattresses and linens" },
]

export default function RoomsSuitesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ai-hotel.jpg"
            alt="Luxury Rooms & Suites"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Rooms & Suites</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Experience luxury accommodations with cutting-edge technology and breathtaking Himalayan views
          </p>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Choose Your Perfect Stay</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
          </div>

          <div className="space-y-16">
            {roomTypes.map((room, index) => (
              <div
                key={room.id}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={room.image || "/placeholder.svg"}
                      alt={room.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">{room.name}</h3>
                    <p className="text-lg text-neutral-600 leading-relaxed">{room.description}</p>
                  </div>

                  <div className="flex gap-6 text-sm text-neutral-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-2" />
                      <span>{room.size} sq ft</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{room.occupancy}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">Room Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {room.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-neutral-600">
                          <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">Included Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center text-sm text-neutral-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Book This Room
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Amenities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Premium Amenities</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
            <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
              Every room comes equipped with cutting-edge technology and luxury amenities for your comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotelAmenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <amenity.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{amenity.name}</h3>
                <p className="text-sm text-neutral-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Ready to Book Your Stay?</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Experience the perfect blend of luxury, technology, and nature at AI Hotel Lansdowne
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
