import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Merge PDF Files Online - Combine PDFs Free | PDFMaster Tools',
  description: 'Merge multiple PDF files into one document for free. Combine PDFs instantly in your browser. No registration required.',
  keywords: 'merge PDF, combine PDF, merge PDF files, PDF merger, free PDF merge',
  openGraph: {
    title: 'Merge PDF Files Online - PDFMaster Tools',
    description: 'Merge multiple PDF files into one document for free.',
  },
}

export default function MergePdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

