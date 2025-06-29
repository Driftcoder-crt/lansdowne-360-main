"use client"
import { useState } from "react"
import { BookingSearch } from "@/components/booking/booking-search"
import RoomSelection from "@/components/booking/room-selection"
import { BookingSummary } from "@/components/booking/booking-summary"
import { GuestInformationForm } from "@/components/booking/guest-information-form"
import type { Room, BookingData, GuestInfo, SearchCriteria } from "@/lib/types"

// Room data is now fetched from the API in the RoomSelection component

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 1,
    rooms: 1
  })
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  })

  const handleSearch = (data: BookingData) => {
    setBookingData(data)
    setCurrentStep(2)
  }

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room)
    setCurrentStep(3)
  }

  const handleGuestInfoSubmit = (info: GuestInfo) => {
    setGuestInfo(info)
    setCurrentStep(4)
  }

  const handleBookingConfirm = async () => {
    // Handle booking confirmation
    console.log("Booking confirmed:", { selectedRoom, bookingData, guestInfo })
    // Redirect to confirmation page or show success message
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Book Your Stay</h1>

          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step
                        ? "bg-amber-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-12 h-1 ${
                        currentStep > step ? "bg-amber-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          {currentStep === 1 && (
            <BookingSearch onSearch={handleSearch} initialData={bookingData} />
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <RoomSelection 
                searchCriteria={bookingData} 
                onSelect={handleRoomSelect}
              />
            </div>
          )}

          {currentStep === 3 && selectedRoom && (
            <GuestInformationForm 
              onSubmit={handleGuestInfoSubmit}
              initialData={guestInfo}
            />
          )}

          {currentStep === 4 && selectedRoom && (
            <BookingSummary
              room={selectedRoom}
              bookingData={bookingData}
              guestInfo={guestInfo}
              onConfirm={handleBookingConfirm}
              onBack={() => setCurrentStep(3)}
            />
          )}
        </div>
      </div>
    </div>
  )
}