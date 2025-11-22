// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/eslint'],

  components: {
    dirs: [
      {
        path: '~/core/components',
        ignore: ['**/ui/**'],
      },
      {
        path: '~/core/components/ui',
        prefix: 'Ui',
        pathPrefix: false,
        extensions: ['.vue'],
      },
    ],
  },

  imports: {
    dirs: ['~/core/composables'],
  },

  alias: {
    '~/types': './app/core/types',
    '~/lib': './app/core/lib',
  },

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Craft Brew Catalog | Premium Beer Discovery',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Discover premium craft beers from around the world. Explore unique flavors, styles, and breweries.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  compatibilityDate: '2024-11-01',
})
