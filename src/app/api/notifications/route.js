// src/app/api/notifications/route.js
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import Booking from '@/app/models/Booking'

export async function POST(request) {
  const { type, bookingId } = await request.json()
  
  const booking = await Booking.findById(bookingId)
    .populate('doctorId', 'name')
    .populate('userId', 'email')
  
  const emailData = {
    date: booking.date,
    slot: booking.slot,
    doctorName: booking.doctorId.name
  }
  
  await sendEmail(booking.userId.email, type, emailData)
  
  return NextResponse.json({ success: true })
}