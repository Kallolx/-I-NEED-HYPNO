// src/app/api/bookings/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Booking from '@/app/models/Booking';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();

    // Check if time slot is already booked
    const existingBooking = await Booking.findOne({
      doctorId: data.doctorId,
      date: data.date,
      time: data.time,
      status: { $ne: 'cancelled' } // Exclude cancelled bookings
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please select another time.' },
        { status: 409 }
      );
    }

    // Create the booking
    const booking = await Booking.create({
      userId: session.user.id,
      doctorId: data.doctorId,
      date: data.date,
      time: data.time,
      status: 'confirmed'
    });

    return NextResponse.json({
      success: true,
      booking: booking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'This slot is already booked. Please choose a different time.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}