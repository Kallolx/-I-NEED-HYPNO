// src/app/api/bookings/user/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Booking from '@/app/models/Booking';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const bookings = await Booking.find({ 
      userId: session.user.id,
      status: { $ne: 'cancelled' }  // Exclude cancelled bookings
    })
    .populate('doctorId', 'name')  // Get doctor's name
    .sort({ date: 1, time: 1 })    // Sort by date and time
    .lean();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}