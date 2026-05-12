'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileInfo, unlockPDF, downloadBlob } from '../../lib/pdfUtils'
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
      setMessage('Please enter PDF password.')
      return
    }

    setStatus('processing')
    setMessage('Unlocking PDF...')

    try {
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('password', password)
      
      const response = await fetch('/api/unlock-pdf', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Unlock failed')
      }
      
      const blob = await response.blob()
      const filename = file.name.replace('.pdf', '-unlocked.pdf')
      await downloadBlob(blob, filename)
      
      setStatus('success')
      setMessage('PDF unlocked successfully! Your download should start automatically.')
      setFile(null)
      setPassword('')
    } catch (error: any) {
      setStatus('error')
      if (error.message.includes('password protected')) {
        setMessage('Incorrect password. Please try again.')
      } else {
        setMessage('Failed to unlock PDF. Please ensure the file is a valid PDF document.')
      }
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

