export default function SpaPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 text-amber-100 border border-amber-400/30 mb-6">
            <span className="mr-2">🧘</span>
            Wellness & Rejuvenation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Spa & Wellness Center
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Discover tranquility and rejuvenation at our world-class spa, where ancient wellness traditions meet modern luxury.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Spa Services
            </h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">💆</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Signature Massages
              </h3>
              <p className="text-neutral-600 mb-4">
                Traditional and contemporary massage therapies including Swedish, Deep Tissue, and Himalayan Hot Stone massages.
              </p>
              <div className="text-amber-600 font-semibold">Starting from ₹3,500</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Ayurvedic Treatments
              </h3>
              <p className="text-neutral-600 mb-4">
                Authentic Ayurvedic therapies including Abhyanga, Shirodhara, and Panchakarma treatments for holistic healing.
              </p>
              <div className="text-amber-600 font-semibold">Starting from ₹4,500</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Facial Treatments
              </h3>
              <p className="text-neutral-600 mb-4">
                Rejuvenating facial treatments using organic and natural ingredients for glowing, healthy skin.
              </p>
              <div className="text-amber-600 font-semibold">Starting from ₹2,500</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🧘</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Yoga & Meditation
              </h3>
              <p className="text-neutral-600 mb-4">
                Daily yoga sessions and guided meditation classes in our serene mountain setting.
              </p>
              <div className="text-amber-600 font-semibold">Complimentary for guests</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Hydrotherapy
              </h3>
              <p className="text-neutral-600 mb-4">
                Therapeutic water treatments including steam baths, saunas, and mineral baths.
              </p>
              <div className="text-amber-600 font-semibold">Starting from ₹2,000</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Couples Spa Package
              </h3>
              <p className="text-neutral-600 mb-4">
                Romantic spa experience for couples with side-by-side treatments and champagne service.
              </p>
              <div className="text-amber-600 font-semibold">Starting from ₹8,500</div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Wellness Facilities
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              State-of-the-art facilities designed for your complete wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                🏊 Thermal Pools
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Natural mineral hot springs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Temperature-controlled pools
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Outdoor infinity pool with mountain views
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                🔥 Sauna & Steam
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Traditional Finnish sauna
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Eucalyptus steam rooms
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Himalayan salt therapy room
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Wellness Packages
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Curated wellness experiences for different needs and durations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Half Day Retreat
              </h3>
              <p className="text-neutral-600 mb-4">
                Perfect for a quick rejuvenation session
              </p>
              <ul className="space-y-2 text-sm text-neutral-600 mb-6">
                <li>• 60-minute signature massage</li>
                <li>• Access to thermal pools</li>
                <li>• Herbal tea service</li>
                <li>• Relaxation area access</li>
              </ul>
              <div className="text-2xl font-bold text-amber-600 mb-4">₹5,500</div>
              <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Book Now
              </button>
            </div>

            <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-6 border-2 border-amber-600 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Full Day Wellness
              </h3>
              <p className="text-neutral-600 mb-4">
                Complete wellness experience for mind and body
              </p>
              <ul className="space-y-2 text-sm text-neutral-600 mb-6">
                <li>• 90-minute Ayurvedic treatment</li>
                <li>• Yoga and meditation session</li>
                <li>• Healthy spa cuisine lunch</li>
                <li>• All facilities access</li>
                <li>• Wellness consultation</li>
              </ul>
              <div className="text-2xl font-bold text-amber-600 mb-4">₹12,500</div>
              <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Book Now
              </button>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Weekend Detox
              </h3>
              <p className="text-neutral-600 mb-4">
                2-day comprehensive detox program
              </p>
              <ul className="space-y-2 text-sm text-neutral-600 mb-6">
                <li>• Multiple spa treatments</li>
                <li>• Detox meal plan</li>
                <li>• Personal wellness coach</li>
                <li>• Daily yoga sessions</li>
                <li>• Take-home wellness kit</li>
              </ul>
              <div className="text-2xl font-bold text-amber-600 mb-4">₹25,000</div>
              <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Wellness Journey
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Book your spa appointment today and discover the perfect balance of relaxation and rejuvenation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-neutral-100 transition-colors"
            >
              Book Spa Treatment
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-700 transition-colors"
            >
              Contact Spa Team
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}