// src/app/bookings/success/page.jsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Calendar, Clock } from 'lucide-react'
import Navbar from '@/components/landing/navbar'

export default function BookingSuccess() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/dashboard')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your session has been successfully booked. You will receive a confirmation email shortly.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Go to Dashboard
              </button>
              
              <button
                onClick={() => router.push('/book')}
                className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200"
              >
                Book Another Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}