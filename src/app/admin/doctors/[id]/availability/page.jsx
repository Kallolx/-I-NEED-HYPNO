// src/app/admin/doctors/[id]/availability/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { Clock, Plus, X } from 'lucide-react'

const AvailabilityManagement = ({ params }) => {
  const [availability, setAvailability] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  })

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
  ]

  const fetchAvailability = async () => {
    const response = await fetch(`/api/doctors/${params.id}/availability`)
    const data = await response.json()
    if (data) setAvailability(data)
  }

  const updateAvailability = async (day, slot) => {
    const updatedSlots = availability[day].includes(slot)
      ? availability[day].filter(s => s !== slot)
      : [...availability[day], slot]

    setAvailability({ ...availability, [day]: updatedSlots })

    await fetch(`/api/doctors/${params.id}/availability`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [day]: updatedSlots })
    })
  }

  useEffect(() => {
    fetchAvailability()
  }, [params.id])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Clock className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold">Manage Availability</h1>
          </div>

          {Object.entries(availability).map(([day, slots]) => (
            <div key={day} className="mb-6">
              <h2 className="text-lg font-semibold capitalize mb-3">{day}</h2>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => updateAvailability(day, time)}
                    className={`p-2 rounded-lg ${
                      slots.includes(time)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AvailabilityManagement