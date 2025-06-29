import type React from "react"
import { Crown, Bell, User, Home, Calendar, MapPin, Coffee, Sparkles, Car, Utensils } from "lucide-react"
import { Card } from "@/components/ui/cards"
import { HeadingSM } from "@/components/ui/typography"
import { ButtonPrimary, ButtonSecondary, IconButton } from "@/components/ui/buttons"
import { Badge } from "@/components/ui/badge"

export const MobileAppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-sm mx-auto bg-white min-h-screen">
    <MobileHeader />
    <main className="pb-20">{children}</main>
    <MobileBottomNav />
  </div>
)

const MobileHeader = () => (
  <header className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Crown className="w-6 h-6" />
        <div>
          <div className="font-semibold">Élite Palace</div>
          <div className="text-amber-200 text-xs">Welcome, John</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <IconButton icon={Bell} variant="ghost" className="text-white" />
        <IconButton icon={User} variant="ghost" className="text-white" />
      </div>
    </div>
  </header>
)

const MobileBottomNav = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Calendar, label: "Bookings" },
    { icon: Coffee, label: "Services" },
    { icon: MapPin, label: "Explore" },
    { icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-neutral-200">
      <div className="grid grid-cols-5 py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center py-2 px-1 ${item.active ? "text-amber-600" : "text-neutral-500"}`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export const MobileHomeScreen = () => (
  <div className="p-4 space-y-6">
    {/* Current Stay Card */}
    <Card className="p-4 bg-gradient-to-r from-amber-50 to-amber-100">
      <div className="flex items-center justify-between mb-3">
        <HeadingSM>Current Stay</HeadingSM>
        <Badge variant="default" className="bg-green-100 text-green-800">
          Active
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="font-medium">Presidential Suite • Room 2501</div>
        <div className="text-sm text-neutral-600">Check-out: Tomorrow, 12:00 PM</div>
      </div>

      <div className="flex space-x-2 mt-4">
        <ButtonPrimary size="sm" className="flex-1">
          Extend Stay
        </ButtonPrimary>
        <ButtonSecondary size="sm">Services</ButtonSecondary>
      </div>
    </Card>

    {/* Quick Services */}
    <div>
      <HeadingSM className="mb-3">Quick Services</HeadingSM>
      <div className="grid grid-cols-2 gap-3">
        <MobileServiceCard icon={Coffee} title="Room Service" subtitle="Order food & drinks" />
        <MobileServiceCard icon={Sparkles} title="Housekeeping" subtitle="Request cleaning" />
        <MobileServiceCard icon={Car} title="Valet" subtitle="Car service" />
        <MobileServiceCard icon={Utensils} title="Dining" subtitle="Make reservations" />
      </div>
    </div>

    {/* Loyalty Points */}
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <HeadingSM>Élite Rewards</HeadingSM>
        <button className="text-amber-600 text-sm font-medium">View All</button>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-amber-600 mb-1">12,450</div>
        <div className="text-sm text-neutral-600 mb-3">Points Available</div>

        <div className="bg-neutral-200 rounded-full h-2 mb-2">
          <div className="bg-amber-600 h-2 rounded-full" style={{ width: "65%" }}></div>
        </div>
        <div className="text-xs text-neutral-500">2,550 points to Gold status</div>
      </div>
    </Card>

    {/* Recommendations */}
    <div>
      <HeadingSM className="mb-3">Recommended for You</HeadingSM>
      <div className="space-y-3">
        <MobileRecommendationCard
          image="/placeholder.svg?height=80&width=80"
          title="Signature Spa Package"
          description="Relax with our premium wellness experience"
          price="$299"
        />
        <MobileRecommendationCard
          image="/placeholder.svg?height=80&width=80"
          title="Chef's Tasting Menu"
          description="7-course culinary journey"
          price="$185"
        />
      </div>
    </div>
  </div>
)

const MobileServiceCard = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
  <Card className="p-4 text-center">
    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
      <Icon className="w-6 h-6 text-amber-600" />
    </div>
    <div className="font-medium text-sm">{title}</div>
    <div className="text-xs text-neutral-600">{subtitle}</div>
  </Card>
)

const MobileRecommendationCard = ({
  image,
  title,
  description,
  price,
}: { image: string; title: string; description: string; price: string }) => (
  <Card className="overflow-hidden">
    <div className="flex">
      <img src={image || "/placeholder.svg"} alt={title} className="w-20 h-20 object-cover" />
      <div className="p-3 flex-1">
        <div className="font-medium text-sm mb-1">{title}</div>
        <div className="text-xs text-neutral-600 mb-2">{description}</div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-amber-600">{price}</span>
          <ButtonPrimary size="sm">Book</ButtonPrimary>
        </div>
      </div>
    </div>
  </Card>
)
