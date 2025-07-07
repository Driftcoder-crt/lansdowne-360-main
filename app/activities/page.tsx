export default function ActivitiesPage() {
  const activities = [
    {
      id: 1,
      name: "Mountain Trekking",
      description: "Guided trekking expeditions through scenic mountain trails with professional guides",
      duration: "4-8 hours",
      difficulty: "Moderate",
      price: "₹2,500",
      image: "/images/hero-ai-hotel.jpg",
      category: "Adventure",
      includes: ["Professional guide", "Safety equipment", "Packed lunch", "Photography"]
    },
    {
      id: 2,
      name: "Rock Climbing",
      description: "Exciting rock climbing adventures suitable for beginners and experienced climbers",
      duration: "3-5 hours", 
      difficulty: "Beginner to Advanced",
      price: "₹3,000",
      image: "/images/deluxe-room.jpg",
      category: "Adventure",
      includes: ["Climbing gear", "Safety harness", "Professional instructor", "Certificate"]
    },
    {
      id: 3,
      name: "Nature Photography Walk",
      description: "Capture stunning landscapes and wildlife with expert photography guidance",
      duration: "2-3 hours",
      difficulty: "Easy",
      price: "₹1,500",
      image: "/images/spa.jpg",
      category: "Photography",
      includes: ["Photography tips", "Best spot locations", "Equipment guidance", "Photo editing basics"]
    },
    {
      id: 4,
      name: "River Rafting",
      description: "Thrilling white water rafting experience on pristine mountain rivers",
      duration: "5-6 hours",
      difficulty: "Moderate",
      price: "₹4,500", 
      image: "/images/pool.jpg",
      category: "Water Sports",
      includes: ["Rafting equipment", "Life jackets", "Professional guide", "Riverside lunch"]
    },
    {
      id: 5,
      name: "Village Cultural Tour",
      description: "Experience local culture, traditions, and authentic village life",
      duration: "6-7 hours",
      difficulty: "Easy",
      price: "₹2,000",
      image: "/images/restaurant.jpg", 
      category: "Cultural",
      includes: ["Local guide", "Traditional lunch", "Cultural performance", "Handicraft demonstration"]
    },
    {
      id: 6,
      name: "Sunrise Point Expedition",
      description: "Early morning trek to witness breathtaking sunrise views from mountain peaks",
      duration: "3-4 hours",
      difficulty: "Easy to Moderate", 
      price: "₹1,800",
      image: "/images/luxury-suite.jpg",
      category: "Nature",
      includes: ["Early morning transport", "Hot refreshments", "Blankets", "Breakfast"]
    }
  ]

  const categories = ["All", "Adventure", "Photography", "Water Sports", "Cultural", "Nature"]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 text-amber-100 border border-amber-400/30 mb-6">
            <span className="mr-2">🏔️</span>
            Adventure Awaits
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Activities & Adventures
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Discover thrilling adventures and peaceful experiences in the heart of nature. 
            From adrenaline-pumping activities to serene cultural explorations.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full font-medium bg-neutral-100 text-neutral-700 hover:bg-amber-100 hover:text-amber-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={activity.image} 
                    alt={activity.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {activity.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-neutral-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {activity.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{activity.name}</h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">{activity.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-neutral-500">
                      <span className="mr-2">⏱️</span>
                      <span className="text-sm">{activity.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-600">{activity.price}</div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-neutral-900 mb-2">Includes:</h4>
                    <ul className="space-y-1">
                      {activity.includes.slice(0, 2).map((item, index) => (
                        <li key={index} className="text-sm text-neutral-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                      {activity.includes.length > 2 && (
                        <li className="text-sm text-amber-600 font-medium">
                          +{activity.includes.length - 2} more inclusions
                        </li>
                      )}
                    </ul>
                  </div>

                  <button className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                    Book Activity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adventure Packages */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Multi-Activity Packages
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Combine multiple activities for the ultimate adventure experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                🏃 Adventure Combo
              </h3>
              <p className="text-neutral-600 mb-6">
                Perfect for thrill-seekers wanting maximum adventure in minimum time
              </p>
              <ul className="space-y-2 text-neutral-600 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Mountain trekking expedition
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Rock climbing session
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  River rafting adventure
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Adventure meals included
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-neutral-500 line-through">₹10,000</span>
                  <span className="text-2xl font-bold text-amber-600 ml-2">₹8,500</span>
                </div>
                <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  Book Package
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                🌅 Nature Explorer
              </h3>
              <p className="text-neutral-600 mb-6">
                Ideal for nature lovers and photography enthusiasts
              </p>
              <ul className="space-y-2 text-neutral-600 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Sunrise point expedition
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Photography workshop
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Village cultural tour
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Traditional meals
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-neutral-500 line-through">₹6,000</span>
                  <span className="text-2xl font-bold text-amber-600 ml-2">₹4,800</span>
                </div>
                <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  Book Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">🛡️ Safety First</h2>
              <p className="text-xl text-neutral-600">
                Your safety is our top priority. All activities follow strict safety protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">👨‍🏫</div>
                <h3 className="font-semibold text-neutral-900 mb-2">Certified Guides</h3>
                <p className="text-neutral-600 text-sm">All activities led by certified and experienced professionals</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🦺</div>
                <h3 className="font-semibold text-neutral-900 mb-2">Safety Equipment</h3>
                <p className="text-neutral-600 text-sm">High-quality safety gear provided for all activities</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🏥</div>
                <h3 className="font-semibold text-neutral-900 mb-2">Emergency Support</h3>
                <p className="text-neutral-600 text-sm">24/7 emergency support and first aid availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Book your activities now or contact our adventure team for customized experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-colors"
            >
              Book Activities
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-700 transition-colors"
            >
              Contact Adventure Team
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}