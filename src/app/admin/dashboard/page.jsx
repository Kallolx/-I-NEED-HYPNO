// src/app/admin/dashboard/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { Users, Calendar, Headphones, ArrowUp, ArrowDown } from 'lucide-react'

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalBookings: 0,
    totalAudios: 0,
    recentBookings: [],
    popularAudios: []
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    const res = await fetch('/api/admin/dashboard')
    const data = await res.json()
    setStats(data)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Doctors</p>
                <h3 className="text-3xl font-bold">{stats.totalDoctors}</h3>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Bookings</p>
                <h3 className="text-3xl font-bold">{stats.totalBookings}</h3>
              </div>
              <Calendar className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Audio Tracks</p>
                <h3 className="text-3xl font-bold">{stats.totalAudios}</h3>
              </div>
              <Headphones className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            <div className="space-y-4">
              {stats.recentBookings.map(booking => (
                <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.doctorName}</p>
                    <p className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Audios */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Popular Audio Tracks</h2>
            <div className="space-y-4">
              {stats.popularAudios.map(audio => (
                <div key={audio._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{audio.title}</p>
                    <p className="text-sm text-gray-600">{audio.bundle}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{audio.plays} plays</span>
                    {audio.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview