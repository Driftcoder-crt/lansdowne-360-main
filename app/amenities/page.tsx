import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Amenities - AI 360° Hotel",
  description: "Discover our world-class amenities and facilities designed for your comfort and convenience.",
}

export default function AmenitiesPage() {
  const amenities = [
    {
      id: 1,
      name: "Multi-Cuisine Restaurant",
      description: "Fine dining with local and international cuisines prepared by expert chefs",
      category: "Dining",
      icon: "🍽️"
    },
    {
      id: 2,
      name: "Spa & Wellness Center",
      description: "Rejuvenating treatments and wellness therapies in a serene environment",
      category: "Wellness",
      icon: "🧘"
    },
    {
      id: 3,
      name: "Adventure Activities",
      description: "Trekking, rock climbing, and outdoor adventures with professional guides",
      category: "Activities",
      icon: "🏔️"
    },
    {
      id: 4,
      name: "Nature Walks",
      description: "Guided walks through pristine mountain trails and forest paths",
      category: "Activities",
      icon: "🌲"
    },
    {
      id: 5,
      name: "Photography Tours",
      description: "Capture stunning landscapes with expert photography guides",
      category: "Activities",
      icon: "📸"
    },
    {
      id: 6,
      name: "Conference Hall",
      description: "Modern facilities for business meetings, events, and conferences",
      category: "Business",
      icon: "🏢"
    },
    {
      id: 7,
      name: "Free WiFi",
      description: "High-speed internet connectivity throughout the property",
      category: "Connectivity",
      icon: "📶"
    },
    {
      id: 8,
      name: "24/7 Concierge",
      description: "Round-the-clock assistance and local expertise for all your needs",
      category: "Service",
      icon: "🤝"
    },
    {
      id: 9,
      name: "Fitness Center",
      description: "State-of-the-art gym equipment and personal training services",
      category: "Wellness",
      icon: "💪"
    },
    {
      id: 10,
      name: "Swimming Pool",
      description: "Outdoor swimming pool with mountain views and poolside service",
      category: "Recreation",
      icon: "🏊"
    },
    {
      id: 11,
      name: "Library & Reading Room",
      description: "Quiet space with books, magazines, and comfortable seating",
      category: "Recreation",
      icon: "📚"
    },
    {
      id: 12,
      name: "Kids Play Area",
      description: "Safe and fun play area designed specifically for children",
      category: "Family",
      icon: "🎪"
    }
  ]

  const categories = [...new Set(amenities.map(amenity => amenity.category))]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 text-amber-100 border border-amber-400/30 mb-6">
            <span className="mr-2">✨</span>
            World-Class Facilities
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Premium Amenities & Services
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Experience luxury and comfort with our comprehensive range of amenities 
            designed to make your stay memorable and convenient.
          </p>
        </div>
      </section>

      {/* Amenities by Category */}
      {categories.map((category) => (
        <section key={category} className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {category}
              </h2>
              <div className="w-20 h-1 bg-amber-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities
                .filter(amenity => amenity.category === category)
                .map((amenity) => (
                  <div
                    key={amenity.id}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-4">{amenity.icon}</div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {amenity.name}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ))}

      {/* Special Features Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Special Features
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Additional services and features that make AI 360° Hotel unique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                AI-Powered Services
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Smart room controls via voice commands
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  AI concierge for instant assistance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Personalized recommendations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Automated check-in/check-out
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                Eco-Friendly Initiatives
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Solar-powered energy systems
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Rainwater harvesting systems
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Organic waste management
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Locally sourced organic food
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience These Amenities Today
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Book your stay now and enjoy access to all our premium amenities and services.
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-colors"
          >
            Book Your Stay
          </a>
        </div>
      </section>
    </div>
  )
}