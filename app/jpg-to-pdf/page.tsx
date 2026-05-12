'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileInfo, readFileAsArrayBuffer, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleConvert = async () => {
    if (files.length === 0) {
      setStatus('error')
      setMessage('Please select at least one image file.')
      return
    }

    setStatus('processing')
    setMessage('Converting images to PDF...')

    try {
      const pdf = await PDFDocument.create()

      for (const fileInfo of files) {
        const arrayBuffer = await readFileAsArrayBuffer(fileInfo.file)
        let image

        // Determine image type and embed accordingly
        if (fileInfo.name.toLowerCase().endsWith('.png')) {
          image = await pdf.embedPng(arrayBuffer)
        } else {
          image = await pdf.embedJpg(arrayBuffer)
        }

        const page = pdf.addPage([image.width, image.height])
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        })
      }

      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
      const filename = `images-${Date.now()}.pdf`
      await downloadBlob(blob, filename)

      setStatus('success')
      setMessage(`Successfully converted ${files.length} image(s) to PDF!`)
      setFiles([])
    } catch (error) {
      setStatus('error')
      setMessage('Failed to convert images. Please ensure all files are valid image files (JPG, PNG).')
      console.error('Convert error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          JPG to PDF Converter
        </h1>
        <p className="text-xl text-gray-600">
          Convert JPG images to PDF documents. Combine multiple images into one PDF file.
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <FileUpload
          accept=".jpg,.jpeg,.png"
          multiple={true}
          maxFiles={20}
          onFilesSelected={setFiles}
        />

        {files.length > 0 && (
          <div className="mt-6">
            <button
              onClick={handleConvert}
              disabled={status === 'processing'}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Converting...' : `Convert ${files.length} Image(s) to PDF`}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />
      </div>
    </div>
  )
}

