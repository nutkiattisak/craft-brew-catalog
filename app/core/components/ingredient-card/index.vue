<script setup lang="ts">
import {
  MapPin,
  Percent,
  Thermometer,
  FlaskConical,
  Wheat,
  Hop,
  TestTube,
  Package,
} from 'lucide-vue-next'
import type { Ingredient } from '~/core/types/ingredient'

interface Props {
  ingredient: Ingredient
}

defineProps<Props>()

const getTypeColor = (type: string) => {
  switch (type) {
    case 'malt':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'hops':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'yeast':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case 'adjunct':
      return 'bg-sky-500/20 text-sky-400 border-sky-500/30'
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'malt':
      return Wheat
    case 'hops':
      return Hop
    case 'yeast':
      return TestTube
    case 'adjunct':
      return Package
    default:
      return FlaskConical
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'malt':
      return 'Malt'
    case 'hops':
      return 'Hops'
    case 'yeast':
      return 'Yeast'
    case 'adjunct':
      return 'Adjunct'
    default:
      return type
  }
}
</script>

<template>
  <div
    class="group relative bg-midnight-900/50 backdrop-blur-sm border border-midnight-800 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
  >
    <!-- Image -->
    <div class="relative h-40 overflow-hidden">
      <img
        :src="ingredient.image"
        :alt="ingredient.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent"
      />

      <!-- Type Badge -->
      <div class="absolute top-4 left-4">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border"
          :class="getTypeColor(ingredient.type)"
        >
          <component :is="getTypeIcon(ingredient.type)" class="w-3.5 h-3.5" />
          {{ getTypeLabel(ingredient.type) }}
        </span>
      </div>

      <!-- Origin/Brand -->
      <div class="absolute bottom-4 left-4">
        <span class="inline-flex items-center gap-1 text-sm text-foam-300">
          <MapPin class="w-3.5 h-3.5" />
          <template v-if="ingredient.type === 'malt' || ingredient.type === 'hops'">
            {{ ingredient.origin }}
          </template>
          <template v-else-if="ingredient.type === 'yeast'">
            {{ ingredient.brand }}
          </template>
          <template v-else>
            {{ ingredient.category }}
          </template>
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-foam-50 mb-2 group-hover:text-amber-400 transition-colors">
        {{ ingredient.name }}
        <span v-if="ingredient.type === 'yeast'" class="text-sm font-normal text-foam-400">
          ({{ ingredient.strain }})
        </span>
      </h3>

      <p class="text-sm text-foam-400 mb-4 line-clamp-2">
        {{ ingredient.description }}
      </p>

      <!-- Malt Stats -->
      <template v-if="ingredient.type === 'malt'">
        <div class="flex items-center gap-4 mb-4 text-sm">
          <div class="flex items-center gap-1.5 text-amber-400">
            <div
              class="w-4 h-4 rounded-full"
              :style="{
                backgroundColor: `hsl(${Math.max(0, 45 - ingredient.color * 0.1)}, 80%, ${Math.max(20, 50 - ingredient.color * 0.1)}%)`,
              }"
            />
            <span class="text-foam-300">{{ ingredient.color }}°L</span>
          </div>
          <div v-if="ingredient.maxPercentage" class="flex items-center gap-1.5 text-foam-400">
            <Percent class="w-4 h-4" />
            <span class="text-foam-300">Max {{ ingredient.maxPercentage }}%</span>
          </div>
        </div>
      </template>

      <!-- Hops Stats -->
      <template v-if="ingredient.type === 'hops'">
        <div class="flex items-center gap-4 mb-4 text-sm">
          <div class="flex items-center gap-1.5">
            <Percent class="w-4 h-4 text-green-400" />
            <span class="text-foam-300">α {{ ingredient.alphaAcid }}</span>
          </div>
          <span
            class="px-2 py-0.5 text-xs rounded-full capitalize"
            :class="{
              'bg-orange-500/20 text-orange-400': ingredient.usage === 'bittering',
              'bg-teal-500/20 text-teal-400': ingredient.usage === 'aroma',
              'bg-purple-500/20 text-purple-400': ingredient.usage === 'dual',
            }"
          >
            {{ ingredient.usage }}
          </span>
        </div>
      </template>

      <!-- Yeast Stats -->
      <template v-if="ingredient.type === 'yeast'">
        <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div class="flex items-center gap-1.5">
            <Percent class="w-4 h-4 text-purple-400" />
            <span class="text-foam-300">{{ ingredient.attenuation }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Thermometer class="w-4 h-4 text-sky-400" />
            <span class="text-foam-300 text-xs">{{ ingredient.temperature }}</span>
          </div>
        </div>
      </template>

      <!-- Tags/Flavors -->
      <div class="flex flex-wrap gap-1.5">
        <template v-if="ingredient.type === 'malt'">
          <span
            v-for="flavor in ingredient.flavor.slice(0, 3)"
            :key="flavor"
            class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-300 rounded-md"
          >
            {{ flavor }}
          </span>
        </template>
        <template v-else-if="ingredient.type === 'hops'">
          <span
            v-for="aroma in ingredient.aroma.slice(0, 3)"
            :key="aroma"
            class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-300 rounded-md"
          >
            {{ aroma }}
          </span>
          <span
            v-if="ingredient.aroma.length > 3"
            class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-500 rounded-md"
          >
            +{{ ingredient.aroma.length - 3 }}
          </span>
        </template>
        <template v-else-if="ingredient.type === 'yeast'">
          <span
            v-for="style in ingredient.styles.slice(0, 2)"
            :key="style"
            class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-300 rounded-md"
          >
            {{ style }}
          </span>
          <span
            v-if="ingredient.styles.length > 2"
            class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-500 rounded-md"
          >
            +{{ ingredient.styles.length - 2 }}
          </span>
        </template>
        <template v-else-if="ingredient.type === 'adjunct'">
          <span
            v-for="flavor in ingredient.flavor.slice(0, 3)"
            :key="flavor"
            class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-300 rounded-md"
          >
            {{ flavor }}
          </span>
        </template>
      </div>

      <!-- Usage (for adjuncts) -->
      <div v-if="ingredient.type === 'adjunct'" class="mt-4 pt-4 border-t border-midnight-700">
        <div class="text-xs text-foam-500 mb-1">Usage:</div>
        <div class="text-sm text-foam-300 line-clamp-2">{{ ingredient.usage }}</div>
      </div>

      <!-- Substitutes (for hops) -->
      <div
        v-if="ingredient.type === 'hops' && ingredient.substitutes.length > 0"
        class="mt-4 pt-4 border-t border-midnight-700"
      >
        <div class="text-xs text-foam-500 mb-1">Substitutes:</div>
        <div class="text-sm text-foam-300">{{ ingredient.substitutes.join(', ') }}</div>
      </div>
    </div>
  </div>
</template>
