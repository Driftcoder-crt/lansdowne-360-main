"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/cards"
import { HeadingMD, HeadingSM } from "@/components/ui/typography"
import { Input, Select, Textarea } from "@/components/ui/forms"
import { ButtonPrimary } from "@/components/ui/buttons"

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
]

import { GuestInfo } from "@/lib/types"

interface GuestInformationFormProps {
  onSubmit: (guestInfo: GuestInfo) => void
  initialData?: GuestInfo
}

export const GuestInformationForm = ({ onSubmit, initialData }: GuestInformationFormProps) => {  
  const [formData, setFormData] = useState<GuestInfo>(initialData || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
  <Card className="p-8">
    <HeadingMD className="mb-6">Guest Information</HeadingMD>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          name="firstName"
          label="First Name" 
          value={formData.firstName}
          onChange={handleChange}
          required 
        />
        <Input 
          name="lastName"
          label="Last Name" 
          value={formData.lastName}
          onChange={handleChange}
          required 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          name="email"
          label="Email Address" 
          type="email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <Input 
          name="phone"
          label="Phone Number" 
          type="tel" 
          value={formData.phone}
          onChange={handleChange}
          required 
        />
      </div>

      <Textarea 
        name="specialRequests"
        label="Special Requests" 
        placeholder="Any special accommodations or requests..." 
        value={formData.specialRequests || ''}
        onChange={handleChange}
      />

      <div className="border-t border-neutral-200 pt-6">
        <HeadingSM className="mb-4">Additional Guests</HeadingSM>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Guest 2 - First Name" />
            <Input label="Guest 2 - Last Name" />
          </div>
        </div>
        <button type="button" className="mt-4 text-amber-600 hover:text-amber-700 font-medium">
          + Add Another Guest
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 text-amber-600 border-neutral-300 rounded focus:ring-amber-500"
          required
        />
        <label htmlFor="terms" className="text-sm text-neutral-700">
          I agree to the{" "}
          <Link href="/terms" className="text-amber-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-amber-600 hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <ButtonPrimary type="submit" className="w-full">
        Continue to Payment
      </ButtonPrimary>
    </form>
  </Card>
  )
}
