// src/app/subscription/manage/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, CreditCard, AlertCircle } from 'lucide-react' 
import Navbar from '@/components/landing/navbar'

export default function ManageSubscription() {
  const { data: session, status } = useSession()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    console.log('Session status:', status)
    console.log('Session data:', session)
    
    if (status === 'authenticated' && session?.user?.id) {
      fetchSubscription()
    } else if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [session, status])

  const fetchSubscription = async () => {
    try {
      console.log('Fetching subscription for user:', session.user.id)
      const response = await fetch(`/api/subscriptions?userId=${session.user.id}`)
      const data = await response.json()
      
      console.log('Subscription data received:', data)
      setSubscription(data)
      
      if (response.ok && !data) {
        console.log('No active subscription found')
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      try {
        const response = await fetch(`/api/subscriptions/${subscription._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'cancelled' })
        })
        
        if (response.ok) {
          await fetchSubscription()
        } else {
          throw new Error('Failed to cancel subscription')
        }
      } catch (error) {
        setError(error.message)
      }
    }
  }

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-600 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Error: {error}
          </div>
        </div>
      </>
    )
  }

  if (!subscription) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold">No Active Subscription</h2>
              <p className="mt-4 text-gray-600">Subscribe to start your hypnotherapy journey</p>
              {process.env.NODE_ENV === 'development' && (
                <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-left text-sm">
                  {JSON.stringify({ session, status }, null, 2)}
                </pre>
              )}
              <button
                onClick={() => router.push('/subscription')}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Your Subscription</h2>

            <div className="space-y-6">
              {/* Subscription Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-lg font-medium capitalize">{subscription.plan} Plan</p>
                  <p className="text-gray-600">
                    ${subscription.price}/{subscription.billingCycle}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  subscription.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {subscription.status}
                </span>
              </div>

              {/* Subscription Details */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-medium">
                      {new Date(subscription.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Next Billing Date</p>
                    <p className="font-medium">
                      {new Date(subscription.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Sessions Remaining</p>
                    <p className="font-medium">
                      {subscription.sessions.remaining} of {subscription.sessions.total}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {subscription.status === 'active' && (
                <div className="pt-6 border-t">
                  <button
                    onClick={handleCancelSubscription}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}