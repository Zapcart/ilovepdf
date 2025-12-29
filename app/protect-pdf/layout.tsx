import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Protect PDF Online - Add Password to PDF Files | PDFMaster Tools',
  description: 'Add password protection to PDF files. Secure your PDF documents with encryption. Free PDF protection tool.',
  keywords: 'protect PDF, password protect PDF, encrypt PDF, secure PDF, PDF password',
  openGraph: {
    title: 'Protect PDF Online - PDFMaster Tools',
    description: 'Add password protection to PDF files. Secure your PDF documents.',
  },
}

export default function ProtectPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

