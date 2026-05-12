import { NextRequest, NextResponse } from 'next/server'
import { convertPDFToImages } from '@/lib/pdfUtils'
import JSZip from 'jszip'

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

    // Convert PDF to images
    const images = await convertPDFToImages(file, 'png')
    
    // Create a zip file containing all images
    const zip = new JSZip()
    
    for (const [index, blob] of images.entries()) {
      const arrayBuffer = await blob.arrayBuffer()
      zip.file(`${file.name.replace('.pdf', '')}-page-${index + 1}.svg`, arrayBuffer)
    }
    
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    
    // Return the zip file
    return new NextResponse(zipBlob, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '.zip')}"`
      }
    })
  } catch (error) {
    console.error('PDF to JPG conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert PDF to JPG. Please try again.' },
      { status: 500 }
    )
  }
}
