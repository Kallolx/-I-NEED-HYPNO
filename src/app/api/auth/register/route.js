// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server'
import User from '@/app/models/User'
import connectDB from '@/lib/mongodb'

export async function POST(request) {
  try {
    console.log('Connecting to DB...')
    await connectDB()
    console.log('DB Connected')

    const data = await request.json()
    console.log('Received data:', data)

    const { name, email, password } = data
    
    const existingUser = await User.findOne({ email })
    console.log('Existing user check:', existingUser)

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    console.log('Creating new user...')
    const user = await User.create({ name, email, password })
    console.log('User created:', user)

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}