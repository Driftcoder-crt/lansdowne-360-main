
'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Bed, Users, DollarSign, Building, Star } from 'lucide-react'
import { toast } from 'sonner'

interface AdminRoom {
  id: number
  hotel_id: number
  number: string
  name: string
  slug: string
  type: string
  category: string
  price: number
  original_price?: number
  size?: number
  max_guests: number
  bed_type: string
  bathrooms?: number
  floor?: number
  description: string
  short_description?: string
  hero_image?: string
  images?: string
  amenities: string
  features?: string
  views?: string
  status: string
  popular?: boolean
  rating?: number
  review_count?: number
  hotel_name: string
  hotel_location: string
  created_at?: string
  updated_at?: string
}

interface Hotel {
  id: number
  name: string
  location: string
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<AdminRoom[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<AdminRoom | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    hotel_id: '',
    number: '',
    name: '',
    type: '',
    category: '',
    price: '',
    original_price: '',
    size: '',
    max_guests: '',
    bed_type: '',
    bathrooms: '1',
    floor: '',
    description: '',
    short_description: '',
    hero_image: '',
    images: '',
    amenities: '',
    features: '',
    views: '',
    status: 'available',
    popular: false,
    rating: '0',
    review_count: '0'
  })

  useEffect(() => {
    fetchRooms()
    fetchHotels()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/admin/rooms')
      if (response.ok) {
        const data = await response.json()
        setRooms(data)
      }
    } catch (error) {
      console.error('Error fetching rooms:', error)
      toast.error('Failed to fetch rooms')
    } finally {
      setLoading(false)
    }
  }

  const fetchHotels = async () => {
    try {
      const response = await fetch('/api/admin/hotels')
      if (response.ok) {
        const data = await response.json()
        setHotels(data)
      }
    } catch (error) {
      console.error('Error fetching hotels:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingRoom ? '/api/admin/rooms' : '/api/admin/rooms'
      const method = editingRoom ? 'PUT' : 'POST'
      
      // Process form data
      const processedData = {
        ...formData,
        hotel_id: Number(formData.hotel_id),
        price: Number(formData.price),
        original_price: formData.original_price ? Number(formData.original_price) : null,
        size: formData.size ? Number(formData.size) : null,
        max_guests: Number(formData.max_guests),
        bathrooms: Number(formData.bathrooms),
        floor: formData.floor ? Number(formData.floor) : null,
        rating: Number(formData.rating),
        review_count: Number(formData.review_count),
        // Process arrays
        images: formData.images ? formData.images.split(',').map(img => img.trim()) : [],
        features: formData.features ? formData.features.split(',').map(feature => feature.trim()) : [],
        views: formData.views ? formData.views.split(',').map(view => view.trim()) : [],
        // Process amenities as array of objects
        amenities: formData.amenities ? formData.amenities.split(',').map(amenity => {
          const trimmed = amenity.trim();
          return {
            name: trimmed,
            icon: getIconForAmenity(trimmed),
            category: getCategoryForAmenity(trimmed)
          };
        }) : []
      }
      
      const body = editingRoom 
        ? { ...processedData, id: editingRoom.id }
        : processedData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        toast.success(editingRoom ? 'Room updated successfully' : 'Room created successfully')
        fetchRooms()
        setIsDialogOpen(false)
        resetForm()
      } else {
        toast.error('Failed to save room')
      }
    } catch (error) {
      console.error('Error saving room:', error)
      toast.error('Failed to save room')
    }
  }
  
  // Helper functions for amenities
  const getIconForAmenity = (name: string): string => {
    const iconMap: {[key: string]: string} = {
      'WiFi': 'wifi',
      'Air Conditioning': 'wind',
      'TV': 'tv',
      'Mini Bar': 'wine',
      'Coffee Maker': 'coffee',
      'Safe': 'lock',
      'Balcony': 'home',
      'Ocean View': 'eye',
      'Mountain View': 'mountain',
      'City View': 'building',
      'King Bed': 'bed',
      'Queen Bed': 'bed',
      'Twin Beds': 'bed',
      'Bathtub': 'bath',
      'Shower': 'droplet',
      'Room Service': 'bell',
      'Gym Access': 'dumbbell',
      'Spa Access': 'heart',
      'Pool Access': 'droplets',
      'Breakfast': 'coffee'
    };
    
    return iconMap[name] || 'circle';
  }
  
  const getCategoryForAmenity = (name: string): string => {
    const categoryMap: {[key: string]: string} = {
      'WiFi': 'technology',
      'Air Conditioning': 'comfort',
      'TV': 'entertainment',
      'Mini Bar': 'service',
      'Coffee Maker': 'service',
      'Safe': 'service',
      'Balcony': 'comfort',
      'Ocean View': 'comfort',
      'Mountain View': 'comfort',
      'City View': 'comfort',
      'King Bed': 'comfort',
      'Queen Bed': 'comfort',
      'Twin Beds': 'comfort',
      'Bathtub': 'bathroom',
      'Shower': 'bathroom',
      'Room Service': 'service',
      'Gym Access': 'service',
      'Spa Access': 'service',
      'Pool Access': 'service',
      'Breakfast': 'service'
    };
    
    return categoryMap[name] || 'comfort';
  }

  const handleEdit = (room: AdminRoom) => {
    setEditingRoom(room)
    setFormData({
      hotel_id: room.hotel_id.toString(),
      number: room.number,
      name: room.name,
      type: room.type,
      category: room.category,
      price: room.price.toString(),
      original_price: room.original_price?.toString() || '',
      size: room.size?.toString() || '',
      max_guests: room.max_guests.toString(),
      bed_type: room.bed_type || '',
      bathrooms: room.bathrooms?.toString() || '1',
      floor: room.floor?.toString() || '',
      description: room.description || '',
      short_description: room.short_description || '',
      hero_image: room.hero_image || '',
      images: room.images || '',
      amenities: room.amenities || '',
      features: room.features || '',
      views: room.views || '',
      status: room.status,
      popular: room.popular || false,
      rating: room.rating?.toString() || '0',
      review_count: room.review_count?.toString() || '0'
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return

    try {
      const response = await fetch(`/api/admin/rooms?id=${roomId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Room deleted successfully')
        fetchRooms()
      } else {
        toast.error('Failed to delete room')
      }
    } catch (error) {
      console.error('Error deleting room:', error)
      toast.error('Failed to delete room')
    }
  }

  const resetForm = () => {
    setFormData({
      hotel_id: '',
      number: '',
      name: '',
      type: '',
      category: '',
      price: '',
      original_price: '',
      size: '',
      max_guests: '',
      bed_type: '',
      bathrooms: '1',
      floor: '',
      description: '',
      short_description: '',
      hero_image: '',
      images: '',
      amenities: '',
      features: '',
      views: '',
      status: 'available',
      popular: false,
      rating: '0',
      review_count: '0'
    })
    setEditingRoom(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'occupied': return 'bg-red-100 text-red-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'cleaning': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-neutral-600">Loading rooms...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Rooms Management</h1>
            <p className="text-neutral-600 mt-1">Manage room inventory across all hotels</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Room
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hotel_id">Hotel</Label>
                      <Select value={formData.hotel_id} onValueChange={(value) => setFormData({...formData, hotel_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hotel" />
                        </SelectTrigger>
                        <SelectContent>
                          {hotels.map((hotel) => (
                            <SelectItem key={hotel.id} value={hotel.id.toString()}>
                              {hotel.name} - {hotel.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="number">Room Number</Label>
                      <Input
                        id="number"
                        value={formData.number}
                        onChange={(e) => setFormData({...formData, number: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">Room Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Deluxe">Deluxe</SelectItem>
                          <SelectItem value="Suite">Suite</SelectItem>
                          <SelectItem value="Presidential">Presidential</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="deluxe">Deluxe</SelectItem>
                          <SelectItem value="suite">Suite</SelectItem>
                          <SelectItem value="presidential">Presidential</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="cleaning">Cleaning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="max_guests">Max Guests</Label>
                      <Input
                        id="max_guests"
                        type="number"
                        value={formData.max_guests}
                        onChange={(e) => setFormData({...formData, max_guests: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="bed_type">Bed Type</Label>
                      <Select value={formData.bed_type} onValueChange={(value) => setFormData({...formData, bed_type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bed type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Double">Double</SelectItem>
                          <SelectItem value="Queen">Queen</SelectItem>
                          <SelectItem value="King">King</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="short_description">Short Description</Label>
                      <Textarea
                        id="short_description"
                        value={formData.short_description}
                        onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="size">Room Size (sq ft)</Label>
                      <Input
                        id="size"
                        type="number"
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="original_price">Original Price (₹)</Label>
                      <Input
                        id="original_price"
                        type="number"
                        step="0.01"
                        value={formData.original_price}
                        onChange={(e) => setFormData({...formData, original_price: e.target.value})}
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <Label htmlFor="floor">Floor</Label>
                      <Input
                        id="floor"
                        type="number"
                        value={formData.floor}
                        onChange={(e) => setFormData({...formData, floor: e.target.value})}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero_image">Hero Image URL</Label>
                      <Input
                        id="hero_image"
                        value={formData.hero_image}
                        onChange={(e) => setFormData({...formData, hero_image: e.target.value})}
                        placeholder="/path/to/image.jpg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="images">Additional Images (comma-separated)</Label>
                      <Input
                        id="images"
                        value={formData.images}
                        onChange={(e) => setFormData({...formData, images: e.target.value})}
                        placeholder="/image1.jpg, /image2.jpg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                      <Textarea
                        id="amenities"
                        value={formData.amenities}
                        onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                        placeholder="WiFi, AC, TV, Mini Bar, etc."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="features">Features (comma-separated)</Label>
                      <Textarea
                        id="features"
                        value={formData.features}
                        onChange={(e) => setFormData({...formData, features: e.target.value})}
                        placeholder="Balcony, Work Desk, etc."
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="views">Views (comma-separated)</Label>
                      <Input
                        id="views"
                        value={formData.views}
                        onChange={(e) => setFormData({...formData, views: e.target.value})}
                        placeholder="Ocean, Mountain, City, etc."
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="popular"
                        checked={formData.popular}
                        onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <Label htmlFor="popular" className="text-sm font-medium text-gray-700">Mark as Popular</Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rating">Rating (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="review_count">Review Count</Label>
                      <Input
                        id="review_count"
                        type="number"
                        value={formData.review_count}
                        onChange={(e) => setFormData({...formData, review_count: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingRoom ? 'Update Room' : 'Create Room'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <p className="text-sm text-neutral-600 mt-1">
                      <Building className="w-4 h-4 inline mr-1" />
                      {room.hotel_name}
                    </p>
                  </div>
                  <Badge className={getStatusColor(room.status)}>
                    {room.status}
                  </Badge>
                </div>
                {room.popular && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-2 py-1 rounded-full -mt-2 -mr-2">
                    Popular
                  </span>
                )}
              </CardHeader>
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={room.hero_image || '/placeholder.jpg'} 
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2 text-neutral-500" />
                    Room {room.number}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-neutral-500" />
                    Max {room.max_guests}
                  </div>
                  <div className="flex items-center">
                    {room.original_price ? (
                      <div className="flex flex-col">
                        <span className="line-through text-gray-500 text-xs">₹{room.original_price}</span>
                        <span>₹{room.price}</span>
                      </div>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 mr-2 text-neutral-500" />
                        ₹{room.price}
                      </>
                    )}
                  </div>
                  <div className="text-neutral-600">
                    {room.bed_type || 'N/A'} bed
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-1 text-amber-500" />
                  <span className="mr-1">{room.rating || '0'}</span>
                  <span className="text-xs text-gray-500">({room.review_count || '0'} reviews)</span>
                </div>
                
                {room.short_description ? (
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {room.short_description}
                  </p>
                ) : room.description && (
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {room.description}
                  </p>
                )}
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(room)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(room.id.toString())}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <Bed className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Rooms Found</h3>
            <p className="text-neutral-600 mb-4">Get started by adding your first room.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
