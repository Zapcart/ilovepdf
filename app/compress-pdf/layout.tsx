import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compress PDF Online - Reduce PDF File Size Free | PDFMaster Tools',
  description: 'Compress PDF files to reduce size. Maintain quality while decreasing file size. Free PDF compression tool.',
  keywords: 'compress PDF, reduce PDF size, PDF compression, shrink PDF, free PDF compress',
  openGraph: {
    title: 'Compress PDF Online - PDFMaster Tools',
    description: 'Compress PDF files to reduce size. Maintain quality while decreasing file size.',
  },
}

export default function CompressPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

