// src/app/api/subscriptions/route.js
import { NextResponse } from 'next/server';
import Subscription from '@/app/models/Subscription';
import connectDB from '@/lib/mongodb';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    console.log('Fetching subscription for userId:', userId);
    
    const subscription = await Subscription.findOne({ 
      userId,
      status: 'active'
    });
    
    console.log('Found subscription:', subscription);
    
    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    console.log('Creating subscription with data:', data);
    
    // Validate userId
    if (!data.userId) {
      console.error('Missing userId in subscription data');
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Cancel any existing active subscriptions
    await Subscription.updateMany(
      { userId: data.userId, status: 'active' },
      { status: 'cancelled' }
    );

    const subscription = await Subscription.create({
      userId: data.userId,
      plan: data.plan,
      status: 'active',
      sessions: {
        remaining: data.sessions.total,
        total: data.sessions.total
      },
      audioAccess: data.audioAccess,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      price: data.price,
      billingCycle: data.billingCycle
    });

    console.log('Created subscription:', subscription);
    
    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}