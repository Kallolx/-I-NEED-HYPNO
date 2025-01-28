'use client'
import { Heart, Brain, Smile, Moon, Clock, Star, Users, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/Footer'

const WellnessCard = ({ program }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
    {/* Program Image */}
    <div className="relative h-48">
      <img 
        src={program.image} 
        alt={program.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 p-6">
        <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
          {program.category}
        </span>
        <h2 className="text-xl font-bold text-white mt-2">{program.title}</h2>
      </div>
    </div>

    {/* Program Info */}
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{program.duration}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{program.participants} joined</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-yellow-500">
          <Star className="w-4 h-4 fill-yellow-500" />
          <span>{program.rating}</span>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{program.description}</p>

      {/* Program Benefits */}
      <div className="space-y-3 mb-6">
        {program.benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div>
          <p className="text-gray-500 text-sm">Program Fee</p>
          <p className="text-2xl font-bold text-gray-900">${program.price}</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
          Join Program
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
)

export default function WellnessPage() {
  const programs = [
    {
      title: "Mindful Living Program",
      category: "Mental Wellness",
      description: "Discover the power of mindfulness and meditation for a balanced life.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60",
      duration: "4 weeks",
      participants: "2.5k",
      rating: "4.9",
      price: "199",
      benefits: [
        "Daily guided meditations",
        "Stress reduction techniques",
        "Mindfulness workshops",
        "Community support"
      ]
    },
    {
      title: "Sleep Enhancement",
      category: "Rest & Recovery",
      description: "Transform your sleep quality with proven techniques and expert guidance.",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=800&auto=format&fit=crop&q=60",
      duration: "3 weeks",
      participants: "1.8k",
      rating: "4.8",
      price: "149",
      benefits: [
        "Sleep tracking tools",
        "Evening routines",
        "Relaxation exercises",
        "Expert consultations"
      ]
    },
    {
      title: "Emotional Balance",
      category: "Emotional Health",
      description: "Learn to understand and manage your emotions effectively.",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=60",
      duration: "6 weeks",
      participants: "1.5k",
      rating: "4.9",
      price: "249",
      benefits: [
        "Emotional awareness",
        "Coping strategies",
        "Group therapy sessions",
        "Personal growth plan"
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
            <span className="text-green-600 font-semibold mb-4 block">Wellness Programs</span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Journey to Wellness</h1>
            <p className="text-lg text-gray-600">
              Discover holistic programs designed to enhance your mental and emotional well-being
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Heart, label: "Happy Clients", value: "5,000+" },
              { icon: Brain, label: "Expert Therapists", value: "20+" },
              { icon: Smile, label: "Success Rate", value: "95%" },
              { icon: Moon, label: "Programs", value: "15+" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Featured Program */}
          <div className="bg-green-600 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&auto=format&fit=crop&q=60')] opacity-10" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <span className="inline-block px-4 py-1 bg-green-500 text-white text-sm rounded-full mb-4">
                  Featured Program
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Comprehensive Wellness Journey
                </h2>
                <p className="text-green-100 mb-8">
                  Experience a transformative 12-week program combining mindfulness, emotional healing, 
                  and personal growth. Join our most comprehensive wellness journey.
                </p>
                <button className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-shrink-0 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <div className="text-white text-center">
                  <p className="text-5xl font-bold mb-2">$499</p>
                  <p className="text-green-100">Limited Time Offer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <WellnessCard key={index} program={program} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 