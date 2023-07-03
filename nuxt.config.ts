export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts'],

  ssr: false,

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  plugins: [],

  googleFonts: {
    download: true,
    inject: true,
    base64: true,
    families: {
      Manrope: [300, 400, 600, 700],
    },
  },
});
