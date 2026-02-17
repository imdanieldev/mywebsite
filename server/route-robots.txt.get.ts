export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl || 'https://imdanieldev.vercel.app'
  const lines = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    ''
  ]
  event.node.res.setHeader('Content-Type', 'text/plain')
  return lines.join('\n')
})
