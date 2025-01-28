'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Clock, Users, Star, Sparkles } from 'lucide-react'

const Tag = ({ children }) => (
  <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5">
    {children}
  </div>
)

const Hero = () => {
  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop'
  ]

  return (
    <section className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              <Tag>
                <ShieldCheck className="w-4 h-4" />
                Certified Therapists
              </Tag>
              <Tag>
                <Star className="w-4 h-4" />
                4.9/5 Rating
              </Tag>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Transform Your Mind Through
                <span className="text-blue-600"> Hypnotherapy</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Experience personalized healing sessions with certified hypnotherapists. 
                Join thousands who have already transformed their lives.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/book" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Clock className="w-5 h-5" />
                Book Your Session
              </Link>
              <Link 
                href="/library" 
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors"
              >
                Explore Library
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {avatars.map((avatar, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white relative overflow-hidden">
                      <Image
                        src={avatar}
                        alt={`User ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">1000+ Happy Clients</p>
                  <p className="text-sm text-gray-500">Join our growing community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10" />
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Peaceful meditation session"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Floating Tag */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg z-20 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">HIPAA Certified</p>
                  <p className="text-sm text-gray-600">100% Secure & Private</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 