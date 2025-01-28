// src/app/profile/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { User, Calendar, Settings, Clock } from 'lucide-react'

const UserProfile = () => {
  const { data: session } = useSession()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    preferences: {}
  })
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile()
      fetchUserBookings()
    }
  }, [session])

  const fetchUserProfile = async () => {
    const res = await fetch(`/api/users/${session.user.id}`)
    const data = await res.json()
    setProfile(data)
  }

  const fetchUserBookings = async () => {
    const res = await fetch(`/api/bookings?userId=${session.user.id}`)
    const data = await res.json()
    setBookings(data)
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <User className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold">Profile Information</h2>
              </div>
              <form onSubmit={updateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
              </div>
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking._id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{booking.doctorId.name}</span>
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.date).toLocaleDateString()} at {booking.slot}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile