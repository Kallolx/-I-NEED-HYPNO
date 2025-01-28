// src/app/bookings/success/page.jsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Calendar, Clock } from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Link from 'next/link'

export default function BookingSuccess() {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully booked. You will receive a confirmation email shortly.
              </p>
            </div>

            <div className="space-y-4">
              {/* Actions */}
              <Link 
                href="/dashboard"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
              >
                View My Bookings
              </Link>
              
              <Link
                href="/book"
                className="block w-full bg-gray-100 text-gray-800 text-center py-3 rounded-lg hover:bg-gray-200"
              >
                Book Another Session
              </Link>
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Need to make changes to your booking?{' '}
                <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}