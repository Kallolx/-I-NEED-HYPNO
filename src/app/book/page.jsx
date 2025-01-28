// src/app/book/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, User, ArrowRight, Shield, Star, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/Footer'

export default function BookingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDoctors()
  }, [])
  useEffect(() => {
    if (session) {
      console.log('Current session:', session) // Debug log
    }
  }, [session])
  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors')
      if (!res.ok) throw new Error('Failed to fetch doctors')
      const data = await res.json()
      setDoctors(data)
    } catch (error) {
      setError('Error loading doctors')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      const res = await fetch(`/api/availability/${doctorId}?date=${date}`)
      if (!res.ok) throw new Error('Failed to fetch slots')
      const data = await res.json()
      setAvailableSlots(data)
    } catch (error) {
      setError('Error loading available slots')
      console.error(error)
    }
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    if (selectedDoctor) {
      fetchAvailableSlots(selectedDoctor._id, date)
    }
  }

  const handleBooking = async () => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const bookingData = {
        doctorId: selectedDoctor._id,
        date: selectedDate,
        time: selectedTime
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          setError('This time slot is already booked. Please select another time.');
          // Refresh available slots
          await fetchAvailableSlots(selectedDoctor._id, selectedDate);
          return;
        }
        throw new Error(data.error || 'Failed to create booking');
      }

      router.push('/bookings/success');
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-blue-600 font-semibold mb-4 block">Book Your Session</span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Healing Journey</h1>
            <p className="text-lg text-gray-600">
              Schedule a personalized hypnotherapy session with our certified experts
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-between mb-12 relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ 
                    width: selectedTime ? '100%' : selectedDate ? '66%' : selectedDoctor ? '33%' : '0%' 
                  }}
                />
              </div>

              {/* Step Indicators */}
              {[
                { icon: User, label: 'Select Doctor', active: !!selectedDoctor },
                { icon: Calendar, label: 'Choose Date', active: !!selectedDate },
                { icon: Clock, label: 'Select Time', active: !!selectedTime }
              ].map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step.active 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    step.active ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                {error}
              </div>
            ) : (
              <div className="space-y-8">
                {/* Doctor Selection */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-semibold mb-6">Select Your Doctor</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {doctors.map((doctor) => (
                      <div
                        key={doctor._id}
                        onClick={() => setSelectedDoctor(doctor)}
                        className={`group p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedDoctor?._id === doctor._id
                            ? 'border-blue-600 bg-blue-50/50'
                            : 'border-gray-100 hover:border-blue-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                              selectedDoctor?._id === doctor._id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 group-hover:bg-blue-50 text-gray-700'
                            }`}>
                              <span className="text-2xl font-semibold">{doctor.name[0]}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                            <p className="text-gray-600">{doctor.specialization}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm text-gray-600">4.9 (120+ reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                {selectedDoctor && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-6">Select Date</h2>
                    <div className="grid grid-cols-7 gap-3">
                      {[...Array(7)].map((_, index) => {
                        const date = new Date()
                        date.setDate(date.getDate() + index)
                        const isSelected = selectedDate === date.toISOString().split('T')[0]
                        
                        return (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(date.toISOString().split('T')[0])}
                            className={`p-4 rounded-xl transition-all duration-300 ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                : 'hover:bg-blue-50 border border-gray-100'
                            }`}
                          >
                            <div className="text-sm font-medium">
                              {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="text-2xl font-bold mt-1">
                              {date.getDate()}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Time Selection */}
                {selectedDate && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-6">Select Time</h2>
                    <div className="grid grid-cols-4 gap-3">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 px-4 rounded-xl transition-all duration-300 ${
                            selectedTime === slot
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                              : 'bg-gray-50 hover:bg-blue-50 text-gray-900'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Booking Summary & Button */}
                {selectedDoctor && selectedDate && selectedTime && (
                  <div className="bg-blue-50 rounded-2xl p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <Shield className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Secure Booking Protection</h3>
                        <p className="text-gray-600 text-sm">
                          Your session is protected by our secure booking system and covered by our satisfaction guarantee.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleBooking}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                      Confirm Booking
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}