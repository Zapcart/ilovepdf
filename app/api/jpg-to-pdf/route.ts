import { NextRequest, NextResponse } from 'next/server'
import { convertImagesToPDF } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // Validate file types
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Invalid file type. Please upload only image files.' }, { status: 400 })
      }
      if (file.size > 50 * 1024 * 1024) {
        return NextResponse.json({ error: 'File too large. Maximum size is 50MB per file.' }, { status: 400 })
      }
    }

    // Convert images to PDF
    const pdfBlob = await convertImagesToPDF(files)
    
    // Return PDF file
    return new NextResponse(pdfBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="images-to-pdf.pdf"`
      }
    })
  } catch (error) {
    console.error('JPG to PDF conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert images to PDF. Please try again.' },
      { status: 500 }
    )
  }
}
