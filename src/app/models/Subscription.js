// src/models/Subscription.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['basic', 'premium', 'unlimited'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  },
  sessions: {
    remaining: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  audioAccess: { type: Boolean, default: false },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true
  }
}, { timestamps: true });

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
export default Subscription;