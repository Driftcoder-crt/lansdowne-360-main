import Image from "next/image"
import { Sparkles } from "lucide-react"
import { DisplayLG, BodyLG, GradientText } from "@/components/ui/typography"
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/buttons"
import { Badge } from "@/components/ui/badge"

export const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <Image src="/images/hero-hotel.jpg" alt="Luxury Hotel" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/40" />
    </div>

    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
      <Badge variant="secondary" className="mb-6 bg-amber-600/20 text-amber-200 border-amber-400/30">
        <Sparkles className="w-4 h-4 mr-2" />
        Celebrating Excellence Since 1925
      </Badge>

      <DisplayLG className="text-white mb-6">
        Experience
        <span className="block">
          <GradientText gradient="luxury">Unparalleled Luxury</GradientText>
        </span>
      </DisplayLG>

      <BodyLG className="text-neutral-200 mb-8 max-w-2xl mx-auto">
        Where timeless elegance meets modern sophistication in the heart of the city
      </BodyLG>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ButtonPrimary size="xl">Reserve Your Stay</ButtonPrimary>
        <ButtonSecondary size="xl" className="border-white text-white hover:bg-white hover:text-neutral-900">
          Virtual Tour
        </ButtonSecondary>
      </div>
    </div>
  </section>
)
