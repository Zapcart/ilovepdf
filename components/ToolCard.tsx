'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface ToolCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  color: string
  delay: number
}

export default function ToolCard({ icon: Icon, title, description, href, color, delay }: ToolCardProps) {
  return (
    <motion.a
      href={href}
      className="group relative block glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 card-hover"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icon Container */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
      
      {/* Arrow Indicator */}
      <div className="flex items-center text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </motion.a>
  )
}

