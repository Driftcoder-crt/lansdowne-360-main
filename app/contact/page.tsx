import Image from "next/image"
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from "lucide-react"

const BOOKING_URL = "https://live.ipms247.com/booking/book-rooms-a1360degree"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 78200 33697", "+91 87654 32109"],
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["atendra@sewahospitality.com", "info@ai360hotel.com"],
    action: "Send Email",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Badyun, Takeshwar Road", "Deriyakhāl (Sauli), Lansdowne", "Uttarakhand 246155"],
    action: "Get Directions",
  },
  {
    icon: Clock,
    title: "Reception Hours",
    details: ["24/7 Front Desk", "Check-in: 2:00 PM", "Check-out: 11:30 AM"],
    action: "View Details",
  },
]

const quickActions = [
  {
    title: "Book Direct",
    description: "Best rates guaranteed",
    icon: ExternalLink,
    href: BOOKING_URL,
    external: true,
  },
  {
    title: "WhatsApp",
    description: "Quick assistance",
    icon: MessageCircle,
    href: "https://wa.me/917820033697",
    external: true,
  },
  {
    title: "Call Reception",
    description: "24/7 support",
    icon: Phone,
    href: "tel:+917820033697",
    external: false,
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ai-hotel.jpg"
            alt="Contact AI Hotel"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            We're here to help make your stay unforgettable. Reach out to us anytime
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                {...(action.external && { target: "_blank", rel: "noopener noreferrer" })}
                className="flex items-center p-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4">
                  <action.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{action.title}</h3>
                  <p className="text-white/80 text-sm">{action.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-700 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-3">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-neutral-600">
                      {detail}
                    </p>
                  ))}
                </div>
                <button className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors duration-200">
                  {info.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Send Us a Message</h2>
            <p className="text-neutral-600">Have a question or special request? We'd love to hear from you</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200"
                    placeholder="+91 78200 33697"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Select a subject</option>
                  <option value="reservation">Reservation Inquiry</option>
                  <option value="event">Event Planning</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Find Us</h2>
            <p className="text-neutral-600">Located in the heart of Lansdowne's natural beauty</p>
          </div>

          <div className="bg-neutral-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
              <p className="text-neutral-600">Interactive map will be integrated here</p>
              <p className="text-sm text-neutral-500 mt-2">
                Badyun, Takeshwar Road, Deriyakhāl (Sauli), Lansdowne, Uttarakhand 246155
              </p>
              <a
                href="https://www.google.com/maps/place/AI+360%C2%B0+Hotel/@29.8380625,78.6991126,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                <MapPin className="w-4 h-4 mr-2" />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
