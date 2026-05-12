import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib'
import * as pdfjsLib from 'pdfjs-dist'
import Tesseract from 'tesseract.js'
import mammoth from 'mammoth'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Configure PDF.js worker
if (typeof window !== 'undefined') {
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
    const text = await extractPDFText(file)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${file.name.replace('.pdf', '')}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
          h1 { font-size: 24px; margin-bottom: 20px; }
          p { margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <h1>${file.name.replace('.pdf', '')}</h1>
        <div>${text.replace(/\n/g, '</p><p>')}</div>
      </body>
      </html>
    `
    
    return new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
  } catch (error) {
    throw new Error('Failed to convert PDF to Word')
  }
}

// Word to PDF Conversion
export async function convertWordToPDF(file: File): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const result = await mammoth.convertToHtml({ arrayBuffer })
    
    // Create a temporary div to render HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = result.value
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    document.body.appendChild(tempDiv)
    
    // Convert HTML to canvas, then to PDF
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    })
    
    document.body.removeChild(tempDiv)
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
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
    
    pages.forEach(page => {
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
    pages.forEach(page => {
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
    
    pages.forEach(page => {
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
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    
    const pages: OCRResult['pages'] = []
    let fullText = ''
    let totalConfidence = 0
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 2.0 })
      
      // Create canvas for OCR
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = viewport.width
      canvas.height = viewport.height
      
      await page.render({
        canvasContext: context,
        viewport
      }).promise
      
      // Perform OCR on the canvas
      const result = await Tesseract.recognize(
        canvas,
        'eng',
        {
          logger: (m) => console.log(m)
        }
      )
      
      const pageText = result.data.text
      const confidence = result.data.confidence
      
      pages.push({
        pageNumber: i,
        text: pageText,
        confidence
      })
      
      fullText += pageText + '\n'
      totalConfidence += confidence
    }
    
    return {
      text: fullText,
      confidence: totalConfidence / pdf.numPages,
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
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 2.0 })
      
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')!
      canvas.width = viewport.width
      canvas.height = viewport.height
      
      await page.render({
        canvasContext: context,
        viewport
      }).promise
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
        }, `image/${format}`)
      })
      
      images.push(blob)
    }
    
    return images
  } catch (error) {
    throw new Error('Failed to convert PDF to images')
  }
}

// Delete PDF Pages
export async function deletePDFPages(file: File, pagesToDelete: number[]): Promise<Blob> {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const pdf = await PDFDocument.load(arrayBuffer)
    
    const newPdf = await PDFDocument.create()
    const allPages = pdf.getPages()
    
    allPages.forEach((page, index) => {
      if (!pagesToDelete.includes(index)) {
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
    
    newOrder.forEach(pageIndex => {
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

