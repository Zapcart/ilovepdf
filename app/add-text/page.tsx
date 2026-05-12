'use client'

import { useState } from 'react'
import { FileInfo, addTextToPDF, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function AddTextPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [color, setColor] = useState('#000000')
  const [position, setPosition] = useState<'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('center')

  const handleAddText = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    if (!text.trim()) {
      setStatus('error')
      setMessage('Please enter text to add to PDF.')
      return
    }

    setStatus('processing')
    setMessage('Adding text to PDF...')

    try {
      const textOptions = {
        text: text.trim(),
        fontSize,
        color,
        position
      }

      const modifiedBlob = await addTextToPDF(file.file, textOptions)
      const filename = file.name.replace('.pdf', '-with-text.pdf')
      await downloadBlob(modifiedBlob, filename)
      
      setStatus('success')
      setMessage('Text added successfully! Your download should start automatically.')
      setFile(null)
      setText('')
    } catch (error) {
      setStatus('error')
      setMessage('Failed to add text to PDF. Please ensure that file is a valid PDF document.')
      console.error('Add text error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Add Text to PDF
        </h1>
        <p className="text-xl text-gray-600">
          Add custom text annotations to PDF documents. Insert text anywhere on the page.
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
                Text to Add
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to add to PDF..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value={12}>Small (12px)</option>
                  <option value={16}>Medium (16px)</option>
                  <option value={20}>Large (20px)</option>
                  <option value={24}>Extra Large (24px)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">{color}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['top-left', 'top-center', 'top-right', 'center', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => (
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
            </div>

            <button
              onClick={handleAddText}
              disabled={status === 'processing' || !text.trim()}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Adding Text...' : 'Add Text to PDF'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />
      </div>
    </div>
  )
}
