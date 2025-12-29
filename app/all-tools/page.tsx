import type { Metadata } from 'next'
import Link from 'next/link'
import { tools } from '../../lib/tools'
import ToolCard from '../../components/ToolCard'
import AdSense from '../../components/AdSense'

export const metadata: Metadata = {
  title: 'All PDF Tools - Complete List of Free Online PDF Tools | PDFMaster Tools',
  description: 'Complete list of all free PDF tools: merge, split, compress, convert PDFs to Word, JPG, and more. All tools work directly in your browser.',
  keywords: 'PDF tools, all PDF tools, merge PDF, split PDF, compress PDF, PDF converter, free PDF tools list',
  openGraph: {
    title: 'All PDF Tools - Complete List | PDFMaster Tools',
    description: 'Complete list of all free PDF tools. Merge, split, compress, convert PDFs instantly.',
  },
}

export default function AllToolsPage() {
  return (
    <>
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            All PDF Tools
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Complete collection of free PDF tools. All processing happens in your browser for maximum privacy and security.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <AdSense
          adSlot="1234567893"
          adFormat="horizontal"
          fullWidthResponsive={true}
        />
      </div>
    </>
  )
}

