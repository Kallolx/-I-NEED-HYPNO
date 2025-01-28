// src/app/api/admin/doctors/[id]/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import User from '@/app/models/User'
import connectDB from '@/lib/mongodb'

// Get a single doctor's details
export async function GET(request, { params }) {
  try {
    // 1. Check authentication
    const session = await getServerSession()
    if (!session?.user?.role === 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Connect to database
    await connectDB()

    // 3. Find doctor by ID (params.id contains the [id] from the URL)
    const doctor = await User.findById(params.id)
      .select('-password') // Exclude password from the response
    
    // 4. Handle case where doctor isn't found
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      )
    }

    // 5. Return doctor data
    return NextResponse.json(doctor)
  } catch (error) {
    console.error('Error fetching doctor:', error)
    return NextResponse.json(
      { error: 'Failed to fetch doctor' },
      { status: 500 }
    )
  }
}

// Update a doctor's information
export async function PUT(request, { params }) {
  try {
    // 1. Check authentication
    const session = await getServerSession()
    if (!session?.user?.role === 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Connect to database
    await connectDB()

    // 3. Get update data from request body
    const data = await request.json()

    // 4. Security: Remove sensitive fields
    delete data.role    // Prevent role changing
    delete data.password // Don't update password through this route

    // 5. Update doctor
    const doctor = await User.findByIdAndUpdate(
      params.id,  // ID from URL
      { $set: data }, // New data to set
      { new: true }   // Return updated document
    ).select('-password')

    // 6. Handle not found case
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      )
    }

    // 7. Return updated doctor data
    return NextResponse.json(doctor)
  } catch (error) {
    console.error('Error updating doctor:', error)
    return NextResponse.json(
      { error: 'Failed to update doctor' },
      { status: 500 }
    )
  }
}

// Delete a doctor
export async function DELETE(request, { params }) {
  try {
    // 1. Check authentication
    const session = await getServerSession()
    if (!session?.user?.role === 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Connect to database
    await connectDB()

    // 3. Delete doctor
    const doctor = await User.findByIdAndDelete(params.id)

    // 4. Handle not found case
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      )
    }

    // 5. Return success message
    return NextResponse.json({ 
      message: 'Doctor deleted successfully',
      deletedId: params.id
    })
  } catch (error) {
    console.error('Error deleting doctor:', error)
    return NextResponse.json(
      { error: 'Failed to delete doctor' },
      { status: 500 }
    )
  }
}