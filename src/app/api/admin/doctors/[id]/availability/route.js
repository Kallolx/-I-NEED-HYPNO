// src/app/api/admin/doctors/[id]/availability/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import User from '@/app/models/User'
import connectDB from '@/lib/mongodb'

// GET doctor's availability
export async function GET(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user?.role === 'admin' && session?.user?.id !== params.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()
    const doctor = await User.findById(params.id).select('availability')
    
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(doctor.availability || {})
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}

// Update doctor's availability
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user?.role === 'admin' && session?.user?.id !== params.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()
    const availability = await request.json()

    const doctor = await User.findByIdAndUpdate(
      params.id,
      { $set: { availability } },
      { new: true }
    ).select('availability')

    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(doctor.availability)
  } catch (error) {
    console.error('Error updating availability:', error)
    return NextResponse.json(
      { error: 'Failed to update availability' },
      { status: 500 }
    )
  }
}