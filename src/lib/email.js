// src/lib/email.js
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const emailTemplates = {
  bookingConfirmation: (booking) => ({
    subject: 'Your QUMEDIC Session is Confirmed',
    html: `
      <h2>Booking Confirmation</h2>
      <p>Your session is scheduled for ${new Date(booking.date).toLocaleDateString()} at ${booking.slot}</p>
      <p>Doctor: ${booking.doctorName}</p>
    `
  }),
  bookingReminder: (booking) => ({
    subject: 'Reminder: Upcoming QUMEDIC Session',
    html: `
      <h2>Session Reminder</h2>
      <p>Your session is tomorrow at ${booking.slot}</p>
      <p>Doctor: ${booking.doctorName}</p>
    `
  })
}

export async function sendEmail(to, template, data) {
  const { subject, html } = emailTemplates[template](data)
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  })
}