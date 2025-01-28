// src/models/Doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: String,
  bio: String,
  image: String,
  availability: [{
    day: String,
    slots: [String]
  }]
}, { timestamps: true });

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
