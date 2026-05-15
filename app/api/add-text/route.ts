import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const text = formData.get('text') as string
    const pageNumber = parseInt(formData.get('pageNumber') as string) || 1
    const x = parseInt(formData.get('x') as string) || 50
    const y = parseInt(formData.get('y') as string) || 50
    const fontSize = parseInt(formData.get('fontSize') as string) || 12
    const color = formData.get('color') as string || '#000000'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF file.' }, { status: 400 })
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    // Add text to PDF
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const pages = pdf.getPages()
    
    // Convert 1-indexed page number to 0-indexed
    const pageIndex = pageNumber - 1
    
    if (pageIndex >= 0 && pageIndex < pages.length) {
      const page = pages[pageIndex]
      
      // Parse color hex to RGB
      const r = parseInt(color.slice(1, 3), 16) / 255
      const g = parseInt(color.slice(3, 5), 16) / 255
      const b = parseInt(color.slice(5, 7), 16) / 255
      
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(r, g, b)
      })
    }
    
    const pdfBytes = await pdf.save()
    
    // Return modified file
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '-with-text.pdf')}"`
      }
    })
  } catch (error) {
    console.error('Add text error:', error)
    return NextResponse.json(
      { error: 'Failed to add text. Please try again.' },
      { status: 500 }
    )
  }
}
