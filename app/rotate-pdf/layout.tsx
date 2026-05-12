import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rotate PDF Pages Online - Rotate PDF Documents | PDFMaster Tools',
  description: 'Rotate PDF pages 90, 180, or 270 degrees. Fix orientation of PDF documents. Free PDF rotation tool.',
  keywords: 'rotate PDF, rotate PDF pages, PDF rotation, fix PDF orientation, free PDF rotate',
  openGraph: {
    title: 'Rotate PDF Pages Online - PDFMaster Tools',
    description: 'Rotate PDF pages 90, 180, or 270 degrees. Fix orientation of PDF documents.',
  },
}

export default function RotatePdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

