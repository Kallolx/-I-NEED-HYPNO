// src/app/api/doctors/[id]/availability/route.js
import { NextResponse } from 'next/server'
import Doctor from '@/app/models/Doctor'
import connectDB from '@/lib/mongodb'

export async function GET(request, { params }) {
  await connectDB()
  const doctor = await Doctor.findById(params.id)
  return NextResponse.json(doctor.availability)
}

export async function PUT(request, { params }) {
  const updates = await request.json()
  await connectDB()
  
  const doctor = await Doctor.findByIdAndUpdate(
    params.id,
    { $set: { availability: updates } },
    { new: true }
  )
  
  return NextResponse.json(doctor.availability)
}