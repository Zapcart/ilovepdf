'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileInfo, readFileAsArrayBuffer, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function UnlockPdfPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')

  const handleUnlock = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    if (!password) {
      setStatus('error')
      setMessage('Please enter the PDF password.')
      return
    }

    setStatus('processing')
    setMessage('Unlocking PDF...')

    try {
      // Note: pdf-lib doesn't support password-protected PDF loading directly
      // For production, you would need to use a library that supports PDF decryption
      // or implement server-side processing
      setStatus('error')
      setMessage('PDF unlocking requires additional libraries that support PDF decryption. For production use, implement server-side PDF decryption or use a library like pdf.js with password support.')
      
      // Placeholder for future implementation:
      // const arrayBuffer = await readFileAsArrayBuffer(file.file)
      // Use a library that supports password-protected PDFs
      // const pdf = await loadPasswordProtectedPDF(arrayBuffer, password)
      // Process and save unlocked PDF
    } catch (error: any) {
      setStatus('error')
      setMessage('Failed to unlock PDF. PDF unlocking requires specialized libraries.')
      console.error('Unlock error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Unlock PDF Files
        </h1>
        <p className="text-xl text-gray-600">
          Remove password protection from PDF files. Unlock encrypted PDF documents.
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <FileUpload
          accept=".pdf"
          multiple={false}
          onFilesSelected={(files) => setFile(files[0] || null)}
        />

        {file && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the PDF password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleUnlock}
              disabled={status === 'processing' || !password}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Unlocking...' : 'Unlock PDF'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />
      </div>
    </div>
  )
}

