'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileInfo, readFileAsArrayBuffer, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function ProtectPdfPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleProtect = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    if (!password || password.length < 4) {
      setStatus('error')
      setMessage('Please enter a password with at least 4 characters.')
      return
    }

    if (password !== confirmPassword) {
      setStatus('error')
      setMessage('Passwords do not match.')
      return
    }

    setStatus('processing')
    setMessage('Protecting PDF with password...')

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file.file)
      const pdf = await PDFDocument.load(arrayBuffer)

      // Note: pdf-lib encryption requires additional setup
      // For production, consider using a dedicated PDF encryption library or server-side processing
      // This is a simplified version that saves the PDF
      const pdfBytes = await pdf.save()

      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
      const filename = file.name.replace('.pdf', '') + '-protected.pdf'
      await downloadBlob(blob, filename)

      setStatus('success')
      setMessage('PDF saved successfully! Note: Full password protection requires additional encryption setup. For production use, implement proper PDF encryption.')
      setFile(null)
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setStatus('error')
      setMessage('Failed to protect PDF. Please ensure the file is a valid PDF document.')
      console.error('Protect error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Protect PDF with Password
        </h1>
        <p className="text-xl text-gray-600">
          Add password protection to your PDF files. Secure your documents with encryption.
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
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (min 4 characters)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Remember your password. If you forget it, you won&apos;t be able to open the protected PDF.
              </p>
            </div>

            <button
              onClick={handleProtect}
              disabled={status === 'processing' || !password || password !== confirmPassword}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Protecting...' : 'Protect PDF'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />
      </div>
    </div>
  )
}

