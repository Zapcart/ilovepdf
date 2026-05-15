import { NextRequest, NextResponse } from 'next/server'
import { splitPDF } from '@/lib/pdfUtils'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const splitType = formData.get('splitType') as 'range' | 'single' | 'every' || 'single'
    const splitValue = formData.get('splitValue') as string | undefined
    
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

    // Split PDF
    const splitPdfs = await splitPDF(file, splitType, splitValue)
    
    // Create a zip file containing all split PDFs
    const zip = new JSZip()
    
    for (const [index, blob] of splitPdfs.entries()) {
      const arrayBuffer = await blob.arrayBuffer()
      zip.file(`${file.name.replace('.pdf', '')}-part-${index + 1}.pdf`, arrayBuffer)
    }
    
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    
    // Return the zip file
    return new NextResponse(zipBlob, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '-split.zip')}"`
      }
    })
  } catch (error) {
    console.error('PDF split error:', error)
    return NextResponse.json(
      { error: 'Failed to split PDF. Please try again.' },
      { status: 500 }
    )
  }
}
