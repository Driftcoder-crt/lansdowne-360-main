"use client"

import { useState } from "react"
import { DatePicker, Select } from "@/components/ui/forms"
import { ButtonPrimary } from "@/components/ui/buttons"

export const QuickBookingSection = () => {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()

  const guestOptions = [
    { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adults" },
    { value: "3", label: "2 Adults, 1 Child" },
    { value: "4", label: "2 Adults, 2 Children" },
    { value: "family", label: "Family (4+)" },
  ]

  const roomTypeOptions = [
    { value: "all", label: "All Rooms" },
    { value: "deluxe", label: "Deluxe Room" },
    { value: "suite", label: "Luxury Suite" },
    { value: "presidential", label: "Presidential Suite" },
  ]

  return (
    <section className="bg-white shadow-2xl -mt-20 relative z-20 mx-4 md:mx-8 rounded-3xl">
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
          <DatePicker label="Check In" value={checkIn} onChange={setCheckIn} />
          <DatePicker label="Check Out" value={checkOut} onChange={setCheckOut} />
          <Select label="Guests" options={guestOptions} defaultValue="2" />
          <Select label="Room Type" options={roomTypeOptions} defaultValue="all" />
          <ButtonPrimary size="lg" className="h-12">
            Search Availability
          </ButtonPrimary>
        </div>
      </div>
    </section>
  )
}
