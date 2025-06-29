"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import {
  Crown,
  Sparkles,
  CalendarIcon,
  Users,
  Star,
  Award,
  Wifi,
  Coffee,
  Shield,
  Utensils,
  Car,
  Heart,
  Camera,
  Waves,
  Dumbbell,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LuxuryHotelApp() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                ÉLITE PALACE
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#rooms" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">
                Rooms & Suites
              </Link>
              <Link href="#amenities" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">
                Amenities
              </Link>
              <Link href="#dining" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">
                Dining
              </Link>
              <Link href="#spa" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">
                Spa & Wellness
              </Link>
              <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                Book Now
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="/images/hero-hotel.jpg" alt="Luxury Hotel Exterior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-amber-600/20 text-amber-200 border-amber-400/30">
            <Sparkles className="w-4 h-4 mr-1" />
            Celebrating Excellence Since 1925
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Experience
            <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Unparalleled Luxury
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-2xl mx-auto">
            Where timeless elegance meets modern sophistication in the heart of the city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-lg px-8 py-3"
            >
              Reserve Your Stay
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-3"
            >
              Virtual Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Booking */}
      <section className="bg-white shadow-xl -mt-20 relative z-20 mx-4 md:mx-8 rounded-2xl">
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="checkin" className="text-slate-700 font-medium">
                Check In
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkout" className="text-slate-700 font-medium">
                Check Out
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Guests</Label>
              <Select>
                <SelectTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="2 Adults" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Adult</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">2 Adults, 1 Child</SelectItem>
                  <SelectItem value="4">2 Adults, 2 Children</SelectItem>
                  <SelectItem value="family">Family (4+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Room Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Rooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deluxe">Deluxe Room</SelectItem>
                  <SelectItem value="suite">Luxury Suite</SelectItem>
                  <SelectItem value="presidential">Presidential Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 h-10">
              Search Availability
            </Button>
          </div>
        </div>
      </section>

      {/* Rooms & Suites */}
      <section id="rooms" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Accommodations</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Rooms & Suites</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Each room is a masterpiece of design, comfort, and luxury amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Deluxe Room */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/deluxe-room.jpg"
                  alt="Deluxe Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Deluxe Room</CardTitle>
                <CardDescription className="text-slate-600">
                  Elegant comfort with city views and premium amenities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-amber-600">$450</span>
                  <span className="text-slate-500">per night</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-slate-600">
                    <Wifi className="w-4 h-4 mr-2 text-amber-600" />
                    Complimentary WiFi
                  </li>
                  <li className="flex items-center text-slate-600">
                    <Coffee className="w-4 h-4 mr-2 text-amber-600" />
                    24/7 Room Service
                  </li>
                  <li className="flex items-center text-slate-600">
                    <Shield className="w-4 h-4 mr-2 text-amber-600" />
                    Premium Security
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            {/* Luxury Suite */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/luxury-suite.jpg"
                  alt="Luxury Suite"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                    <Award className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Luxury Suite</CardTitle>
                <CardDescription className="text-slate-600">
                  Spacious elegance with separate living area and panoramic views
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-amber-600">$850</span>
                  <span className="text-slate-500">per night</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-slate-600">
                    <Sparkles className="w-4 h-4 mr-2 text-amber-600" />
                    Butler Service
                  </li>
                  <li className="flex items-center text-slate-600">
                    <Utensils className="w-4 h-4 mr-2 text-amber-600" />
                    Private Dining
                  </li>
                  <li className="flex items-center text-slate-600">
                    <Car className="w-4 h-4 mr-2 text-amber-600" />
                    Chauffeur Service
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            {/* Presidential Suite */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/presidential-suite.jpg"
                  alt="Presidential Suite"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-amber-600 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Exclusive
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Presidential Suite</CardTitle>
                <CardDescription className="text-slate-600">
                  The pinnacle of luxury with private terrace and exclusive amenities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-amber-600">$1,500</span>
                  <span className="text-slate-500">per night</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-slate-600">
                    <Crown className="w-4 h-4 mr-2 text-amber-600" />
                    Personal Concierge
                  </li>
                  <li className="flex items-center text-slate-600">
                    <Heart className="w-4 h-4 mr-2 text-amber-600" />
                    Spa Access
                  </li>
                  <li className="flex items-center text-slate-600">
                    <Camera className="w-4 h-4 mr-2 text-amber-600" />
                    Private Terrace
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-800">World-Class Facilities</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Luxury Amenities</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Indulge in our comprehensive collection of premium facilities and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Waves className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Infinity Pool</h3>
              <p className="text-slate-600">Rooftop infinity pool with panoramic city views</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Dumbbell className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Fitness Center</h3>
              <p className="text-slate-600">State-of-the-art equipment with personal trainers</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Utensils className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Fine Dining</h3>
              <p className="text-slate-600">Michelin-starred restaurants and exclusive bars</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Car className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Valet Service</h3>
              <p className="text-slate-600">Premium valet parking and luxury car service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spa & Wellness */}
      <section id="spa" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800">Wellness & Relaxation</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Rejuvenate Your Senses</h2>
              <p className="text-xl text-slate-600 mb-8">
                Our award-winning spa offers a sanctuary of tranquility with world-class treatments and therapies
                designed to restore your mind, body, and spirit.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Signature massage therapies</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Himalayan salt rooms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Thermal pools and saunas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Personalized wellness programs</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                Book Spa Treatment
              </Button>
            </div>
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden">
              <Image src="/images/spa.jpg" alt="Luxury Spa" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Dining */}
      <section id="dining" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image src="/images/restaurant.jpg" alt="Fine Dining Restaurant" fill className="object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-amber-100 text-amber-800">Culinary Excellence</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Exquisite Dining</h2>
              <p className="text-xl text-slate-600 mb-8">
                Savor exceptional cuisine crafted by world-renowned chefs using the finest ingredients. From intimate
                dinners to grand celebrations, every meal is an experience.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Michelin-starred fine dining</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Rooftop cocktail lounge</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">Private dining rooms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                  <span className="text-slate-700">24-hour room service</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                Make Reservation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pool Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Aquatic Paradise</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Infinity Pool & Deck</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Dive into luxury at our rooftop infinity pool with breathtaking city skyline views
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image src="/images/pool.jpg" alt="Infinity Pool" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Open 24/7</h3>
              <p className="text-slate-200">Pool service available until midnight</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Crown className="h-8 w-8 text-amber-400" />
                <h3 className="text-2xl font-bold">ÉLITE PALACE</h3>
              </div>
              <p className="text-slate-400 mb-4">
                Where luxury meets perfection. Experience the finest hospitality in the heart of the city.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-amber-400 mr-3" />
                  <span className="text-slate-400">123 Luxury Avenue, City Center</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-amber-400 mr-3" />
                  <span className="text-slate-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-amber-400 mr-3" />
                  <span className="text-slate-400">reservations@elitepalace.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Luxury Accommodations</li>
                <li>Fine Dining</li>
                <li>Spa & Wellness</li>
                <li>Event Planning</li>
                <li>Concierge Services</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-slate-400 mb-4">Subscribe for exclusive offers and updates</p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} Élite Palace Hotel. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
