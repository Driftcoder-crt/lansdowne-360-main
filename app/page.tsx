"use client"
import { HeroSection } from "@/components/home/hero-section"
import { HotelsOverview } from "@/components/home/hotels-overview"
import { RoomsSection } from "@/components/marketing/rooms-section"
import { AmenitiesSection } from "@/components/marketing/amenities-section"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <HeroSection />
      <HotelsOverview />
      <RoomsSection />
      <AmenitiesSection />
      <TestimonialsSection />
    </div>
  )
}