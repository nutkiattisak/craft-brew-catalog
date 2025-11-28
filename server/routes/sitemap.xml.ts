import { mockBeers } from '~/core/data/beers'
import { guides } from '~/core/data/guides'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://craft-brew-catalog.vercel.app'
  const currentDate = new Date().toISOString()

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: '1.0', lastmod: currentDate },
    { url: '/styles', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
    { url: '/ingredients', changefreq: 'monthly', priority: '0.8', lastmod: currentDate },
    { url: '/tools', changefreq: 'monthly', priority: '0.7', lastmod: currentDate },
    { url: '/guides', changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
  ]

  // Generate beer detail pages (if you have individual beer pages)
  const beerPages = mockBeers.map((beer) => ({
    url: `/beer/${beer.id}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: currentDate,
  }))

  // Generate guide detail pages
  const guidePages = guides.map((guide) => ({
    url: `/guides/${guide.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: guide.publishedAt,
  }))

  // Combine all pages
  const allPages = [...staticPages, ...beerPages, ...guidePages]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  // Set proper headers for XML
  event.node.res.setHeader('Content-Type', 'application/xml')
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')

  return sitemap
})
