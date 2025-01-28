// src/app/library/page.js
'use client'
import { Play, Headphones, Clock, Download, Heart, PlayCircle } from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/Footer'

export default function AudioLibrary() {
  const bundles = [
    {
      title: 'Relax & Recharge',
      description: 'Calm your mind and restore your energy with these therapeutic sessions',
      image: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=500&h=300&fit=crop',
      category: 'Relaxation',
      tracks: [
        { name: 'Anxiety Release', duration: '20 min', plays: '2.3k' },
        { name: 'Stress Relief', duration: '15 min', plays: '1.8k' },
        { name: 'Panic Attack Relief', duration: '25 min', plays: '1.5k' },
        { name: 'Deep Relaxation', duration: '30 min', plays: '3.1k' },
        { name: 'Inner Peace', duration: '18 min', plays: '2.7k' }
      ]
    },
    {
      title: 'Sleep & Serenity',
      description: 'Drift into peaceful sleep with our calming bedtime sessions',
      image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=500&h=300&fit=crop',
      category: 'Sleep',
      tracks: [
        { name: 'Peaceful Sleep Story', duration: '45 min', plays: '4.2k' },
        { name: 'Dream Therapy', duration: '30 min', plays: '2.9k' },
        { name: 'Bedtime Relaxation', duration: '20 min', plays: '3.3k' },
        { name: 'Night Time Peace', duration: '25 min', plays: '2.1k' },
        { name: 'Deep Sleep Journey', duration: '40 min', plays: '3.8k' }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-blue-600 font-semibold mb-4 block">Audio Library</span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Therapeutic Audio Collection</h1>
            <p className="text-lg text-gray-600">
              Explore our curated collection of hypnotherapy sessions designed for your well-being
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 flex justify-center gap-12">
            <div className="text-center">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Headphones className="w-5 h-5" />
                <span className="font-semibold">100+</span>
              </div>
              <p className="text-sm text-gray-600">Audio Sessions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">50+ Hours</span>
              </div>
              <p className="text-sm text-gray-600">Total Content</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Download className="w-5 h-5" />
                <span className="font-semibold">Offline Access</span>
              </div>
              <p className="text-sm text-gray-600">Download & Listen</p>
            </div>
          </div>
          
          {/* Bundles Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {bundles.map((bundle) => (
              <div key={bundle.title} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                {/* Bundle Header */}
                <div className="relative h-48">
                  <img 
                    src={bundle.image} 
                    alt={bundle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {bundle.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-2">{bundle.title}</h2>
                    <p className="text-gray-200 text-sm mt-1">{bundle.description}</p>
                  </div>
                </div>

                {/* Tracks List */}
                <div className="p-6">
                  <div className="space-y-3">
                    {bundle.tracks.map((track) => (
                      <div 
                        key={track.name} 
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group/track"
                      >
                        <div className="flex items-center gap-4">
                          <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover/track:bg-blue-100 transition-colors">
                            <PlayCircle className="w-6 h-6 text-blue-600" />
                          </button>
                          <div>
                            <h3 className="font-medium text-gray-900">{track.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {track.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Play className="w-4 h-4" />
                                {track.plays} plays
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}