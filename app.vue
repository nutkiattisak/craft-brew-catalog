<script setup lang="ts">
// Initialize the beer store
const { isModalOpen } = useBeerStore()
</script>

<template>
  <div class="min-h-screen bg-midnight-950">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <HeroSection />

      <!-- Filter Bar -->
      <FilterBar />

      <!-- Beer Grid -->
      <BeerGrid />
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
