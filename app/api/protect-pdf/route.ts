import { NextRequest, NextResponse } from 'next/server'
import { protectPDF } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const password = formData.get('password') as string
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!password) {
      return NextResponse.json({ error: 'No password provided' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF file.' }, { status: 400 })
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    // Protect PDF
    const protectedBlob = await protectPDF(file, password)
    
    // Return protected file
    return new NextResponse(protectedBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '-protected.pdf')}"`
      }
    })
  } catch (error) {
    console.error('PDF protection error:', error)
    return NextResponse.json(
      { error: 'Failed to protect PDF. Please try again.' },
      { status: 500 }
    )
  }
}
