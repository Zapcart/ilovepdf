'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileInfo, readFileAsArrayBuffer, downloadBlob, formatFileSize } from '../../lib/pdfUtils'
import FileUpload from '../../components/FileUpload'
import ProcessingStatus from '../../components/ProcessingStatus'

export default function SplitPdfPage() {
  const [file, setFile] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [splitMode, setSplitMode] = useState<'all' | 'range'>('all')
  const [pageRange, setPageRange] = useState('')

  const handleSplit = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file.')
      return
    }

    setStatus('processing')
    setMessage('Splitting PDF...')

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file.file)
      const pdf = await PDFDocument.load(arrayBuffer)
      const totalPages = pdf.getPageCount()

      if (splitMode === 'all') {
        // Split into individual pages
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create()
          const [page] = await newPdf.copyPages(pdf, [i])
          newPdf.addPage(page)
          const pdfBytes = await newPdf.save()
          const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
          const filename = `${file.name.replace('.pdf', '')}-page-${i + 1}.pdf`
          await downloadBlob(blob, filename)
        }
        setStatus('success')
        setMessage(`Successfully split PDF into ${totalPages} separate files!`)
      } else {
        // Split by range
        const ranges = pageRange.split(',').map((r) => r.trim())
        let fileCount = 0

        for (const range of ranges) {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map((n) => parseInt(n.trim()) - 1)
            if (start >= 0 && end < totalPages && start <= end) {
              const newPdf = await PDFDocument.create()
              const pages = await newPdf.copyPages(pdf, Array.from({ length: end - start + 1 }, (_, i) => start + i))
              pages.forEach((page) => newPdf.addPage(page))
              const pdfBytes = await newPdf.save()
              const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
              const filename = `${file.name.replace('.pdf', '')}-pages-${start + 1}-${end + 1}.pdf`
              await downloadBlob(blob, filename)
              fileCount++
            }
          } else {
            const pageNum = parseInt(range) - 1
            if (pageNum >= 0 && pageNum < totalPages) {
              const newPdf = await PDFDocument.create()
              const [page] = await newPdf.copyPages(pdf, [pageNum])
              newPdf.addPage(page)
              const pdfBytes = await newPdf.save()
              const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
              const filename = `${file.name.replace('.pdf', '')}-page-${pageNum + 1}.pdf`
              await downloadBlob(blob, filename)
              fileCount++
            }
          }
        }

        setStatus('success')
        setMessage(`Successfully created ${fileCount} PDF file(s)!`)
      }

      setFile(null)
    } catch (error) {
      setStatus('error')
      setMessage('Failed to split PDF. Please ensure the file is a valid PDF document.')
      console.error('Split error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Split PDF Files
        </h1>
        <p className="text-xl text-gray-600">
          Split a PDF into multiple separate files. Extract specific pages or split into individual pages.
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
                Split Mode
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="all"
                    checked={splitMode === 'all'}
                    onChange={(e) => setSplitMode(e.target.value as 'all' | 'range')}
                    className="mr-2"
                  />
                  Split into individual pages
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="range"
                    checked={splitMode === 'range'}
                    onChange={(e) => setSplitMode(e.target.value as 'all' | 'range')}
                    className="mr-2"
                  />
                  Split by page range
                </label>
              </div>
            </div>

            {splitMode === 'range' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Range (e.g., 1-3,5,7-9)
                </label>
                <input
                  type="text"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="1-3,5,7-9"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter page numbers or ranges separated by commas
                </p>
              </div>
            )}

            <button
              onClick={handleSplit}
              disabled={status === 'processing' || (splitMode === 'range' && !pageRange)}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {status === 'processing' ? 'Splitting...' : 'Split PDF'}
            </button>
          </div>
        )}

        <ProcessingStatus status={status} message={message} />
      </div>
    </div>
  )
}

