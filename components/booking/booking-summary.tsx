"use client"
import { Room, BookingData, GuestInfo } from "@/lib/types"
import { HeadingMD, HeadingSM, BodyBase, PriceText } from "@/components/ui/typography"
import { Card } from "@/components/ui/cards"
import { ButtonPrimary, ButtonGhost } from "@/components/ui/buttons"
import { Calendar, Users, Mail, Phone } from "lucide-react"

interface BookingSummaryProps {
  room: Room
  bookingData: BookingData
  guestInfo: GuestInfo
  onConfirm: () => void
  onBack: () => void
}

export const BookingSummary = ({ 
  room, 
  bookingData, 
  guestInfo, 
  onConfirm, 
  onBack 
}: BookingSummaryProps) => {
  const nights = Math.ceil(
    (bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24)
  )
  const totalAmount = room.price * nights * bookingData.rooms

  return (
    <div className="space-y-6">
      <HeadingMD>Booking Summary</HeadingMD>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Room Details */}
          <Card className="p-6">
            <HeadingSM className="mb-4">Room Details</HeadingSM>
            <div className="flex gap-4">
              <img
                src={room.heroImage || "/placeholder.svg"}
                alt={room.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{room.name}</h4>
                <p className="text-sm text-neutral-600 mb-2">{room.category}</p>
                <PriceText amount={room.price} period="per night" />
              </div>
            </div>
          </Card>

          {/* Booking Details */}
          <Card className="p-6">
            <HeadingSM className="mb-4">Booking Details</HeadingSM>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-neutral-500 mr-3" />
                <span className="text-sm">
                  {bookingData.checkIn.toLocaleDateString()} - {bookingData.checkOut.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-neutral-500 mr-3" />
                <span className="text-sm">
                  {bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}, {bookingData.rooms} room{bookingData.rooms > 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-semibold">{nights} night{nights > 1 ? 's' : ''}</span>
              </div>
            </div>
          </Card>

          {/* Guest Information */}
          <Card className="p-6">
            <HeadingSM className="mb-4">Guest Information</HeadingSM>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">
                  {guestInfo.firstName} {guestInfo.lastName}
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-neutral-500 mr-3" />
                <span className="text-sm">{guestInfo.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-neutral-500 mr-3" />
                <span className="text-sm">{guestInfo.phone}</span>
              </div>
              {guestInfo.specialRequests && (
                <div>
                  <p className="text-sm font-semibold mb-1">Special Requests:</p>
                  <p className="text-sm text-neutral-600">{guestInfo.specialRequests}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Price Breakdown */}
        <div>
          <Card className="p-6 sticky top-6">
            <HeadingSM className="mb-4">Price Breakdown</HeadingSM>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Room rate ({nights} night{nights > 1 ? 's' : ''})</span>
                <span className="text-sm">${room.price * nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Number of rooms</span>
                <span className="text-sm">×{bookingData.rooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Taxes & fees</span>
                <span className="text-sm">$0</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <ButtonPrimary className="w-full" onClick={onConfirm}>
                Confirm Booking
              </ButtonPrimary>
              <ButtonGhost className="w-full" onClick={onBack}>
                Back to Guest Info
              </ButtonGhost>
            </div>

            <div className="mt-4 text-xs text-neutral-500 text-center">
              ✓ Free cancellation until 24 hours before check-in
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
