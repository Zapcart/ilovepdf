'use client'

import { motion } from 'framer-motion'
import { FileText, Calendar, Clock, ArrowRight, Search, Tag, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 'pdf-optimization-guide',
      title: 'Complete Guide to PDF Optimization: Reduce File Size by 90%',
      excerpt: 'Learn professional techniques to compress PDF files without losing quality. Discover the best tools and methods for PDF optimization.',
      category: 'Optimization',
      readTime: '8 min read',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1554224154-260325ca4ad6?w=800&h=400&fit=crop',
      featured: true
    },
    {
      id: 'pdf-security-tips',
      title: '10 Essential PDF Security Tips for Document Protection',
      excerpt: 'Protect your sensitive documents with these proven PDF security techniques. Learn about password protection, encryption, and access control.',
      category: 'Security',
      readTime: '6 min read',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
      featured: false
    },
    {
      id: 'pdf-conversion-guide',
      title: 'PDF Conversion Mastery: Convert Between 20+ Formats',
      excerpt: 'Master the art of PDF conversion with our comprehensive guide. Learn how to convert PDFs to Word, Excel, PowerPoint, and more.',
      category: 'Conversion',
      readTime: '10 min read',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1555066931-4135d5e23614?w=800&h=400&fit=crop',
      featured: false
    },
    {
      id: 'pdf-compression-techniques',
      title: 'Advanced PDF Compression Techniques for Professionals',
      excerpt: 'Discover advanced compression methods used by professionals. Learn about image optimization, font embedding, and content reduction.',
      category: 'Optimization',
      readTime: '7 min read',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      featured: false
    }
  ]

  const categories = [
    { name: 'All', count: 24 },
    { name: 'Optimization', count: 8 },
    { name: 'Security', count: 6 },
    { name: 'Conversion', count: 7 },
    { name: 'Editing', count: 3 }
  ]

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                PDFMaster Blog
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Expert tips, tutorials, and insights for mastering PDF documents. 
              Learn from professionals about PDF optimization, security, and conversion.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-64"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-blue-400" />
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full flex items-center justify-between p-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mt-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-400" />
                Search
              </h3>
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </motion.div>

          {/* Blog Posts */}
          <div className="flex-1">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-blue-400" />
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      whileHover={{ y: -8 }}
                      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-slate-400 mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-slate-300 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 text-sm font-medium">{post.category}</span>
                          <Link
                            href={`/blog/${post.id}`}
                            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <span className="text-sm font-medium">Read More</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Regular Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -4 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-slate-400 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-xs font-medium">{post.category}</span>
                        <Link
                          href={`/blog/${post.id}`}
                          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
