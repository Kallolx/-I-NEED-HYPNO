// src/app/api/admin/doctors/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import bcrypt from 'bcryptjs'
import User from '@/app/models/User'
import connectDB from '@/lib/mongodb'

export async function POST(request) {
  try {
    // Check admin authentication
    const session = await getServerSession()
    if (!session?.user?.role === 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Connect to database
    await connectDB()

    // Parse request data
    const data = await request.json()
    console.log('Received data:', data) // Debug log

    // Validate required fields
    if (!data.email || !data.password || !data.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Create user with doctor role
    const doctor = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'doctor',
      specialization: data.specialization,
      bio: data.bio
    })

    // Remove password from response
    const doctorResponse = {
      id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      role: doctor.role,
      specialization: doctor.specialization,
      bio: doctor.bio
    }

    console.log('Created doctor:', doctorResponse) // Debug log
    return NextResponse.json(doctorResponse)
  } catch (error) {
    console.error('Server error creating doctor:', error) // Debug log
    return NextResponse.json(
      { error: error.message || 'Failed to create doctor' },
      { status: 500 }
    )
  }
}

export async function GET() {
    try {
      console.log('Starting to fetch doctors') // Debug log
      
      // Check admin authentication
      const session = await getServerSession()
      console.log('Session:', session) // Debug log
  
      if (!session?.user?.role === 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
  
      await connectDB()
      console.log('Connected to DB') // Debug log
  
      // Find all users with role 'doctor'
      const doctors = await User.find({ role: 'doctor' })
        .select('-password') // Exclude password
        .lean() // Convert to plain JS objects
  
      console.log('Found doctors:', doctors) // Debug log
  
      return NextResponse.json(doctors)
    } catch (error) {
      console.error('Error in GET /api/admin/doctors:', error)
      return NextResponse.json(
        { error: 'Failed to fetch doctors' },
        { status: 500 }
      )
    }
  }