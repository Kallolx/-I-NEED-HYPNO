'use client'
import { Clock, Star, Users, BookOpen, Shield, Award, ArrowRight, PlayCircle, CheckCircle } from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/Footer'

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
    {/* Course Image */}
    <div className="relative h-48">
      <img 
        src={course.image} 
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 p-6">
        <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
          {course.category}
        </span>
        <h2 className="text-xl font-bold text-white mt-2">{course.title}</h2>
      </div>
    </div>

    {/* Course Info */}
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{course.students} students</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-yellow-500">
          <Star className="w-4 h-4 fill-yellow-500" />
          <span>{course.rating}</span>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{course.description}</p>

      {/* Course Features */}
      <div className="space-y-3 mb-6">
        {course.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div>
          <p className="text-gray-500 text-sm">Course Fee</p>
          <p className="text-2xl font-bold text-gray-900">${course.price}</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
          Enroll Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
)

export default function CoursesPage() {
  const courses = [
    {
      title: "Foundations of Hypnotherapy",
      category: "Beginner",
      description: "Master the fundamentals of hypnotherapy with our comprehensive beginner's course.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60",
      duration: "6 weeks",
      students: "1.2k",
      rating: "4.9",
      price: "299",
      features: [
        "12 detailed modules",
        "Live practice sessions",
        "Personal mentor support",
        "Certification included"
      ]
    },
    {
      title: "Advanced Clinical Techniques",
      category: "Advanced",
      description: "Take your practice to the next level with advanced therapeutic methods and strategies.",
      image: "https://images.unsplash.com/photo-1666887360785-aaab9931af45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "8 weeks",
      students: "850",
      rating: "4.8",
      price: "499",
      features: [
        "Advanced methodology",
        "Case study analysis",
        "Clinical supervision",
        "Professional certification"
      ]
    },
    {
      title: "Specialized Trauma Therapy",
      category: "Specialized",
      description: "Learn specialized techniques for treating trauma through hypnotherapy interventions.",
      image: "https://images.unsplash.com/photo-1620147461831-a97b99ade1d3?w=800&auto=format&fit=crop&q=60",
      duration: "10 weeks",
      students: "620",
      rating: "4.9",
      price: "599",
      features: [
        "Trauma-informed approach",
        "Expert guest lectures",
        "Supervised practice",
        "Advanced certification"
      ]
    }
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-blue-600 font-semibold mb-4 block">Professional Courses</span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hypnotherapy Training</h1>
            <p className="text-lg text-gray-600">
              Advance your career with our professional hypnotherapy certification courses
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: BookOpen, label: "Expert-Led Courses", value: "10+" },
              { icon: Users, label: "Active Students", value: "2,500+" },
              { icon: Shield, label: "Accredited", value: "100%" },
              { icon: Award, label: "Certification", value: "Included" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Featured Course */}
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1000&auto=format&fit=crop&q=60')] opacity-10" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <span className="inline-block px-4 py-1 bg-blue-500 text-white text-sm rounded-full mb-4">
                  New Course
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Master Certification in Clinical Hypnotherapy
                </h2>
                <p className="text-blue-100 mb-8">
                  Become a certified clinical hypnotherapist with our comprehensive master's program. 
                  Learn from industry experts and get hands-on experience.
                </p>
                <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-shrink-0 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <div className="text-white text-center">
                  <p className="text-5xl font-bold mb-2">$899</p>
                  <p className="text-blue-100">Early Bird Offer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 