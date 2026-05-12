export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  slug: string
  category: string
  seoTitle: string
  seoDescription: string
}

export const tools: Tool[] = [
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one document',
    icon: '📄',
    slug: '/merge-pdf',
    category: 'organize',
    seoTitle: 'Merge PDF Files Online - Combine PDFs Free | PDFMaster Tools',
    seoDescription: 'Merge multiple PDF files into one document for free. Combine PDFs instantly in your browser. No registration required.',
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Split a PDF into multiple separate files',
    icon: '✂️',
    slug: '/split-pdf',
    category: 'organize',
    seoTitle: 'Split PDF Online - Divide PDF into Multiple Files | PDFMaster Tools',
    seoDescription: 'Split PDF files into separate documents. Extract pages from PDF for free. No file size limits.',
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size without losing quality',
    icon: '🗜️',
    slug: '/compress-pdf',
    category: 'optimize',
    seoTitle: 'Compress PDF Online - Reduce PDF File Size Free | PDFMaster Tools',
    seoDescription: 'Compress PDF files to reduce size. Maintain quality while decreasing file size. Free PDF compression tool.',
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF documents to editable Word files',
    icon: '📝',
    slug: '/pdf-to-word',
    category: 'convert',
    seoTitle: 'PDF to Word Converter - Convert PDF to DOCX Online | PDFMaster Tools',
    seoDescription: 'Convert PDF to Word documents online. Extract text from PDF and create editable DOCX files for free.',
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    icon: '📄',
    slug: '/word-to-pdf',
    category: 'convert',
    seoTitle: 'Word to PDF Converter - Convert DOCX to PDF Online | PDFMaster Tools',
    seoDescription: 'Convert Word documents to PDF format online. Transform DOCX files to PDF instantly. Free converter tool.',
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    icon: '🖼️',
    slug: '/pdf-to-jpg',
    category: 'convert',
    seoTitle: 'PDF to JPG Converter - Convert PDF to Images Online | PDFMaster Tools',
    seoDescription: 'Convert PDF pages to JPG images. Extract images from PDF files. Free PDF to image converter.',
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG images to PDF documents',
    icon: '📷',
    slug: '/jpg-to-pdf',
    category: 'convert',
    seoTitle: 'JPG to PDF Converter - Convert Images to PDF Online | PDFMaster Tools',
    seoDescription: 'Convert JPG images to PDF documents. Combine multiple images into one PDF file. Free image to PDF tool.',
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    description: 'Rotate PDF pages clockwise or counterclockwise',
    icon: '🔄',
    slug: '/rotate-pdf',
    category: 'edit',
    seoTitle: 'Rotate PDF Pages Online - Rotate PDF Documents | PDFMaster Tools',
    seoDescription: 'Rotate PDF pages 90, 180, or 270 degrees. Fix orientation of PDF documents. Free PDF rotation tool.',
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    description: 'Remove password protection from PDF files',
    icon: '🔓',
    slug: '/unlock-pdf',
    category: 'security',
    seoTitle: 'Unlock PDF Online - Remove PDF Password Protection | PDFMaster Tools',
    seoDescription: 'Remove password protection from PDF files. Unlock encrypted PDF documents. Free PDF unlock tool.',
  },
  {
    id: 'protect-pdf',
    name: 'Protect PDF',
    description: 'Add password protection to PDF files',
    icon: '🔒',
    slug: '/protect-pdf',
    category: 'security',
    seoTitle: 'Protect PDF Online - Add Password to PDF Files | PDFMaster Tools',
    seoDescription: 'Add password protection to PDF files. Secure your PDF documents with encryption. Free PDF protection tool.',
  },
]

export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id)
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug)
}


