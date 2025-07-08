import Image from "next/image"
import { Clock, MapPin, Phone, Star, Utensils, Wine } from "lucide-react"
import { headers } from "next/headers"

export interface Restaurant {
  id: number
  name: string
  description: string
  image?: string
  cuisine?: string
  timing?: string
  location?: string
  specialties?: string[]
  features?: string[]
}

async function getRestaurants(): Promise<Restaurant[]> {
  const host = headers().get("x-forwarded-host") || headers().get("host")
  const protocol = host?.includes("localhost") ? "http" : "https"
  const res = await fetch(`${protocol}://${host}/api/frontend/dining`, {
    cache: "no-store",
  })
  if (!res.ok) return []
  return res.json()
}

const menuHighlights = [
  {
    category: "Signature Dishes",
    items: [
      { name: "Garhwali Thali", description: "Traditional mountain cuisine with local ingredients", price: "₹450" },
      { name: "Himalayan Trout Curry", description: "Fresh river trout in aromatic spices", price: "₹650" },
      { name: "Pahadi Chicken", description: "Local-style chicken with mountain herbs", price: "₹550" },
      { name: "Mandua Roti", description: "Traditional finger millet bread", price: "₹120" },
    ],
  },
  {
    category: "Chinese Favorites",
    items: [
      { name: "Szechuan Chicken", description: "Spicy chicken with authentic Szechuan flavors", price: "₹480" },
      { name: "Vegetable Manchurian", description: "Crispy vegetables in tangy sauce", price: "₹380" },
      { name: "Hakka Noodles", description: "Stir-fried noodles with fresh vegetables", price: "₹320" },
      { name: "Sweet & Sour Fish", description: "Fresh fish in sweet and sour sauce", price: "₹520" },
    ],
  },
  {
    category: "Beverages",
    items: [
      { name: "Himalayan Tea", description: "Premium mountain tea blend", price: "₹150" },
      { name: "Fresh Lime Soda", description: "Refreshing lime with mountain water", price: "₹120" },
      { name: "Masala Chai", description: "Traditional spiced tea", price: "₹80" },
      { name: "Fresh Fruit Juice", description: "Seasonal fresh fruit juices", price: "₹180" },
    ],
  },
]

const diningFeatures = [
  {
    icon: Utensils,
    title: "Multi-Cuisine Options",
    description: "Authentic Indian, Chinese, and Continental dishes prepared by expert chefs",
  },
  {
    icon: Wine,
    title: "Premium Beverages",
    description: "Curated selection of teas, coffees, fresh juices, and soft drinks",
  },
  {
    icon: Star,
    title: "Fresh Local Ingredients",
    description: "Organic vegetables, fresh dairy, and locally sourced mountain produce",
  },
  {
    icon: MapPin,
    title: "Scenic Dining",
    description: "Every meal comes with breathtaking views of the Himalayan landscape",
  },
]

export default async function DiningPage() {
  const restaurants = await getRestaurants()

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/restaurant.jpg"
            alt="Dining at AI 360° Hotel"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Dining Experience</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Savor exquisite cuisine with panoramic Himalayan views at every meal
          </p>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Restaurants</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
          </div>

          <div className="space-y-16">
            {restaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">{restaurant.name}</h3>
                    <p className="text-lg text-neutral-600 leading-relaxed">{restaurant.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-neutral-600">
                      <Utensils className="w-4 h-4 mr-2 text-amber-600" />
                      <span>{restaurant.cuisine}</span>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <Clock className="w-4 h-4 mr-2 text-amber-600" />
                      <span>{restaurant.timing}</span>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                      <span>{restaurant.location}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">Specialties</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {restaurant.specialties?.map((specialty, idx) => (
                        <div key={idx} className="flex items-center text-sm text-neutral-600">
                          <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {restaurant.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-neutral-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Menu Highlights</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
            <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
              Discover our carefully curated selection of local and international dishes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {menuHighlights.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-6 text-center">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="border-b border-neutral-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-neutral-900">{item.name}</h4>
                        <span className="text-amber-600 font-bold">{item.price}</span>
                      </div>
                      <p className="text-sm text-neutral-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Why Dine With Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diningFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Reservations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Make a Reservation</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Reserve your table for an unforgettable dining experience with mountain views
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917820033697"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call for Reservations
            </a>
            <a
              href="https://wa.me/917820033697?text=Hi, I would like to make a dining reservation at AI 360° Hotel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-amber-600 text-amber-600 font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-200"
            >
              WhatsApp Us
            </a>
          </div>
          <div className="mt-6 text-neutral-600">
            <p className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              +91 78200 33697
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
