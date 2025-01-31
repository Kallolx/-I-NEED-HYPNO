'use client'
import { useState } from 'react'
import { Play, Pause, Lock } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AudioPlayer({ audio }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handlePlay = () => {
    if (!session) {
      // If not logged in, redirect to login
      router.push('/auth/login')
      return
    }

    if (!session.user.isSubscribed) {
      // Show subscription modal or redirect to pricing
      handleSubscriptionPrompt()
      return
    }

    setIsPlaying(!isPlaying)
  }

  const handleSubscriptionPrompt = () => {
    // You can replace this with a modal if you prefer
    const wantToSubscribe = window.confirm(
      'This audio is only available for subscribed users. Would you like to subscribe?'
    )
    if (wantToSubscribe) {
      router.push('/pricing') // Redirect to your pricing/subscription page
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4">
        {/* Audio Thumbnail */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          {audio.thumbnail ? (
            <img 
              src={audio.thumbnail} 
              alt={audio.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-50">
              <Play className="w-8 h-8 text-blue-600" />
            </div>
          )}
        </div>

        {/* Audio Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{audio.title}</h3>
          <p className="text-sm text-gray-500">{audio.duration}</p>
        </div>

        {/* Play Button */}
        <button
          onClick={handlePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            session?.user?.isSubscribed
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-200'
          } transition-colors`}
        >
          {session?.user?.isSubscribed ? (
            isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )
          ) : (
            <Lock className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Audio Progress (only show if subscribed and playing) */}
      {session?.user?.isSubscribed && isPlaying && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full w-1/3"></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">1:20</span>
            <span className="text-xs text-gray-500">{audio.duration}</span>
          </div>
        </div>
      )}
    </div>
  )
} 