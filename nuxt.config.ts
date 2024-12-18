// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  modules: ['@nuxt/eslint', '@nuxt/test-utils/module', '@hypernym/nuxt-gsap'],
  devtools: { enabled: true },

  app: {
    baseURL: '/',
  },

  nitro: {
    preset: 'vercel',
  },

  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  gsap: {
    composables: true,
    provide: false,
    extraPlugins: {
      scrollTrigger: true,
    },
  },

  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },

  eslint: {},
})
