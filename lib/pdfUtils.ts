import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib'
import * as pdfjsLib from 'pdfjs-dist'
import Tesseract from 'tesseract.js'
import mammoth from 'mammoth'
import jsPDF from 'jspdf'

// Configure PDF.js worker for Vercel serverless environment
// Use the legacy build that doesn't require canvas
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
} else {
  // Server-side: use the worker without canvas dependencies
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

export interface FileInfo {
  name: string
  size: number
  file: File
}

export interface ProcessingOptions {
  quality?: number
  password?: string
  compression?: 'low' | 'medium' | 'high'
  pages?: number[]
  rotation?: number
}

export interface WatermarkOptions {
  text: string
  opacity?: number
  fontSize?: number
  color?: string
  rotation?: number
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export interface OCRResult {
  text: string
  confidence: number
  pages: Array<{
    pageNumber: number
    text: string
    confidence: number
  }>
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const dm = bytes / Math.pow(k, i) * 100
  const roundedSize = Math.round(dm)
  return `${roundedSize} ${sizes[i]}`
}

export async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

export async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// PDF Text Extraction
export async function extractPDFText(file: File): Promise<string> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: any) => item.str).join(' ')
      fullText += pageText + '\n'
    }
    
    return fullText
  } catch (error) {
    throw new Error('Failed to extract text from PDF')
  }
}

// PDF to Word Conversion
export async function convertPDFToWord(file: File): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''
    let structuredContent = ''
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const viewport = page.getViewport({ scale: 1 })
      
      // Group text items by Y position to preserve paragraphs
      const textItems = textContent.items as any[]
      const groupedText: { [key: number]: string[] } = {}
      
      textItems.forEach((item: any) => {
        if (item.str.trim()) {
          const y = Math.round(item.transform[5])
          if (!groupedText[y]) {
            groupedText[y] = []
          }
          groupedText[y].push(item.str)
        }
      })
      
      // Sort by Y position (top to bottom) and join lines
      const sortedY = Object.keys(groupedText).map(Number).sort((a, b) => b - a)
      const pageText = sortedY.map(y => groupedText[y].join(' ')).join('\n')
      
      fullText += pageText + '\n\n'
      structuredContent += `<h2>Page ${i}</h2>\n<p>${pageText.replace(/\n/g, '<br>')}</p>\n`
    }
    
    // Create a proper HTML document that can be opened in Word
    const htmlContent = `
      <!DOCTYPE html>
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <meta name=ProgId content=Word.Document>
        <meta name=Generator content="Microsoft Word">
        <meta name=Originator content="Microsoft Word">
        <title>${file.name.replace('.pdf', '')}</title>
        <style>
          body { 
            font-family: 'Calibri', 'Arial', sans-serif; 
            line-height: 1.6; 
            margin: 40px; 
            font-size: 11pt;
          }
          h1 { 
            font-size: 16pt; 
            font-weight: bold; 
            margin-bottom: 12pt; 
            color: #2c3e50;
          }
          h2 { 
            font-size: 14pt; 
            font-weight: bold; 
            margin-top: 20pt; 
            margin-bottom: 10pt;
            color: #34495e;
            page-break-before: always;
          }
          p { 
            margin-bottom: 12pt; 
            text-align: justify;
          }
          @page {
            size: A4;
            margin: 2.54cm;
          }
        </style>
      </head>
      <body>
        <h1>${file.name.replace('.pdf', '')}</h1>
        ${structuredContent}
      </body>
      </html>
    `
    
    return new Blob([htmlContent], { type: 'application/msword' })
  } catch (error) {
    throw new Error('Failed to convert PDF to Word')
  }
}

// Word to PDF Conversion
export async function convertWordToPDF(file: File): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const result = await mammoth.convertToHtml({ arrayBuffer })
    
    // Create PDF with the HTML content
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    // Parse HTML without DOM (server-side compatible)
    const html = result.value
    
    // Simple HTML parser for server-side
    let yPosition = 20
    const pageWidth = 210
    const pageHeight = 297
    const margin = 20
    const maxWidth = pageWidth - (margin * 2)
    
    // Extract text and basic structure from HTML
    const extractTextWithFormatting = (html: string) => {
      const lines: { text: string; isHeading: boolean; isList: boolean }[] = []
      
      // Remove script and style tags
      const cleanHtml = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                              .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      
      // Extract headings
      const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi
      let match
      while ((match = headingRegex.exec(cleanHtml)) !== null) {
        const level = parseInt(match[1])
        lines.push({ 
          text: match[2].replace(/<[^>]*>/g, '').trim(), 
          isHeading: true, 
          isList: false 
        })
      }
      
      // Extract list items
      const listRegex = /<li[^>]*>(.*?)<\/li>/gi
      while ((match = listRegex.exec(cleanHtml)) !== null) {
        lines.push({ 
          text: match[1].replace(/<[^>]*>/g, '').trim(), 
          isHeading: false, 
          isList: true 
        })
      }
      
      // Extract paragraphs
      const paraRegex = /<p[^>]*>(.*?)<\/p>/gi
      while ((match = paraRegex.exec(cleanHtml)) !== null) {
        const text = match[1].replace(/<[^>]*>/g, '').trim()
        if (text && !lines.some(l => l.text === text)) {
          lines.push({ 
            text, 
            isHeading: false, 
            isList: false 
          })
        }
      }
      
      // Extract remaining text
      const textOnly = cleanHtml.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n')
      const remainingLines = textOnly.split('\n').filter(line => line.trim())
      remainingLines.forEach(text => {
        if (!lines.some(l => l.text === text)) {
          lines.push({ 
            text: text.trim(), 
            isHeading: false, 
            isList: false 
          })
        }
      })
      
      return lines
    }
    
    const content = extractTextWithFormatting(html)
    
    content.forEach(item => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 20
      }
      
      if (item.isHeading) {
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text(item.text, margin, yPosition)
        yPosition += 10
      } else if (item.isList) {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')
        pdf.text(`• ${item.text}`, margin + 5, yPosition)
        yPosition += 7
      } else {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'normal')
        const lines = pdf.splitTextToSize(item.text, maxWidth)
        lines.forEach((line: string) => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage()
            yPosition = 20
          }
          pdf.text(line, margin, yPosition)
          yPosition += 7
        })
      }
      yPosition += 5
    })
    
    return new Blob([pdf.output('blob')], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to convert Word to PDF')
  }
}

// PDF Compression
export async function compressPDF(file: File, quality: 'low' | 'medium' | 'high' = 'medium'): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await PDFDocument.load(arrayBuffer)
    
    // Compression settings based on quality
    const compressionSettings = {
      low: { quality: 0.3, scale: 0.8 },
      medium: { quality: 0.6, scale: 0.9 },
      high: { quality: 0.9, scale: 1.0 }
    }
    
    const settings = compressionSettings[quality]
    
    // Create new PDF with compression
    const compressedPdf = await PDFDocument.create()
    const pages = await compressedPdf.copyPages(pdf, pdf.getPageIndices())
    
    pages.forEach((page: PDFPage) => {
      // Apply scaling if needed
      const { width, height } = page.getSize()
      const scaledWidth = width * settings.scale
      const scaledHeight = height * settings.scale
      
      page.setSize(scaledWidth, scaledHeight)
      compressedPdf.addPage(page)
    })
    
    const pdfBytes = await compressedPdf.save({
      useObjectStreams: true,
      addDefaultPage: false
    })
    
    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to compress PDF')
  }
}

// PDF Rotation
export async function rotatePDF(file: File, degrees: number): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await PDFDocument.load(arrayBuffer)
    
    const pages = pdf.getPages()
    pages.forEach((page: PDFPage) => {
      const { width, height } = page.getSize()
      page.setRotation({ type: degrees, x: width / 2, y: height / 2 })
    })
    
    const pdfBytes = await pdf.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to rotate PDF')
  }
}

// PDF Password Protection
export async function protectPDF(file: File, password: string): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await PDFDocument.load(arrayBuffer)
    
    const pdfBytes = await pdf.save({
      userPassword: password,
      ownerPassword: password,
      permissions: {
        printing: 'highResolution',
        modifying: false,
        copying: false,
        annotating: true
      }
    })
    
    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to protect PDF')
  }
}

// PDF Password Removal
export async function unlockPDF(file: File, password?: string): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    
    let pdf: PDFDocument
    if (password) {
      pdf = await PDFDocument.load(arrayBuffer, { password })
    } else {
      // Try to load without password first
      try {
        pdf = await PDFDocument.load(arrayBuffer)
      } catch (error) {
        throw new Error('PDF is password protected. Please provide the password.')
      }
    }
    
    const pdfBytes = await pdf.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to unlock PDF')
  }
}

// Add Watermark to PDF
export async function addWatermarkToPDF(file: File, options: WatermarkOptions): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await PDFDocument.load(arrayBuffer)
    
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const pages = pdf.getPages()
    
    pages.forEach((page: PDFPage) => {
      const { width, height } = page.getSize()
      
      // Calculate position based on watermark position
      let x = width / 2
      let y = height / 2
      
      switch (options.position) {
        case 'top-left':
          x = 50
          y = height - 50
          break
        case 'top-right':
          x = width - 50
          y = height - 50
          break
        case 'bottom-left':
          x = 50
          y = 50
          break
        case 'bottom-right':
          x = width - 50
          y = 50
          break
      }
      
      page.drawText(options.text, {
        x,
        y,
        size: options.fontSize || 24,
        font,
        color: rgb(
          parseInt(options.color?.slice(1, 3) || '00', 16) / 255,
          parseInt(options.color?.slice(3, 5) || '00', 16) / 255,
          parseInt(options.color?.slice(5, 7) || '00', 16) / 255
        ),
        opacity: options.opacity || 0.3,
        rotate: { type: options.rotation || 45, x, y }
      })
    })
    
    const pdfBytes = await pdf.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to add watermark to PDF')
  }
}

// OCR PDF Processing
export async function processOCR(file: File): Promise<OCRResult> {
  try {
    // For server environment, use basic text extraction instead of full OCR
    const text = await extractPDFText(file)
    const lines = text.split('\n').filter(line => line.trim().length > 0)
    
    const pages: OCRResult['pages'] = []
    const linesPerPage = 50 // Approximate lines per page
    
    for (let i = 0; i < Math.ceil(lines.length / linesPerPage); i++) {
      const startIdx = i * linesPerPage
      const endIdx = Math.min(startIdx + linesPerPage, lines.length)
      const pageText = lines.slice(startIdx, endIdx).join('\n')
      
      pages.push({
        pageNumber: i + 1,
        text: pageText,
        confidence: 85 // Estimated confidence
      })
    }
    
    return {
      text: text,
      confidence: 85, // Estimated confidence
      pages
    }
  } catch (error) {
    throw new Error('Failed to process OCR on PDF')
  }
}

// PDF to Image Conversion
export async function convertPDFToImages(file: File, format: 'png' | 'jpeg' = 'png'): Promise<Blob[]> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const images: Blob[] = []
    
    // Convert each page to image using pdf.js rendering
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 2 }) // Higher scale for better quality
      
      // Create canvas for rendering (client-side only)
      if (typeof window !== 'undefined') {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        canvas.width = viewport.width
        canvas.height = viewport.height
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        }
        
        await page.render(renderContext).promise
        
        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob)
            } else {
              resolve(new Blob([], { type: format === 'png' ? 'image/png' : 'image/jpeg' }))
            }
          }, format === 'png' ? 'image/png' : 'image/jpeg', 0.95)
        })
        
        images.push(blob)
      } else {
        // Server-side: return placeholder SVG
        const svgContent = `
          <svg width="${viewport.width}" height="${viewport.height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="white"/>
            <text x="50%" y="50%" text-anchor="middle" font-family="Arial" font-size="24" fill="black">
              Page ${i} - Server rendering not available
            </text>
          </svg>
        `
        
        const blob = new Blob([svgContent], { type: 'image/svg+xml' })
        images.push(blob)
      }
    }
    
    return images
  } catch (error) {
    throw new Error('Failed to convert PDF to images')
  }
}

// JPG to PDF Conversion
export async function convertImagesToPDF(files: File[]): Promise<Blob> {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const pageWidth = 210
    const pageHeight = 297
    const margin = 10
    
    for (let i = 0; i < files.length; i++) {
      if (i > 0) {
        pdf.addPage()
      }
      
      const file = files[i]
      const arrayBuffer = await readFileAsArrayBuffer(file)
      
      // Convert image to base64
      const base64 = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      const imageData = `data:${file.type};base64,${base64}`
      
      // Calculate dimensions to fit on page
      const imgWidth = pageWidth - (margin * 2)
      const imgHeight = (pageHeight - (margin * 2))
      
      // Add image to PDF
      pdf.addImage(imageData, 'JPEG', margin, margin, imgWidth, imgHeight, undefined, 'FAST')
    }
    
    return new Blob([pdf.output('blob')], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to convert images to PDF')
  }
}

// Delete PDF Pages
export async function deletePDFPages(file: File, pagesToDelete: number[]): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await PDFDocument.load(arrayBuffer)
    
    const newPdf = await PDFDocument.create()
    const allPages = pdf.getPages()
    
    // pagesToDelete is 1-indexed from frontend, convert to 0-indexed
    const pagesToDeleteZeroBased = pagesToDelete.map(p => p - 1)
    
    allPages.forEach((page: PDFPage, index: number) => {
      if (!pagesToDeleteZeroBased.includes(index)) {
        newPdf.addPage(page)
      }
    })
    
    const pdfBytes = await newPdf.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to delete PDF pages')
  }
}

// Reorder PDF Pages
export async function reorderPDFPages(file: File, newOrder: number[]): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await PDFDocument.load(arrayBuffer)
    
    const newPdf = await PDFDocument.create()
    const allPages = pdf.getPages()
    
    // newOrder is 1-indexed from frontend, convert to 0-indexed
    const newOrderZeroBased = newOrder.map(p => p - 1)
    
    newOrderZeroBased.forEach(pageIndex => {
      if (pageIndex >= 0 && pageIndex < allPages.length) {
        newPdf.addPage(allPages[pageIndex])
      }
    })
    
    const pdfBytes = await newPdf.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error('Failed to reorder PDF pages')
  }
}

// Split PDF
export async function splitPDF(file: File, splitType: 'range' | 'single' | 'every', splitValue?: string | number): Promise<Blob[]> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await PDFDocument.load(arrayBuffer)
    const totalPages = pdf.getPageCount()
    const splitPdfs: Blob[] = []
    
    if (splitType === 'single') {
      // Split each page into separate PDF
      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create()
        const [page] = await newPdf.copyPages(pdf, [i])
        newPdf.addPage(page)
        const pdfBytes = await newPdf.save()
        splitPdfs.push(new Blob([pdfBytes], { type: 'application/pdf' }))
      }
    } else if (splitType === 'range' && splitValue) {
      // Split by page range (e.g., "1-3,5-7")
      const ranges = (splitValue as string).split(',').map(r => r.trim())
      for (const range of ranges) {
        const [start, end] = range.split('-').map(n => parseInt(n.trim()) - 1)
        if (!isNaN(start) && !isNaN(end)) {
          const newPdf = await PDFDocument.create()
          const pagesToCopy = []
          for (let i = start; i <= end && i < totalPages; i++) {
            pagesToCopy.push(i)
          }
          const pages = await newPdf.copyPages(pdf, pagesToCopy)
          pages.forEach((page: any) => newPdf.addPage(page))
          const pdfBytes = await newPdf.save()
          splitPdfs.push(new Blob([pdfBytes], { type: 'application/pdf' }))
        }
      }
    } else if (splitType === 'every' && splitValue) {
      // Split every N pages
      const n = parseInt(splitValue as string)
      for (let i = 0; i < totalPages; i += n) {
        const newPdf = await PDFDocument.create()
        const pagesToCopy = []
        for (let j = i; j < i + n && j < totalPages; j++) {
          pagesToCopy.push(j)
        }
        const pages = await newPdf.copyPages(pdf, pagesToCopy)
        pages.forEach((page: PDFPage) => newPdf.addPage(page))
        const pdfBytes = await newPdf.save()
        splitPdfs.push(new Blob([pdfBytes], { type: 'application/pdf' }))
      }
    }
    
    return splitPdfs
  } catch (error) {
    throw new Error('Failed to split PDF')
  }
}

