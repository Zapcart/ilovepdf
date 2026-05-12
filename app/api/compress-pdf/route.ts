import { NextRequest, NextResponse } from 'next/server'
import { compressPDF } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const quality = formData.get('quality') as string || 'medium'
    
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

    // Compress PDF
    const compressedBlob = await compressPDF(file, quality as 'low' | 'medium' | 'high')
    
    // Return compressed file
    return new NextResponse(compressedBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '-compressed.pdf')}"`
      }
    })
  } catch (error) {
    console.error('PDF compression error:', error)
    return NextResponse.json(
      { error: 'Failed to compress PDF. Please try again.' },
      { status: 500 }
    )
  }
}
