'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileInfo, readFileAsArrayBuffer, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function PdfToJpgPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleConvert = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    setStatus('processing')
    setMessage('Converting PDF pages to JPG images...')

    try {
      // Note: PDF to JPG requires canvas rendering which needs pdf.js
      // This is a simplified version - for production, use pdf.js with canvas
      setStatus('error')
      setMessage('PDF to JPG conversion requires pdf.js library for rendering. Please install pdfjs-dist and implement canvas rendering.')
      
      // In a real implementation, you would:
      // 1. Load PDF using pdf.js
      // 2. Render each page to canvas
      // 3. Convert canvas to JPG blob
      // 4. Download each image
      
    } catch (error) {
      setStatus('error')
      setMessage('Failed to convert PDF. Please ensure the file is a valid PDF document.')
      console.error('Convert error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          PDF to JPG Converter
        </h1>
        <p className="text-xl text-gray-600">
          Convert PDF pages to JPG images. Extract images from PDF files.
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <FileUpload
          accept=".pdf"
          multiple={false}
          onFilesSelected={(files) => setFile(files[0] || null)}
        />

        {file && (
          <div className="mt-6">
            <button
              onClick={handleConvert}
              disabled={status === 'processing'}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Converting...' : 'Convert to JPG'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> PDF to JPG conversion requires pdf.js for rendering PDF pages to canvas. 
            Install pdfjs-dist package and implement canvas-to-image conversion.
          </p>
        </div>
      </div>
    </div>
  )
}

