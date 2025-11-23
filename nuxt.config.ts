// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxtjs/color-mode', '@nuxt/image'],

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  // Image optimization configuration
  image: {
    // Use none provider to use native <img> with optimization attributes
    // This prevents IPX errors during SSG build with external images
    provider: 'none',
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    domains: ['images.unsplash.com'],
  },

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
    build: {
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
            'ui-vendor': ['radix-vue', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          },
        },
      },
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 500,
    },
  },

  // Experimental features for better performance
  experimental: {
    viewTransition: true,
    componentIslands: true,
  },

  // Route rules for caching and prerendering
  routeRules: {
    '/': { prerender: true },
    '/styles': { prerender: true },
    '/ingredients': { prerender: true },
    '/tools': { prerender: true },
  },

  // Nitro configuration for server optimization
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: true,
      failOnError: false,
      ignore: ['/guides'],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Craft Brew Catalog | Premium Beer Discovery',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Discover premium craft beers from around the world. Explore unique flavors, styles, and breweries.',
        },
        // Performance hints
        { name: 'color-scheme', content: 'dark light' },
        { name: 'theme-color', content: '#0a0a0b' },
      ],
      link: [
        // DNS prefetch for external resources
        { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        // Preconnect for critical resources
        { rel: 'preconnect', href: 'https://images.unsplash.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Optimized font loading - reduced weights (400, 500, 600, 700 only)
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
        // Preload hero image for LCP optimization
        {
          rel: 'preload',
          as: 'image',
          href: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=1920&q=80',
          fetchpriority: 'high',
        },
      ],
      // Noscript fallback for font loading
      noscript: [
        {
          innerHTML:
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">',
        },
      ],
    },
  },

  compatibilityDate: '2024-11-01',
})
