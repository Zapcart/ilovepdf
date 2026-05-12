import { NextRequest, NextResponse } from 'next/server'
import { convertPDFToWord } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF file.' }, { status: 400 })
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    // Convert PDF to Word
    const wordBlob = await convertPDFToWord(file)
    
    // Return the converted file
    return new NextResponse(wordBlob, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '.docx')}"`
      }
    })
  } catch (error) {
    console.error('PDF to Word conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert PDF to Word. Please try again.' },
      { status: 500 }
    )
  }
}
