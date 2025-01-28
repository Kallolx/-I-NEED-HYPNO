// src/components/PaymentButtons.jsx
'use client'
import { useState } from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function PaymentButtons({ plan, billingCycle, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const amount = plan.price[billingCycle]

  const handleStripePayment = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('Creating Stripe checkout session...')
      const response = await fetch('/api/create-stripe-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan.id,
          billingCycle,
          amount
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create checkout session')
      }

      const { id: sessionId } = await response.json()
      console.log('Stripe session created:', sessionId)

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to initialize')
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        throw error
      }
    } catch (err) {
      console.error('Stripe payment error:', err)
      setError(err.message || 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-800 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {/* Stripe Button */}
      <button
        onClick={handleStripePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Pay with Card'
        )}
      </button>

      {/* PayPal Button */}
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  currency_code: "USD"
                },
                description: `${plan.name} Plan - ${billingCycle}`
              }
            ]
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture()
          onSuccess(order)
        }}
        onError={(err) => {
          console.error('PayPal error:', err)
          setError('PayPal payment failed. Please try again.')
        }}
        style={{ layout: "horizontal" }}
      />
    </div>
  )
}