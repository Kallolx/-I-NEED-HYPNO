'use client'
import { useState, useRef } from 'react'
import { Upload, Loader, Info, X, Music, Image as ImageIcon, Play, Pause } from 'lucide-react'

// Predefined categories
const AUDIO_CATEGORIES = [
  'Relaxation & Stress Relief',
  'Sleep Hypnosis & Bedtime Stories',
  'Confidence & Self-Esteem',
  'Weight Loss & Healthy Habits',
  'Pain Relief & Healing',
  'Manifestation & Abundance',
  'Emotional Healing & Letting Go',
  'Energy & Focus Boost',
  'Overcoming Fear & Phobias',
  'Spiritual Growth & Inner Peace'
];

export default function TestUpload() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [audioFileName, setAudioFileName] = useState('')
  const [paymentType, setPaymentType] = useState('paid') // Changed default to 'paid'
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioPreviewUrl, setAudioPreviewUrl] = useState('')
  const audioRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('title', e.target.title.value)
    formData.append('description', e.target.description.value)
    formData.append('category', e.target.category.value)
    formData.append('duration', e.target.duration.value)
    formData.append('audio', e.target.audio.files[0])
    if (e.target.thumbnail.files[0]) {
      formData.append('thumbnail', e.target.thumbnail.files[0])
    }
    formData.append('paymentType', paymentType)
    formData.append('isSubscriptionRequired', paymentType === 'subscription')
    formData.append('isPaidContent', paymentType === 'paid')

    try {
      const res = await fetch('/api/audios', {
        method: 'POST',
        body: formData, // FormData will set the correct Content-Type automatically
      });

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Server returned invalid JSON. Raw response: ${responseText.substring(0, 200)}...`);
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to upload audio');
      }

      setMessage('Audio uploaded successfully!');
      e.target.reset();
      setPreviewUrl('');
      setAudioFileName('');
    } catch (error) {
      console.error('Error uploading audio:', error);
      setMessage(error.message || 'Failed to upload audio. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFileName(file.name);
      const url = URL.createObjectURL(file);
      setAudioPreviewUrl(url);
      setIsPlaying(false);
    } else {
      setAudioFileName('');
      setAudioPreviewUrl('');
    }
  };

  const toggleAudioPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const clearThumbnail = () => {
    const form = document.querySelector('form');
    if (form) {
      form.querySelector('input[name="thumbnail"]').value = '';
      setPreviewUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Preview Panel */}
            <div className="md:w-1/3 bg-gray-50 p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                  <p className="text-sm text-gray-500 mt-1">Audio and thumbnail preview</p>
                </div>

                {/* Audio Preview */}
                {audioPreviewUrl && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Audio Preview</h3>
                    <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                      <button
                        onClick={toggleAudioPlay}
                        className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      <span className="text-sm text-gray-600 truncate">
                        {audioFileName}
                      </span>
                      <audio
                        ref={audioRef}
                        src={audioPreviewUrl}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
                
                {/* Existing Thumbnail Preview */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Thumbnail Preview</h3>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative">
                    {previewUrl ? (
                      <>
                        <img 
                          src={previewUrl} 
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={clearThumbnail}
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-400 text-sm">No thumbnail</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex gap-2">
                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">Tips</h3>
                      <ul className="mt-2 text-sm text-blue-700 list-disc pl-4 space-y-1">
                        <li>Use high-quality audio files</li>
                        <li>Add descriptive titles</li>
                        <li>Choose relevant thumbnails</li>
                        <li>Provide detailed descriptions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Upload Audio</h1>
                  <p className="text-gray-600 mt-1">Add new audio content to the library</p>
                </div>
              </div>

              {message && (
                <div className={`p-4 rounded-xl mb-6 ${
                  message.includes('success') 
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      placeholder="Enter audio title"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    >
                      <option value="">Select a category</option>
                      {AUDIO_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={3}
                    className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                    placeholder="Enter audio description"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="audio" className="block text-sm font-medium text-gray-700">
                      Audio File
                    </label>
                    <div className="mt-1 flex items-center">
                      <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500">
                        <input
                          id="audio"
                          name="audio"
                          type="file"
                          accept="audio/*"
                          required
                          className="sr-only"
                          onChange={handleAudioChange}
                        />
                        <Music className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {audioFileName || 'Choose audio file'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <input
                      id="duration"
                      name="duration"
                      type="text"
                      required
                      className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      placeholder="e.g., 15:00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                    Thumbnail Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500">
                      <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleThumbnailChange}
                      />
                      <ImageIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {previewUrl ? 'Change thumbnail' : 'Choose thumbnail image'}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Option
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentType"
                        value="subscription"
                        checked={paymentType === 'subscription'}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                      />
                      <div>
                        <span className="text-gray-900">Free with Subscription</span>
                        <p className="text-sm text-gray-500">Users can access this audio with their subscription</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentType"
                        value="paid"
                        checked={paymentType === 'paid'}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                      />
                      <div>
                        <span className="text-gray-900">Paid per Audio</span>
                        <p className="text-sm text-gray-500">Users need to purchase this audio individually</p>
                      </div>
                    </label>
                  </div>
                </div>

                {paymentType === 'paid' && (
                  <div className="col-span-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0.01"
                      step="0.01"
                      required
                      className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      placeholder="Enter price (e.g., 4.99)"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="-ml-1 mr-3 h-5 w-5" />
                      Upload Audio
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 