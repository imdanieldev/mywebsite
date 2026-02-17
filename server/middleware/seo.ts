import { promises as fs } from 'fs'
import { join, relative, sep } from 'path'

function parseFrontMatter(content: string) {
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/) || content.match(/^---\s*\r\n([\s\S]*?)\r\n---/)
  const data: Record<string, string> = {}
  if (!fmMatch) return { data, body: content }
  const fm = fmMatch[1]
  fm.split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1)
    data[key] = val
  })
  const body = content.slice(fmMatch[0].length).trim()
  return { data, body }
}

function excerptFromBody(body: string) {
  const cleaned = body.replace(/```[\s\S]*?```/g, '').replace(/#.+/g, '')
  const lines = cleaned.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  return lines.slice(0, 3).join(' ')
}

function escapeXml(str: string) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function markdownToHtml(md: string) {
  if (!md) return ''
  // simple inline/code/image/link/heading handling
  let html = md
  // code fences
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => `<pre><code>${escapeXml(code)}</code></pre>`)
  // inline code
  html = html.replace(/`([^`]+)`/g, (_m, c) => `<code>${escapeXml(c)}</code>`)
  // images ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, src) => `<img src="${escapeXml(src)}" alt="${escapeXml(alt)}" />`)
  // links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => `<a href="${escapeXml(href)}">${escapeXml(text)}</a>`)
  // headings
  html = html.replace(/^###\s*(.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s*(.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s*(.+)$/gm, '<h1>$1</h1>')
  // bold/italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  // paragraphs: split by double newlines
  const parts = html.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
  html = parts.map(p => {
    // if already a block element, keep
    if (/^<h[1-6]|^<pre|^<ul|^<ol|^<blockquote|^<img|^<p/.test(p)) return p
    return `<p>${p.replace(/\n/g, '<br/>')}</p>`
  }).join('\n')
  return html
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://imdanieldev.vercel.app'
  const root = process.cwd()

  if (url === '/robots.txt') {
    const lines = [
      'User-agent: *',
      'Allow: /',
      `Sitemap: ${siteUrl}/sitemap.xml`,
      ''
    ]
    event.node.res.setHeader('Content-Type', 'text/plain')
    return lines.join('\n')
  }

  // redirect common misspelling to correct robots.txt
  if (url === '/robot.txt') {
    event.node.res.statusCode = 301
    event.node.res.setHeader('Location', '/robots.txt')
    return ''
  }

  if (url === '/sitemap.xml') {
    const urls: Array<{ loc: string; lastmod?: string }> = []
    urls.push({ loc: `${siteUrl}/`, lastmod: new Date().toISOString() })

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
      // ignore
    }

    const contentDirs = [join(root, 'content', 'blog'), join(root, 'content', 'projects')]
    for (const dir of contentDirs) {
      try {
        const files = await fs.readdir(dir)
        for (const f of files) {
          if (!f.endsWith('.md')) continue
          const slug = f.replace(/\.md$/, '')
          const rel = relative(join(root, 'content'), join(dir, f)).replace(/\\\\/g, '/')
          const stat = await fs.stat(join(dir, f))
          const parts = rel.split('/')
          const prefix = parts[0]
          urls.push({ loc: `${siteUrl}/${prefix}/${slug}`, lastmod: stat.mtime.toISOString() })
        }
      } catch (e) {
        // ignore
      }
    }

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`),
      '</urlset>'
    ].join('\n')

    event.node.res.setHeader('Content-Type', 'application/xml')
    return xml
  }

  // otherwise continue normal handling
  // serve RSS feed
  if (url === '/rss.xml') {
    const config = useRuntimeConfig()
    const siteUrl = config.public.siteUrl || 'https://imdanieldev.vercel.app'
    const siteName = config.public.siteName || 'Danial'
    const blogDir = join(root, 'content', 'blog')
    const items: Array<{ title: string; link: string; pubDate: string; description: string; guid: string }> = []
    try {
      const files = await fs.readdir(blogDir)
      for (const f of files) {
        if (!f.endsWith('.md')) continue
        const full = join(blogDir, f)
        const raw = await fs.readFile(full, 'utf-8')
        const { data, body } = parseFrontMatter(raw)
        const slug = f.replace(/\.md$/, '')
        const title = data.title || slug
        const description = data.description || excerptFromBody(body) || ''
        const dateStr = data.date || ''
        let pubDate = ''
        if (dateStr) pubDate = new Date(dateStr).toUTCString()
        else {
          const stat = await fs.stat(full)
          pubDate = new Date(stat.mtime).toUTCString()
        }
        const link = `${siteUrl}/blog/${slug}`
        items.push({ title, link, pubDate, description, guid: link, content: body })
      }
    } catch (e) {
      // ignore
    }
    items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    const lastBuild = items.length ? items[0].pubDate : new Date().toUTCString()
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
      '<channel>',
      `  <title>${escapeXml(siteName)} - Blog</title>`,
      `  <link>${siteUrl}</link>`,
      `  <description>${escapeXml(siteName)}'s blog feed</description>`,
      `  <lastBuildDate>${lastBuild}</lastBuildDate>`,
      `  <language>fa-IR</language>`,
      `  <ttl>60</ttl>`,
      ...items.map(i => {
        const contentHtml = markdownToHtml(i.content || '')
        return `  <item>\n    <title>${escapeXml(i.title)}</title>\n    <link>${escapeXml(i.link)}</link>\n    <guid isPermaLink="true">${escapeXml(i.guid)}</guid>\n    <pubDate>${i.pubDate}</pubDate>\n    <description><![CDATA[${i.description}]]></description>\n    <content:encoded><![CDATA[${contentHtml}]]></content:encoded>\n  </item>`
      }),
      '</channel>',
      '</rss>'
    ].join('\n')
    event.node.res.setHeader('Content-Type', 'application/rss+xml')
    return xml
  }

  return
})
