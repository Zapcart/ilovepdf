import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF to Word Converter - Convert PDF to DOCX Online | PDFMaster Tools',
  description: 'Convert PDF to Word documents online. Extract text from PDF and create editable DOCX files for free.',
  keywords: 'PDF to Word, PDF to DOCX, convert PDF, PDF converter, free PDF to Word',
  openGraph: {
    title: 'PDF to Word Converter - PDFMaster Tools',
    description: 'Convert PDF to Word documents online. Extract text from PDF.',
  },
}

export default function PdfToWordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

