
"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { MapPin, Star, Users, Calendar, Plus, Edit, Eye, Trash2, Building } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

interface Hotel {
  id: number
  name: string
  slug: string
  location: string
  status: string
  description: string
  address: string
  phone: string
  email: string
  heroImage: string
  roomCount: number
  currentBookings: number
  monthlyRevenue: number
  createdAt: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "coming-soon":
      return "bg-yellow-100 text-yellow-800"
    case "maintenance":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    location: '',
    status: 'active',
    description: '',
    address: '',
    phone: '',
    email: '',
    heroImage: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchHotels()
  }, [])

  const fetchHotels = async () => {
    try {
      const response = await fetch('/api/admin/hotels')
      if (response.ok) {
        const data = await response.json()
        setHotels(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch hotels",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch hotels",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = '/api/admin/hotels'
      const method = editingHotel ? 'PUT' : 'POST'
      const payload = editingHotel ? { ...formData, id: editingHotel.id } : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Hotel ${editingHotel ? 'updated' : 'created'} successfully`,
        })
        setIsDialogOpen(false)
        setEditingHotel(null)
        setFormData({
          name: '',
          slug: '',
          location: '',
          status: 'active',
          description: '',
          address: '',
          phone: '',
          email: '',
          heroImage: ''
        })
        fetchHotels()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to save hotel",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save hotel",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel)
    setFormData({
      name: hotel.name,
      slug: hotel.slug,
      location: hotel.location,
      status: hotel.status,
      description: hotel.description,
      address: hotel.address || '',
      phone: hotel.phone || '',
      email: hotel.email || '',
      heroImage: hotel.heroImage || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (hotel: Hotel) => {
    if (!confirm(`Are you sure you want to delete ${hotel.name}? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/hotels?id=${hotel.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Hotel deleted successfully",
        })
        fetchHotels()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to delete hotel",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete hotel",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-neutral-600">Loading hotels...</div>
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
            <h1 className="text-2xl font-bold text-neutral-900">Hotels Management</h1>
            <p className="text-neutral-600 mt-1">Manage all hotels in the AI 360° chain</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Hotel
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Hotel Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="coming-soon">Coming Soon</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="heroImage">Hero Image URL</Label>
                    <Input
                      id="heroImage"
                      value={formData.heroImage}
                      onChange={(e) => setFormData({...formData, heroImage: e.target.value})}
                      placeholder="/images/hotel-hero.jpg"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingHotel ? 'Update' : 'Create'} Hotel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={hotel.heroImage || "/placeholder.svg"}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getStatusColor(hotel.status)}>
                    {hotel.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-neutral-900">{hotel.name}</h3>
                    <p className="text-neutral-600 text-sm flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hotel.location}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-neutral-900">{hotel.roomCount}</div>
                    <div className="text-xs text-neutral-500">Rooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-neutral-900">{hotel.currentBookings}</div>
                    <div className="text-xs text-neutral-500">Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-neutral-900">₹{(hotel.monthlyRevenue / 100000).toFixed(1)}L</div>
                    <div className="text-xs text-neutral-500">Revenue</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(hotel)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(hotel)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Hotels Found</h3>
            <p className="text-neutral-600 mb-4">Get started by adding your first hotel.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Hotel
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
