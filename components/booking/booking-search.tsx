"use client"

import { useState } from "react"
import { Card } from "@/components/ui/cards"
import { HeadingMD } from "@/components/ui/typography"
import { DatePicker, Select, Input } from "@/components/ui/forms"
import { ButtonPrimary } from "@/components/ui/buttons"
import type { BookingData } from "@/lib/types"

interface BookingSearchProps {
  onSearch: (data: BookingData) => void
  initialData?: BookingData
}

export const BookingSearch = ({ onSearch, initialData }: BookingSearchProps) => {
  const [checkIn, setCheckIn] = useState<Date>(initialData?.checkIn || new Date())
  const [checkOut, setCheckOut] = useState<Date>(initialData?.checkOut || new Date())
  const [guests, setGuests] = useState<number>(initialData?.guests || 1)
  const [rooms, setRooms] = useState<number>(initialData?.rooms || 1)

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

  const specialRequestOptions = [
    { value: "none", label: "No Special Requests" },
    { value: "anniversary", label: "Anniversary Celebration" },
    { value: "birthday", label: "Birthday Celebration" },
    { value: "business", label: "Business Travel" },
    { value: "honeymoon", label: "Honeymoon" },
    { value: "accessibility", label: "Accessibility Needs" },
  ]

  const handleSubmit = () => {
    if (checkIn && checkOut) {
      onSearch({
        checkIn,
        checkOut,
        guests,
        rooms
      })
    }
  }

  return (
    <Card className="p-8">
      <HeadingMD className="mb-6">Find Your Perfect Stay</HeadingMD>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DatePicker label="Check-in Date" value={checkIn} onChange={(date) => date && setCheckIn(date)} />
        <DatePicker label="Check-out Date" value={checkOut} onChange={(date) => date && setCheckOut(date)} />
        <Select 
          label="Guests" 
          options={guestOptions} 
          defaultValue={guests.toString()} 
          onChange={(e) => setGuests(parseInt(e.target.value))} 
        />
        <Select 
          label="Room Type" 
          options={roomTypeOptions} 
          defaultValue="all" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Input label="Promo Code" placeholder="Enter code" />
        <Select 
          label="Rooms" 
          options={[
            { value: "1", label: "1 Room" },
            { value: "2", label: "2 Rooms" },
            { value: "3", label: "3 Rooms" },
          ]} 
          defaultValue={rooms.toString()} 
          onChange={(e) => setRooms(parseInt(e.target.value))} 
        />
        <Select label="Special Requests" options={specialRequestOptions} defaultValue="none" />
        <div className="flex items-end">
          <ButtonPrimary className="w-full" onClick={handleSubmit}>Search Rooms</ButtonPrimary>
        </div>
      </div>
    </Card>
  )
}
