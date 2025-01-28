'use client'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Brain, Shield } from 'lucide-react'

const FooterLink = ({ href, children }) => (
  <Link 
    href={href} 
    className="text-gray-500 hover:text-blue-600 transition-colors"
  >
    {children}
  </Link>
)

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Brain className="w-8 h-8 text-blue-600" />
                <Shield className="w-8 h-8 absolute top-0 left-0 text-blue-600 opacity-20" />
              </div>
              <span className="text-xl font-bold text-gray-900">QUMEDIC</span>
            </div>
            <p className="text-gray-500 text-sm">
              Transforming lives through professional hypnotherapy and guided meditation. Your journey to wellness begins here.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/therapists">Our Therapists</FooterLink></li>
              <li><FooterLink href="/book">Book a Session</FooterLink></li>
              <li><FooterLink href="/library">Audio Library</FooterLink></li>
              <li><FooterLink href="/blog">Wellness Blog</FooterLink></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              <li><FooterLink href="/faq">FAQs</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="/contact">Contact Support</FooterLink></li>
              <li><FooterLink href="/insurance">Insurance Info</FooterLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>support@qumedic.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>+1 (888) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>123 Wellness Street<br />Health City, HC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} QUMEDIC. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/sitemap">Sitemap</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 