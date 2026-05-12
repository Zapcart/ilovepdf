import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - PDFMaster Tools | Free Online PDF Tools',
  description: 'Learn about PDFMaster Tools - your trusted source for free, secure PDF processing tools. All processing happens in your browser.',
  openGraph: {
    title: 'About Us - PDFMaster Tools',
    description: 'Learn about PDFMaster Tools - free, secure PDF processing tools.',
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About PDFMaster Tools
        </h1>
      </header>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            PDFMaster Tools is dedicated to providing free, secure, and easy-to-use PDF processing tools 
            that work entirely in your browser. We believe that your documents should remain private and 
            secure, which is why all processing happens locally on your device without any file uploads to servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy First</h2>
          <p className="text-gray-700 leading-relaxed">
            Your privacy is our top priority. Unlike many other PDF tools, we don&apos;t store, upload, 
            or access your files. All PDF processing happens directly in your browser using advanced 
            client-side technology. Your documents never leave your device, ensuring complete privacy and security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Free & Accessible</h2>
          <p className="text-gray-700 leading-relaxed">
            All our tools are completely free to use with no hidden costs, registration requirements, 
            or file size limits. We believe that essential PDF tools should be accessible to everyone, 
            whether you&apos;re a student, professional, or casual user.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Tools</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We offer a comprehensive suite of PDF tools including:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Merge multiple PDFs into one document</li>
            <li>Split PDFs into separate files</li>
            <li>Compress PDF files to reduce size</li>
            <li>Convert PDFs to various formats</li>
            <li>Rotate and reorder PDF pages</li>
            <li>Protect PDFs with password encryption</li>
            <li>And much more...</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions, feedback, or suggestions? We&apos;d love to hear from you! 
            Please visit our <Link href="/contact" className="text-primary-600 hover:text-primary-700">contact page</Link> to get in touch.
          </p>
        </section>
      </div>
    </div>
  )
}

