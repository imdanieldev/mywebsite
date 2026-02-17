import { promises as fs } from 'fs'
import { join, relative, sep } from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://imdanieldev.vercel.app'
  const root = process.cwd()

  const urls: Array<{ loc: string; lastmod?: string }> = []

  // Add homepage
  urls.push({ loc: `${siteUrl}/`, lastmod: new Date().toISOString() })

  // Add pages from /pages (static routes). Skip error.vue and dynamic routes.
  const pagesDir = join(root, 'app', 'pages')
  try {
    const walk = async (dir: string, basePath = '') => {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const e of entries) {
        const full = join(dir, e.name)
        if (e.isDirectory()) {
          await walk(full, basePath + '/' + e.name)
        } else if (e.isFile() && e.name.endsWith('.vue')) {
          if (e.name === 'error.vue') continue
          if (e.name.startsWith('[')) continue
          const name = e.name === 'index.vue' ? basePath || '/' : basePath + '/' + e.name.replace('.vue', '')
          const pathUrl = name === '/' ? '/' : name.replace(new RegExp('\\\\' + sep, 'g'), '/')
          const stat = await fs.stat(full)
          urls.push({ loc: `${siteUrl}${pathUrl}`, lastmod: stat.mtime.toISOString() })
        }
      }
    }
    await walk(pagesDir)
  } catch (e) {
    // ignore if pages folder not found
  }

  // Add content-driven routes from content/blog and content/projects
  const contentDirs = [join(root, 'content', 'blog'), join(root, 'content', 'projects')]
  for (const dir of contentDirs) {
    try {
      const files = await fs.readdir(dir)
      for (const f of files) {
        if (!f.endsWith('.md')) continue
        const slug = f.replace(/\.md$/, '')
        const rel = relative(join(root, 'content'), join(dir, f)).replace(/\\\\/g, '/')
        const stat = await fs.stat(join(dir, f))
        // determine prefix from dir name (blog or projects)
        const parts = rel.split('/')
        const prefix = parts[0]
        urls.push({ loc: `${siteUrl}/${prefix}/${slug}`, lastmod: stat.mtime.toISOString() })
      }
    } catch (e) {
      // ignore missing content folder
    }
  }

  // Build XML
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`),
    '</urlset>'
  ].join('\n')

  event.node.res.setHeader('Content-Type', 'application/xml')
  return xml
})
