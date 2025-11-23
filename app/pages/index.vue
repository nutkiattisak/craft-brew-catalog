<script setup lang="ts">
// Lazy hydration for non-critical components to improve FCP/LCP
const LazyFilterBar = defineLazyHydrationComponent(
  'visible',
  () => import('~/core/components/filter-bar/index.vue')
)

const LazyBeerGrid = defineLazyHydrationComponent(
  'visible',
  () => import('~/core/components/beer-grid/index.vue')
)
</script>

<template>
  <div>
    <HeroSection />

    <LazyFilterBar :hydrate-on-visible="{ rootMargin: '100px' }" />

    <LazyBeerGrid :hydrate-on-visible="{ rootMargin: '200px' }" />
  </div>
</template>
