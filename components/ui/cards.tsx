"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Star, Heart } from "lucide-react"
import type { Room } from "@/lib/types"
import { PriceText } from "./typography"
import { ButtonPrimary, ButtonSecondary, IconButton } from "./buttons"
import { Badge } from "@/components/ui/badge"
import { Card as BaseCard } from "./card"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

// Re-export the Card component with custom styling
export const Card = ({ children, className = "", hover = false, ...props }: CardProps) => (
  <BaseCard
    className={cn(
      `
      bg-white rounded-2xl border border-neutral-200 
      ${hover ? "hover:shadow-xl transition-all duration-300" : "shadow-md"}
    `,
      className,
    )}
    {...props}
  >
    {children}
  </BaseCard>
)

interface RoomCardProps {
  room: Room
  onBook: (room: Room) => void
  onViewDetails?: (room: Room) => void
}

export const RoomCard = ({ room, onBook, onViewDetails }: RoomCardProps) => (
  <Card hover className="overflow-hidden group">
    <div className="relative h-64 overflow-hidden">
      <img
        src={room.heroImage || "/placeholder.svg?height=256&width=400"}
        alt={room.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 left-4">
        <Badge variant={room.popular ? "default" : "secondary"}>
          {room.popular ? (
            <>
              <Star className="w-3 h-3 mr-1 fill-current" />
              Popular
            </>
          ) : (
            room.category
          )}
        </Badge>
      </div>
      <div className="absolute top-4 right-4">
        <IconButton icon={Heart} variant="ghost" className="bg-white/80 backdrop-blur-sm" />
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-semibold text-neutral-900">{room.name}</h3>
        <div className="text-right">
          <PriceText amount={room.price} period="per night" />
        </div>
      </div>

      <p className="text-neutral-600 mb-4">{room.description}</p>

      <div className="space-y-2 mb-6">
        {room.amenities.slice(0, 4).map((amenity, index) => (
          <div key={index} className="flex items-center text-sm text-neutral-600">
            <span className="w-4 h-4 mr-2 text-amber-600">•</span>
            {amenity.name}
          </div>
        ))}
      </div>

      <div className="flex space-x-3">
        <ButtonPrimary onClick={() => onBook(room)} className="flex-1">
          Book Now
        </ButtonPrimary>
        {onViewDetails && <ButtonSecondary onClick={() => onViewDetails(room)}>Details</ButtonSecondary>}
      </div>
    </div>
  </Card>
)

interface FeatureCardProps {
  feature: {
    id: string
    title: string
    description: string
    icon: string
  }
}

export const FeatureCard = ({ feature }: FeatureCardProps) => (
  <Card className="text-center p-8 group">
    <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
      <span className="text-3xl">🏊‍♂️</span>
    </div>
    <h3 className="text-xl font-semibold text-neutral-900 mb-3">{feature.title}</h3>
    <p className="text-neutral-600">{feature.description}</p>
  </Card>
)

interface StatsCardProps {
  stat: {
    value: string
    label: string
    description: string
    trend?: string
    color?: string
  }
}

export const StatsCard = ({ stat }: StatsCardProps) => (
  <Card className="p-6 text-center">
    <div className="text-3xl font-bold text-amber-600 mb-2">{stat.value}</div>
    <div className="text-sm font-medium text-neutral-900 mb-1">{stat.label}</div>
    <div className="text-xs text-neutral-500">{stat.description}</div>
    {stat.trend && <div className="text-xs text-green-600 mt-1">{stat.trend}</div>}
  </Card>
)

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    title: string
    content: string
    rating: number
    avatar?: string
  }
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card className="p-8">
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < testimonial.rating ? "text-amber-400 fill-current" : "text-neutral-300"}`}
        />
      ))}
    </div>
    <blockquote className="text-lg text-neutral-700 mb-6">"{testimonial.content}"</blockquote>
    <div className="flex items-center">
      <img
        src={testimonial.avatar || "/placeholder.svg?height=48&width=48"}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <div className="font-semibold text-neutral-900">{testimonial.name}</div>
        <div className="text-sm text-neutral-500">{testimonial.title}</div>
      </div>
    </div>
  </Card>
)
