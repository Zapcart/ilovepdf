'use client'

import { useState } from 'react'
import { FileInfo, readFileAsArrayBuffer, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function WordToPdfPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleConvert = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a Word document.')
      return
    }

    setStatus('processing')
    setMessage('Converting Word to PDF... This may take a moment.')

    try {
      // Note: Word to PDF conversion requires server-side processing
      // This is a placeholder for the conversion logic
      setStatus('error')
      setMessage('Word to PDF conversion requires server-side processing. Please use a dedicated conversion service or implement an API endpoint.')
      
      // In a real implementation, you would:
      // 1. Send file to API endpoint
      // 2. Process on server using libraries like docx-pdf or LibreOffice
      // 3. Return converted PDF file
      
    } catch (error) {
      setStatus('error')
      setMessage('Failed to convert document. Please ensure the file is a valid Word document.')
      console.error('Convert error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Word to PDF Converter
        </h1>
        <p className="text-xl text-gray-600">
          Convert Word documents to PDF format. Transform DOCX files to PDF instantly.
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <FileUpload
          accept=".doc,.docx"
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
              {status === 'processing' ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Word to PDF conversion requires server-side processing. 
            For production use, integrate with a conversion API service or use server-side libraries.
          </p>
        </div>
      </div>
    </div>
  )
}

