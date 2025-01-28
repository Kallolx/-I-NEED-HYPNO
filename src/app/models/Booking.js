// src/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  notes: String
}, {
  timestamps: true
});

// Create a compound index for unique bookings
bookingSchema.index(
  { doctorId: 1, date: 1, time: 1 },
  { 
    unique: true,
    partialFilterExpression: { status: { $ne: 'cancelled' } } // Only apply uniqueness to non-cancelled bookings
  }
);

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;