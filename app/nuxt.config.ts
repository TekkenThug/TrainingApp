export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["nuxt-svgo", "nuxt-icon"],

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Viga&display=swap" }
      ]
    }
  },

  css: [
    "normalize.css",
    "reset-css",
    "~/assets/styles/global.css"
  ]
})
