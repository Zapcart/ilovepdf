import { NextRequest, NextResponse } from 'next/server'
import { addWatermarkToPDF, WatermarkOptions } from '@/lib/pdfUtils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const text = formData.get('text') as string
    const opacity = parseFloat(formData.get('opacity') as string) || 0.3
    const fontSize = parseInt(formData.get('fontSize') as string) || 24
    const color = formData.get('color') as string || '#000000'
    const rotation = parseInt(formData.get('rotation') as string) || 45
    const position = formData.get('position') as 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' || 'center'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!text) {
      return NextResponse.json({ error: 'No watermark text provided' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF file.' }, { status: 400 })
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 })
    }

    // Add watermark to PDF
    const options: WatermarkOptions = {
      text,
      opacity,
      fontSize,
      color,
      rotation,
      position
    }
    
    const watermarkedBlob = await addWatermarkToPDF(file, options)
    
    // Return watermarked file
    return new NextResponse(watermarkedBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace('.pdf', '-watermarked.pdf')}"`
      }
    })
  } catch (error) {
    console.error('Add watermark error:', error)
    return NextResponse.json(
      { error: 'Failed to add watermark. Please try again.' },
      { status: 500 }
    )
  }
}
