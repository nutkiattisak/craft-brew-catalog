<script setup lang="ts">
// Default layout with header and footer
// Lazy load the modal component for better initial load performance
const LazyBeerDetailModal = defineAsyncComponent(
  () => import('~/core/components/beer-detail-modal/index.vue')
)
</script>

<template>
  <div class="min-h-screen bg-midnight-950">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Beer Detail Modal - Lazy loaded -->
    <ClientOnly>
      <LazyBeerDetailModal />
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
