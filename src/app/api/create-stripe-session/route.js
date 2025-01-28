import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'  // Adjust path to your NextAuth config

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    // Get the session using authOptions
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the host from headers
    const headersList = headers()
    const host = headersList.get('host')
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const baseUrl = `${protocol}://${host}`

    console.log('Creating Stripe session...')
    const { plan, billingCycle, amount } = await request.json()

    console.log('Payment details:', { plan, billingCycle, amount })

    // Create or retrieve a product
    const product = await stripe.products.create({
      name: `${plan} Plan - ${billingCycle}`,
    })

    // Create a price for the product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      recurring: {
        interval: billingCycle === 'monthly' ? 'month' : 'year',
      },
    })

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/subscription`,
      metadata: {
        plan,
        billingCycle,
        userId: session.user.id,
      },
      customer_email: session.user.email,
    })

    console.log('Stripe session created:', checkoutSession.id)
    return NextResponse.json({ id: checkoutSession.id })
  } catch (error) {
    console.error('Stripe session creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment session' },
      { status: 500 }
    )
  }
}
