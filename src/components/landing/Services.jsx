'use client'
import Link from 'next/link'
import { Calendar, Headphones, Star, ArrowRight, Check } from 'lucide-react'

const ServiceCard = ({ icon: Icon, title, description, features, buttonText, href, isPopular }) => (
  <div className={`relative rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] ${
    isPopular 
      ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' 
      : 'bg-white shadow-xl shadow-gray-200/70 border border-gray-100'
  }`}>
    {/* Popular Tag */}
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-1.5 rounded-full text-sm font-medium">
        Most Popular
      </div>
    )}

    {/* Icon Header */}
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isPopular ? 'bg-blue-500' : 'bg-blue-50'}`}>
      <Icon className={`w-7 h-7 ${isPopular ? 'text-white' : 'text-blue-600'}`} />
    </div>

    {/* Content */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className={isPopular ? 'text-blue-100' : 'text-gray-600'}>{description}</p>
    </div>

    {/* Features */}
    <div className="mt-8 space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isPopular ? 'bg-blue-500' : 'bg-blue-50'}`}>
            <Check className={`w-3 h-3 ${isPopular ? 'text-white' : 'text-blue-600'}`} />
          </div>
          <span className={isPopular ? 'text-blue-100' : 'text-gray-600'}>{feature}</span>
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <Link 
      href={href}
      className={`mt-8 group flex items-center justify-between p-4 rounded-xl transition-all ${
        isPopular 
          ? 'bg-white text-blue-600 hover:bg-blue-50' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      <span className="font-medium">{buttonText}</span>
      <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1`} />
    </Link>
  </div>
)

const Services = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Path to Wellness
          </h2>
          <p className="text-lg text-gray-600">
            Select the service that best fits your journey to mental well-being and personal growth
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ServiceCard 
            icon={Calendar}
            title="1-on-1 Hypnotherapy"
            description="Experience personalized healing sessions with our certified clinical hypnotherapists in a secure online environment."
            features={[
              "Expert certified therapists",
              "Personalized treatment plans",
              "Flexible scheduling",
              "50% savings with subscriptions",
              "24/7 support access"
            ]}
            buttonText="Book Your Session"
            href="/book"
            isPopular={true}
          />
          <ServiceCard 
            icon={Headphones}
            title="Audio Library Access"
            description="Unlock our premium collection of therapeutic audio sessions designed for your personal growth and relaxation."
            features={[
              "10+ Curated Bundles",
              "24/7 Unlimited Access",
              "Guided Sessions",
              "Regular New Content",
              "Download for offline use"
            ]}
            buttonText="Explore Library"
            href="/library"
            isPopular={false}
          />
        </div>
      </div>
    </section>
  )
}

export default Services 