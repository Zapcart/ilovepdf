import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // Validate file types and sizes
    for (const file of files) {
      if (file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Invalid file type. Please upload only PDF files.' }, { status: 400 })
      }
      if (file.size > 50 * 1024 * 1024) {
        return NextResponse.json({ error: 'File too large. Maximum size is 50MB per file.' }, { status: 400 })
      }
    }

    // Merge PDFs
    const mergedPdf = await PDFDocument.create()
    
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach(page => mergedPdf.addPage(page))
    }
    
    const pdfBytes = await mergedPdf.save()
    
    // Return merged file
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="merged-document.pdf"`
      }
    })
  } catch (error) {
    console.error('PDF merge error:', error)
    return NextResponse.json(
      { error: 'Failed to merge PDFs. Please try again.' },
      { status: 500 }
    )
  }
}
