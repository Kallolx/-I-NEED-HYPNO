// src/app/api/doctors/[id]/slots/route.js
export async function GET(request, { params }) {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    const doctor = await Doctor.findById(params.id)
    const dayOfWeek = new Date(date).toLocaleLowerCase()
    
    const bookedSlots = await Booking.find({
      doctorId: params.id,
      date: date
    }).select('slot')
    
    const availableSlots = doctor.availability[dayOfWeek].filter(
      slot => !bookedSlots.find(booking => booking.slot === slot)
    )
    
    return NextResponse.json(availableSlots)
  }