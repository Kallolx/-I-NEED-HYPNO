// src/app/subscription/page.jsx
'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PaymentButtons from '@/components/PaymentButtons'

const plans = [
  {
    name: 'Basic',
    id: 'basic',
    price: {
      monthly: 49,
      yearly: 470,
    },
    features: [
      '2 Sessions per month',
      'Basic Audio Library Access',
      'Email Support',
      'Mobile App Access',
    ],
    sessions: {
      total: 2
    }
  },
  // ... other plans
]

export default function SubscriptionPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [billingCycle, setBillingCycle] = useState('monthly')

  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      const subscriptionData = {
        userId: session.user.id,
        plan: selectedPlan.id,
        sessions: selectedPlan.sessions,
        audioAccess: true,
        price: selectedPlan.price[billingCycle],
        billingCycle,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString(),
        paymentDetails
      }

      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionData)
      })

      if (response.ok) {
        router.push('/subscription/manage')
      }
    } catch (error) {
      console.error('Subscription creation error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg ${
                billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg ${
                billingCycle === 'yearly' ? 'bg-blue-600 text-white' : 'text-gray-700'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                selectedPlan?.id === plan.id ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-bold">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-500">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="ml-3">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-gray-50">
                {selectedPlan?.id === plan.id ? (
                  <PaymentButtons
                    plan={plan}
                    billingCycle={billingCycle}
                    onSuccess={handlePaymentSuccess}
                  />
                ) : (
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    Select Plan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}