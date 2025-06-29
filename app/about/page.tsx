import Image from "next/image"
import { Sparkles, MapPin, Users, Award, Zap, Globe, Shield, Smartphone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ai-hotel.jpg"
            alt="AI Hotels - About Us"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-amber-600/90 text-amber-100 border-amber-400/50 text-lg px-6 py-3">
            <Sparkles className="w-5 h-5 mr-2" />
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            About <span className="text-amber-400">AI Hotels</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed">
            Pioneering the future of hospitality through technology, innovation, and contactless luxury experiences
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
              Redefining Hospitality in the Digital Age
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed space-y-6">
              <p>
                Following the Covid-19 pandemic, a significant gap emerged in the midscale and economy hotel segments in
                India. While branded hotels largely adhered to conventional models reliant on extensive human
                interaction and limited technology integration, a substantial unmet demand arose for technology-driven
                accommodations minimizing physical contact.
              </p>
              <p>
                <strong>AI Hotels was conceived as a pioneering force</strong>, establishing a new category of branded,
                AI, and technology-centric hotels within the mid-market space in India. Today, we stand as the sole
                hotel chain in India offering a truly contactless and digitally empowered experience.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "App-Controlled Experience",
                description:
                  "Complete smartphone control over door locks, room electricity, safety lockers, and lift access",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Contactless Technology",
                description:
                  "Fully automated, contactless check-in and hotel experience for maximum safety and convenience",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "360° Virtual Tours",
                description: "Pre-arrival 360-degree room and hotel views accessible remotely before your stay",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Instant Service",
                description: "Seamless food & beverage and housekeeping requests through our dedicated mobile app",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Premium Brands",
                description: "Three distinct brands: AI Hotels, AI Resorts, and Isaki Suites for Japanese guests",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Diverse Segments",
                description: "Serving upscale, upper-midscale, midscale, and economy segments across India",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="text-amber-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Innovation Section */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-3xl p-8 md:p-12 mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Innovation at Every Touchpoint</h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Our innovative approach begins even before arrival, providing guests with a unique pre check-in facility
                and a 360-degree view of their reserved room and the entire hotel, all accessible remotely. Upon
                check-in, our hotels transform into fully automated, app-based environments.
              </p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Pre-Arrival Experience</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li>• Virtual 360° room tours</li>
                    <li>• Remote pre-check-in facility</li>
                    <li>• Complete hotel exploration online</li>
                    <li>• Personalized stay customization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">In-Hotel Technology</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <li>• Smart electric door locks</li>
                    <li>• App-controlled room electricity</li>
                    <li>• Digital safety lockers</li>
                    <li>• Contactless lift access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Stats */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12">Our Rapid Growth</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "8+", label: "Hotels in Portfolio" },
                { number: "250+", label: "Total Rooms" },
                { number: "3", label: "Operational Properties" },
                { number: "5+", label: "Opening in FY 2025-26" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-2">{stat.number}</div>
                  <div className="text-neutral-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Destinations</h2>
              <p className="text-xl text-neutral-300 mb-8">
                From metro regions to leisure destinations, we're expanding across India and internationally
              </p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Current Locations
                  </h3>
                  <ul className="space-y-2 text-neutral-300">
                    <li>• Lansdowne, Uttarakhand (Live)</li>
                    <li>• NCR Region</li>
                    <li>• Jim Corbett, Uttarakhand</li>
                    <li>• Haridwar, Uttarakhand</li>
                    <li>• Rishikesh, Uttarakhand</li>
                    <li>• Ranikhet, Uttarakhand</li>
                    <li>• Udaipur, Rajasthan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    International Expansion
                  </h3>
                  <ul className="space-y-2 text-neutral-300">
                    <li>• Singapore (Signed)</li>
                    <li>• Dubai, UAE (Signed)</li>
                    <li>• Nepal (Signed)</li>
                    <li>• More destinations coming soon</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lansdowne Specific Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">AI 360° Hotel Lansdowne</h2>
            <p className="text-xl text-neutral-700">
              Our flagship property offering breathtaking 360-degree Himalayan views
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="prose prose-lg text-neutral-700 space-y-6">
                <p>
                  Nestled just a stone's throw away from the charming hill station of Lansdowne, AI 360 Degree Hotel
                  offers an unparalleled escape into the majestic embrace of the Himalayas. As its name suggests,
                  prepare to be captivated by a <strong>breathtaking 360-degree panoramic vista</strong> of the
                  snow-capped Himalayan range directly from the private balcony of every valley-facing room.
                </p>
                <p>
                  Imagine waking up to the golden hues of sunrise painting the towering peaks or unwinding in the
                  evening with the serene beauty of the mountains as your backdrop. Our thoughtfully designed rooms
                  prioritize your privacy and comfort, each featuring an attached modern washroom and a host of
                  amenities.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  "Smart Electric Locks",
                  "Mini-Fridge",
                  "Electronic Safety Locker",
                  "High-Speed Internet",
                  "Rooftop Restaurant",
                  "Conference Hall",
                  "24/7 Front Desk",
                  "Power Backup",
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center text-neutral-700">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/hero-ai-hotel.jpg" alt="AI 360° Hotel Lansdowne" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
