
'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, User, Building, CreditCard, Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface Booking {
  id: number
  confirmation_number: string
  guest_name: string
  hotel_name: string
  room_number: string
  check_in: string
  check_out: string
  guests_count: number
  total: number
  status: string
  payment_status: string
  created_at: string
}

export default function ReservationsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/reservations')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Failed to fetch reservations')
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/reservations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })

      if (response.ok) {
        toast.success('Booking status updated')
        fetchBookings()
      } else {
        toast.error('Failed to update booking status')
      }
    } catch (error) {
      console.error('Error updating booking:', error)
      toast.error('Failed to update booking status')
    }
  }

  const deleteBooking = async (id: number) => {
    if (!confirm('Are you sure you want to delete this reservation?')) return

    try {
      const response = await fetch(`/api/admin/reservations?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Reservation deleted successfully')
        fetchBookings()
      } else {
        toast.error('Failed to delete reservation')
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
      toast.error('Failed to delete reservation')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'checked-in': return 'bg-blue-100 text-blue-800'
      case 'checked-out': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filterStatus)

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-neutral-600">Loading reservations...</p>
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
            <h1 className="text-2xl font-bold text-neutral-900">Reservations</h1>
            <p className="text-neutral-600 mt-1">Manage all hotel reservations and bookings</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-amber-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600">Total Reservations</p>
                  <p className="text-2xl font-bold text-neutral-900">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600">Confirmed</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600">Checked In</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {bookings.filter(b => b.status === 'checked-in').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    ₹{bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.total, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                    <div>
                      <p className="text-sm font-medium text-neutral-600">Guest</p>
                      <p className="font-semibold text-neutral-900">{booking.guest_name}</p>
                      <p className="text-sm text-neutral-500">#{booking.confirmation_number}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-600">Hotel & Room</p>
                      <p className="font-semibold text-neutral-900">{booking.hotel_name}</p>
                      <p className="text-sm text-neutral-500">Room {booking.room_number}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-600">Dates</p>
                      <p className="font-semibold text-neutral-900">
                        {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-neutral-500">{booking.guests_count} guests</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-600">Amount</p>
                      <p className="font-semibold text-neutral-900">₹{booking.total.toLocaleString()}</p>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {booking.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Confirm
                      </Button>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'checked-in')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Check In
                      </Button>
                    )}
                    {booking.status === 'checked-in' && (
                      <Button
                        size="sm"
                        onClick={() => updateBookingStatus(booking.id, 'checked-out')}
                        className="bg-gray-600 hover:bg-gray-700"
                      >
                        Check Out
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteBooking(booking.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Reservations Found</h3>
            <p className="text-neutral-600">
              {filterStatus === 'all' ? 'No reservations have been made yet.' : `No ${filterStatus} reservations found.`}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
