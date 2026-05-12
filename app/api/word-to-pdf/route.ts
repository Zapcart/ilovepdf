import { NextRequest, NextResponse } from 'next/server'
import { convertWordToPDF } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.ms-word'
    ]
    
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Please upload a Word document.' }, { status: 400 })
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    // Convert Word to PDF
    const pdfBlob = await convertWordToPDF(file)
    
    // Return the converted file
    return new NextResponse(pdfBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace(/\.(doc|docx)$/i, '.pdf')}"`
      }
    })
  } catch (error) {
    console.error('Word to PDF conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert Word to PDF. Please try again.' },
      { status: 500 }
    )
  }
}
