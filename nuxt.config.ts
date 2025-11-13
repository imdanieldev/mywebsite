// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
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
})