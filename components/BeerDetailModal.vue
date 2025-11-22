<script setup lang="ts">
import {
  X, Star, MapPin, Heart, ShoppingCart, Share2,
  Beef, Sandwich, Salad, Cookie, Fish, Drumstick,
  CircleDot, Pizza
} from 'lucide-vue-next'
import { watch } from 'vue'

const { selectedBeer, isModalOpen, closeBeerModal, toggleWishlist, addToCart, isInWishlist, isInCart } = useBeerStore()

// Food pairing icons mapping
const foodIcons: Record<string, any> = {
  burger: Sandwich,
  steak: Beef,
  tacos: Sandwich,
  cheese: CircleDot,
  seafood: Fish,
  salad: Salad,
  chocolate: Cookie,
  dessert: Cookie,
  bbq: Beef,
  wings: Drumstick,
  pizza: Pizza,
  chicken: Drumstick,
  sausage: Beef,
  pretzel: Cookie,
  duck: Drumstick,
  bacon: Beef
}

// Lock body scroll when modal is open
watch(isModalOpen, (open) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

function handleBackdropClick(e: Event) {
  if (e.target === e.currentTarget) {
    closeBeerModal()
  }
}

function handleShare() {
  if (selectedBeer.value && typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({
      title: selectedBeer.value.name,
      text: `Check out ${selectedBeer.value.name} from ${selectedBeer.value.brewery}`,
      url: window.location.href
    })
  }
}

const formattedDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-midnight-950/80 backdrop-blur-sm" />

        <!-- Modal Content -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-full sm:translate-y-8 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-full sm:translate-y-8 sm:scale-95"
        >
          <div
            v-if="isModalOpen && selectedBeer"
            class="relative w-full sm:max-w-4xl max-h-[90vh] bg-midnight-900 sm:rounded-2xl overflow-hidden shadow-2xl"
          >
            <!-- Mobile Handle -->
            <div class="sm:hidden flex justify-center pt-3 pb-2">
              <div class="w-10 h-1 bg-midnight-700 rounded-full" />
            </div>

            <!-- Close Button -->
            <button
              @click="closeBeerModal"
              class="absolute top-4 right-4 z-10 p-2 rounded-full bg-midnight-800/80 backdrop-blur-sm border border-midnight-700 text-foam-300 hover:text-foam-100 hover:bg-midnight-700 transition-colors"
            >
              <X class="w-5 h-5" />
            </button>

            <!-- Scrollable Content -->
            <div class="overflow-y-auto max-h-[85vh] sm:max-h-[80vh]">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                <!-- Left Column - Image & Quick Info -->
                <div class="space-y-4">
                  <!-- Image -->
                  <div class="relative aspect-square rounded-xl overflow-hidden bg-midnight-800">
                    <img
                      :src="selectedBeer.image"
                      :alt="selectedBeer.name"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-midnight-950/60 to-transparent" />

                    <!-- Badges -->
                    <div class="absolute top-4 left-4 flex gap-2">
                      <span v-if="selectedBeer.isNew" class="badge badge-amber">New</span>
                      <span v-if="selectedBeer.isFeatured" class="badge bg-purple-500/20 text-purple-400 border border-purple-500/30">Featured</span>
                    </div>
                  </div>

                  <!-- Flavor Radar Chart -->
                  <div class="bg-midnight-800/50 rounded-xl p-6 border border-midnight-700/50">
                    <h3 class="text-lg font-semibold text-foam-100 mb-4">Flavor Profile</h3>
                    <div class="flex justify-center">
                      <FlavorRadarChart :flavor-profile="selectedBeer.flavorProfile" :size="220" />
                    </div>
                  </div>
                </div>

                <!-- Right Column - Details -->
                <div class="space-y-6">
                  <!-- Header -->
                  <div>
                    <span class="badge badge-slate mb-2">{{ selectedBeer.style }}</span>
                    <h2 class="text-2xl lg:text-3xl font-bold text-foam-50">{{ selectedBeer.name }}</h2>
                    <div class="flex items-center gap-2 mt-2 text-foam-400">
                      <MapPin class="w-4 h-4" />
                      <span>{{ selectedBeer.brewery }} • {{ selectedBeer.breweryLocation }}</span>
                    </div>
                  </div>

                  <!-- Stats Row -->
                  <div class="flex items-center gap-6 py-4 border-y border-midnight-700/50">
                    <div class="flex items-center gap-2">
                      <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span class="text-lg font-bold text-foam-100">{{ selectedBeer.rating }}</span>
                      <span class="text-sm text-foam-400">({{ selectedBeer.reviewCount }})</span>
                    </div>
                    <div class="text-center">
                      <div class="text-lg font-bold text-amber-400">{{ selectedBeer.abv }}%</div>
                      <div class="text-xs text-foam-400">ABV</div>
                    </div>
                    <div class="text-center">
                      <div class="text-lg font-bold text-foam-100">{{ selectedBeer.ibu }}</div>
                      <div class="text-xs text-foam-400">IBU</div>
                    </div>
                  </div>

                  <!-- Description -->
                  <div>
                    <h3 class="text-sm font-semibold text-foam-300 uppercase tracking-wider mb-2">Description</h3>
                    <p class="text-foam-200 leading-relaxed">{{ selectedBeer.description }}</p>
                  </div>

                  <!-- Tasting Notes -->
                  <div>
                    <h3 class="text-sm font-semibold text-foam-300 uppercase tracking-wider mb-2">Tasting Notes</h3>
                    <p class="text-foam-400 leading-relaxed">{{ selectedBeer.tastingNotes }}</p>
                  </div>

                  <!-- Food Pairing -->
                  <div>
                    <h3 class="text-sm font-semibold text-foam-300 uppercase tracking-wider mb-3">Food Pairing</h3>
                    <div class="flex flex-wrap gap-3">
                      <div
                        v-for="food in selectedBeer.foodPairings"
                        :key="food"
                        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-midnight-800/50 border border-midnight-700/50"
                      >
                        <component :is="foodIcons[food] || Sandwich" class="w-4 h-4 text-amber-400" />
                        <span class="text-sm text-foam-200 capitalize">{{ food }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Reviews -->
                  <div>
                    <h3 class="text-sm font-semibold text-foam-300 uppercase tracking-wider mb-3">Recent Reviews</h3>
                    <div class="space-y-3">
                      <div
                        v-for="review in selectedBeer.reviews.slice(0, 2)"
                        :key="review.id"
                        class="p-4 rounded-xl bg-midnight-800/30 border border-midnight-700/30"
                      >
                        <div class="flex items-start justify-between mb-2">
                          <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-midnight-950 font-bold text-sm">
                              {{ review.author.charAt(0) }}
                            </div>
                            <div>
                              <span class="text-sm font-medium text-foam-200">{{ review.author }}</span>
                              <div class="flex items-center gap-1">
                                <Star
                                  v-for="i in 5"
                                  :key="i"
                                  class="w-3 h-3"
                                  :class="i <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-midnight-700'"
                                />
                              </div>
                            </div>
                          </div>
                          <span class="text-xs text-foam-500">{{ formattedDate(review.date) }}</span>
                        </div>
                        <p class="text-sm text-foam-400">{{ review.comment }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-3 pt-4 border-t border-midnight-700/50">
                    <div class="flex-1">
                      <span class="text-3xl font-bold text-foam-50">${{ selectedBeer.price.toFixed(2) }}</span>
                    </div>
                    <button
                      @click="toggleWishlist(selectedBeer.id)"
                      class="p-3 rounded-xl border transition-all"
                      :class="isInWishlist(selectedBeer.id)
                        ? 'bg-red-500/20 border-red-500/30 text-red-400'
                        : 'bg-midnight-800 border-midnight-700 text-foam-300 hover:text-red-400 hover:border-red-500/30'"
                    >
                      <Heart class="w-5 h-5" :fill="isInWishlist(selectedBeer.id) ? 'currentColor' : 'none'" />
                    </button>
                    <button
                      @click="handleShare"
                      class="p-3 rounded-xl bg-midnight-800 border border-midnight-700 text-foam-300 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                    >
                      <Share2 class="w-5 h-5" />
                    </button>
                    <button
                      @click="addToCart(selectedBeer.id)"
                      class="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                      :class="isInCart(selectedBeer.id)
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-amber-500 text-midnight-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20'"
                    >
                      <ShoppingCart class="w-5 h-5" />
                      {{ isInCart(selectedBeer.id) ? 'Added to Cart' : 'Add to Cart' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
