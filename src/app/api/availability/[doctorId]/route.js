
// src/app/api/availability/[doctorId]/route.js
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/app/models/User'
import Booking from '@/app/models/Booking'

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    await connectDB()
    
    // Get doctor's availability
    const doctor = await User.findById(params.doctorId)
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      )
    }

    // Get already booked slots
    const bookings = await Booking.find({
      doctorId: params.doctorId,
      date: date,
      status: 'confirmed'
    }).select('time')

    const bookedSlots = bookings.map(b => b.time)

    // Generate available time slots (9 AM to 5 PM)
    const allSlots = []
    for (let hour = 9; hour < 17; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`
      if (!bookedSlots.includes(timeSlot)) {
        allSlots.push(timeSlot)
      }
    }

    return NextResponse.json(allSlots)
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}