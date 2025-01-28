// src/app/layout.jsx
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QUMEDIC - Online Hypnotherapy Made Simple',
  description: 'Affordable, accessible hypnotherapy with 1-on-1 sessions and audio library.',
  keywords: ['hypnotherapy', 'online therapy', 'mental health', 'wellness'],
  metadataBase: new URL('https://qumedic.com'),
  openGraph: {
    title: 'QUMEDIC - Online Hypnotherapy',
    description: 'Transform your life with certified hypnotherapists',
    images: '/og-image.jpg',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}