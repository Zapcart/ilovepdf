import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://pdfmaster-tools.vercel.app'
  const currentDate = new Date().toISOString().split('T')[0]
  
  const pages = [
    // Main pages
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
    
    // PDF Tools
    { url: '/pdf-to-word', priority: '0.9', changefreq: 'weekly' },
    { url: '/word-to-pdf', priority: '0.9', changefreq: 'weekly' },
    { url: '/pdf-to-jpg', priority: '0.9', changefreq: 'weekly' },
    { url: '/jpg-to-pdf', priority: '0.9', changefreq: 'weekly' },
    { url: '/compress-pdf', priority: '0.9', changefreq: 'weekly' },
    { url: '/merge-pdf', priority: '0.9', changefreq: 'weekly' },
    { url: '/split-pdf', priority: '0.9', changefreq: 'weekly' },
    { url: '/rotate-pdf', priority: '0.8', changefreq: 'weekly' },
    { url: '/protect-pdf', priority: '0.8', changefreq: 'weekly' },
    { url: '/unlock-pdf', priority: '0.8', changefreq: 'weekly' },
    { url: '/edit-pdf', priority: '0.8', changefreq: 'weekly' },
    { url: '/add-text', priority: '0.7', changefreq: 'weekly' },
    { url: '/add-images', priority: '0.7', changefreq: 'weekly' },
    { url: '/delete-pages', priority: '0.7', changefreq: 'weekly' },
    { url: '/reorder-pages', priority: '0.7', changefreq: 'weekly' },
    { url: '/watermark', priority: '0.7', changefreq: 'weekly' },
    { url: '/ocr-pdf', priority: '0.8', changefreq: 'weekly' },
    { url: '/pdf-to-excel', priority: '0.8', changefreq: 'weekly' },
    { url: '/excel-to-pdf', priority: '0.8', changefreq: 'weekly' },
    { url: '/pdf-to-powerpoint', priority: '0.8', changefreq: 'weekly' },
    { url: '/powerpoint-to-pdf', priority: '0.8', changefreq: 'weekly' },
    { url: '/pdf-to-text', priority: '0.8', changefreq: 'weekly' },
    
    // Blog pages
    { url: '/blog', priority: '0.7', changefreq: 'weekly' },
    { url: '/blog/pdf-optimization-guide', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/pdf-security-tips', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/pdf-conversion-guide', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/pdf-compression-techniques', priority: '0.6', changefreq: 'monthly' }
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
