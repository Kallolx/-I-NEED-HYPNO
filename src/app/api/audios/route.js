import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import fs from 'fs/promises'

// Mock data storage (this will be reset when server restarts)
export const mockAudios = []

export async function GET() {
  try {
    return NextResponse.json(mockAudios)
  } catch (error) {
    console.error('Error fetching audios:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audios' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Audio ID is required' },
        { status: 400 }
      )
    }

    // Find the audio to delete
    const audioIndex = mockAudios.findIndex(audio => audio._id === id)
    if (audioIndex === -1) {
      return NextResponse.json(
        { error: 'Audio not found' },
        { status: 404 }
      )
    }

    const audio = mockAudios[audioIndex]

    // Delete the audio file
    const audioPath = path.join(process.cwd(), 'public', audio.audioUrl)
    await fs.unlink(audioPath).catch(() => {
      console.log('Audio file not found:', audioPath)
    })

    // Delete the thumbnail if it exists
    if (audio.thumbnail) {
      const thumbnailPath = path.join(process.cwd(), 'public', audio.thumbnail)
      await fs.unlink(thumbnailPath).catch(() => {
        console.log('Thumbnail file not found:', thumbnailPath)
      })
    }

    // Remove from mock storage
    mockAudios.splice(audioIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting audio:', error)
    return NextResponse.json(
      { error: 'Failed to delete audio' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    // Get all form fields
    const title = formData.get('title')
    const description = formData.get('description')
    const category = formData.get('category')
    const duration = formData.get('duration')
    const price = parseFloat(formData.get('price')) || 0
    
    // Get files
    const audioFile = formData.get('audio')
    const thumbnailFile = formData.get('thumbnail')

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      )
    }

    // Create unique filenames
    const timestamp = Date.now()
    const audioFileName = `audio-${timestamp}${path.extname(audioFile.name)}`
    const thumbnailFileName = thumbnailFile ? `thumbnail-${timestamp}${path.extname(thumbnailFile.name)}` : null

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await writeFile(path.join(uploadDir, audioFileName), Buffer.from(await audioFile.arrayBuffer()))
      if (thumbnailFile) {
        await writeFile(path.join(uploadDir, thumbnailFileName), Buffer.from(await thumbnailFile.arrayBuffer()))
      }
    } catch (error) {
      console.error('Error saving files:', error)
      return NextResponse.json(
        { error: 'Failed to save files' },
        { status: 500 }
      )
    }

    // Create audio document
    const audio = {
      _id: timestamp.toString(),
      title,
      description,
      category,
      duration,
      price,
      audioUrl: `/uploads/${audioFileName}`,
      thumbnail: thumbnailFileName ? `/uploads/${thumbnailFileName}` : '',
      isPaidContent: price > 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to mock storage
    mockAudios.push(audio)

    return NextResponse.json(
      { success: true, data: audio },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing upload:', error)
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    )
  }
} 