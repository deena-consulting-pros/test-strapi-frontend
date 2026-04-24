import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:ital,wght@0,400;0,500;0,600;1,400&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    },
  },
})
