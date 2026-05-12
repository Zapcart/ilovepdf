'use client'

import { useState } from 'react'
import { FileInfo, addWatermark, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function AddWatermarkPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL')
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text')
  const [opacity, setOpacity] = useState(30)
  const [position, setPosition] = useState<'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('center')

  const handleWatermark = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    if (watermarkType === 'text' && !watermarkText.trim()) {
      setStatus('error')
      setMessage('Please enter watermark text.')
      return
    }

    setStatus('processing')
    setMessage('Adding watermark to PDF...')

    try {
      const watermarkOptions = {
        text: watermarkType === 'text' ? watermarkText : undefined,
        opacity: opacity / 100,
        position
      }

      const watermarkedBlob = await addWatermark(file.file, watermarkOptions)
      const filename = file.name.replace('.pdf', '-watermarked.pdf')
      await downloadBlob(watermarkedBlob, filename)
      
      setStatus('success')
      setMessage('Watermark added successfully! Your download should start automatically.')
      setFile(null)
    } catch (error) {
      setStatus('error')
      setMessage('Failed to add watermark. Please ensure the file is a valid PDF document.')
      console.error('Watermark error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Add Watermark to PDF
        </h1>
        <p className="text-xl text-gray-600">
          Add text or image watermarks to PDF documents. Protect your content with custom watermarks.
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
                Watermark Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setWatermarkType('text')}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    watermarkType === 'text'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-400'
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setWatermarkType('image')}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    watermarkType === 'image'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-400'
                  }`}
                  disabled
                >
                  Image (Coming Soon)
                </button>
              </div>
            </div>

            {watermarkType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opacity: {opacity}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos as any)}
                    className={`px-3 py-2 rounded-lg border-2 text-sm transition-colors ${
                      position === pos
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    {pos.replace('-', ' ').replace(/\b\w/g, (match) => match.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleWatermark}
              disabled={status === 'processing' || (watermarkType === 'text' && !watermarkText.trim())}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Adding Watermark...' : 'Add Watermark'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />
      </div>
    </div>
  )
}
