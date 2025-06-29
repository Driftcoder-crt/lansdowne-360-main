import { Coffee, Sparkles, Car, Crown, Heart, Camera } from "lucide-react"
import { Card } from "@/components/ui/cards"
import { HeadingLG, HeadingMD, HeadingSM, BodyLG } from "@/components/ui/typography"
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/buttons"
import { Badge } from "@/components/ui/badge"
import type { Guest } from "@/lib/types"

interface GuestDashboardProps {
  guest: Guest
}

export const GuestDashboard = ({ guest }: GuestDashboardProps) => (
  <div className="min-h-screen bg-neutral-50">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WelcomeSection guest={guest} />
          <CurrentStaySection />
          <UpcomingReservations />
          <RecentActivity />
        </div>

        <div className="space-y-8">
          <QuickActions />
          <LoyaltyProgram guest={guest} />
          <Recommendations />
        </div>
      </div>
    </div>
  </div>
)

const WelcomeSection = ({ guest }: { guest: Guest }) => (
  <Card className="p-8 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
    <div className="flex items-center justify-between">
      <div>
        <HeadingLG className="text-white mb-2">Welcome back, {guest.firstName}!</HeadingLG>
        <BodyLG className="text-amber-100">Thank you for being a valued member of Élite Palace</BodyLG>
      </div>

      <div className="text-right">
        <div className="text-3xl font-bold">{guest.loyaltyPoints}</div>
        <div className="text-amber-200">Loyalty Points</div>
      </div>
    </div>
  </Card>
)

const CurrentStaySection = () => (
  <Card className="p-6">
    <HeadingMD className="mb-6">Current Stay</HeadingMD>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img
          src="/placeholder.svg?height=192&width=256"
          alt="Current Room"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <div className="space-y-2">
          <div className="font-semibold">Presidential Suite</div>
          <div className="text-neutral-600">Room 2501 • 25th Floor</div>
          <div className="text-sm text-neutral-500">Check-out: Tomorrow, 12:00 PM</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <HeadingSM className="mb-3">Room Services</HeadingSM>
          <div className="space-y-2">
            <ButtonSecondary className="w-full justify-start">
              <Coffee className="w-4 h-4 mr-2" />
              Order Room Service
            </ButtonSecondary>
            <ButtonSecondary className="w-full justify-start">
              <Sparkles className="w-4 h-4 mr-2" />
              Request Housekeeping
            </ButtonSecondary>
            <ButtonSecondary className="w-full justify-start">
              <Car className="w-4 h-4 mr-2" />
              Valet Service
            </ButtonSecondary>
          </div>
        </div>

        <div>
          <HeadingSM className="mb-3">Quick Actions</HeadingSM>
          <div className="space-y-2">
            <ButtonPrimary className="w-full">Extend Stay</ButtonPrimary>
            <ButtonSecondary className="w-full">Express Checkout</ButtonSecondary>
          </div>
        </div>
      </div>
    </div>
  </Card>
)

const UpcomingReservations = () => (
  <Card className="p-6">
    <HeadingMD className="mb-6">Upcoming Reservations</HeadingMD>

    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
        <div>
          <div className="font-semibold">Luxury Suite</div>
          <div className="text-sm text-neutral-600">Jan 15-18, 2024 • 3 nights</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">$2,550</div>
          <Badge variant="default" className="bg-green-100 text-green-800">
            Confirmed
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
        <div>
          <div className="font-semibold">Presidential Suite</div>
          <div className="text-sm text-neutral-600">Feb 20-25, 2024 • 5 nights</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">$7,500</div>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            Pending
          </Badge>
        </div>
      </div>
    </div>
  </Card>
)

const RecentActivity = () => (
  <Card className="p-6">
    <HeadingMD className="mb-6">Recent Activity</HeadingMD>

    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
        <div>
          <div className="font-medium">Spa appointment booked</div>
          <div className="text-sm text-neutral-600">Signature massage • Dec 15, 3:00 PM</div>
          <div className="text-xs text-neutral-500">2 hours ago</div>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
        <div>
          <div className="font-medium">Restaurant reservation confirmed</div>
          <div className="text-sm text-neutral-600">Le Jardin • Dec 16, 7:30 PM</div>
          <div className="text-xs text-neutral-500">1 day ago</div>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
        <div>
          <div className="font-medium">Points earned</div>
          <div className="text-sm text-neutral-600">+450 points from recent stay</div>
          <div className="text-xs text-neutral-500">3 days ago</div>
        </div>
      </div>
    </div>
  </Card>
)

const QuickActions = () => (
  <Card className="p-6">
    <HeadingMD className="mb-6">Quick Actions</HeadingMD>

    <div className="space-y-3">
      <ButtonPrimary className="w-full justify-start">
        <Crown className="w-4 h-4 mr-2" />
        Book New Stay
      </ButtonPrimary>
      <ButtonSecondary className="w-full justify-start">
        <Heart className="w-4 h-4 mr-2" />
        Spa Services
      </ButtonSecondary>
      <ButtonSecondary className="w-full justify-start">
        <Camera className="w-4 h-4 mr-2" />
        Experiences
      </ButtonSecondary>
      <ButtonSecondary className="w-full justify-start">
        <Car className="w-4 h-4 mr-2" />
        Transportation
      </ButtonSecondary>
    </div>
  </Card>
)

const LoyaltyProgram = ({ guest }: { guest: Guest }) => (
  <Card className="p-6">
    <HeadingMD className="mb-4">Élite Rewards</HeadingMD>

    <div className="text-center mb-6">
      <div className="text-3xl font-bold text-amber-600 mb-2">{guest.loyaltyPoints}</div>
      <div className="text-neutral-600">Points Available</div>
    </div>

    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span>Progress to {guest.nextTier || "Platinum"}</span>
        <span>{guest.tierProgress}%</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${guest.tierProgress}%` }}></div>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm">Free Night</span>
        <span className="text-sm font-medium">15,000 pts</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Spa Credit</span>
        <span className="text-sm font-medium">5,000 pts</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Dining Credit</span>
        <span className="text-sm font-medium">3,000 pts</span>
      </div>
    </div>

    <ButtonPrimary className="w-full mt-4">Redeem Points</ButtonPrimary>
  </Card>
)

const Recommendations = () => (
  <Card className="p-6">
    <HeadingMD className="mb-6">Recommended for You</HeadingMD>

    <div className="space-y-4">
      <div className="flex space-x-4">
        <img
          src="/placeholder.svg?height=64&width=64"
          alt="Spa Package"
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="font-medium">Signature Spa Package</div>
          <div className="text-sm text-neutral-600">Premium wellness experience</div>
          <div className="text-sm font-bold text-amber-600">$299</div>
        </div>
      </div>

      <div className="flex space-x-4">
        <img
          src="/placeholder.svg?height=64&width=64"
          alt="Dining Experience"
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="font-medium">Chef's Tasting Menu</div>
          <div className="text-sm text-neutral-600">7-course culinary journey</div>
          <div className="text-sm font-bold text-amber-600">$185</div>
        </div>
      </div>
    </div>
  </Card>
)
