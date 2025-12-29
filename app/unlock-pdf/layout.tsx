import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unlock PDF Online - Remove PDF Password Protection | PDFMaster Tools',
  description: 'Remove password protection from PDF files. Unlock encrypted PDF documents. Free PDF unlock tool.',
  keywords: 'unlock PDF, remove PDF password, decrypt PDF, PDF unlock, free PDF unlock',
  openGraph: {
    title: 'Unlock PDF Online - PDFMaster Tools',
    description: 'Remove password protection from PDF files. Unlock encrypted PDF documents.',
  },
}

export default function UnlockPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

