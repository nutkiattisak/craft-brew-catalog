<script setup lang="ts">
import { Hop, Wheat, Cherry, Moon, Apple, Flame, Filter, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import type { FilterTag, SortOption } from '~/types/beer'

const { activeFilter, setActiveFilter, sortOption, setSortOption } = useBeerStore()

const showSortDropdown = ref(false)

interface FilterOption {
  id: FilterTag
  label: string
  icon: any
}

const filters: FilterOption[] = [
  { id: 'all', label: 'All Beers', icon: Filter },
  { id: 'hoppy', label: 'Hoppy', icon: Hop },
  { id: 'malty', label: 'Malty', icon: Wheat },
  { id: 'sour', label: 'Sour', icon: Cherry },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'fruit', label: 'Fruit', icon: Apple },
  { id: 'high-abv', label: 'High ABV', icon: Flame },
]

const sortOptions: { id: SortOption; label: string }[] = [
  { id: 'newest', label: 'Newest' },
  { id: 'top-rated', label: 'Top Rated' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'abv', label: 'ABV: High to Low' },
]

function handleFilterClick(filter: FilterTag) {
  setActiveFilter(filter)
}

function handleSortChange(option: SortOption) {
  setSortOption(option)
  showSortDropdown.value = false
}

function getCurrentSortLabel() {
  return sortOptions.find(o => o.id === sortOption.value)?.label || 'Sort'
}
</script>

<template>
  <section class="sticky top-16 lg:top-20 z-40 glass-dark border-y border-midnight-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between gap-4">
        <!-- Filter Pills (Horizontal Scrollable) -->
        <div class="flex-1 overflow-hidden">
          <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1">
            <button
              v-for="filter in filters"
              :key="filter.id"
              @click="handleFilterClick(filter.id)"
              class="filter-pill flex items-center gap-2 flex-shrink-0"
              :class="{ 'filter-pill-active': activeFilter === filter.id }"
            >
              <component :is="filter.icon" class="w-4 h-4" />
              <span>{{ filter.label }}</span>
            </button>
          </div>
        </div>

        <!-- Sort Dropdown -->
        <div class="relative flex-shrink-0">
          <button
            @click="showSortDropdown = !showSortDropdown"
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-midnight-800 border border-midnight-700 hover:border-midnight-600 transition-colors"
          >
            <span class="text-sm font-medium text-foam-200 hidden sm:inline">{{ getCurrentSortLabel() }}</span>
            <span class="text-sm font-medium text-foam-200 sm:hidden">Sort</span>
            <ChevronDown
              class="w-4 h-4 text-foam-400 transition-transform"
              :class="{ 'rotate-180': showSortDropdown }"
            />
          </button>

          <!-- Dropdown Menu -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95 -translate-y-2"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-2"
          >
            <div
              v-if="showSortDropdown"
              class="absolute right-0 mt-2 w-48 py-2 rounded-xl glass border border-midnight-700 shadow-xl"
            >
              <button
                v-for="option in sortOptions"
                :key="option.id"
                @click="handleSortChange(option.id)"
                class="w-full px-4 py-2.5 text-left text-sm transition-colors"
                :class="sortOption === option.id ? 'text-amber-400 bg-amber-500/10' : 'text-foam-200 hover:bg-midnight-700/50'"
              >
                {{ option.label }}
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
