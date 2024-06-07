export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  modules: ["nuxt-svgo", "nuxt-icon", "@vite-pwa/nuxt", "@pinia/nuxt"],

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Viga&display=swap" },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    }
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost:8000/api/v1"
    }
  },

  css: [
    "normalize.css",
    "reset-css",
    "~/assets/styles/global.css"
  ],

  pwa: {}
})
