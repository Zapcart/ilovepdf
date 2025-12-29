import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdSense from '../components/AdSense'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://pdfmaster-tools.vercel.app'),
  title: 'PDFMaster Tools - Free Online PDF Tools | Merge, Split, Compress PDFs',
  description: 'Free online PDF tools to merge, split, compress, convert PDFs. No registration required. Process PDFs securely in your browser.',
  keywords: 'PDF tools, merge PDF, split PDF, compress PDF, PDF converter, free PDF tools',
  authors: [{ name: 'PDFMaster Tools' }],
  openGraph: {
    title: 'PDFMaster Tools - Free Online PDF Tools',
    description: 'Free online PDF tools to merge, split, compress, convert PDFs. No registration required.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFMaster Tools - Free Online PDF Tools',
    description: 'Free online PDF tools to merge, split, compress, convert PDFs.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Replace ca-pub-XXXXXXXXXXXXXXXX with your AdSense Publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}


