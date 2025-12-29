'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileInfo, readFileAsArrayBuffer, downloadBlob, formatFileSize } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function MergePdfPage() {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [resultSize, setResultSize] = useState(0)

  const handleMerge = async () => {
    if (files.length < 2) {
      setStatus('error')
      setMessage('Please select at least 2 PDF files to merge.')
      return
    }

    setStatus('processing')
    setMessage('Merging PDF files...')

    try {
      const mergedPdf = await PDFDocument.create()
      let totalSize = 0

      for (const fileInfo of files) {
        const arrayBuffer = await readFileAsArrayBuffer(fileInfo.file)
        totalSize += fileInfo.size
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach((page) => mergedPdf.addPage(page))
      }

      setOriginalSize(totalSize)
      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
      setResultSize(blob.size)

      const filename = `merged-${Date.now()}.pdf`
      await downloadBlob(blob, filename)

      setStatus('success')
      setMessage(`Successfully merged ${files.length} PDF files!`)
      setFiles([])
    } catch (error) {
      setStatus('error')
      setMessage('Failed to merge PDFs. Please ensure all files are valid PDF documents.')
      console.error('Merge error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Merge PDF Files
        </h1>
        <p className="text-xl text-gray-600">
          Combine multiple PDF files into one document. Free, secure, and works entirely in your browser.
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <FileUpload
          accept=".pdf"
          multiple={true}
          maxFiles={20}
          onFilesSelected={setFiles}
        />

        {files.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
              </p>
              <button
                onClick={handleMerge}
                disabled={status === 'processing'}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {status === 'processing' ? 'Merging...' : 'Merge PDFs'}
              </button>
            </div>
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
                <p className="text-gray-600">Result Size:</p>
                <p className="font-semibold text-gray-900">{formatFileSize(resultSize)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Merge PDFs</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Select multiple PDF files using the upload area above</li>
          <li>Arrange files in the desired order (you can drag to reorder)</li>
          <li>Click &quot;Merge PDFs&quot; to combine all files</li>
          <li>Download your merged PDF file</li>
        </ol>
      </div>
    </div>
  )
}

