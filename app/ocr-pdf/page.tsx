'use client'

import { useState } from 'react'
import { FileInfo, performOCR, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function OcrPdfPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [ocrResult, setOcrResult] = useState<string>('')

  const handleOCR = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    setStatus('processing')
    setMessage('Performing OCR on PDF... This may take a moment for large files.')

    try {
      const result = await performOCR(file.file)
      setOcrResult(result.text)
      
      // Create a text file with the OCR results
      const textBlob = new Blob([result.text], { type: 'text/plain' })
      const filename = file.name.replace('.pdf', '-ocr-text.txt')
      await downloadBlob(textBlob, filename)
      
      setStatus('success')
      setMessage(`OCR completed! Extracted text with ${result.confidence.toFixed(1)}% average confidence. Download started automatically.`)
      setFile(null)
    } catch (error) {
      setStatus('error')
      setMessage('Failed to perform OCR. Please ensure the PDF contains readable text.')
      console.error('OCR error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          OCR PDF - Extract Text
        </h1>
        <p className="text-xl text-gray-600">
          Extract text from scanned PDFs using Optical Character Recognition. Convert images to editable text.
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
            <button
              onClick={handleOCR}
              disabled={status === 'processing'}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Performing OCR...' : 'Extract Text with OCR'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />

        {status === 'success' && ocrResult && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Extracted Text Preview</h3>
            <div className="bg-white p-4 rounded border border-green-300 max-h-64 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                {ocrResult.substring(0, 500)}
                {ocrResult.length > 500 && '...'}
              </pre>
              {ocrResult.length > 500 && (
                <button
                  onClick={() => {
                    const blob = new Blob([ocrResult], { type: 'text/plain' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = file.name.replace('.pdf', '-full-ocr-text.txt')
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(url)
                  }}
                  className="mt-3 text-sm text-green-600 hover:text-green-700 underline"
                >
                  Download Full Text
                </button>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">How OCR Works</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• OCR analyzes each page of your PDF document</li>
            <li>• Text is extracted from images and scanned content</li>
            <li>• Results include confidence scores for accuracy</li>
            <li>• Works best with clear, high-quality PDFs</li>
            <li>• Processing time depends on file size and complexity</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
