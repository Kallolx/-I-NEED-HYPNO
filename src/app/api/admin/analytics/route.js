// src/app/api/admin/analytics/route.js
import { NextResponse } from 'next/server'
import Booking from '@/app/models/Booking'
import Audio from '@/app/models/Audio'
import connectDB from '@/lib/mongodb'

export async function GET() {
  await connectDB()

  const [bookingsTrend, popularDoctors, audioStats, revenue] = await Promise.all([
    getBookingsTrend(),
    getPopularDoctors(),
    getAudioStats(),
    getRevenueData()
  ])

  return NextResponse.json({
    bookingsTrend,
    popularDoctors,
    audioStats,
    revenue
  })
}

async function getBookingsTrend() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const bookings = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        bookings: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ])

  return bookings.map(b => ({
    date: b._id,
    bookings: b.bookings
  }))
}

async function getPopularDoctors() {
  return await Booking.aggregate([
    {
      $group: {
        _id: "$doctorId",
        sessions: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "doctors",
        localField: "_id",
        foreignField: "_id",
        as: "doctor"
      }
    },
    {
      $project: {
        name: { $arrayElemAt: ["$doctor.name", 0] },
        sessions: 1
      }
    },
    {
      $sort: { sessions: -1 }
    },
    {
      $limit: 5
    }
  ])
}

async function getAudioStats() {
  return await Audio.aggregate([
    {
      $group: {
        _id: "$bundle",
        plays: { $sum: "$plays" },
        previousPlays: { $sum: "$previousPlays" }
      }
    },
    {
      $project: {
        bundle: "$_id",
        plays: 1,
        growth: {
          $multiply: [
            {
              $divide: [
                { $subtract: ["$plays", "$previousPlays"] },
                "$previousPlays"
              ]
            },
            100
          ]
        }
      }
    }
  ])
}

async function getRevenueData() {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  return await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        amount: { $sum: "$amount" }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ])
}