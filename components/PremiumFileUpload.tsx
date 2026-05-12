'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Upload, 
  X, 
  Eye, 
  Download, 
  Check, 
  Trash2,
  Loader2,
  File,
  Image as ImageIcon
} from 'lucide-react'

interface PremiumFileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  onFilesSelected: (files: File[]) => void
  className?: string
}

export default function PremiumFileUpload({ 
  accept = '*',
  multiple = false,
  maxSize = 50 * 1024 * 1024, // 50MB default
  onFilesSelected,
  className = ''
}: PremiumFileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const dm = bytes / Math.pow(k, i) * 100
    const roundedSize = Math.round(dm)
    return `${roundedSize} ${sizes[i]}`
  }

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
    
    const droppedFiles = Array.from(e.dataTransfer.files) as File[]
    const validFiles = droppedFiles.filter(file => {
      if (accept === '*') return true
      const acceptedTypes = accept.split(',').map(type => type.trim())
      return acceptedTypes.some(type => file.type.includes(type))
    })

    if (validFiles.length > 0) {
      const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0)
      if (totalSize > maxSize) {
        alert(`Total file size (${formatFileSize(totalSize)}) exceeds maximum allowed size (${formatFileSize(maxSize)})`)
        return
      }
      setFiles(validFiles)
    }
  }, [accept, maxSize])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[]
    const validFiles = selectedFiles.filter(file => {
      if (accept === '*') return true
      const acceptedTypes = accept.split(',').map(type => type.trim())
      return acceptedTypes.some(type => file.type.includes(type))
    })

    if (validFiles.length > 0) {
      const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0)
      if (totalSize > maxSize) {
        alert(`Total file size (${formatFileSize(totalSize)}) exceeds maximum allowed size (${formatFileSize(maxSize)})`)
        return
      }
      setFiles(validFiles)
    }
  }, [accept, maxSize])

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const simulateProgress = useCallback(() => {
    setIsProcessing(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
    
    setTimeout(() => {
      clearInterval(interval)
      setIsProcessing(false)
      setProgress(100)
    }, 3000)
  }, [])

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="text-center">
          {isProcessing ? (
            <div className="space-y-4">
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-500" />
              <p className="text-sm text-slate-600">Processing files...</p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">{progress}%</p>
            </div>
          ) : files.length > 0 ? (
            <div className="space-y-3">
              {files.map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {file.type.startsWith('image/') ? (
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      ) : file.type === 'application/pdf' ? (
                        <FileText className="w-8 h-8 text-slate-400" />
                      ) : (
                        <FileText className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div>
                        <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                        <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    {file.type === 'application/pdf' && (
                      <button
                        onClick={() => {
                          // Create a temporary URL for preview
                          const url = URL.createObjectURL(file)
                          window.open(url, '_blank')
                        }}
                        className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                        title="Preview PDF"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={simulateProgress}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Process Files</span>
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <p className="text-lg font-medium text-slate-300 mb-2">
                Drag & Drop your files here
              </p>
              <p className="text-sm text-slate-400">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
              <p className="text-xs text-slate-500 mt-4">
                Supported formats: PDF, DOC, DOCX, JPG, PNG
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
