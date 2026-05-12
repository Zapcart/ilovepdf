'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Users, 
  FileText, 
  Globe, 
  Zap,
  TrendingUp,
  Award,
  Shield,
  Clock
} from 'lucide-react'

export default function Statistics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    {
      icon: Users,
      value: "10M+",
      label: "Happy Users",
      description: "Trust our platform for their PDF needs",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FileText,
      value: "50M+",
      label: "Files Processed",
      description: "PDFs transformed successfully",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Globe,
      value: "180+",
      label: "Countries",
      description: "Global reach with localized support",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      value: "< 3s",
      label: "Average Processing Time",
      description: "Lightning-fast PDF operations",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const achievements = [
    {
      icon: TrendingUp,
      title: "99.9% Uptime",
      description: "Reliable service you can count on"
    },
    {
      icon: Award,
      title: "Industry Leader",
      description: "Most trusted PDF platform"
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Your data is always protected"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Help whenever you need it"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-accent-500/20 to-primary-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Trusted by Millions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join millions of users who trust PDFMaster for their document needs. Our platform delivers reliability, speed, and security.
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-8 text-center border border-white/10 hover:border-white/20 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>

              {/* Value */}
              <motion.div
                className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                variants={counterVariants}
              >
                {stat.value}
              </motion.div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="glass-card rounded-3xl p-12 border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">PDFMaster</span>
            </h3>
            <p className="text-gray-300 text-lg">
              We're committed to providing the best PDF experience possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white/10 flex items-center justify-center">
                  <achievement.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
