"use client"
import { Star, Users, Bed, Wifi, Coffee } from "lucide-react"
import { HeadingMD, HeadingSM, BodyBase, PriceText } from "@/components/ui/typography"
import { Card } from "@/components/ui/cards"
import { ButtonPrimary, ButtonGhost } from "@/components/ui/buttons"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/forms"
import type { Room } from "@/lib/types"
import { useState, useEffect } from "react"

interface SearchCriteria {
  checkIn: Date
  checkOut: Date
  guests: number
  rooms: number
}

interface RoomSelectionProps {
  searchCriteria: SearchCriteria
  onSelect?: (room: Room) => void
}

export default function RoomSelection({ searchCriteria, onSelect }: RoomSelectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("price-low")
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  
  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Guest Rating" },
    { value: "size", label: "Room Size" },
  ]

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/frontend/rooms')
        
        if (!response.ok) {
          throw new Error('Failed to fetch rooms')
        }
        
        const data = await response.json()
        setRooms(data)
      } catch (err) {
        console.error('Error fetching rooms:', err)
        setError('Unable to load available rooms. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchRooms()
  }, [])
  
  // Filter and sort rooms based on search criteria and sort option
  useEffect(() => {
    if (!rooms.length) return
    
    // Filter rooms based on search criteria
    let filtered = rooms.filter(room => {
      // Only show available rooms
      if (room.status !== 'available') return false
      
      // Filter by max guests
      if (room.maxGuests < searchCriteria.guests) return false
      
      return true
    })
    
    // Sort rooms based on selected option
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case 'size':
        filtered = [...filtered].sort((a, b) => b.size - a.size)
        break
      default:
        break
    }
    
    setFilteredRooms(filtered)
  }, [rooms, searchCriteria, sortBy])

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room)
    console.log(`Selected room: ${room.name}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <HeadingMD>Available Rooms</HeadingMD>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-neutral-600">Sort by:</span>
          <Select 
            options={sortOptions} 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-neutral-600">Loading available rooms...</p>
        </div>
      )}

      {error && (
        <div className="py-8 text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && filteredRooms.length === 0 && (
        <div className="py-12 text-center">
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">No Rooms Available</h3>
            <p>We couldn't find any rooms matching your search criteria. Try adjusting your dates or guest count.</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!loading && filteredRooms.map((room) => (
          <Card key={room.id} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 relative">
                <img
                  src={room.heroImage || "/placeholder.jpg"}
                  alt={room.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {room.popular && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <HeadingSM className="mb-1">{room.name}</HeadingSM>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{room.category}</Badge>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-sm text-neutral-600 ml-1">{room.rating}</span>
                        <span className="text-xs text-neutral-500 ml-1">({room.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <BodyBase className="mb-4">{room.shortDescription || room.description}</BodyBase>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-neutral-500 mr-2" />
                    <span className="text-sm">{room.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 text-neutral-500 mr-2" />
                    <span className="text-sm">{room.bedType}</span>
                  </div>
                  {room.amenities && room.amenities.length > 0 && room.amenities.slice(0, 2).map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenity.icon === 'wifi' && <Wifi className="w-4 h-4 text-neutral-500 mr-2" />}
                      {amenity.icon === 'coffee' && <Coffee className="w-4 h-4 text-neutral-500 mr-2" />}
                      <span className="text-sm">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1 text-right">
                <div className="mb-4">
                  {room.originalPrice ? (
                    <div>
                      <span className="line-through text-neutral-500 text-sm">₹{room.originalPrice}</span>
                      <PriceText amount={room.price} period="per night" />
                    </div>
                  ) : (
                    <PriceText amount={room.price} period="per night" />
                  )}
                  <div className="text-sm text-neutral-500">
                    Total: ₹{room.price * (Math.ceil((searchCriteria.checkOut.getTime() - searchCriteria.checkIn.getTime()) / (1000 * 60 * 60 * 24)) || 1)}
                  </div>
                </div>

                <div className="space-y-2">
                  <ButtonPrimary 
                     className="w-full"
                     onClick={() => {
                       setSelectedRoom(room);
                       if (onSelect) onSelect(room);
                     }}
                   >
                     {selectedRoom?.id === room.id ? "Selected" : "Select Room"}
                   </ButtonPrimary>
                  <ButtonGhost
                    className="w-full"
                    onClick={() => console.log('View details for', room.name)}
                  >
                    View Details
                  </ButtonGhost>
                </div>

                <div className="mt-3 text-xs text-green-600">✓ Free cancellation</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}