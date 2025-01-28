// src/app/api/admin/dashboard/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import Doctor from '@/app/models/Doctor'
import Audio from '@/app/models/Audio'
import User from '@/app/models/User'
import Subscription from '@/app/models/Subscription'
import connectDB from '@/lib/mongodb'

export async function GET(request) {
  try {
    const session = await getServerSession()
    
    // Check if user is admin
    if (!session?.user?.role === 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    // Get counts and stats
    const [
      totalDoctors,
      totalAudios,
      totalSubscribers,
      monthlyRevenue
    ] = await Promise.all([
      Doctor.countDocuments(),
      Audio.countDocuments(),
      User.countDocuments({ role: 'user' }),
      calculateMonthlyRevenue()
    ])

    return NextResponse.json({
      totalDoctors,
      totalAudios,
      totalSubscribers,
      revenue: formatCurrency(monthlyRevenue)
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}

async function calculateMonthlyRevenue() {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const subscriptions = await Subscription.find({
    createdAt: { $gte: startOfMonth },
    status: 'active',
    paymentStatus: 'completed'
  })

  return subscriptions.reduce((total, sub) => total + (sub.price || 0), 0)
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}