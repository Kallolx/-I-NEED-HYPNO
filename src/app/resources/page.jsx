'use client'
import { BookOpen, FileText, Video, Download, BookMarked, GraduationCap, ArrowRight, ExternalLink } from 'lucide-react'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/Footer'

const ResourceCard = ({ icon: Icon, title, description, items }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <div className="space-y-3">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              {item.type === 'pdf' && <FileText className="w-4 h-4 text-blue-600" />}
              {item.type === 'video' && <Video className="w-4 h-4 text-blue-600" />}
              {item.type === 'article' && <BookOpen className="w-4 h-4 text-blue-600" />}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.format}</p>
            </div>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </a>
      ))}
    </div>
  </div>
)

export default function ResourcesPage() {
  const resources = [
    {
      icon: BookMarked,
      title: "Beginner's Guides",
      description: "Essential reading materials for those new to hypnotherapy",
      items: [
        {
          title: "Introduction to Hypnotherapy",
          format: "PDF Guide • 15 min read",
          type: "pdf",
          link: "#"
        },
        {
          title: "Understanding Self-Hypnosis",
          format: "Video Tutorial • 10 min",
          type: "video",
          link: "#"
        },
        {
          title: "Benefits of Hypnotherapy",
          format: "Article • 8 min read",
          type: "article",
          link: "#"
        }
      ]
    },
    {
      icon: GraduationCap,
      title: "Advanced Learning",
      description: "Deep dive into advanced hypnotherapy techniques and practices",
      items: [
        {
          title: "Advanced Relaxation Techniques",
          format: "Video Course • 45 min",
          type: "video",
          link: "#"
        },
        {
          title: "Clinical Studies & Research",
          format: "PDF Report • 25 min read",
          type: "pdf",
          link: "#"
        },
        {
          title: "Case Studies Analysis",
          format: "Article • 20 min read",
          type: "article",
          link: "#"
        }
      ]
    },
    {
      icon: Download,
      title: "Downloadable Tools",
      description: "Practical resources and worksheets for your healing journey",
      items: [
        {
          title: "Daily Mindfulness Journal",
          format: "PDF Template • Printable",
          type: "pdf",
          link: "#"
        },
        {
          title: "Progress Tracking Sheet",
          format: "PDF Worksheet • Printable",
          type: "pdf",
          link: "#"
        },
        {
          title: "Relaxation Exercise Guide",
          format: "PDF Guide • 12 pages",
          type: "pdf",
          link: "#"
        }
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
            <span className="text-blue-600 font-semibold mb-4 block">Resources</span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Resources</h1>
            <p className="text-lg text-gray-600">
              Explore our comprehensive collection of hypnotherapy resources, guides, and tools
            </p>
          </div>

          {/* Featured Resource */}
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')] opacity-10" />
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block px-4 py-1 bg-blue-500 text-white text-sm rounded-full mb-4">
                Featured Resource
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Complete Guide to Mental Well-being
              </h2>
              <p className="text-blue-100 mb-8">
                A comprehensive guide covering everything from basic relaxation techniques to advanced 
                hypnotherapy practices. Perfect for both beginners and experienced practitioners.
              </p>
              <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Download Free Guide
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
