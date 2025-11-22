<script setup lang="ts">
import { Heart, ShoppingCart, Star, Sparkles } from 'lucide-vue-next'
import type { Beer } from '~/types/beer'

interface Props {
  beer: Beer
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'click', beer: Beer): void
}>()

const { toggleWishlist, addToCart, isInWishlist, isInCart } = useBeerStore()

function handleCardClick() {
  emit('click', props.beer)
}

function handleWishlistClick(e: Event) {
  e.stopPropagation()
  toggleWishlist(props.beer.id)
}

function handleCartClick(e: Event) {
  e.stopPropagation()
  addToCart(props.beer.id)
}

function getBitternessLevel(ibu: number): number {
  // Convert IBU to 5-point scale
  if (ibu <= 15) return 1
  if (ibu <= 30) return 2
  if (ibu <= 50) return 3
  if (ibu <= 70) return 4
  return 5
}
</script>

<template>
  <article
    @click="handleCardClick"
    class="group relative bg-midnight-800/50 rounded-2xl overflow-hidden border border-midnight-700/50 card-hover cursor-pointer"
  >
    <!-- Image Container -->
    <div class="relative aspect-[3/4] overflow-hidden">
      <img
        :src="beer.image"
        :alt="beer.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/20 to-transparent" />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span v-if="beer.isNew" class="badge badge-amber flex items-center gap-1">
          <Sparkles class="w-3 h-3" />
          New
        </span>
        <span v-if="beer.isFeatured" class="badge bg-purple-500/20 text-purple-400 border border-purple-500/30">
          Featured
        </span>
      </div>

      <!-- Wishlist Button -->
      <button
        @click="handleWishlistClick"
        class="absolute top-3 right-3 p-2 rounded-full bg-midnight-900/60 backdrop-blur-sm border border-midnight-700/50 transition-all hover:bg-midnight-800 hover:scale-110"
        :class="{ 'text-red-500': isInWishlist(beer.id), 'text-foam-300': !isInWishlist(beer.id) }"
      >
        <Heart class="w-5 h-5" :fill="isInWishlist(beer.id) ? 'currentColor' : 'none'" />
      </button>

      <!-- Quick Stats Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 px-2 py-1 rounded-lg bg-midnight-900/80 backdrop-blur-sm">
              <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
              <span class="text-sm font-semibold text-foam-100">{{ beer.rating }}</span>
            </div>
            <div class="px-2 py-1 rounded-lg bg-midnight-900/80 backdrop-blur-sm">
              <span class="text-sm font-semibold text-amber-400">{{ beer.abv }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Style Badge -->
      <div class="mb-2">
        <span class="badge badge-slate text-xs">{{ beer.style }}</span>
      </div>

      <!-- Name & Brewery -->
      <h3 class="text-lg font-bold text-foam-50 group-hover:text-amber-400 transition-colors line-clamp-1">
        {{ beer.name }}
      </h3>
      <p class="text-sm text-foam-400 mt-0.5">{{ beer.brewery }}</p>

      <!-- Bitterness Scale -->
      <div class="mt-3">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs text-foam-400">Bitterness</span>
          <span class="text-xs text-foam-500">{{ beer.ibu }} IBU</span>
        </div>
        <div class="flex gap-1">
          <div
            v-for="i in 5"
            :key="i"
            class="h-1.5 flex-1 rounded-full transition-colors"
            :class="i <= getBitternessLevel(beer.ibu) ? 'bg-amber-500' : 'bg-midnight-700'"
          />
        </div>
      </div>

      <!-- Price & Action -->
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-midnight-700/50">
        <div>
          <span class="text-2xl font-bold text-foam-50">${{ beer.price.toFixed(2) }}</span>
        </div>
        <button
          @click="handleCartClick"
          class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
          :class="isInCart(beer.id)
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-amber-500 text-midnight-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20'"
        >
          <ShoppingCart class="w-4 h-4" />
          <span class="text-sm font-semibold">{{ isInCart(beer.id) ? 'Added' : 'Add' }}</span>
        </button>
      </div>
    </div>
  </article>
</template>
