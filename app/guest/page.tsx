import { GuestDashboard } from "@/components/guest/guest-dashboard"

const mockGuest = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  isVIP: true,
  loyaltyPoints: 12450,
  loyaltyTier: "Gold" as const,
  nextTier: "Platinum",
  tierProgress: 65,
}

export default function GuestPortal() {
  return <GuestDashboard guest={mockGuest} />
}
