import Image from "next/image"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { GradientText } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"

export const HeroSection = () => (
  <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/hero-ai-hotel.jpg"
        alt="AI Hotel Lansdowne - Luxury Mountain Resort"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
    </div>

    {/* Content Container - Properly Centered and Responsive */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
      <div className="text-center text-white max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Badge */}
        <div className="flex justify-center">
          <Badge
            variant="secondary"
            className="bg-amber-600/20 text-amber-200 border-amber-400/30 px-4 py-2 text-sm sm:text-base"
          >
            <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Luxury Mountain Resort</span>
          </Badge>
        </div>

        {/* Main Heading - Responsive Typography */}
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">Welcome to</h1>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <GradientText gradient="luxury">AI Hotel Lansdowne</GradientText>
          </div>
        </div>

        {/* Subtitle - Responsive */}
        <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto leading-relaxed px-4">
          Experience unparalleled luxury amidst the serene mountains of Lansdowne
        </p>

        {/* CTA Buttons - Fixed Styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 sm:pt-6">
          <a
            href="https://live.ipms247.com/booking/book-rooms-a1360degree"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[200px]"
          >
            Book Your Stay
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>

          <Link href="/about">
            <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 flex items-center justify-center w-full sm:w-auto min-w-[200px]">
              Discover Our Story
            </button>
          </Link>
        </div>

        {/* Scroll Indicator - Only visible on larger screens */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
