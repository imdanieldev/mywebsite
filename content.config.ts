import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        readingTime: z.string().optional(),
        links: z.object({
          github: z.string().optional(),
          demo: z.string().optional()
        }).optional()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string().default('Danial Nasr'),
        tags: z.array(z.string()).optional(),
        readingTime: z.string().optional(),
        published: z.boolean().default(true),
        featured: z.boolean().default(false)
      })
    })
  }
})