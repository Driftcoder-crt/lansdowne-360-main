"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus } from "lucide-react"
import { toast } from "sonner"

interface Amenity {
  id: number
  name: string
  description: string
  icon: string
  category: string
  status?: string
  created_at?: string
}

const ICON_OPTIONS = [
  "UtensilsCrossed", "Sparkles", "Mountain", "TreePine", "Camera", 
  "Users", "Wifi", "Clock", "Car", "Dumbbell", "Waves", "Coffee"
]

const CATEGORY_OPTIONS = [
  "dining", "wellness", "activities", "business", "connectivity", "service", "recreation"
]

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "UtensilsCrossed",
    category: "dining"
  })

  useEffect(() => {
    fetchAmenities()
  }, [])

  const fetchAmenities = async () => {
    try {
      console.log('Fetching amenities for admin...')
      const response = await fetch('/api/frontend/amenities')
      if (response.ok) {
        const data = await response.json()
        setAmenities(data)
      }
    } catch (error) {
      console.error('Error fetching amenities:', error)
      toast.error('Failed to fetch amenities')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        // Update existing amenity
        const updatedAmenities = amenities.map(a => 
          a.id === editingId ? { ...a, ...formData } : a
        )
        setAmenities(updatedAmenities)
        toast.success('Amenity updated successfully')
      } else {
        // Add new amenity
        const newAmenity: Amenity = {
          id: Date.now(),
          ...formData
        }
        setAmenities([newAmenity, ...amenities])
        toast.success('Amenity added successfully')
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving amenity:', error)
      toast.error('Failed to save amenity')
    }
  }

  const handleEdit = (amenity: Amenity) => {
    setEditingId(amenity.id)
    setFormData({
      name: amenity.name,
      description: amenity.description,
      icon: amenity.icon,
      category: amenity.category
    })
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this amenity?')) {
      try {
        setAmenities(amenities.filter(a => a.id !== id))
        toast.success('Amenity deleted successfully')
      } catch (error) {
        console.error('Error deleting amenity:', error)
        toast.error('Failed to delete amenity')
      }
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      name: "",
      description: "",
      icon: "UtensilsCrossed",
      category: "dining"
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      dining: "bg-orange-100 text-orange-800",
      wellness: "bg-green-100 text-green-800",
      activities: "bg-blue-100 text-blue-800",
      business: "bg-purple-100 text-purple-800",
      connectivity: "bg-cyan-100 text-cyan-800",
      service: "bg-yellow-100 text-yellow-800",
      recreation: "bg-pink-100 text-pink-800"
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading amenities...</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Amenities Management</h1>
          <p className="text-gray-600">Manage hotel amenities and facilities</p>
        </div>
        <Badge variant="secondary">{amenities.length} amenities</Badge>
      </div>

      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Amenity' : 'Add New Amenity'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amenity Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter amenity name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  {CATEGORY_OPTIONS.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                {ICON_OPTIONS.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter amenity description"
                rows={3}
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit">
                <Plus className="w-4 h-4 mr-2" />
                {editingId ? 'Update' : 'Add'} Amenity
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Amenities List */}
      <div className="grid gap-4">
        {amenities.map((amenity) => (
          <Card key={amenity.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{amenity.name}</h3>
                    <Badge className={getCategoryColor(amenity.category)}>
                      {amenity.category}
                    </Badge>
                    <Badge variant="outline">{amenity.icon}</Badge>
                  </div>
                  <p className="text-gray-600">{amenity.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(amenity)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(amenity.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {amenities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No amenities found. Add your first amenity above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}