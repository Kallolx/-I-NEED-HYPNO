// src/components/Navbar.jsx
'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { 
  Sparkles, 
  Brain, 
  Clock,
  Headphones, 
  UserCircle2,
  LogOut,
  ShieldCheck,
  BookOpenCheck,
  GraduationCap,
  HeartPulse,
  Menu,
  X
} from 'lucide-react'

const Navbar = () => {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const NavLinks = () => (
    <>
      <Link 
        href="/book" 
        className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group"
        onClick={() => setIsMenuOpen(false)}
      >
        <Clock className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span>Book Session</span>
      </Link>
      <Link 
        href="/library" 
        className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group"
        onClick={() => setIsMenuOpen(false)}
      >
        <Headphones className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span>Audio Library</span>
      </Link>
      <Link 
        href="/resources" 
        className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group"
        onClick={() => setIsMenuOpen(false)}
      >
        <BookOpenCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span>Resources</span>
      </Link>
      <Link 
        href="/courses" 
        className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group"
        onClick={() => setIsMenuOpen(false)}
      >
        <GraduationCap className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span>Courses</span>
      </Link>
      <Link 
        href="/wellness" 
        className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group"
        onClick={() => setIsMenuOpen(false)}
      >
        <HeartPulse className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span>Wellness</span>
      </Link>
    </>
  )

  const AuthLinks = () => (
    <>
      {session ? (
        <div className="flex items-center gap-4">
          <Link 
            href="/profile" 
            className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group"
            onClick={() => setIsMenuOpen(false)}
          >
            <UserCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>{session.user.name}</span>
          </Link>
          <button 
            onClick={() => {
              signOut()
              setIsMenuOpen(false)
            }}
            className="flex items-center gap-2 text-blue-100 hover:text-red-200 transition-colors group"
          >
            <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link 
            href="/auth/login" 
            className="flex items-center text-white hover:text-blue-100 transition-colors px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-sm font-medium">Login</span>
          </Link>
          <Link 
            href="/auth/signup"
            className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Up</span>
          </Link>
        </div>
      )}
    </>
  )

  return (
    <nav className="bg-blue-600 shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 text-2xl font-bold text-white group">
            <div className="relative">
              <Brain className="w-9 h-9 absolute opacity-50 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="w-9 h-9 text-blue-200 group-hover:text-blue-100 transition-colors" />
            </div>
            <span className="text-white">QUMEDIC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
            <div className="border-l border-blue-500 pl-8">
              <AuthLinks />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center text-white p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-blue-500">
            <div className="flex flex-col gap-4">
              <NavLinks />
            </div>
            <div className="flex flex-col gap-4 pt-4 border-t border-blue-500">
              <div className="flex justify-center">
                <AuthLinks />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar