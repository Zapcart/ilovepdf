import Link from 'next/link'
import { tools } from '../lib/tools'
import AdSense from '../components/AdSense'
import ToolCard from '../components/ToolCard'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Every tool you need to work with PDFs
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Free, secure, and easy-to-use PDF tools. Process your files directly in your browser. No uploads, no registration.
          </p>
          <Link
            href="/all-tools"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Explore All Tools
          </Link>
        </div>
      </section>

      {/* AdSense - Below Header */}
      <div className="container mx-auto px-4 py-4">
        <AdSense
          adSlot="1234567890"
          adFormat="auto"
          fullWidthResponsive={true}
        />
      </div>

      {/* Tools Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Popular PDF Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.slice(0, 8).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/all-tools"
              className="text-primary-600 hover:text-primary-700 font-semibold text-lg"
            >
              View All Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* AdSense - Between Sections */}
      <div className="container mx-auto px-4 py-8">
        <AdSense
          adSlot="1234567891"
          adFormat="horizontal"
          fullWidthResponsive={true}
        />
      </div>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Upload Your File</h3>
              <p className="text-gray-600">
                Drag and drop your PDF file or click to browse. All processing happens in your browser.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Process Instantly</h3>
              <p className="text-gray-600">
                Our tools process your file instantly using advanced client-side technology.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Download & Done</h3>
              <p className="text-gray-600">
                Download your processed file immediately. Files are automatically deleted after processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Privacy Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              100% Secure & Private
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your privacy is our priority. All PDF processing happens directly in your browser. 
              We never store, upload, or access your files. Your documents never leave your device.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold mb-2 text-gray-900">No File Storage</h3>
                <p className="text-sm text-gray-600">Files are processed locally and never uploaded to servers.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2 text-gray-900">Instant Processing</h3>
                <p className="text-sm text-gray-600">Fast client-side processing with no waiting times.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-3">🆓</div>
                <h3 className="font-semibold mb-2 text-gray-900">100% Free</h3>
                <p className="text-sm text-sm text-gray-600">All tools are free to use with no hidden costs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense - Before Footer */}
      <div className="container mx-auto px-4 py-8">
        <AdSense
          adSlot="1234567892"
          adFormat="horizontal"
          fullWidthResponsive={true}
        />
      </div>
    </>
  )
}


