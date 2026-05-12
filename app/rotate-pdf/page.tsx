'use client'

import { useState } from 'react'
import { PDFDocument, degrees } from 'pdf-lib'
import { FileInfo, readFileAsArrayBuffer, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function RotatePdfPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [rotation, setRotation] = useState<90 | 180 | 270>(90)

  const handleRotate = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    setStatus('processing')
    setMessage('Rotating PDF pages...')

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file.file)
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = pdf.getPages()

      pages.forEach((page) => {
        page.setRotation(degrees(rotation))
      })

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
      const filename = file.name.replace('.pdf', '') + '-rotated.pdf'
      await downloadBlob(blob, filename)

      setStatus('success')
      setMessage(`PDF rotated successfully by ${rotation} degrees!`)
      setFile(null)
    } catch (error) {
      setStatus('error')
      setMessage('Failed to rotate PDF. Please ensure the file is a valid PDF document.')
      console.error('Rotate error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Rotate PDF Pages
        </h1>
        <p className="text-xl text-gray-600">
          Rotate PDF pages 90, 180, or 270 degrees. Fix orientation of scanned documents.
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
                Rotation Angle
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[90, 180, 270].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setRotation(angle as 90 | 180 | 270)}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                      rotation === angle
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRotate}
              disabled={status === 'processing'}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Rotating...' : 'Rotate PDF'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />
      </div>
    </div>
  )
}

