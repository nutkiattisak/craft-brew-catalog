<script setup lang="ts">
import { Search, FlaskConical, Wheat, Hop, TestTube, Package } from 'lucide-vue-next'
import { malts, hops, yeasts, adjuncts, allIngredients } from '~/core/data/ingredients'
import type { IngredientCategory } from '~/core/types/ingredient'

const searchQuery = ref('')
const selectedCategory = ref<IngredientCategory | 'all'>('all')

const categories = [
  { value: 'all', label: 'All', icon: FlaskConical },
  { value: 'malt', label: 'Malts', icon: Wheat },
  { value: 'hops', label: 'Hops', icon: Hop },
  { value: 'yeast', label: 'Yeasts', icon: TestTube },
  { value: 'adjunct', label: 'Adjuncts', icon: Package },
]

const filteredIngredients = computed(() => {
  let ingredients = allIngredients

  if (selectedCategory.value !== 'all') {
    ingredients = ingredients.filter((ing) => ing.type === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    ingredients = ingredients.filter((ing) => {
      const nameMatch = ing.name.toLowerCase().includes(query)
      const descMatch = ing.description.toLowerCase().includes(query)

      let extraMatch = false
      if (ing.type === 'malt') {
        extraMatch = ing.flavor.some((f) => f.toLowerCase().includes(query))
      } else if (ing.type === 'hops') {
        extraMatch = ing.aroma.some((a) => a.toLowerCase().includes(query))
      } else if (ing.type === 'yeast') {
        extraMatch = ing.styles.some((s) => s.toLowerCase().includes(query))
      } else if (ing.type === 'adjunct') {
        extraMatch = ing.flavor.some((f) => f.toLowerCase().includes(query))
      }

      return nameMatch || descMatch || extraMatch
    })
  }

  return ingredients
})

const stats = computed(() => ({
  malts: malts.length,
  hops: hops.length,
  yeasts: yeasts.length,
  adjuncts: adjuncts.length,
  total: allIngredients.length,
}))
</script>

<template>
  <div class="min-h-screen bg-midnight-950">
    <!-- Hero Section -->
    <section class="relative pt-24 pb-16 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-midnight-900/50 to-midnight-950" />
        <div class="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 mb-6 shadow-lg shadow-green-500/20"
          >
            <FlaskConical class="w-8 h-8 text-midnight-950" />
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-foam-50 mb-4">
            Brewing <span class="text-gradient">Ingredients</span>
          </h1>
          <p class="text-lg text-foam-300 max-w-2xl mx-auto">
            Explore the essential building blocks of great beer. From base malts to specialty hops,
            discover ingredients that will elevate your brewing.
          </p>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-6 mb-10">
          <div
            class="flex items-center gap-2 px-4 py-2 bg-midnight-800/50 rounded-xl border border-midnight-700"
          >
            <Wheat class="w-5 h-5 text-amber-400" />
            <span class="text-foam-300"
              ><span class="font-bold text-amber-400">{{ stats.malts }}</span> Malts</span
            >
          </div>
          <div
            class="flex items-center gap-2 px-4 py-2 bg-midnight-800/50 rounded-xl border border-midnight-700"
          >
            <Hop class="w-5 h-5 text-green-400" />
            <span class="text-foam-300"
              ><span class="font-bold text-green-400">{{ stats.hops }}</span> Hops</span
            >
          </div>
          <div
            class="flex items-center gap-2 px-4 py-2 bg-midnight-800/50 rounded-xl border border-midnight-700"
          >
            <TestTube class="w-5 h-5 text-purple-400" />
            <span class="text-foam-300"
              ><span class="font-bold text-purple-400">{{ stats.yeasts }}</span> Yeasts</span
            >
          </div>
          <div
            class="flex items-center gap-2 px-4 py-2 bg-midnight-800/50 rounded-xl border border-midnight-700"
          >
            <Package class="w-5 h-5 text-sky-400" />
            <span class="text-foam-300"
              ><span class="font-bold text-sky-400">{{ stats.adjuncts }}</span> Adjuncts</span
            >
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="max-w-3xl mx-auto space-y-4">
          <!-- Search Bar -->
          <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foam-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search ingredients by name, flavor, aroma..."
              class="w-full pl-12 pr-4 py-4 bg-midnight-800/60 backdrop-blur-xl border border-midnight-700/50 rounded-xl text-foam-100 placeholder-foam-400/50 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          <!-- Category Filter -->
          <div class="flex flex-wrap justify-center gap-2">
            <UiButton
              v-for="cat in categories"
              :key="cat.value"
              :variant="selectedCategory === cat.value ? 'default' : 'outline'"
              size="sm"
              :class="
                selectedCategory === cat.value
                  ? 'bg-amber-500 text-midnight-950 hover:bg-amber-400'
                  : 'hover:border-amber-500/30 hover:text-amber-400'
              "
              @click="selectedCategory = cat.value as typeof selectedCategory"
            >
              <component :is="cat.icon" class="w-4 h-4 mr-1.5" />
              {{ cat.label }}
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Ingredients Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Count -->
        <div class="mb-6 text-foam-400">
          <span class="text-amber-400 font-medium">{{ filteredIngredients.length }}</span>
          ingredients found
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <IngredientCard
            v-for="ingredient in filteredIngredients"
            :key="ingredient.id"
            :ingredient="ingredient"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredIngredients.length === 0" class="text-center py-20">
          <FlaskConical class="w-16 h-16 text-foam-600 mx-auto mb-4" />
          <h3 class="text-xl font-medium text-foam-300 mb-2">No ingredients found</h3>
          <p class="text-foam-500">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    </section>

    <!-- Tips Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-midnight-900/50 backdrop-blur-sm border border-midnight-800 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-foam-50 mb-6">Ingredient Tips</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-amber-400">
                <Wheat class="w-5 h-5" />
                <span class="font-medium">Malts</span>
              </div>
              <p class="text-sm text-foam-400">
                Base malts (Pale, Pilsner) provide the foundation. Specialty malts add color,
                flavor, and complexity.
              </p>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-green-400">
                <Hop class="w-5 h-5" />
                <span class="font-medium">Hops</span>
              </div>
              <p class="text-sm text-foam-400">
                Early additions provide bitterness. Late additions and dry hopping contribute aroma
                and flavor.
              </p>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-purple-400">
                <TestTube class="w-5 h-5" />
                <span class="font-medium">Yeast</span>
              </div>
              <p class="text-sm text-foam-400">
                Yeast selection dramatically affects flavor. Temperature control is key to
                consistent results.
              </p>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-sky-400">
                <Package class="w-5 h-5" />
                <span class="font-medium">Adjuncts</span>
              </div>
              <p class="text-sm text-foam-400">
                Use adjuncts to add unique character. Start with small amounts and adjust to taste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
