import { NextRequest, NextResponse } from 'next/server'
import { processOCR } from '@/lib/pdfUtils'

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

    // Process OCR
    const ocrResult = await processOCR(file)
    
    // Return OCR result
    return NextResponse.json({
      success: true,
      text: ocrResult.text,
      confidence: ocrResult.confidence,
      pages: ocrResult.pages
    })
  } catch (error) {
    console.error('OCR processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process OCR. Please try again.' },
      { status: 500 }
    )
  }
}
