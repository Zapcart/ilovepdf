import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Split PDF Online - Divide PDF into Multiple Files | PDFMaster Tools',
  description: 'Split PDF files into separate documents. Extract pages from PDF for free. No file size limits.',
  keywords: 'split PDF, divide PDF, extract PDF pages, PDF splitter, free PDF split',
  openGraph: {
    title: 'Split PDF Online - PDFMaster Tools',
    description: 'Split PDF files into separate documents. Extract pages from PDF.',
  },
}

export default function SplitPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

