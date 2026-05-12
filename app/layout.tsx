import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://pdfmaster-tools.vercel.app'),
  title: 'PDFMaster Tools - Premium PDF Suite | All-in-One PDF Solution',
  description: 'Professional PDF tools platform. Convert, edit, compress, merge, split, and secure PDFs. 50+ powerful tools with modern UI.',
  keywords: 'PDF tools, merge PDF, split PDF, compress PDF, PDF converter, edit PDF, PDF suite',
  authors: [{ name: 'PDFMaster Tools' }],
  openGraph: {
    title: 'PDFMaster Tools - Premium PDF Suite',
    description: 'Professional PDF tools platform with 50+ powerful features. Modern UI, fast processing, secure.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFMaster Tools - Premium PDF Suite',
    description: 'Professional PDF tools platform with modern UI and powerful features.',
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
    <html lang="en" className="dark">
      <body className="bg-navy-gradient text-white antialiased">
        {children}
      </body>
    </html>
  )
}


