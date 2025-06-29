import { notFound } from "next/navigation"
import { HOTELS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Wifi,
  Car,
  Utensils,
  Waves,
  TreePine,
  Mountain,
  Camera,
  Users,
  ExternalLink,
  Clock,
  Shield,
  Coffee,
} from "lucide-react"

interface HotelPageProps {
  params: {
    hotel: string
  }
}

export default function HotelPage({ params }: HotelPageProps) {
  const hotel = HOTELS.find((h) => h.slug === params.hotel)

  if (!hotel) {
    notFound()
  }

  // Special content for Lansdowne
  if (params.hotel === "lansdowne") {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-gradient-to-r from-slate-900 to-slate-700 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hero-ai-hotel.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <Badge className="mb-4 bg-amber-600 text-white">Now Open - 3★ Mountain Resort</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">AI 360° Hotel Lansdowne</h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Luxury Mountain Retreat in the Heart of Uttarakhand
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                  asChild
                >
                  <a
                    href="https://live.ipms247.com/booking/book-rooms-a1360degree"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  asChild
                >
                  <a href="tel:+917820033697">Call Direct</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Hotel Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-slate-900">Welcome to AI 360° Hotel Lansdowne</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Located in the serene hills of Lansdowne, Uttarakhand, our 3-star mountain resort offers the perfect
                blend of modern comfort and natural beauty. Experience warm hospitality surrounded by pristine forests,
                panoramic mountain views, and the tranquil atmosphere of one of India's most peaceful hill stations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mountain className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mountain Views</h3>
                  <p className="text-slate-600">Breathtaking panoramic views of the Himalayas</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TreePine className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Nature Immersion</h3>
                  <p className="text-slate-600">Surrounded by pristine oak and pine forests</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Warm Hospitality</h3>
                  <p className="text-slate-600">24-hour front desk and personalized service</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Check-in/Check-out Info */}
        <section className="py-12 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-6 w-6 text-amber-600" />
                    <h3 className="text-xl font-semibold">Check-In</h3>
                  </div>
                  <p className="text-slate-600 mb-2">Standard: 2:00 PM (14:00)</p>
                  <p className="text-sm text-slate-500">Late check-in available until 11:30 PM</p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-6 w-6 text-amber-600" />
                    <h3 className="text-xl font-semibold">Check-Out</h3>
                  </div>
                  <p className="text-slate-600 mb-2">By 11:30 AM</p>
                  <p className="text-sm text-slate-500">Late check-out available on request</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">Comfortable Accommodations</h2>
              <p className="text-lg text-slate-600">Choose from our well-appointed rooms with mountain views</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Superior Room */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600"></div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Superior Room</h3>
                  <p className="text-slate-600 mb-4">Spacious comfort with panoramic mountain views</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Occupancy:</span>
                      <span className="font-semibold">2-3 Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">View:</span>
                      <span className="font-semibold">Mountain & Valley</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amenities:</span>
                      <span className="font-semibold">Wi-Fi, TV, AC</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-amber-600">₹4,500</span>
                      <span className="text-slate-600">/night</span>
                    </div>
                    <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                      <a
                        href="https://live.ipms247.com/booking/book-rooms-a1360degree"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Deluxe Room */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-slate-400 to-slate-600"></div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Deluxe Room</h3>
                  <p className="text-slate-600 mb-4">Comfortable elegance with forest views</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Occupancy:</span>
                      <span className="font-semibold">2 Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">View:</span>
                      <span className="font-semibold">Forest & Garden</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amenities:</span>
                      <span className="font-semibold">Wi-Fi, TV, AC</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-amber-600">₹3,500</span>
                      <span className="text-slate-600">/night</span>
                    </div>
                    <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                      <a
                        href="https://live.ipms247.com/booking/book-rooms-a1360degree"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Standard Room */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Standard Room</h3>
                  <p className="text-slate-600 mb-4">Cozy comfort with garden views</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Occupancy:</span>
                      <span className="font-semibold">2 Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">View:</span>
                      <span className="font-semibold">Garden</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amenities:</span>
                      <span className="font-semibold">Wi-Fi, TV</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-amber-600">₹3,000</span>
                      <span className="text-slate-600">/night</span>
                    </div>
                    <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                      <a
                        href="https://live.ipms247.com/booking/book-rooms-a1360degree"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">Hotel Amenities & Features</h2>
              <p className="text-lg text-slate-600">Everything you need for a perfect mountain getaway</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Utensils className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Multi-Cuisine Restaurant</h3>
                <p className="text-sm text-slate-600">Indian & Chinese cuisine</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Coffee className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Rooftop Terrace</h3>
                <p className="text-sm text-slate-600">Panoramic mountain views</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <TreePine className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Picnic Area</h3>
                <p className="text-sm text-slate-600">Outdoor family activities</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Camera className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Games Room</h3>
                <p className="text-sm text-slate-600">Indoor entertainment</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Waves className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Yoga Classes</h3>
                <p className="text-sm text-slate-600">Wellness activities</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Wifi className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Free Wi-Fi</h3>
                <p className="text-sm text-slate-600">High-speed internet</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Car className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Free Parking</h3>
                <p className="text-sm text-slate-600">Complimentary self-parking</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">24-Hour Security</h3>
                <p className="text-sm text-slate-600">Round-the-clock safety</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-slate-900">Location & Contact</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Official Address</h3>
                      <p className="text-slate-600">
                        Badyun, Takeshwar Road
                        <br />
                        Deriyakhāl (Sauli), Lansdowne
                        <br />
                        Pauri Garhwal, Uttarakhand 246155, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-amber-600" />
                    <div>
                      <h3 className="font-semibold">Primary Phone</h3>
                      <p className="text-slate-600">+91 78200 33697</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-amber-600" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-slate-600">atendra@sewahospitality.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-slate-900">Book Your Stay</h2>
                <p className="text-slate-600 mb-6">
                  Experience comfort in the mountains. Book directly for the best rates and personalized service.
                </p>
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                    asChild
                  >
                    <a
                      href="https://live.ipms247.com/booking/book-rooms-a1360degree"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Direct - Best Rates <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="lg" asChild>
                      <a href="tel:+917820033697">Call Direct</a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="mailto:atendra@sewahospitality.com">Email Hotel</a>
                    </Button>
                  </div>
                  <div className="text-center pt-4">
                    <p className="text-sm text-slate-500">
                      Rates: ₹3,000 - ₹4,500 per night (before taxes)
                      <br />
                      Call for current availability and special offers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Default content for other hotels
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>
          <p className="text-xl text-neutral-600">{hotel.description}</p>

          {hotel.status === "coming-soon" && (
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
              <h2 className="text-xl font-semibold text-amber-800 mb-2">Coming Soon</h2>
              <p className="text-amber-700">
                We're working hard to bring you an exceptional experience at {hotel.name}. Stay tuned for updates!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export function generateStaticParams() {
  return HOTELS.map((hotel) => ({
    hotel: hotel.slug,
  }))
}
