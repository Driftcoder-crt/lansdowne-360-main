import Image from "next/image"
import { Utensils, Waves, TreePine, Camera, Music, Book, Flame, ExternalLink } from "lucide-react"
import { BOOKING_URL } from "@/lib/constants"

const experiences = [
  {
    id: 1,
    title: "Rooftop Multi-Cuisine Restaurant",
    description: "Savor exquisite dishes while enjoying panoramic Himalayan views from our rooftop restaurant",
    image: "/images/restaurant.jpg",
    icon: Utensils,
    features: ["360° Mountain Views", "Multi-Cuisine Menu", "Fresh Local Ingredients", "Romantic Ambiance"],
  },
  {
    id: 2,
    title: "Open Terrace Café",
    description: "Relax with premium coffee and light snacks in our charming open-air terrace setting",
    image: "/images/spa.jpg",
    icon: Waves,
    features: ["Outdoor Seating", "Premium Coffee", "Light Snacks", "Mountain Breeze"],
  },
  {
    id: 3,
    title: "Nature Walks & Hiking",
    description: "Explore the pristine beauty of Lansdowne with guided nature walks and hiking trails",
    image: "/images/hero-ai-hotel.jpg",
    icon: TreePine,
    features: ["Guided Tours", "Scenic Trails", "Bird Watching", "Photography Spots"],
  },
  {
    id: 4,
    title: "Photography Tours",
    description: "Capture the stunning landscapes and wildlife with our professional photography guides",
    image: "/images/pool.jpg",
    icon: Camera,
    features: ["Professional Guides", "Equipment Available", "Sunrise/Sunset Tours", "Wildlife Photography"],
  },
  {
    id: 5,
    title: "Indoor Entertainment",
    description: "Enjoy various indoor games and activities perfect for relaxation and family fun",
    image: "/images/luxury-suite.jpg",
    icon: Music,
    features: ["Indoor Games", "Music System", "Board Games", "Family Activities"],
  },
  {
    id: 6,
    title: "Library & Reading Corner",
    description: "Unwind with a good book in our peaceful library overlooking the mountains",
    image: "/images/deluxe-room.jpg",
    icon: Book,
    features: ["Curated Collection", "Quiet Environment", "Mountain Views", "Comfortable Seating"],
  },
]

const diningOptions = [
  {
    name: "Rooftop Restaurant",
    cuisine: "Multi-Cuisine",
    timing: "7:00 AM - 11:00 PM",
    specialty: "Himalayan Views with Global Flavors",
  },
  {
    name: "Terrace Café",
    cuisine: "Café & Snacks",
    timing: "6:00 AM - 10:00 PM",
    specialty: "Fresh Coffee & Light Bites",
  },
  {
    name: "Barbecue Area",
    cuisine: "Grilled Specialties",
    timing: "6:00 PM - 10:00 PM",
    specialty: "Outdoor Grilling Experience",
  },
]

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ai-hotel.jpg"
            alt="Experiences at AI Hotel"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Experiences</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Immerse yourself in unforgettable moments amidst the tranquil beauty of the Himalayas
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Discover Our Experiences</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <experience.icon className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{experience.title}</h3>
                  <p className="text-neutral-600 mb-4 text-sm leading-relaxed">{experience.description}</p>

                  <div className="space-y-2">
                    {experience.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-neutral-600">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Dining Experiences</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
            <p className="text-neutral-600 mt-6 max-w-2xl mx-auto">
              Savor exceptional cuisine with breathtaking views at our various dining venues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diningOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mr-3">
                    <Utensils className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-neutral-900">{option.name}</h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Cuisine:</span>
                    <span className="font-medium text-neutral-900">{option.cuisine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Timing:</span>
                    <span className="font-medium text-neutral-900">{option.timing}</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 mt-4 italic">{option.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbecue Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/restaurant.jpg" alt="Barbecue Experience" fill className="object-cover" />
              </div>
            </div>

            <div className="lg:w-1/2 space-y-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mr-4">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Outdoor Barbecue</h2>
              </div>

              <p className="text-lg text-neutral-600 leading-relaxed">
                Experience the joy of outdoor grilling with our dedicated barbecue area. Perfect for evening gatherings
                with family and friends while enjoying the cool mountain breeze and starlit skies.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-neutral-600">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                  Fresh Ingredients
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                  Mountain Views
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                  Evening Ambiance
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                  Group Activities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Ready for Your Mountain Adventure?</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Book your stay and discover all the amazing experiences waiting for you at AI Hotel Lansdowne
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Your Experience
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  )
}
