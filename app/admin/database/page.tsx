
"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Database, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { useState } from "react"

export default function DatabasePage() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleInitializeDatabase = async () => {
    setIsInitializing(true)
    setInitStatus('idle')
    setMessage('')

    try {
      const response = await fetch('/api/database/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setInitStatus('success')
        setMessage(data.message)
      } else {
        setInitStatus('error')
        setMessage(data.error || 'Failed to initialize database')
      }
    } catch (error) {
      setInitStatus('error')
      setMessage('Network error occurred')
      console.error('Database initialization error:', error)
    }

    setIsInitializing(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Database Management</h1>
            <p className="text-neutral-600 mt-1">Initialize and manage your hotel database</p>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center mb-4">
            <Database className="w-5 h-5 text-amber-600 mr-2" />
            <h2 className="text-lg font-semibold text-neutral-900">Database Setup</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 mb-2">First Time Setup</h3>
              <p className="text-amber-700 text-sm mb-4">
                Click the button below to initialize your database with all necessary tables and sample data.
                This will create tables for hotels, rooms, bookings, guests, staff, and admin users.
              </p>
              
              <button
                onClick={handleInitializeDatabase}
                disabled={isInitializing}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInitializing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4 mr-2" />
                    Initialize Database
                  </>
                )}
              </button>
            </div>

            {/* Status Message */}
            {initStatus !== 'idle' && (
              <div className={`border rounded-lg p-4 ${
                initStatus === 'success' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center">
                  {initStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <span className={`font-medium ${
                    initStatus === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {initStatus === 'success' ? 'Success!' : 'Error!'}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${
                  initStatus === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {message}
                </p>
              </div>
            )}

            {/* Database Info */}
            <div className="bg-neutral-50 rounded-lg p-4">
              <h3 className="font-medium text-neutral-900 mb-2">Database Information</h3>
              <div className="text-sm text-neutral-600 space-y-1">
                <p><strong>Provider:</strong> PostgreSQL (Replit)</p>
                <p><strong>Tables:</strong> hotels, rooms, bookings, guests, staff, admin_users, service_requests</p>
                <p><strong>Default Admin:</strong> username: admin, password: ai360hotel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
