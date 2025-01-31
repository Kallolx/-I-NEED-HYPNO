import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Import mockAudios and mockPurchases from the audios route
import { mockAudios, mockPurchases } from '../audios/route.js'

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { audioId } = await req.json()
    if (!audioId) {
      return NextResponse.json({ error: 'Audio ID is required' }, { status: 400 })
    }

    // Find the audio in mock storage
    const audio = mockAudios.find(a => a._id === audioId)
    if (!audio) {
      return NextResponse.json({ error: 'Audio not found' }, { status: 404 })
    }

    // Here you would typically integrate with a payment processor like Stripe
    // For now, we'll just record the purchase in mock storage

    // Get user's purchases or create new array
    const userPurchases = mockPurchases.get(session.user.email) || []
    
    // Add the audio to user's purchased list if not already purchased
    if (!userPurchases.includes(audioId)) {
      userPurchases.push(audioId)
      mockPurchases.set(session.user.email, userPurchases)
    }

    return NextResponse.json({ 
      success: true,
      message: 'Audio purchased successfully'
    })
  } catch (error) {
    console.error('Error in POST /api/purchase-audio:', error)
    return NextResponse.json(
      { error: 'Error processing purchase' },
      { status: 500 }
    )
  }
} 