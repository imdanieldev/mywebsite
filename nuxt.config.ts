// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || 'https://imdanieldev.vercel.app',
      siteName: process.env.SITE_NAME || 'Danial'
    }
  },
  modules: ['@nuxt/content', 'nuxt-aos', '@nuxt/image'],
  css: ['./app/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  aos: {
    duration: 800,
    once: true,
  },
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['js', 'css', 'html', 'vue', 'bash']
    }
  },
  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: 'Personal portfolio and blog by Danial' },
      ],
      link: [
        { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml', title: 'RSS' }
      ]
    }
  }
})