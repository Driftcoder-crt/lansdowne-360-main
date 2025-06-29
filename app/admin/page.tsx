
"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { useEffect, useState } from "react"

interface DashboardStats {
  totalHotels: number
  activeHotels: number
  comingSoon: number
  totalBookings: number
  bookingsChange: string
  revenue: string
  revenueChange: string
  occupancyRate: string
  occupancyStatus: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-neutral-600">Loading dashboard...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Total Hotels</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalHotels}</p>
          <p className="text-sm text-green-600 mt-1">{stats?.activeHotels} Active, {stats?.comingSoon} Coming Soon</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalBookings}</p>
          <p className="text-sm text-green-600 mt-1">{stats?.bookingsChange} from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.revenue}</p>
          <p className="text-sm text-green-600 mt-1">{stats?.revenueChange} from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500 mb-2">Occupancy Rate</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.occupancyRate}</p>
          <p className="text-sm text-green-600 mt-1">{stats?.occupancyStatus}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-neutral-100">
            <div>
              <p className="font-medium text-neutral-900">New booking received</p>
              <p className="text-sm text-neutral-500">AI Hotel Lansdowne - Deluxe Valley View</p>
            </div>
            <span className="text-sm text-neutral-500">2 minutes ago</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-neutral-100">
            <div>
              <p className="font-medium text-neutral-900">Room maintenance completed</p>
              <p className="text-sm text-neutral-500">Room 205 - AI Hotel Lansdowne</p>
            </div>
            <span className="text-sm text-neutral-500">1 hour ago</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-neutral-900">New review posted</p>
              <p className="text-sm text-neutral-500">5-star review for AI Hotel Lansdowne</p>
            </div>
            <span className="text-sm text-neutral-500">3 hours ago</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-lg text-white">
          <h3 className="font-semibold mb-2">Manage Rooms</h3>
          <p className="text-amber-100 mb-4">Add, edit, or update room availability</p>
          <a href="/admin/rooms" className="bg-white text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors">
            Go to Rooms
          </a>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <h3 className="font-semibold mb-2">View Reservations</h3>
          <p className="text-blue-100 mb-4">Check bookings and manage guests</p>
          <a href="/admin/reservations" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            View Bookings
          </a>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <h3 className="font-semibold mb-2">Hotel Settings</h3>
          <p className="text-green-100 mb-4">Configure hotel information and policies</p>
          <a href="/admin/settings" className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
            Settings
          </a>
        </div>
      </div>
    </AdminLayout>
  )
}
