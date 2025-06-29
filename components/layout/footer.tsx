import Link from "next/link"
import { Phone, Mail, ExternalLink } from "lucide-react"
import { HOTELS, BOOKING_URL } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { ButtonPrimary } from "@/components/ui/buttons"

export const Footer = () => (
  <footer className="bg-neutral-900 text-white py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">AI 360° HOTEL</h3>
              <p className="text-xs text-neutral-400">Redefining Boutique Hospitality</p>
            </div>
          </div>
          <p className="text-neutral-400 mb-6">
            Experience luxury redefined through elegant, tech-enabled, and nature-integrated properties across India's
            most beautiful destinations.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium"
          >
            Book Your Stay
            <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </div>

        {/* Our Hotels */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Hotels</h4>
          <ul className="space-y-2">
            {HOTELS.slice(0, 6).map((hotel) => (
              <li key={hotel.id}>
                <Link
                  href={`/${hotel.slug}`}
                  className="text-neutral-400 hover:text-white transition-colors flex items-center"
                >
                  {hotel.name}
                  {hotel.status === "coming-soon" && (
                    <span className="ml-2 text-xs bg-amber-600 text-white px-2 py-0.5 rounded">Coming Soon</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/rooms-suites" className="hover:text-white transition-colors">
                Rooms & Suites
              </Link>
            </li>
            <li>
              <Link href="/dining" className="hover:text-white transition-colors">
                Dining
              </Link>
            </li>
            <li>
              <Link href="/weddings-events" className="hover:text-white transition-colors">
                Weddings & Events
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="hover:text-white transition-colors">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                News & Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-amber-400 mr-3" />
              <span className="text-neutral-400">+91 78200 33697</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-amber-400 mr-3" />
              <span className="text-neutral-400">atendra@sewahospitality.com</span>
            </div>
          </div>

          <div>
            <h5 className="font-medium mb-3">Newsletter</h5>
            <p className="text-neutral-400 text-sm mb-3">Get exclusive offers and updates</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              <ButtonPrimary className="w-full">Subscribe</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">© {new Date().getFullYear()} AI 360° Hotel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-neutral-400 hover:text-amber-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-neutral-400 hover:text-amber-400 text-sm">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="text-neutral-400 hover:text-amber-400 text-sm">
              Disclaimer
            </Link>
            <Link href="/sitemap.xml" className="text-neutral-400 hover:text-amber-400 text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
)
