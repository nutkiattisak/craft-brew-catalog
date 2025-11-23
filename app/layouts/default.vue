<script setup lang="ts">
// Default layout with header and footer
// Lazy hydration for non-critical components to improve FCP/LCP

// Footer hydrates when visible (user scrolls down)
const LazyAppFooter = defineLazyHydrationComponent(
  'visible',
  () => import('~/core/components/app-footer/index.vue')
)

// Modal hydrates on interaction (when user clicks a beer card)
const LazyBeerDetailModal = defineLazyHydrationComponent(
  'idle',
  () => import('~/core/components/beer-detail-modal/index.vue')
)
</script>

<template>
  <div class="min-h-screen bg-midnight-950">
    <!-- Header - loads immediately (critical for navigation) -->
    <AppHeader />

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer - hydrates when visible -->
    <LazyAppFooter :hydrate-on-visible="{ rootMargin: '200px' }" />

    <!-- Beer Detail Modal - hydrates when browser is idle -->
    <ClientOnly>
      <LazyBeerDetailModal :hydrate-on-idle="3000" />
    </ClientOnly>
  </div>
</template>

<style>
/* Prevent layout shift when modal opens */
body.modal-open {
  overflow: hidden;
  padding-right: var(--scrollbar-width, 0);
}

/* Optimize scrollbar width calculation */
:root {
  --scrollbar-width: 0px;
}

@supports (scrollbar-gutter: stable) {
  html {
    scrollbar-gutter: stable;
  }
}
</style>
