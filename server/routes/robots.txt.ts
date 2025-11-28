export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://craft-brew-catalog.vercel.app'

  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml`

  // Set proper headers
  event.node.res.setHeader('Content-Type', 'text/plain')
  event.node.res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400')

  return robots
})
