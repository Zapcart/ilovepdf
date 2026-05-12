'use client'

import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import ToolsGrid from '../components/ToolsGrid'
import HowItWorks from '../components/HowItWorks'
import Statistics from '../components/Statistics'

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-gradient">
      <Navigation />
      
      <main>
        <HeroSection />
        <ToolsGrid />
        <HowItWorks />
        <Statistics />
      </main>
      
      {/* Simple Footer */}
      <footer className="glass-card border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 PDFMaster. All rights reserved. Built with ❤️ for productivity.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


