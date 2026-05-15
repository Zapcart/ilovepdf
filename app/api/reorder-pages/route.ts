import { NextRequest, NextResponse } from 'next/server'
import { reorderPDFPages } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const newOrder = JSON.parse(formData.get('newOrder') as string) as number[]
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!newOrder || newOrder.length === 0) {
      return NextResponse.json({ error: 'No page order specified' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF file.' }, { status: 400 })
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    // Reorder pages
    const modifiedBlob = await reorderPDFPages(file, newOrder)
    
    // Return modified file
    return new NextResponse(modifiedBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '-reordered.pdf')}"`
      }
    })
  } catch (error) {
    console.error('PDF reorder pages error:', error)
    return NextResponse.json(
      { error: 'Failed to reorder pages. Please try again.' },
      { status: 500 }
    )
  }
}
