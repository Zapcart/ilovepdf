'use client'

import { motion } from 'framer-motion'
import {
  FileText,
  Image,
  Minimize2,
  GitMerge,
  Scissors,
  RotateCw,
  Trash2,
  ArrowUpDown,
  Lock,
  Unlock,
  Edit3,
  Type,
  Image as ImageIcon,
  PenTool,
  Search,
  FileSpreadsheet,
  Presentation,
  FileDown
} from 'lucide-react'
import ToolCard from './ToolCard'

const tools = [
  {
    icon: FileText,
    title: 'PDF to Word',
    description: 'Convert PDF documents to editable Word files with perfect formatting',
    href: '/pdf-to-word',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: FileText,
    title: 'Word to PDF',
    description: 'Transform Word documents into professional PDF format instantly',
    href: '/word-to-pdf',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Image,
    title: 'PDF to JPG',
    description: 'Extract pages from PDF as high-quality JPG images',
    href: '/pdf-to-jpg',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: ImageIcon,
    title: 'JPG to PDF',
    description: 'Combine multiple images into a single PDF document',
    href: '/jpg-to-pdf',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Minimize2,
    title: 'Compress PDF',
    description: 'Reduce PDF file size without compromising quality',
    href: '/compress-pdf',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: GitMerge,
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one seamless document',
    href: '/merge-pdf',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: Scissors,
    title: 'Split PDF',
    description: 'Divide PDF into separate files or extract specific pages',
    href: '/split-pdf',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Unlock,
    title: 'Unlock PDF',
    description: 'Remove password protection from encrypted PDF files',
    href: '/unlock-pdf',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Lock,
    title: 'Protect PDF',
    description: 'Add password protection to secure your PDF documents',
    href: '/protect-pdf',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    icon: Edit3,
    title: 'Edit PDF',
    description: 'Modify text, images, and content in PDF documents',
    href: '/edit-pdf',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Type,
    title: 'Add Text',
    description: 'Insert text annotations and comments to PDF pages',
    href: '/add-text',
    color: 'from-lime-500 to-lime-600'
  },
  {
    icon: ImageIcon,
    title: 'Add Images',
    description: 'Insert images and graphics into PDF documents',
    href: '/add-images',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: RotateCw,
    title: 'Rotate PDF',
    description: 'Rotate pages 90, 180, or 270 degrees easily',
    href: '/rotate-pdf',
    color: 'from-violet-500 to-violet-600'
  },
  {
    icon: Trash2,
    title: 'Delete Pages',
    description: 'Remove unwanted pages from PDF documents',
    href: '/delete-pages',
    color: 'from-rose-500 to-rose-600'
  },
  {
    icon: ArrowUpDown,
    title: 'Reorder Pages',
    description: 'Rearrange pages in PDF to your preferred order',
    href: '/reorder-pages',
    color: 'from-amber-500 to-amber-600'
  },
  {
    icon: FileSpreadsheet,
    title: 'PDF to Excel',
    description: 'Convert PDF tables to editable Excel spreadsheets',
    href: '/pdf-to-excel',
    color: 'from-sky-500 to-sky-600'
  },
  {
    icon: FileSpreadsheet,
    title: 'Excel to PDF',
    description: 'Transform Excel sheets into professional PDF documents',
    href: '/excel-to-pdf',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Presentation,
    title: 'PDF to PowerPoint',
    description: 'Convert PDF to editable PowerPoint presentations',
    href: '/pdf-to-powerpoint',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Presentation,
    title: 'PowerPoint to PDF',
    description: 'Convert PowerPoint slides to PDF format',
    href: '/powerpoint-to-pdf',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: FileDown,
    title: 'PDF to Text',
    description: 'Extract plain text from PDF documents',
    href: '/pdf-to-text',
    color: 'from-gray-500 to-gray-600'
  },
  {
    icon: Search,
    title: 'OCR PDF',
    description: 'Extract text from scanned PDFs using OCR technology',
    href: '/ocr-pdf',
    color: 'from-purple-500 to-purple-600'
  }
]

export default function ToolsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Powerful PDF Tools</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to work with PDFs. Professional-grade tools that make document management effortless.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tools.map((tool, index) => (
            <ToolCard
              key={tool.title}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              color={tool.color}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
