"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ExternalLink, Home, Building2, Bed, Sparkles, Phone } from "lucide-react"
import { NAVIGATION_ITEMS } from "@/lib/constants"

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Mobile navigation items with icons
  const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/our-hotels", label: "Hotels", icon: Building2 },
    { href: "/rooms-suites", label: "Rooms", icon: Bed },
    { href: "/experiences", label: "Experiences", icon: Sparkles },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  return (
    <>
      <header className="bg-white/98 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105 duration-200 py-2">
              <div className="relative h-12 lg:h-16 w-32 lg:w-48">
                <Image src="/images/logo1.svg" alt="AI 360° Hotel" fill className="object-contain" priority />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {NAVIGATION_ITEMS.slice(0, -1).map((item) => (
                <div key={item.label} className="relative">
                  {item.type === "dropdown" ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button className="flex items-center px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-800 transition-all duration-200 rounded-lg hover:bg-neutral-50 group">
                        {item.label}
                        <ChevronDown className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                      </button>

                      {activeDropdown === item.label && item.children && (
                        <div
                          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-neutral-200/60 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                          onMouseEnter={() => handleMouseEnter(item.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.children.map((child, index) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-amber-700 hover:text-amber-800 hover:bg-neutral-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-800 transition-all duration-200 rounded-lg hover:bg-neutral-50"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              {/* Desktop Book Now */}
              <a
                href="https://live.ipms247.com/booking/book-rooms-a1360degree"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Book Now
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>

              {/* Mobile Book Now - Smaller */}
              <a
                href="https://live.ipms247.com/booking/book-rooms-a1360degree"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden inline-flex items-center px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md"
              >
                Book
                <ExternalLink className="ml-1 w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-neutral-200/50 shadow-lg">
        <div className="grid grid-cols-5 h-16">
          {mobileNavItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center space-y-1 text-xs font-medium text-amber-600 hover:text-amber-800 transition-all duration-300 hover:bg-amber-50/50 active:scale-95 group"
            >
              <div className="relative">
                <item.icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-active:scale-95" />
                <div className="absolute -inset-2 bg-amber-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="transition-all duration-300 group-hover:font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Bottom Navigation Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-amber-700 opacity-20"></div>
      </nav>

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-16"></div>
    </>
  )
}
