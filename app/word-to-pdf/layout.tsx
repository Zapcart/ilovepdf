import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Word to PDF Converter - Convert DOCX to PDF Online | PDFMaster Tools',
  description: 'Convert Word documents to PDF format online. Transform DOCX files to PDF instantly. Free converter tool.',
  keywords: 'Word to PDF, DOCX to PDF, convert Word, Word converter, free Word to PDF',
  openGraph: {
    title: 'Word to PDF Converter - PDFMaster Tools',
    description: 'Convert Word documents to PDF format online.',
  },
}

export default function WordToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

