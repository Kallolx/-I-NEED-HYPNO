// src/app/admin/analytics/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'
import { Calendar, Users, Headphones, TrendingUp } from 'lucide-react'

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    bookingsTrend: [],
    popularDoctors: [],
    audioStats: [],
    revenue: []
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    const res = await fetch('/api/admin/analytics')
    const data = await res.json()
    setAnalytics(data)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Analytics Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bookings Trend */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Bookings Trend</h2>
            <LineChart width={500} height={300} data={analytics.bookingsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#3B82F6" />
            </LineChart>
          </div>

          {/* Popular Doctors */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Top Performing Doctors</h2>
            <BarChart width={500} height={300} data={analytics.popularDoctors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessions" fill="#3B82F6" />
            </BarChart>
          </div>

          {/* Audio Library Stats */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Audio Library Performance</h2>
            <div className="space-y-4">
              {analytics.audioStats.map(stat => (
                <div key={stat.bundle} className="flex items-center justify-between">
                  <span>{stat.bundle}</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{stat.plays} plays</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      stat.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stat.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Overview */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
            <LineChart width={500} height={300} data={analytics.revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#10B981" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard