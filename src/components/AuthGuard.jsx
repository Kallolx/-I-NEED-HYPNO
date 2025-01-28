// src/components/AuthGuard.jsx
'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthGuard({ children, allowedRoles = [] }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/login')
      return
    }

    if (allowedRoles.length && !allowedRoles.includes(session.user.role)) {
      router.push('/')
    }
  }, [session, status, router, allowedRoles])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}