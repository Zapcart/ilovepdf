'use client'

import { useState } from 'react'
import { FileInfo, deletePDFPages, downloadBlob } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function DeletePagesPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [selectedPages, setSelectedPages] = useState<number[]>([])
  const [totalPages, setTotalPages] = useState(0)

  const handleFileLoad = async (fileInfo: FileInfo) => {
    setFile(fileInfo)
    try {
      // Get page count when file is loaded
      const arrayBuffer = await fileInfo.file.arrayBuffer()
      const { PDFDocument } = await import('pdf-lib')
      const pdf = await PDFDocument.load(arrayBuffer)
      setTotalPages(pdf.getPages().length)
    } catch (error) {
      console.error('Error loading PDF:', error)
      setTotalPages(0)
    }
  }

  const handlePageToggle = (pageNumber: number) => {
    setSelectedPages(prev => 
      prev.includes(pageNumber) 
        ? prev.filter(p => p !== pageNumber)
        : [...prev, pageNumber]
    )
  }

  const handleDelete = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    if (selectedPages.length === 0) {
      setStatus('error')
      setMessage('Please select at least one page to delete.')
      return
    }

    setStatus('processing')
    setMessage('Deleting selected pages...')

    try {
      const modifiedBlob = await deletePDFPages(file.file, selectedPages)
      const filename = file.name.replace('.pdf', '-pages-deleted.pdf')
      await downloadBlob(modifiedBlob, filename)
      
      setStatus('success')
      setMessage(`Successfully deleted ${selectedPages.length} page(s)! Your download should start automatically.`)
      setFile(null)
      setSelectedPages([])
      setTotalPages(0)
    } catch (error) {
      setStatus('error')
      setMessage('Failed to delete pages. Please ensure the file is a valid PDF document.')
      console.error('Delete pages error:', error)
    }
  }

  const selectAll = () => {
    setSelectedPages(Array.from({ length: totalPages }, (_, i) => i + 1))
  }

  const deselectAll = () => {
    setSelectedPages([])
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Delete PDF Pages
        </h1>
        <p className="text-xl text-gray-600">
          Remove unwanted pages from PDF documents. Select pages to delete permanently.
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <FileUpload
          accept=".pdf"
          multiple={false}
          onFilesSelected={(files) => {
            const file = files[0] || null
            if (file) handleFileLoad(file)
          }}
        />

        {file && totalPages > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                Total Pages: {totalPages}
              </span>
              <div className="space-x-2">
                <button
                  onClick={selectAll}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAll}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Deselect All
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageToggle(pageNum)}
                    className={`p-3 rounded border-2 transition-colors ${
                      selectedPages.includes(pageNum)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
                    }`}
                  >
                    <span className="text-sm font-medium">{pageNum}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedPages.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  <strong>Selected Pages:</strong> {selectedPages.sort((a, b) => a - b).join(', ')}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  These pages will be permanently deleted from the PDF.
                </p>
              </div>
            )}

            <button
              onClick={handleDelete}
              disabled={status === 'processing' || selectedPages.length === 0}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' 
                ? 'Deleting Pages...' 
                : `Delete ${selectedPages.length} Page${selectedPages.length > 1 ? 's' : ''}`
              }
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />
      </div>
    </div>
  )
}
