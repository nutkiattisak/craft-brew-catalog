<script setup lang="ts">
// Default layout with header and footer
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

    <!-- Beer Detail Modal -->
    <BeerDetailModal />
  </div>
</template>

<style>
/* Smooth scrolling for the whole page */
html {
  scroll-behavior: smooth;
}

/* Prevent layout shift when modal opens */
body.modal-open {
  overflow: hidden;
  padding-right: var(--scrollbar-width, 0);
}
</style>
