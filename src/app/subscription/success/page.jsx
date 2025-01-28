// src/app/subscription/success/page.jsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react' 
import Navbar from '@/components/landing/navbar'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('processing')
  const [error, setError] = useState(null)

  useEffect(() => {
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
          })

          if (response.ok) {
            setStatus('success')
            // Wait a bit before redirecting
            setTimeout(() => {
              router.push('/subscription/manage')
            }, 5000)
          } else {
            throw new Error('Payment verification failed')
          }
        } catch (error) {
          console.error('Payment verification failed:', error)
          setStatus('error')
          setError(error.message)
        }
      }
    }

    verifyPayment()
  }, [sessionId, router])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {status === 'processing' && (
              <div className="text-center">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Processing Your Payment</h1>
                <p className="text-gray-600">
                  Please wait while we confirm your payment...
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                  Thank you for subscribing to QUMEDIC. Your account has been activated.
                </p>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800">
                      You will be redirected to your subscription dashboard in a few seconds...
                    </p>
                  </div>
                  <button
                    onClick={() => router.push('/subscription/manage')}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Go to Dashboard Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❌</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
                <p className="text-red-600 mb-6">
                  {error || 'There was an error processing your payment.'}
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/subscription')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                  <p className="text-sm text-gray-600">
                    If you continue to have issues, please contact our support team.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}