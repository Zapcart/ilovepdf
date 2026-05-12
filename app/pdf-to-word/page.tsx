'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Check, 
  Loader2, 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock,
  Upload,
  Star,
  TrendingUp,
  Award,
  Home,
  Eye,
  Trash2,
  Image as ImageIcon
} from 'lucide-react'
import { downloadBlob } from '../../lib/pdfUtils'

export default function PdfToWordPage() {
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(file => file.type === 'application/pdf')
    
    if (validFiles.length > 0) {
      setFiles(validFiles)
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter(file => file.type === 'application/pdf')
    
    if (validFiles.length > 0) {
      setFiles(validFiles)
    }
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleConvert = useCallback(async () => {
    if (files.length === 0) {
      setStatus('error')
      setMessage('Please select at least one PDF file.')
      return
    }

    setStatus('processing')
    setMessage('Converting PDF to Word...')
    setProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file)
        
        setProgress(Math.round((i / files.length) * 50))
        
        const response = await fetch('/api/pdf-to-word', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Conversion failed')
        }
        
        const blob = await response.blob()
        const filename = file.name.replace('.pdf', '.docx')
        await downloadBlob(blob, filename)
        
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }
      
      setStatus('success')
      setMessage(`Successfully converted ${files.length} PDF file(s) to Word! Your downloads should start automatically.`)
      setFiles([])
      setProgress(100)
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
        setProgress(0)
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage('Failed to convert PDF(s). Please ensure all files are valid PDF documents.')
      console.error('Convert error:', error)
      setProgress(0)
    }
  }, [files])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const dm = bytes / Math.pow(k, i) * 100
    const roundedSize = Math.round(dm)
    return `${roundedSize} ${sizes[i]}`
  }

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Convert files in seconds with optimized processing and cloud infrastructure'
    },
    {
      icon: Shield,
      title: 'Format Preserved',
      description: 'Maintains original formatting, images, tables, and document structure perfectly'
    },
    {
      icon: Clock,
      title: 'Batch Processing',
      description: 'Convert multiple PDF files simultaneously to save time and effort'
    },
    {
      icon: Star,
      title: 'High Accuracy',
      description: 'Advanced OCR technology ensures 99.9% text recognition accuracy'
    }
  ]

  const relatedTools = [
    { title: 'Word to PDF', href: '/word-to-pdf', icon: FileText },
    { title: 'PDF to JPG', href: '/pdf-to-jpg', icon: ImageIcon },
    { title: 'Edit PDF', href: '/edit-pdf', icon: FileText },
    { title: 'Compress PDF', href: '/compress-pdf', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Premium Header */}
      <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl blur-xl opacity-50"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  PDF to Word
                </h1>
                <p className="text-sm text-slate-400">Convert PDF documents to editable Word files with perfect formatting</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.a
                href="/"
                className="p-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                  Convert PDF to Word
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Transform your PDF documents into fully editable Word files. Preserve formatting, 
                images, and tables with our advanced conversion technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <Upload className="w-6 h-6 mr-3 text-blue-400" />
                  Upload Your PDF Files
                </h3>
                <p className="text-slate-400">Drag and drop your files or click to browse. Multiple files supported.</p>
              </div>

              {/* Premium Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={status === 'processing'}
                />
                
                <div className="text-center">
                  {status === 'processing' ? (
                    <div className="space-y-4">
                      <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-500" />
                      <p className="text-lg text-slate-300">Processing files...</p>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-400">{progress}%</p>
                    </div>
                  ) : files.length > 0 ? (
                    <div className="space-y-4">
                      {files.map((file, index) => (
                        <motion.div
                          key={file.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium truncate max-w-xs">{file.name}</p>
                              <p className="text-slate-400 text-sm">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => window.open(URL.createObjectURL(file), '_blank')}
                              className="text-slate-400 hover:text-blue-400 transition-colors p-2"
                              title="Preview"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-slate-400 hover:text-red-400 transition-colors p-2"
                              title="Remove"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                      
                      <div className="flex justify-center pt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConvert}
                          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center space-x-3"
                        >
                          <Download className="w-6 h-6" />
                          <span>Convert to Word</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Upload className="w-16 h-16 mx-auto text-slate-400 mb-6" />
                      <p className="text-xl font-medium text-slate-300 mb-2">
                        Drag & Drop PDF files here
                      </p>
                      <p className="text-slate-400 mb-4">or</p>
                      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                        Browse Files
                      </button>
                      <p className="text-xs text-slate-500 mt-6">
                        Maximum file size: 50MB • Supported format: PDF
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`mt-6 p-4 rounded-xl border ${
                    status === 'success' 
                      ? 'bg-green-900/20 border-green-700 text-green-400' 
                      : 'bg-red-900/20 border-red-700 text-red-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {status === 'success' ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    )}
                    <div>
                      <p className="font-medium">{message}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Features Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Our Converter?</h3>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-center"
            >
              <div className="text-white">
                <div className="text-4xl font-bold mb-2">10M+</div>
                <div className="text-lg opacity-90 mb-4">Files Converted</div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>99.9% Success Rate</span>
                </div>
              </div>
            </motion.div>

            {/* Related Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">Related Tools</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {relatedTools.map((tool, index) => (
                  <motion.a
                    key={tool.title}
                    href={tool.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-700/50 rounded-xl p-4 text-center hover:bg-slate-700 transition-all duration-300"
                  >
                    <tool.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                    <p className="text-sm text-white font-medium">{tool.title}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

