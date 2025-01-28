// src/app/api/auth/reset-password/route.js
import { randomBytes } from 'crypto'
import { sendEmail } from '@/lib/email'
import PasswordReset from '@/app/models/PasswordReset'

export async function POST(request) {
  const { email } = await request.json()
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 3600000) // 1 hour

  await PasswordReset.create({ email, token, expires })
  await sendEmail(email, 'resetPassword', { token })
  
  return NextResponse.json({ message: 'Reset email sent' })
}

export async function PUT(request) {
  const { token, password } = await request.json()
  const reset = await PasswordReset.findOne({ 
    token, 
    used: false,
    expires: { $gt: new Date() }
  })

  if (!reset) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 400 }
    )
  }

  const user = await User.findOne({ email: reset.email })
  user.password = password
  await user.save()

  reset.used = true
  await reset.save()

  return NextResponse.json({ message: 'Password updated' })
}