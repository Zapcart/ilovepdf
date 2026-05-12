'use client'

import { useState } from 'react'
import { FileInfo, convertPDFToWord, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function PdfToWordPage() {
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
    setMessage('Converting PDF to Word... This may take a moment.')

    try {
      const wordBlob = await convertPDFToWord(file.file)
      const filename = file.name.replace('.pdf', '.docx')
      await downloadBlob(wordBlob, filename)
      
      setStatus('success')
      setMessage('Successfully converted PDF to Word! Your download should start automatically.')
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
          PDF to Word Converter
        </h1>
        <p className="text-xl text-gray-600">
          Convert PDF documents to editable Word files. Extract text and formatting.
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
              {status === 'processing' ? 'Converting...' : 'Convert to Word'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Full PDF to Word conversion with formatting preservation requires server-side processing. 
            For production use, integrate with a conversion API service.
          </p>
        </div>
      </div>
    </div>
  )
}

