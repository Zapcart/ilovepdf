'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown,
  Home,
  FileText,
  Edit3,
  Lock,
  Minimize2,
  GitMerge,
  Scissors
} from 'lucide-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState('')

  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
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
        { name: 'JPG to PDF', href: '/jpg-to-pdf' }
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
        { name: 'Sign PDF', href: '/sign-pdf' }
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">PDFMaster</span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative">
                <motion.button
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => item.dropdown && setIsDropdownOpen(isDropdownOpen === item.name ? '' : item.name)}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.dropdown && <ChevronDown className="w-3 h-3" />}
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen === item.name && item.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 glass-card rounded-lg shadow-xl border border-white/10"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <motion.button
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-card border-t border-white/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </a>
                  {item.dropdown && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200 rounded"
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
  )
}
