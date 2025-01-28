
// src/app/api/audios/route.js
import { NextResponse } from 'next/server';
import Audio from '@/app/models/Audio';

export async function GET() {
  await connectDB();
  const audios = await Audio.find({}).sort({ bundle: 1, order: 1 });
  return NextResponse.json(audios);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const audio = await Audio.create(data);
  return NextResponse.json(audio);
}