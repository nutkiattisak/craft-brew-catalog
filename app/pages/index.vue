<script setup lang="ts">
// Aggressive lazy hydration for optimal FCP/LCP
const LazyFilterBar = defineLazyHydrationComponent(
  'visible',
  () => import('~/core/components/filter-bar/index.vue')
)

const LazyBeerGrid = defineLazyHydrationComponent(
  'visible',
  () => import('~/core/components/beer-grid/index.vue')
)

// SEO metadata
useHead({
  title: 'Craft Brew Catalog | Premium Beer Discovery',
  meta: [
    {
      name: 'description',
      content:
        'Discover premium craft beers from around the world. Explore unique flavors, styles, and breweries.',
    },
  ],
})
</script>

<template>
  <div>
    <HeroSection />

    <LazyFilterBar :hydrate-on-visible="{ rootMargin: '300px' }" />

    <LazyBeerGrid :hydrate-on-visible="{ rootMargin: '400px' }" />
  </div>
</template>
