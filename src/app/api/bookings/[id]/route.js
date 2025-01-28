// src/app/api/bookings/[id]/route.js
export async function PUT(request, { params }) {
    await connectDB()
    const data = await request.json()
    
    const booking = await Booking.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true }
    )
    
    return NextResponse.json(booking)
  }