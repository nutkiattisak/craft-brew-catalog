<script setup lang="ts">
import { Hop, Wheat, Cherry, Moon, Apple, Flame, Filter, ChevronDown, Check } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu'
import type { FilterTag, SortOption } from '~/types/beer'

const { activeFilter, setActiveFilter, sortOption, setSortOption } = useBeerStore()

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
            <Button
              v-for="filter in filters"
              :key="filter.id"
              @click="handleFilterClick(filter.id)"
              :variant="activeFilter === filter.id ? 'default' : 'outline'"
              size="sm"
              class="flex-shrink-0 rounded-full"
              :class="activeFilter === filter.id
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 hover:bg-amber-500/30'
                : 'hover:border-midnight-600'"
            >
              <component :is="filter.icon" class="w-4 h-4" />
              <span>{{ filter.label }}</span>
            </Button>
          </div>
        </div>

        <!-- Sort Dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm" class="flex-shrink-0">
              <span class="hidden sm:inline">{{ getCurrentSortLabel() }}</span>
              <span class="sm:hidden">Sort</span>
              <ChevronDown class="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuItem
              v-for="option in sortOptions"
              :key="option.id"
              @click="handleSortChange(option.id)"
              class="flex items-center justify-between"
              :class="sortOption === option.id ? 'text-amber-400 bg-amber-500/10' : ''"
            >
              {{ option.label }}
              <Check v-if="sortOption === option.id" class="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </section>
</template>
