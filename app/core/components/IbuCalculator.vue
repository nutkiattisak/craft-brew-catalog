<script setup lang="ts">
interface HopAddition {
  id: number
  weight: number | null
  alphaAcid: number | null
  boilTime: number | null
}

const batchSize = ref<number | null>(20)
const originalGravity = ref<number | null>(1.05)
const hopAdditions = ref<HopAddition[]>([{ id: 1, weight: null, alphaAcid: null, boilTime: null }])

let nextId = 2

const addHopAddition = () => {
  hopAdditions.value.push({
    id: nextId++,
    weight: null,
    alphaAcid: null,
    boilTime: null,
  })
}

const removeHopAddition = (id: number) => {
  if (hopAdditions.value.length > 1) {
    hopAdditions.value = hopAdditions.value.filter((h) => h.id !== id)
  }
}

// Tinseth formula for IBU calculation
const calculateUtilization = (boilTime: number, gravity: number) => {
  const bignessFactor = 1.65 * Math.pow(0.000125, gravity - 1)
  const boilTimeFactor = (1 - Math.exp(-0.04 * boilTime)) / 4.15
  return bignessFactor * boilTimeFactor
}

const calculateIbu = (hop: HopAddition) => {
  if (
    hop.weight === null ||
    hop.alphaAcid === null ||
    hop.boilTime === null ||
    batchSize.value === null ||
    originalGravity.value === null ||
    hop.weight <= 0 ||
    batchSize.value <= 0
  ) {
    return 0
  }

  const utilization = calculateUtilization(hop.boilTime, originalGravity.value)
  // IBU = (Weight in g × Alpha Acid % × Utilization × 1000) / (Batch Size in L × 10)
  return (hop.weight * (hop.alphaAcid / 100) * utilization * 1000) / (batchSize.value * 10)
}

const totalIbu = computed(() => {
  return hopAdditions.value.reduce((sum, hop) => sum + calculateIbu(hop), 0)
})

const formattedIbu = computed(() => {
  return totalIbu.value.toFixed(1)
})

const gaugePercentage = computed(() => {
  // Cap at 100 IBU for the gauge display
  return Math.min((totalIbu.value / 100) * 100, 100)
})

const bitternessLevel = computed(() => {
  if (totalIbu.value === 0) return 'default'
  if (totalIbu.value > 60) return 'very-bitter'
  if (totalIbu.value > 35) return 'bitter'
  if (totalIbu.value > 20) return 'moderate'
  return 'light'
})

const gaugeColor = computed(() => {
  switch (bitternessLevel.value) {
    case 'very-bitter':
      return 'bg-emerald-500'
    case 'bitter':
      return 'bg-green-500'
    case 'moderate':
      return 'bg-lime-500'
    case 'light':
      return 'bg-teal-400'
    default:
      return 'bg-green-500'
  }
})

const gaugeShadow = computed(() => {
  switch (bitternessLevel.value) {
    case 'very-bitter':
      return 'shadow-emerald-500/40'
    case 'bitter':
      return 'shadow-green-500/40'
    case 'moderate':
      return 'shadow-lime-500/40'
    case 'light':
      return 'shadow-teal-400/40'
    default:
      return 'shadow-green-500/40'
  }
})

const resultColor = computed(() => {
  switch (bitternessLevel.value) {
    case 'very-bitter':
      return 'text-emerald-400'
    case 'bitter':
      return 'text-green-400'
    case 'moderate':
      return 'text-lime-400'
    case 'light':
      return 'text-teal-400'
    default:
      return 'text-green-400'
  }
})

const bitternessLabel = computed(() => {
  if (totalIbu.value === 0) return 'Enter values'
  if (totalIbu.value > 60) return 'Very Bitter'
  if (totalIbu.value > 35) return 'Bitter'
  if (totalIbu.value > 20) return 'Moderate'
  return 'Light Bitterness'
})
</script>

<template>
  <div
    class="w-full max-w-md rounded-2xl border border-midnight-700 bg-midnight-800/80 p-6 shadow-xl backdrop-blur-sm"
  >
    <!-- Header -->
    <div class="mb-6 text-center">
      <h2 class="text-xl font-semibold text-foam-100">IBU Calculator</h2>
      <p class="mt-1 text-sm text-foam-400">Estimate bitterness using the Tinseth formula</p>
    </div>

    <!-- Batch Info -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label class="mb-2 block text-sm font-medium text-foam-300"> Batch Size (L) </label>
        <input
          v-model.number="batchSize"
          type="number"
          step="0.1"
          min="1"
          placeholder="20"
          class="h-12 w-full rounded-xl border border-midnight-700 bg-midnight-950 px-4 text-foam-100 placeholder-foam-400/50 transition-all duration-200 focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium text-foam-300"> Original Gravity </label>
        <input
          v-model.number="originalGravity"
          type="number"
          step="0.001"
          min="1.000"
          max="1.200"
          placeholder="1.050"
          class="h-12 w-full rounded-xl border border-midnight-700 bg-midnight-950 px-4 text-foam-100 placeholder-foam-400/50 transition-all duration-200 focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
      </div>
    </div>

    <!-- Hop Additions -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-foam-300">Hop Additions</label>
        <button
          class="text-xs text-green-400 hover:text-green-300 transition-colors"
          @click="addHopAddition"
        >
          + Add Hop
        </button>
      </div>

      <div
        v-for="(hop, index) in hopAdditions"
        :key="hop.id"
        class="relative p-3 bg-midnight-900/50 rounded-xl border border-midnight-700/50"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-foam-400">Hop #{{ index + 1 }}</span>
          <button
            v-if="hopAdditions.length > 1"
            class="text-xs text-red-400 hover:text-red-300 transition-colors"
            @click="removeHopAddition(hop.id)"
          >
            Remove
          </button>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="text-xs text-foam-400 mb-1 block">Weight (g)</label>
            <input
              v-model.number="hop.weight"
              type="number"
              step="1"
              min="0"
              placeholder="30"
              class="h-10 w-full rounded-lg border border-midnight-700 bg-midnight-950 px-3 text-sm text-foam-100 placeholder-foam-400/50 focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/20"
            />
          </div>
          <div>
            <label class="text-xs text-foam-400 mb-1 block">AA %</label>
            <input
              v-model.number="hop.alphaAcid"
              type="number"
              step="0.1"
              min="0"
              max="30"
              placeholder="5.5"
              class="h-10 w-full rounded-lg border border-midnight-700 bg-midnight-950 px-3 text-sm text-foam-100 placeholder-foam-400/50 focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/20"
            />
          </div>
          <div>
            <label class="text-xs text-foam-400 mb-1 block">Boil (min)</label>
            <input
              v-model.number="hop.boilTime"
              type="number"
              step="1"
              min="0"
              max="120"
              placeholder="60"
              class="h-10 w-full rounded-lg border border-midnight-700 bg-midnight-950 px-3 text-sm text-foam-100 placeholder-foam-400/50 focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/20"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Separator -->
    <div class="my-6 h-px bg-midnight-700" />

    <!-- Result Display -->
    <div class="text-center">
      <p class="mb-2 text-sm font-medium text-foam-400">Estimated IBU</p>
      <div
        class="text-5xl font-bold tracking-tight transition-colors duration-300"
        :class="resultColor"
      >
        {{ formattedIbu }}
      </div>
      <p class="mt-2 text-sm font-medium transition-colors duration-300" :class="resultColor">
        {{ bitternessLabel }}
      </p>
    </div>

    <!-- IBU Gauge -->
    <div class="mt-6">
      <div class="mb-2 flex justify-between text-xs text-foam-400">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>100</span>
      </div>
      <div class="relative h-4 overflow-hidden rounded-full bg-midnight-950">
        <!-- Threshold markers -->
        <div class="absolute top-0 h-full w-px bg-foam-400/30" :style="{ left: '20%' }" />
        <div class="absolute top-0 h-full w-px bg-foam-400/30" :style="{ left: '40%' }" />
        <div class="absolute top-0 h-full w-px bg-foam-400/30" :style="{ left: '60%' }" />

        <!-- Filled gauge -->
        <div
          class="h-full rounded-full shadow-lg transition-all duration-500 ease-out"
          :class="[gaugeColor, gaugeShadow]"
          :style="{ width: `${gaugePercentage}%` }"
        />
      </div>

      <!-- Legend -->
      <div class="mt-3 flex justify-center gap-3 text-xs flex-wrap">
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-teal-400" />
          <span class="text-foam-400">Light</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-lime-500" />
          <span class="text-foam-400">Moderate</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span class="text-foam-400">Bitter</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span class="text-foam-400">Very Bitter</span>
        </div>
      </div>
    </div>

    <!-- Formula Info -->
    <div class="mt-6 rounded-lg bg-midnight-900/50 p-3 text-center">
      <p class="text-xs text-foam-400">
        Using <span class="font-mono text-foam-300">Tinseth Formula</span> for utilization
      </p>
    </div>
  </div>
</template>
