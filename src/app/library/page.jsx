// src/app/library/page.js
'use client'
import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Lock, Search, Filter, Clock, Volume2, VolumeX, ChevronDown, Star, 
  CheckCircle2, Crown, Sparkles, Infinity, Music2, Download, Headphones, ChevronRight, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import AudioPlayer from '@/components/AudioPlayer'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/Footer'

export default function Library() {
  const [audios, setAudios] = useState([])
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)
  const { data: session } = useSession()
  const [showModal, setShowModal] = useState(false)
  const [selectedAudio, setSelectedAudio] = useState(null)

  const categories = [
    'All Categories',
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
  ]

  useEffect(() => {
    fetchAudios()
  }, [])

  const fetchAudios = async () => {
    try {
      const res = await fetch('/api/audios')
      const data = await res.json()
      setAudios(data)
    } catch (error) {
      console.error('Error fetching audios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayPause = (audio) => {
    if (playingId === audio._id) {
      audioRef.current?.pause()
      setPlayingId(null)
      return
    }

    // Show subscription/purchase modal for any audio
    setSelectedAudio(audio)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedAudio(null)
  }

  // Group audios by category
  const audiosByCategory = audios.reduce((acc, audio) => {
    if (!acc[audio.category]) {
      acc[audio.category] = []
    }
    acc[audio.category].push(audio)
    return acc
  }, {})

  // Filter categories based on search
  const filteredCategories = Object.keys(audiosByCategory).filter(category => {
    if (searchQuery === '') return true
    
    if (category.toLowerCase().includes(searchQuery.toLowerCase())) return true
    
    return audiosByCategory[category].some(audio => 
      audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="max-w-2xl mx-auto text-center">
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
              </div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-48"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white rounded-xl p-4 flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-blue-600 font-semibold mb-4 block">Audio Library</span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Therapeutic Audio Collection
            </h1>
            <p className="text-lg text-gray-600">
              {session?.user?.isSubscribed 
                ? "Access our complete collection of therapeutic audio sessions"
                : "Subscribe to access our complete collection of therapeutic audio sessions"}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search meditations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full md:w-auto px-4 py-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 hover:bg-gray-50"
                >
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Filter by Category</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
                
                {showFilters && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg py-2 max-h-96 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setShowFilters(false)
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                          selectedCategory === category ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200">
              <button onClick={toggleMute} className="text-gray-500 hover:text-gray-700">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-32 accent-blue-600"
              />
            </div>
          </div>

          {/* Audio List by Category */}
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <div className="max-w-sm mx-auto">
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? 'No meditations found matching your search'
                    : 'No meditations available yet'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All Categories')
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search and filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map(category => (
                (!selectedCategory || selectedCategory === category) && (
                  <div key={category} className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <ChevronRight className="w-5 h-5 text-blue-600" />
                      {category}
                      <span className="text-sm font-normal text-gray-500">
                        ({audiosByCategory[category].length} {audiosByCategory[category].length === 1 ? 'session' : 'sessions'})
                      </span>
                    </h2>
                    <div className="space-y-3">
                      {audiosByCategory[category].map((audio) => (
                        <div 
                          key={audio._id}
                          className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-200"
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Side - Thumbnail and Waveform */}
                            <div className="w-full md:w-64 flex-shrink-0 space-y-4">
                              {/* Thumbnail with Play Button */}
                              <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                                {audio.thumbnail ? (
                                  <img
                                    src={audio.thumbnail}
                                    alt={audio.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Volume2 className="w-12 h-12 text-blue-300" />
                                  </div>
                                )}
                                
                                {/* Play Button Overlay */}
                                <button
                                  onClick={() => handlePlayPause(audio)}
                                  className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-200"
                                >
                                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-200 shadow-lg">
                                    {playingId === audio._id ? (
                                      <Pause className="w-6 h-6 text-blue-600" />
                                    ) : (
                                      <Play className="w-6 h-6 text-blue-600 translate-x-0.5" />
                                    )}
                                  </div>
                                </button>
                              </div>

                              {/* Audio Waveform Visualization */}
                              {playingId === audio._id && (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <div className="h-8 flex items-center gap-0.5">
                                      {[...Array(20)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="w-1 bg-blue-500/80 rounded-full animate-pulse"
                                          style={{
                                            height: `${Math.random() * 100}%`,
                                            animationDelay: `${i * 0.1}s`
                                          }}
                                        ></div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-200"
                                      style={{ width: `${progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Right Side - Audio Info */}
                            <div className="flex-1 min-w-0 space-y-4">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                                      {audio.category}
                                    </span>
                                    {audio.paymentType === 'subscription' ? (
                                      <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md flex items-center gap-1">
                                        <Crown className="w-3 h-3" />
                                        Premium
                                      </span>
                                    ) : audio.price > 0 ? (
                                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md flex items-center gap-1">
                                        <Lock className="w-3 h-3" />
                                        ${audio.price}
                                      </span>
                                    ) : (
                                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
                                        Free
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{audio.title}</h3>
                                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{audio.description}</p>
                                </div>
                              </div>

                              {/* Audio Stats */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Duration</p>
                                    <p className="text-sm font-medium text-gray-900">{audio.duration}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                                    <Headphones className="w-4 h-4 text-purple-600" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Quality</p>
                                    <p className="text-sm font-medium text-gray-900">HD Audio</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                    <Star className="w-4 h-4 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Rating</p>
                                    <p className="text-sm font-medium text-gray-900">4.9/5.0</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                                    <Download className="w-4 h-4 text-orange-600" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Downloads</p>
                                    <p className="text-sm font-medium text-gray-900">2.5k+</p>
                                  </div>
                                </div>
                              </div>

                              {/* Medical Benefits Tags */}
                              <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                  Stress Relief
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                  Better Sleep
                                </span>
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                  Anxiety Relief
                                </span>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                  Mental Focus
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Subscription CTA */}
          {!session?.user?.isSubscribed && (
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Unlock Full Access to Our Audio Library
              </h2>
              <p className="mb-8 text-blue-100">
                Subscribe now to access our complete collection of therapeutic audio sessions.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                View Pricing
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
      
      {showModal && selectedAudio && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full relative overflow-hidden">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full z-10 bg-white/80 backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - Audio Info */}
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-sm font-medium text-blue-600 mb-2 block">
                    {selectedAudio.category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedAudio.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedAudio.description}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Duration</p>
                      <p className="text-sm text-gray-500">{selectedAudio.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">High Quality Audio</p>
                      <p className="text-sm text-gray-500">Studio grade recording</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Download className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Offline Access</p>
                      <p className="text-sm text-gray-500">Download for offline listening</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Pricing & Action */}
              <div className="bg-gray-50 p-8 flex flex-col">
                {selectedAudio.paymentType === 'subscription' ? (
                  <>
                    <div className="mb-6">
                      <div className="inline-block bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
                        Subscription Required
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900">$9.99</span>
                        <span className="text-gray-500">/month</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-6">
                        Subscribe to unlock this and all premium content
                      </p>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Unlimited access to all meditations
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          New content added weekly
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Cancel anytime
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => {
                        alert('Subscription functionality coming soon!')
                        closeModal()
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
                    >
                      <Crown className="w-5 h-5" />
                      Start Your Free Trial
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
                        One-time Purchase
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900">${selectedAudio.price}</span>
                        <span className="text-gray-500">USD</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-6">
                        Purchase once, own forever
                      </p>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Lifetime access to this meditation
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Download for offline use
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          30-day money-back guarantee
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => {
                        alert('Purchase functionality coming soon!')
                        closeModal()
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                    >
                      <Lock className="w-5 h-5" />
                      Purchase Now
                    </button>
                  </>
                )}
                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}