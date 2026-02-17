import { promises as fs } from 'fs'
import { join, relative } from 'path'

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
  // strip markdown headings and code blocks roughly
  const cleaned = body.replace(/```[\s\S]*?```/g, '').replace(/#.+/g, '')
  const lines = cleaned.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  return lines.slice(0, 3).join(' ')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://imdanieldev.vercel.app'
  const siteName = config.public.siteName || 'Danial'
  const root = process.cwd()

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
      if (dateStr) {
        pubDate = new Date(dateStr).toUTCString()
      } else {
        const stat = await fs.stat(full)
        pubDate = new Date(stat.mtime).toUTCString()
      }
      const link = `${siteUrl}/blog/${slug}`
      items.push({ title, link, pubDate, description, guid: link })
    }
  } catch (e) {
    // if folder missing, return empty feed
  }

  // sort by date desc
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  const lastBuild = items.length ? items[0].pubDate : new Date().toUTCString()

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `  <title>${escapeXml(siteName)} - Blog</title>`,
    `  <link>${siteUrl}</link>`,
    `  <description>${escapeXml(siteName)}'s blog feed</description>`,
    `  <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `  <language>fa-IR</language>`,
    `  <ttl>60</ttl>`,
    ...items.map(i => `  <item>\n    <title>${escapeXml(i.title)}</title>\n    <link>${escapeXml(i.link)}</link>\n    <guid isPermaLink="true">${escapeXml(i.guid)}</guid>\n    <pubDate>${i.pubDate}</pubDate>\n    <description><![CDATA[${i.description}]]></description>\n  </item>`),
    '</channel>',
    '</rss>'
  ].join('\n')

  event.node.res.setHeader('Content-Type', 'application/rss+xml')
  return xml
})

function escapeXml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}
