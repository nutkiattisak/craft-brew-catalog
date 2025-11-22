<script setup lang="ts">
import { Package } from 'lucide-vue-next'
import type { Beer } from '~/types/beer'

const { filteredBeers, openBeerModal } = useBeerStore()

function handleBeerClick(beer: Beer) {
  openBeerModal(beer)
}
</script>

<template>
  <section class="py-12 lg:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl lg:text-3xl font-bold text-foam-50">
            The Catalog
          </h2>
          <p class="text-foam-400 mt-1">
            {{ filteredBeers.length }} beers available
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredBeers.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center"
      >
        <div class="w-20 h-20 rounded-full bg-midnight-800 flex items-center justify-center mb-4">
          <Package class="w-10 h-10 text-foam-400" />
        </div>
        <h3 class="text-xl font-semibold text-foam-200 mb-2">No beers found</h3>
        <p class="text-foam-400 max-w-md">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>

      <!-- Beer Grid -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <BeerCard
          v-for="(beer, index) in filteredBeers"
          :key="beer.id"
          :beer="beer"
          @click="handleBeerClick"
          class="animate-slide-up"
          :style="{ animationDelay: `${index * 0.05}s` }"
        />
      </div>

      <!-- Load More (Placeholder) -->
      <div class="flex justify-center mt-12">
        <button class="btn-secondary px-8 py-3">
          Load More Beers
        </button>
      </div>
    </div>
  </section>
</template>
