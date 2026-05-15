import { NextRequest, NextResponse } from 'next/server'
import { deletePDFPages } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const pagesToDelete = JSON.parse(formData.get('pagesToDelete') as string) as number[]
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!pagesToDelete || pagesToDelete.length === 0) {
      return NextResponse.json({ error: 'No pages specified for deletion' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF file.' }, { status: 400 })
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    // Delete pages
    const modifiedBlob = await deletePDFPages(file, pagesToDelete)
    
    // Return modified file
    return new NextResponse(modifiedBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '-modified.pdf')}"`
      }
    })
  } catch (error) {
    console.error('PDF delete pages error:', error)
    return NextResponse.json(
      { error: 'Failed to delete pages. Please try again.' },
      { status: 500 }
    )
  }
}
