import Image from "next/image"
import { Heart, Users, Calendar, MapPin, Camera, Music, Utensils, ExternalLink } from "lucide-react"
import { BOOKING_URL } from "@/lib/constants"

const eventTypes = [
  {
    id: 1,
    title: "Intimate Weddings",
    description: "Celebrate your special day with breathtaking Himalayan views as your backdrop",
    image: "/images/hero-ai-hotel.jpg",
    icon: Heart,
    capacity: "50-80 Guests",
    features: [
      "360° Mountain Views",
      "Rooftop Ceremony",
      "Professional Photography",
      "Custom Decorations",
      "Multi-Cuisine Catering",
      "Bridal Suite",
    ],
  },
  {
    id: 2,
    title: "Corporate Events",
    description: "Host successful business meetings and conferences in our well-equipped facilities",
    image: "/images/luxury-suite.jpg",
    icon: Users,
    capacity: "20-60 Participants",
    features: [
      "Conference Hall",
      "AV Equipment",
      "High-Speed WiFi",
      "Business Lunch",
      "Team Building Activities",
      "Accommodation Packages",
    ],
  },
  {
    id: 3,
    title: "Social Celebrations",
    description: "Mark special occasions with memorable gatherings in our beautiful mountain setting",
    image: "/images/restaurant.jpg",
    icon: Calendar,
    capacity: "30-100 Guests",
    features: [
      "Flexible Spaces",
      "Custom Menus",
      "Entertainment Options",
      "Decoration Services",
      "Photography",
      "Special Arrangements",
    ],
  },
]

const venues = [
  {
    name: "Rooftop Terrace",
    description: "Open-air venue with panoramic Himalayan views",
    capacity: "80 Guests",
    features: ["360° Views", "Natural Lighting", "Weather Backup", "Sound System"],
  },
  {
    name: "Conference Hall",
    description: "Professional indoor space with modern amenities",
    capacity: "60 Guests",
    features: ["AV Equipment", "Climate Control", "Flexible Seating", "Catering Setup"],
  },
  {
    name: "Garden Area",
    description: "Scenic outdoor space surrounded by nature",
    capacity: "100 Guests",
    features: ["Natural Setting", "Mountain Backdrop", "Flexible Layout", "Evening Lighting"],
  },
]

const services = [
  { icon: Camera, name: "Photography", description: "Professional event photography and videography" },
  { icon: Music, name: "Entertainment", description: "Sound system and entertainment arrangements" },
  { icon: Utensils, name: "Catering", description: "Custom menus and professional catering service" },
  { icon: Heart, name: "Decoration", description: "Beautiful decorations tailored to your theme" },
  { icon: Users, name: "Event Planning", description: "Complete event planning and coordination" },
  { icon: MapPin, name: "Accommodation", description: "Special rates for guests and group bookings" },
]

export default function WeddingsEventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ai-hotel.jpg"
            alt="Weddings & Events"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Weddings & Events</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Create unforgettable memories with the majestic Himalayas as your backdrop
          </p>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Perfect Venues for Every Occasion</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
          </div>

          <div className="space-y-16">
            {eventTypes.map((event, index) => (
              <div
                key={event.id}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <event.icon className="w-6 h-6 text-amber-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">{event.title}</h3>
                    <p className="text-lg text-neutral-600 leading-relaxed">{event.description}</p>
                  </div>

                  <div className="flex items-center text-amber-600 font-semibold">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{event.capacity}</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">What's Included</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {event.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-neutral-600">
                          <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                          {feature}
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
                    Plan Your Event
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Event Venues</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
            <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
              Choose from our versatile venues, each offering unique features and stunning mountain views
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-bold text-neutral-900 mb-2 text-lg">{venue.name}</h3>
                <p className="text-neutral-600 mb-4 text-sm">{venue.description}</p>

                <div className="flex items-center text-amber-600 font-semibold mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{venue.capacity}</span>
                </div>

                <div className="space-y-2">
                  {venue.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-neutral-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Complete Event Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
            <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
              We handle every detail to make your event seamless and memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{service.name}</h3>
                <p className="text-sm text-neutral-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Ready to Plan Your Perfect Event?</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Let us help you create unforgettable memories in the heart of the Himalayas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Event Space
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-amber-600 text-amber-600 font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-200"
            >
              Contact Event Team
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
