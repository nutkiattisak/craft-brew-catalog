<script setup lang="ts">
import {
  Star,
  MapPin,
  Heart,
  BookOpen,
  Share2,
  Wheat,
  Hop,
  FlaskConical,
  Lightbulb,
  Beaker,
  Gauge,
} from 'lucide-vue-next'

const {
  selectedBeer,
  isModalOpen,
  closeBeerModal,
  toggleWishlist,
  saveRecipe,
  isInWishlist,
  isRecipeSaved,
} = useBeerStore()

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-500/20 text-green-400 border-green-500/50'
    case 'medium':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/50'
    case 'hard':
      return 'bg-red-500/20 text-red-400 border-red-500/50'
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/50'
  }
}

function getDifficultyLabel(difficulty: string): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
}

function handleShare() {
  if (selectedBeer.value && typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({
      title: selectedBeer.value.name,
      text: `Check out ${selectedBeer.value.name} from ${selectedBeer.value.brewery}`,
      url: window.location.href,
    })
  }
}
</script>

<template>
  <UiDialog :open="isModalOpen" @update:open="(open) => !open && closeBeerModal()">
    <UiDialogContent v-if="selectedBeer" class="max-w-4xl max-h-[90vh] overflow-hidden p-0">
      <!-- Scrollable Content -->
      <div class="overflow-y-auto max-h-[85vh]">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <!-- Left Column - Image & Quick Info -->
          <div class="space-y-4">
            <!-- Image with fixed dimensions to prevent CLS -->
            <div class="relative aspect-square rounded-xl overflow-hidden bg-midnight-800">
              <NuxtImg
                :src="selectedBeer.image"
                :alt="selectedBeer.name"
                class="w-full h-full object-cover"
                width="500"
                height="500"
                format="webp"
                quality="80"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                :placeholder="[20, 20, 10]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-midnight-950/60 to-transparent" />

              <!-- Badges -->
              <div class="absolute top-4 left-4 flex gap-2">
                <UiBadge v-if="selectedBeer.isNew" variant="amber">New</UiBadge>
                <UiBadge v-if="selectedBeer.isFeatured" variant="purple">Featured</UiBadge>
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
              <UiBadge variant="secondary" class="mb-2">{{ selectedBeer.style }}</UiBadge>
              <h2 class="text-2xl lg:text-3xl font-bold text-foam-50">{{ selectedBeer.name }}</h2>
              <div class="flex items-center gap-2 mt-2 text-foam-400">
                <MapPin class="w-4 h-4" />
                <span>{{ selectedBeer.brewery }} • {{ selectedBeer.breweryLocation }}</span>
              </div>
            </div>

            <!-- Difficulty Badge -->
            <div class="flex items-center gap-3 mt-2">
              <UiBadge
                :class="getDifficultyColor(selectedBeer.difficulty)"
                class="flex items-center gap-1 border"
              >
                <Gauge class="w-3 h-3" />
                {{ getDifficultyLabel(selectedBeer.difficulty) }} Difficulty
              </UiBadge>
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
              <div
                class="flex items-center gap-2 p-3 rounded-lg bg-midnight-800/50 border border-midnight-700/50"
              >
                <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
                <div>
                  <div class="text-lg font-bold text-foam-100">{{ selectedBeer.rating }}</div>
                  <div class="text-xs text-foam-400">Rating</div>
                </div>
              </div>
              <div
                class="flex items-center gap-2 p-3 rounded-lg bg-midnight-800/50 border border-midnight-700/50"
              >
                <Beaker class="w-5 h-5 text-amber-400" />
                <div>
                  <div class="text-lg font-bold text-amber-400">{{ selectedBeer.abv }}%</div>
                  <div class="text-xs text-foam-400">ABV</div>
                </div>
              </div>
              <div
                class="flex items-center gap-2 p-3 rounded-lg bg-midnight-800/50 border border-midnight-700/50"
              >
                <Beaker class="w-5 h-5 text-amber-400" />
                <div>
                  <div class="text-lg font-bold text-foam-100">
                    {{ selectedBeer.og.toFixed(3) }}
                  </div>
                  <div class="text-xs text-foam-400">OG</div>
                </div>
              </div>
              <div
                class="flex items-center gap-2 p-3 rounded-lg bg-midnight-800/50 border border-midnight-700/50"
              >
                <Gauge class="w-5 h-5 text-amber-400" />
                <div>
                  <div class="text-lg font-bold text-foam-100">{{ selectedBeer.ibu }}</div>
                  <div class="text-xs text-foam-400">IBU</div>
                </div>
              </div>
            </div>

            <UiSeparator />

            <!-- Description -->
            <div>
              <h3 class="text-sm font-semibold text-foam-300 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p class="text-foam-200 leading-relaxed">{{ selectedBeer.description }}</p>
            </div>

            <!-- Tasting Notes -->
            <div>
              <h3 class="text-sm font-semibold text-foam-300 uppercase tracking-wider mb-2">
                Tasting Notes
              </h3>
              <p class="text-foam-400 leading-relaxed">{{ selectedBeer.tastingNotes }}</p>
            </div>

            <!-- Recommended Ingredients -->
            <div>
              <h3 class="text-sm font-semibold text-foam-300 uppercase tracking-wider mb-3">
                Recommended Ingredients
              </h3>
              <div class="space-y-3">
                <!-- Malt -->
                <div
                  class="flex items-start gap-3 p-3 rounded-lg bg-midnight-800/50 border border-midnight-700/50"
                >
                  <Wheat class="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span class="text-xs text-foam-400 uppercase tracking-wider">Malt</span>
                    <p class="text-sm text-foam-200">
                      {{ selectedBeer.ingredients.malt.join(', ') }}
                    </p>
                  </div>
                </div>
                <!-- Hops -->
                <div
                  class="flex items-start gap-3 p-3 rounded-lg bg-midnight-800/50 border border-midnight-700/50"
                >
                  <Hop class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span class="text-xs text-foam-400 uppercase tracking-wider">Hops</span>
                    <p class="text-sm text-foam-200">
                      {{ selectedBeer.ingredients.hops.join(', ') }}
                    </p>
                  </div>
                </div>
                <!-- Yeast -->
                <div
                  class="flex items-start gap-3 p-3 rounded-lg bg-midnight-800/50 border border-midnight-700/50"
                >
                  <FlaskConical class="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span class="text-xs text-foam-400 uppercase tracking-wider">Yeast</span>
                    <p class="text-sm text-foam-200">{{ selectedBeer.ingredients.yeast }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Brewer's Tips -->
            <div>
              <h3 class="text-sm font-semibold text-foam-300 uppercase tracking-wider mb-3">
                Brewer's Tips
              </h3>
              <div class="space-y-2">
                <div
                  v-for="tip in selectedBeer.brewersTips"
                  :key="tip.id"
                  class="flex items-start gap-3 p-3 rounded-lg bg-midnight-800/30 border border-midnight-700/30"
                >
                  <Lightbulb class="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p class="text-sm text-foam-300">{{ tip.tip }}</p>
                </div>
              </div>
            </div>

            <UiSeparator />

            <!-- Technical Specs Summary -->
            <div
              class="flex items-center gap-4 p-4 rounded-lg bg-midnight-800/30 border border-midnight-700/30"
            >
              <div class="flex-1">
                <div class="text-sm text-foam-400 mb-1">Final Gravity</div>
                <span class="text-2xl font-bold text-foam-50">{{
                  selectedBeer.fg.toFixed(3)
                }}</span>
              </div>
              <UiSeparator orientation="vertical" class="h-12" />
              <div class="flex-1 text-center">
                <div class="text-sm text-foam-400 mb-1">Attenuation</div>
                <span class="text-2xl font-bold text-amber-400">
                  {{
                    Math.round(((selectedBeer.og - selectedBeer.fg) / (selectedBeer.og - 1)) * 100)
                  }}%
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3">
              <UiButton
                variant="outline"
                size="icon"
                :class="
                  isInWishlist(selectedBeer.id)
                    ? 'bg-red-500/20 border-red-500/30 text-red-400'
                    : 'hover:text-red-400 hover:border-red-500/30'
                "
                @click="toggleWishlist(selectedBeer.id)"
              >
                <Heart
                  class="w-5 h-5"
                  :fill="isInWishlist(selectedBeer.id) ? 'currentColor' : 'none'"
                />
              </UiButton>
              <UiButton
                variant="outline"
                size="icon"
                class="hover:text-amber-400 hover:border-amber-500/30"
                @click="handleShare"
              >
                <Share2 class="w-5 h-5" />
              </UiButton>
              <UiButton
                :variant="isRecipeSaved(selectedBeer.id) ? 'outline' : 'default'"
                class="flex-1"
                :class="
                  isRecipeSaved(selectedBeer.id)
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/50 hover:bg-amber-500/30'
                "
                @click="saveRecipe(selectedBeer.id)"
              >
                <BookOpen class="w-5 h-5" />
                {{ isRecipeSaved(selectedBeer.id) ? 'Recipe Saved' : 'Save Recipe' }}
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
