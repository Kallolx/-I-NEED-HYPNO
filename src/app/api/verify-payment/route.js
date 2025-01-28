// src/app/api/verify-payment/route.js
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSession } from 'next-auth/next'
import Subscription from '@/app/models/Subscription'
import connectDB from '@/lib/mongodb'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { sessionId } = await request.json()
    
    // Get the authenticated user
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Retrieve the Stripe session
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (!stripeSession) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Get subscription details from metadata
    const { plan, billingCycle } = stripeSession.metadata

    // Calculate subscription end date
    const startDate = new Date()
    const endDate = new Date()
    if (billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1)
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1)
    }

    // Create subscription record
    const subscription = await Subscription.create({
      userId: session.user.id,
      plan,
      status: 'active',
      startDate,
      endDate,
      billingCycle,
      stripeSubscriptionId: stripeSession.subscription,
      paymentStatus: 'completed',
      paymentMethod: 'stripe'
    })

    return NextResponse.json({ success: true, subscription })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    )
  }
}