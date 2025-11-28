// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxtjs/color-mode', '@nuxt/image'],

  // Runtime configuration
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://craft-brew-catalog.vercel.app',
    },
  },

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
    quality: 75,
    format: ['webp', 'avif'],
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
            gsap: ['gsap'],
          },
        },
      },
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 500,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Minification options - esbuild is faster than terser
      minify: 'esbuild',
      // Target modern browsers for smaller bundles
      target: 'es2020',
      // Optimize CSS
      cssMinify: 'lightningcss',
    },
  },

  // Experimental features for better performance
  experimental: {
    viewTransition: false, // Disabled for better mobile performance
    componentIslands: true,
    payloadExtraction: true, // Extract payload for better hydration
  },

  // Optimize features for production
  features: {
    inlineStyles: false, // Don't inline styles to reduce HTML size
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
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true,
    prerender: {
      crawlLinks: true,
      failOnError: false,
      ignore: ['/guides'],
    },
    // Optimize response headers for better caching
    routeRules: {
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
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
        // Performance hints for better rendering
        { name: 'color-scheme', content: 'dark light' },
        { name: 'theme-color', content: '#0a0a0b' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        // Optimize resource loading
        { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
        // SEO Meta Tags
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Craft Brew Catalog | Premium Beer Discovery' },
        {
          property: 'og:description',
          content:
            'Discover premium craft beers from around the world. Explore unique flavors, styles, and breweries.',
        },
        { property: 'og:site_name', content: 'Craft Brew Catalog' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Craft Brew Catalog | Premium Beer Discovery' },
        {
          name: 'twitter:description',
          content:
            'Discover premium craft beers from around the world. Explore unique flavors, styles, and breweries.',
        },
      ],
      link: [
        // Canonical URL for SEO
        { rel: 'canonical', href: 'https://craft-brew-catalog.vercel.app' },
        // Preconnect for external resources - lazy loaded so not critical
        { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
        // SEO: Sitemap
        {
          rel: 'sitemap',
          type: 'application/xml',
          href: '/sitemap.xml',
        },
      ],
    },
  },

  compatibilityDate: '2024-11-01',
})
