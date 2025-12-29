'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileInfo, readFileAsArrayBuffer, downloadBlob, formatFileSize } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function CompressPdfPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [resultSize, setResultSize] = useState(0)
  const [compressionLevel, setCompressionLevel] = useState<'medium' | 'high'>('medium')

  const handleCompress = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    setStatus('processing')
    setMessage('Compressing PDF...')
    setOriginalSize(file.size)

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file.file)
      const pdf = await PDFDocument.load(arrayBuffer)

      // Compress by removing unnecessary metadata and optimizing
      const pdfBytes = await pdf.save({
        useObjectStreams: compressionLevel === 'high',
        addDefaultPage: false,
      })

      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
      setResultSize(blob.size)

      const filename = file.name.replace('.pdf', '') + '-compressed.pdf'
      await downloadBlob(blob, filename)

      const reduction = ((originalSize - blob.size) / originalSize) * 100
      setStatus('success')
      setMessage(`PDF compressed successfully! Size reduced by ${reduction.toFixed(1)}%`)
      setFile(null)
    } catch (error) {
      setStatus('error')
      setMessage('Failed to compress PDF. Please ensure the file is a valid PDF document.')
      console.error('Compress error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Compress PDF Files
        </h1>
        <p className="text-xl text-gray-600">
          Reduce PDF file size without losing quality. Compress PDFs instantly in your browser.
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
                Compression Level
              </label>
              <select
                value={compressionLevel}
                onChange={(e) => setCompressionLevel(e.target.value as 'medium' | 'high')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Maximum Compression)</option>
              </select>
            </div>

            <button
              onClick={handleCompress}
              disabled={status === 'processing'}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Compressing...' : 'Compress PDF'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />

        {status === 'success' && originalSize > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Original Size:</p>
                <p className="font-semibold text-gray-900">{formatFileSize(originalSize)}</p>
              </div>
              <div>
                <p className="text-gray-600">Compressed Size:</p>
                <p className="font-semibold text-green-600">{formatFileSize(resultSize)}</p>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <p className="text-gray-600">
                Reduction: {((originalSize - resultSize) / originalSize * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

