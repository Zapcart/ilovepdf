import { NextRequest, NextResponse } from 'next/server'
import { rotatePDF } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const rotation = parseInt(formData.get('rotation') as string) || 90
    
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

    // Rotate PDF
    const rotatedBlob = await rotatePDF(file, rotation)
    
    // Return rotated file
    return new NextResponse(rotatedBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '-rotated.pdf')}"`
      }
    })
  } catch (error) {
    console.error('PDF rotation error:', error)
    return NextResponse.json(
      { error: 'Failed to rotate PDF. Please try again.' },
      { status: 500 }
    )
  }
}
