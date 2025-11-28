<script setup lang="ts">
import { Search } from 'lucide-vue-next'

const { setSearchQuery, searchQuery } = useBeerStore()
const localSearch = ref(searchQuery.value)

function handleSearch() {
  setSearchQuery(localSearch.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSearch()
  }
}

function handleTagClick(tag: string) {
  localSearch.value = tag
  handleSearch()
}
</script>

<template>
  <section
    class="relative min-h-[70vh] lg:min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950"
  >
    <!-- Optimized Background - Pure CSS for instant LCP -->
    <div class="absolute inset-0 z-0">
      <!-- Gradient overlay for visual depth -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-midnight-950/90 via-midnight-900/80 to-midnight-950"
      />
      <!-- Animated gradient mesh for visual interest -->
      <div
        class="absolute inset-0 bg-gradient-to-tr from-amber-900/5 via-transparent to-amber-800/5"
      />
    </div>

    <!-- Decorative Elements - Pure CSS for performance -->
    <div
      class="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl opacity-50 animate-pulse"
      style="animation-duration: 4s"
    />
    <div
      class="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-2xl opacity-50 animate-pulse"
      style="animation-duration: 5s; animation-delay: 1s"
    />
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl opacity-30"
    />

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
      <!-- Heading - Using CSS animation for instant display -->
      <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold text-foam-50 mb-6 animate-fade-in">
        Explore the World of
        <span class="block text-gradient mt-2">Craft Beer</span>
      </h1>

      <!-- Subheading -->
      <p
        class="text-lg lg:text-xl text-foam-300 max-w-2xl mx-auto mb-8 animate-fade-in"
        style="animation-delay: 0.1s"
      >
        Your complete guide to beer styles, brewing ingredients, and essential tools. Master the art
        of craft brewing.
      </p>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-in"
        style="animation-delay: 0.15s"
      >
        <NuxtLink to="/styles">
          <UiButton
            class="bg-amber-500 text-slate-900 font-bold hover:bg-amber-400 px-8 py-3 text-lg"
          >
            Explore Styles
          </UiButton>
        </NuxtLink>
        <NuxtLink to="/tools">
          <UiButton
            variant="outline"
            class="border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 px-8 py-3 text-lg"
          >
            ABV Calculator
          </UiButton>
        </NuxtLink>
      </div>

      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.2s">
        <div class="relative group">
          <div
            class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
          />
          <div class="relative flex items-center">
            <div
              class="absolute left-5 text-foam-400 group-focus-within:text-amber-400 transition-colors"
            >
              <Search class="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <input
              v-model="localSearch"
              type="text"
              placeholder="Search beers, breweries, or styles..."
              class="w-full pl-14 pr-32 py-4 lg:py-5 bg-midnight-800/90 border border-midnight-700/50 rounded-2xl text-foam-100 placeholder-foam-400/50 text-lg focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
              @keydown="handleKeydown"
            />
            <UiButton class="absolute right-3" @click="handleSearch"> Search </UiButton>
          </div>
        </div>

        <!-- Quick Search Tags -->
        <div class="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span class="text-sm text-foam-400">Popular:</span>
          <UiButton
            v-for="tag in ['IPA', 'Stout', 'Lager', 'Sour', 'Belgian']"
            :key="tag"
            variant="outline"
            size="sm"
            class="hover:border-amber-500/30 hover:text-amber-400"
            @click="handleTagClick(tag)"
          >
            {{ tag }}
          </UiButton>
        </div>
      </div>

      <!-- Stats -->
      <div
        class="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-fade-in"
        style="animation-delay: 0.25s"
      >
        <div class="text-center">
          <div class="text-2xl lg:text-3xl font-bold text-gradient">100+</div>
          <div class="text-sm text-foam-400 mt-1">Beer Styles</div>
        </div>
        <div class="text-center border-x border-midnight-700">
          <div class="text-2xl lg:text-3xl font-bold text-gradient">200+</div>
          <div class="text-sm text-foam-400 mt-1">Ingredients</div>
        </div>
        <div class="text-center">
          <div class="text-2xl lg:text-3xl font-bold text-gradient">10+</div>
          <div class="text-sm text-foam-400 mt-1">Brewing Tools</div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div
        class="w-6 h-10 rounded-full border-2 border-foam-400/30 flex items-start justify-center p-2"
      >
        <div class="w-1 h-2 bg-amber-400 rounded-full animate-pulse" />
      </div>
    </div>
  </section>
</template>
