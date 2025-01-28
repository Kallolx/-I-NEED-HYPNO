// src/app/admin/audios/upload/page.jsx
'use client'
import { useState } from 'react'
import { Upload, Music } from 'lucide-react'

const AudioUpload = () => {
  const [audioFile, setAudioFile] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    bundle: ''
  })

  const bundles = [
    'Relax & Recharge',
    'Sleep & Serenity',
    'Confidence & Success',
    'Weight Loss & Healthy Habits',
    'Healing & Pain Relief',
    'Manifestation & Abundance',
    'Emotional Healing',
    'Energy & Focus',
    'Fear & Phobias',
    'Spiritual Growth'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    formDataToSend.append('audio', audioFile)
    formDataToSend.append('data', JSON.stringify(formData))

    try {
      const response = await fetch('/api/audios/upload', {
        method: 'POST',
        body: formDataToSend
      })
      if (response.ok) {
        alert('Audio uploaded successfully')
        setAudioFile(null)
        setFormData({
          title: '',
          description: '',
          category: '',
          bundle: ''
        })
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Music className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold">Upload New Audio</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
                className="hidden"
                id="audio-upload"
              />
              <label
                htmlFor="audio-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-blue-600 mb-2" />
                <span className="text-gray-800">
                  {audioFile ? audioFile.name : 'Click to upload audio file'}
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Bundle
              </label>
              <select
                value={formData.bundle}
                onChange={(e) => setFormData({...formData, bundle: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Bundle</option>
                {bundles.map((bundle) => (
                  <option key={bundle} value={bundle}>
                    {bundle}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Upload Audio
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AudioUpload