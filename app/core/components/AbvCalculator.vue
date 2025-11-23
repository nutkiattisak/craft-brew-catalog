<script setup lang="ts">
import { ref, computed } from 'vue'

const originalGravity = ref<number | null>(null)
const finalGravity = ref<number | null>(null)

const abv = computed(() => {
  if (originalGravity.value === null || finalGravity.value === null) {
    return null
  }
  if (originalGravity.value <= 0 || finalGravity.value <= 0) {
    return null
  }
  if (finalGravity.value >= originalGravity.value) {
    return null
  }
  return (originalGravity.value - finalGravity.value) * 131.25
})

const formattedAbv = computed(() => {
  if (abv.value === null) return '0.0'
  return abv.value.toFixed(1)
})

const gaugePercentage = computed(() => {
  if (abv.value === null) return 0
  // Cap at 15% ABV for the gauge display (100% fill)
  return Math.min((abv.value / 15) * 100, 100)
})

const strengthLevel = computed(() => {
  if (abv.value === null) return 'default'
  if (abv.value > 8) return 'strong'
  if (abv.value > 5) return 'medium'
  return 'default'
})

const gaugeColor = computed(() => {
  switch (strengthLevel.value) {
    case 'strong':
      return 'bg-red-500'
    case 'medium':
      return 'bg-orange-500'
    default:
      return 'bg-amber-500'
  }
})

const gaugeShadow = computed(() => {
  switch (strengthLevel.value) {
    case 'strong':
      return 'shadow-red-500/40'
    case 'medium':
      return 'shadow-orange-500/40'
    default:
      return 'shadow-amber-500/40'
  }
})

const resultColor = computed(() => {
  switch (strengthLevel.value) {
    case 'strong':
      return 'text-red-400'
    case 'medium':
      return 'text-orange-400'
    default:
      return 'text-amber-400'
  }
})

const strengthLabel = computed(() => {
  if (abv.value === null || abv.value === 0) return 'Enter values'
  if (abv.value > 8) return 'Strong Beer'
  if (abv.value > 5) return 'Medium Strength'
  return 'Session Beer'
})
</script>

<template>
  <div
    class="w-full max-w-md rounded-2xl border border-midnight-700 bg-midnight-800/80 p-6 shadow-xl backdrop-blur-sm"
  >
    <!-- Header -->
    <div class="mb-6 text-center">
      <h2 class="text-xl font-semibold text-foam-100">ABV Calculator</h2>
      <p class="mt-1 text-sm text-foam-400">Calculate your brew's alcohol content</p>
    </div>

    <!-- Input Fields -->
    <div class="space-y-4">
      <!-- Original Gravity Input -->
      <div>
        <label for="og-input" class="mb-2 block text-sm font-medium text-foam-300">
          Original Gravity (OG)
        </label>
        <input
          id="og-input"
          v-model.number="originalGravity"
          type="number"
          step="0.001"
          min="1.000"
          max="1.200"
          placeholder="e.g., 1.050"
          class="h-14 w-full rounded-xl border border-midnight-700 bg-midnight-950 px-4 text-lg text-foam-100 placeholder-foam-400/50 transition-all duration-200 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
      </div>

      <!-- Final Gravity Input -->
      <div>
        <label for="fg-input" class="mb-2 block text-sm font-medium text-foam-300">
          Final Gravity (FG)
        </label>
        <input
          id="fg-input"
          v-model.number="finalGravity"
          type="number"
          step="0.001"
          min="0.990"
          max="1.100"
          placeholder="e.g., 1.010"
          class="h-14 w-full rounded-xl border border-midnight-700 bg-midnight-950 px-4 text-lg text-foam-100 placeholder-foam-400/50 transition-all duration-200 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
      </div>
    </div>

    <!-- Separator -->
    <div class="my-6 h-px bg-midnight-700" />

    <!-- Result Display -->
    <div class="text-center">
      <p class="mb-2 text-sm font-medium text-foam-400">Estimated ABV</p>
      <div
        class="text-5xl font-bold tracking-tight transition-colors duration-300"
        :class="resultColor"
      >
        {{ formattedAbv }}<span class="ml-1 text-2xl">%</span>
      </div>
      <p class="mt-2 text-sm font-medium transition-colors duration-300" :class="resultColor">
        {{ strengthLabel }}
      </p>
    </div>

    <!-- ABV Gauge -->
    <div class="mt-6">
      <div class="mb-2 flex justify-between text-xs text-foam-400">
        <span>0%</span>
        <span>5%</span>
        <span>8%</span>
        <span>15%</span>
      </div>
      <div class="relative h-4 overflow-hidden rounded-full bg-midnight-950">
        <!-- Threshold markers -->
        <div
          class="absolute top-0 h-full w-px bg-foam-400/30"
          :style="{ left: `${(5 / 15) * 100}%` }"
        />
        <div
          class="absolute top-0 h-full w-px bg-foam-400/30"
          :style="{ left: `${(8 / 15) * 100}%` }"
        />

        <!-- Filled gauge -->
        <div
          class="h-full rounded-full shadow-lg transition-all duration-500 ease-out"
          :class="[gaugeColor, gaugeShadow]"
          :style="{ width: `${gaugePercentage}%` }"
        />
      </div>

      <!-- Legend -->
      <div class="mt-3 flex justify-center gap-4 text-xs">
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span class="text-foam-400">Session</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-orange-500" />
          <span class="text-foam-400">Medium</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span class="text-foam-400">Strong</span>
        </div>
      </div>
    </div>

    <!-- Formula Info -->
    <div class="mt-6 rounded-lg bg-midnight-900/50 p-3 text-center">
      <p class="text-xs text-foam-400">
        Formula: <span class="font-mono text-foam-300">(OG - FG) × 131.25</span>
      </p>
    </div>
  </div>
</template>
