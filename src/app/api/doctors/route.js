// src/app/api/doctors/route.js
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/app/models/User'

export async function GET() {
  try {
    await connectDB()
    const doctors = await User.find({ role: 'doctor' })
      .select('name email specialization bio')
      .lean()
    
    return NextResponse.json(doctors)
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    )
  }
}
