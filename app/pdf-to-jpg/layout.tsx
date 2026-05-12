import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF to JPG Converter - Convert PDF to Images Online | PDFMaster Tools',
  description: 'Convert PDF pages to JPG images. Extract images from PDF files. Free PDF to image converter.',
  keywords: 'PDF to JPG, PDF to image, convert PDF, PDF converter, free PDF to JPG',
  openGraph: {
    title: 'PDF to JPG Converter - PDFMaster Tools',
    description: 'Convert PDF pages to JPG images. Extract images from PDF files.',
  },
}

export default function PdfToJpgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

