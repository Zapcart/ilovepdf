import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JPG to PDF Converter - Convert Images to PDF Online | PDFMaster Tools',
  description: 'Convert JPG images to PDF documents. Combine multiple images into one PDF file. Free image to PDF tool.',
  keywords: 'JPG to PDF, image to PDF, convert images, image converter, free JPG to PDF',
  openGraph: {
    title: 'JPG to PDF Converter - PDFMaster Tools',
    description: 'Convert JPG images to PDF documents. Combine multiple images into one PDF.',
  },
}

export default function JpgToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

