
"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Save, Upload, Bell, Shield, Globe, CreditCard } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    hotelName: "AI 360° Hotel",
    tagline: "Experience Luxury Redefined",
    email: "contact@ai360hotel.com",
    phone: "+91 1234567890",
    address: "Lansdowne, Uttarakhand, India",
    website: "https://ai360hotel.com",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "24 hours",
    currency: "INR",
    timezone: "Asia/Kolkata",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingNotifications: true,
    paymentNotifications: true
  })

  const handleSave = () => {
    // Save settings logic
    alert("Settings saved successfully!")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
            <p className="text-neutral-600 mt-1">Manage hotel configuration and preferences</p>
          </div>
          <button 
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Information */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <Globe className="w-5 h-5 text-amber-600 mr-2" />
                <h2 className="text-lg font-semibold text-neutral-900">Hotel Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Hotel Name</label>
                  <input
                    type="text"
                    value={settings.hotelName}
                    onChange={(e) => setSettings({...settings, hotelName: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Address</label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Booking Policies */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-amber-600 mr-2" />
                <h2 className="text-lg font-semibold text-neutral-900">Booking Policies</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Check-in Time</label>
                  <input
                    type="time"
                    value={settings.checkInTime}
                    onChange={(e) => setSettings({...settings, checkInTime: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Check-out Time</label>
                  <input
                    type="time"
                    value={settings.checkOutTime}
                    onChange={(e) => setSettings({...settings, checkOutTime: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Cancellation Policy</label>
                  <select
                    value={settings.cancellationPolicy}
                    onChange={(e) => setSettings({...settings, cancellationPolicy: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="24 hours">24 hours</option>
                    <option value="48 hours">48 hours</option>
                    <option value="72 hours">72 hours</option>
                    <option value="7 days">7 days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <Bell className="w-5 h-5 text-amber-600 mr-2" />
                <h2 className="text-lg font-semibold text-neutral-900">Notification Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-neutral-900">Email Notifications</div>
                    <div className="text-sm text-neutral-500">Receive notifications via email</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-neutral-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-neutral-900">SMS Notifications</div>
                    <div className="text-sm text-neutral-500">Receive notifications via SMS</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-neutral-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-neutral-900">Push Notifications</div>
                    <div className="text-sm text-neutral-500">Receive push notifications</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-neutral-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Hotel Logo</h3>
              <div className="text-center">
                <div className="mb-4">
                  <img src="/images/logo1.svg" alt="Current Logo" className="h-16 mx-auto" />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Logo
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-neutral-900">System Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Booking System</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Payment Gateway</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Email Service</span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Running
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Active Sessions</span>
                  <span className="text-sm font-medium text-neutral-900">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Pending Bookings</span>
                  <span className="text-sm font-medium text-neutral-900">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">System Uptime</span>
                  <span className="text-sm font-medium text-green-600">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
