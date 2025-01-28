// src/app/api/audios/upload/route.js
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import Audio from '@/app/models/Audio';
import connectDB from '@/lib/mongodb';

export async function POST(request) {
  try {
    const data = await request.formData();
    const audio = data.get('audio');
    const metadata = JSON.parse(data.get('data'));

    if (!audio) {
      return NextResponse.json(
        { error: 'No audio file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await audio.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to local storage or cloud storage (AWS S3, etc.)
    const audioPath = join('public', 'uploads', 'audios', audio.name);
    await writeFile(audioPath, buffer);

    // Save to database
    await connectDB();
    const newAudio = await Audio.create({
      ...metadata,
      audioUrl: `/uploads/audios/${audio.name}`
    });

    return NextResponse.json(newAudio);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}