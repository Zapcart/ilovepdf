'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown,
  Home as HomeIcon,
  FileText,
  Edit3,
  Lock,
  Minimize2,
  GitMerge,
  Scissors,
  Upload,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Star,
  ArrowRight,
  Download,
  CheckCircle,
  BarChart3,
  Award,
  Globe,
  Server,
  LockKeyhole,
  Unlock,
  Image
} from 'lucide-react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', icon: HomeIcon, href: '/' },
    { 
      name: 'Tools', 
      icon: FileText, 
      href: '#',
      dropdown: [
        { name: 'All Tools', href: '/all-tools' },
        { name: 'Convert', href: '/convert' },
        { name: 'Edit', href: '/edit' },
        { name: 'Organize', href: '/organize' }
      ]
    },
    { 
      name: 'Convert', 
      icon: FileText, 
      href: '#',
      dropdown: [
        { name: 'PDF to Word', href: '/pdf-to-word' },
        { name: 'Word to PDF', href: '/word-to-pdf' },
        { name: 'PDF to JPG', href: '/pdf-to-jpg' },
        { name: 'JPG to PDF', href: '/jpg-to-pdf' },
        { name: 'PDF to Excel', href: '/pdf-to-excel' },
        { name: 'Excel to PDF', href: '/excel-to-pdf' }
      ]
    },
    { 
      name: 'Edit', 
      icon: Edit3, 
      href: '#',
      dropdown: [
        { name: 'Edit PDF', href: '/edit-pdf' },
        { name: 'Add Text', href: '/add-text' },
        { name: 'Add Images', href: '/add-images' },
        { name: 'Sign PDF', href: '/sign-pdf' },
        { name: 'OCR PDF', href: '/ocr-pdf' }
      ]
    },
    { 
      name: 'Security', 
      icon: Lock, 
      href: '#',
      dropdown: [
        { name: 'Protect PDF', href: '/protect-pdf' },
        { name: 'Unlock PDF', href: '/unlock-pdf' },
        { name: 'Add Watermark', href: '/watermark' }
      ]
    },
    { 
      name: 'Compress', 
      icon: Minimize2, 
      href: '/compress-pdf' 
    },
    { 
      name: 'Merge', 
      icon: GitMerge, 
      href: '/merge-pdf' 
    },
    { 
      name: 'Split', 
      icon: Scissors, 
      href: '/split-pdf' 
    }
  ]

  const featuredTools = [
    {
      icon: FileText,
      title: 'PDF to Word',
      description: 'Convert PDF documents to editable Word files with perfect formatting',
      href: '/pdf-to-word',
      gradient: 'from-blue-500 to-blue-600',
      badge: 'Most Popular'
    },
    {
      icon: Minimize2,
      title: 'Compress PDF',
      description: 'Reduce PDF file size without compromising quality',
      href: '/compress-pdf',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: GitMerge,
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one seamless document',
      href: '/merge-pdf',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lock,
      title: 'Protect PDF',
      description: 'Add password protection to secure your PDF documents',
      href: '/protect-pdf',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Unlock,
      title: 'Unlock PDF',
      description: 'Remove password protection from encrypted PDF files',
      href: '/unlock-pdf',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Edit3,
      title: 'Edit PDF',
      description: 'Modify text, images, and content in PDF documents',
      href: '/edit-pdf',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      icon: Scissors,
      title: 'Split PDF',
      description: 'Divide PDF into separate files or extract specific pages',
      href: '/split-pdf',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: Image,
      title: 'PDF to JPG',
      description: 'Extract pages from PDF as high-quality JPG images',
      href: '/pdf-to-jpg',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ]

  const stats = [
    { label: 'Files Processed', value: '10M+', change: '+25%', icon: BarChart3 },
    { label: 'Happy Users', value: '500K+', change: '+15%', icon: Users },
    { label: 'Success Rate', value: '99.9%', change: '+2%', icon: CheckCircle },
    { label: 'Processing Speed', value: '< 3s', change: 'Instant', icon: Zap }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager at TechCorp',
      content: 'PDFMaster has transformed how we handle documents. The conversion quality is exceptional and the interface is incredibly intuitive.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Designer',
      content: 'I use this daily for client work. The merge and split features save me hours every week. Best PDF tool I\'ve ever used.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Emily Davis',
      role: 'Graduate Student',
      content: 'Perfect for my research! The OCR feature helped me extract text from scanned documents. Absolutely essential for academic work.',
      rating: 5,
      avatar: 'ED'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Premium Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl blur-xl opacity-50"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  PDFMaster
                </span>
                <span className="ml-2 text-xs text-blue-400 font-semibold">PRO</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <div key={item.name} className="relative">
                  <motion.button
                    className="flex items-center space-x-2 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => item.dropdown && setActiveDropdown(activeDropdown === item.name ? '' : item.name)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item.name && item.dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                      >
                        {item.dropdown.map((dropdownItem, idx) => (
                          <motion.a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-5 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                          >
                            {dropdownItem.name}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                className="p-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="hidden sm:flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-4 h-4" />
                <span>Go Premium</span>
              </motion.button>

              <motion.button
                className="lg:hidden p-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                    {item.dropdown && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-lg"
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Trusted by 500,000+ professionals worldwide</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                  Professional PDF
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Tools Suite
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Transform, edit, compress, merge, split, and secure your PDF documents with our powerful suite of tools. 
                Enterprise-grade security with lightning-fast processing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/25 transition-all duration-300 flex items-center space-x-3"
              >
                <Upload className="w-6 h-6" />
                <span>Start Converting</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-white font-bold rounded-2xl border border-white/20 transition-all duration-300 flex items-center space-x-3"
              >
                <Download className="w-6 h-6" />
                <span>View All Tools</span>
              </motion.button>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                  <div className="flex items-center justify-center mt-2 text-green-400 text-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>{stat.change}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating PDF Cards Animation */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-24 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg backdrop-blur-sm border border-white/10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-28 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg backdrop-blur-sm border border-white/10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-20 h-24 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg backdrop-blur-sm border border-white/10"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 3, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </section>

      {/* Tools Grid Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Powerful PDF Tools
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need to work with PDFs. Professional-grade tools that make document management effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => (
              <motion.a
                key={tool.title}
                href={tool.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 block"
              >
                {tool.badge && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {tool.badge}
                  </div>
                )}
                
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{tool.description}</p>
                  <div className="flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-6">
                    <span className="text-sm font-medium">Try Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Why Choose PDFMaster?
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Industry-leading PDF processing technology with enterprise-grade security and lightning-fast performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Process files in seconds with our optimized algorithms and cloud infrastructure'
              },
              {
                icon: Shield,
                title: 'Bank-Level Security',
                description: '256-bit encryption and GDPR compliance keeps your documents safe and private'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Share and work on documents together with real-time collaboration features'
              },
              {
                icon: Award,
                title: 'Award Winning',
                description: 'Trusted by 500,000+ professionals and featured in top tech publications'
              },
              {
                icon: Globe,
                title: 'Global Access',
                description: 'Available worldwide with multi-language support and localized features'
              },
              {
                icon: Server,
                title: '99.9% Uptime',
                description: 'Enterprise-grade infrastructure ensures your tools are always available'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                <p className="text-slate-400 text-center leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Loved by Professionals
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Don't just take our word for it—see why our users love PDFMaster.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">
                    {testimonial.avatar}
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-300 italic mb-6 text-center leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="text-center">
                  <div className="text-white font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your PDF Workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Join millions of users who have already streamlined their document management with our professional PDF tools.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-2xl shadow-2xl transition-all duration-300 flex items-center space-x-3"
              >
                <Zap className="w-6 h-6" />
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-700 text-white hover:bg-blue-800 font-bold rounded-2xl border border-blue-500 transition-all duration-300 flex items-center space-x-3"
              >
                <Award className="w-6 h-6" />
                <span>Go Premium</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">PDFMaster</span>
                  <span className="ml-2 text-xs text-blue-400 font-semibold">PRO</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Professional PDF tools suite trusted by millions. Transform, edit, and secure your documents with ease.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Tools</h3>
              <ul className="space-y-3">
                <li><a href="/pdf-to-word" className="text-slate-400 hover:text-white transition-colors">PDF to Word</a></li>
                <li><a href="/word-to-pdf" className="text-slate-400 hover:text-white transition-colors">Word to PDF</a></li>
                <li><a href="/pdf-to-jpg" className="text-slate-400 hover:text-white transition-colors">PDF to JPG</a></li>
                <li><a href="/compress-pdf" className="text-slate-400 hover:text-white transition-colors">Compress PDF</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Legal</h3>
              <ul className="space-y-3">
                <li><a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="text-slate-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="/gdpr" className="text-slate-400 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 PDFMaster Pro. All rights reserved. Built with ❤️ for productivity.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <LockKeyhole className="w-4 h-4" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Global Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
