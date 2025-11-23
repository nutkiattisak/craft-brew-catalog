<script setup lang="ts">
interface GrainAddition {
  id: number
  weight: number | null
  lovibond: number | null
}

const batchSize = ref<number | null>(20)
const grainAdditions = ref<GrainAddition[]>([{ id: 1, weight: null, lovibond: null }])

let nextId = 2

const addGrainAddition = () => {
  grainAdditions.value.push({
    id: nextId++,
    weight: null,
    lovibond: null,
  })
}

const removeGrainAddition = (id: number) => {
  if (grainAdditions.value.length > 1) {
    grainAdditions.value = grainAdditions.value.filter((g) => g.id !== id)
  }
}

// Morey equation for SRM calculation
const totalSrm = computed(() => {
  if (batchSize.value === null || batchSize.value <= 0) return 0

  // Calculate MCU (Malt Color Units) for each grain
  const totalMcu = grainAdditions.value.reduce((sum, grain) => {
    if (grain.weight === null || grain.lovibond === null || grain.weight <= 0) {
      return sum
    }
    // MCU = (Weight in kg × Lovibond × 2.205) / Volume in gallons
    // Convert L to gallons (1 L = 0.264172 gal)
    const volumeGallons = batchSize.value! * 0.264172
    const mcu = (grain.weight * grain.lovibond * 2.205) / volumeGallons
    return sum + mcu
  }, 0)

  // Morey equation: SRM = 1.4922 × MCU^0.6859
  if (totalMcu === 0) return 0
  return 1.4922 * Math.pow(totalMcu, 0.6859)
})

const formattedSrm = computed(() => {
  return totalSrm.value.toFixed(1)
})

// Convert SRM to RGB color for visual display
const srmToColor = computed(() => {
  const srm = totalSrm.value

  if (srm === 0) return '#f5f5dc' // Beige for no color

  // SRM to RGB approximation
  let r, g, b

  if (srm <= 10) {
    r = 255
    g = 255 - srm * 10
    b = Math.max(0, 200 - srm * 20)
  } else if (srm <= 20) {
    r = 255 - (srm - 10) * 5
    g = 155 - (srm - 10) * 10
    b = Math.max(0, 50 - (srm - 10) * 5)
  } else if (srm <= 30) {
    r = 205 - (srm - 20) * 10
    g = Math.max(0, 55 - (srm - 20) * 5)
    b = 0
  } else {
    r = Math.max(20, 105 - (srm - 30) * 3)
    g = Math.max(0, 5 - (srm - 30))
    b = 0
  }

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
})

const colorLevel = computed(() => {
  if (totalSrm.value === 0) return 'default'
  if (totalSrm.value > 35) return 'black'
  if (totalSrm.value > 18) return 'brown'
  if (totalSrm.value > 10) return 'amber'
  if (totalSrm.value > 6) return 'gold'
  return 'pale'
})

const colorLabel = computed(() => {
  if (totalSrm.value === 0) return 'Enter values'
  if (totalSrm.value > 35) return 'Black / Stout'
  if (totalSrm.value > 18) return 'Brown'
  if (totalSrm.value > 10) return 'Amber / Copper'
  if (totalSrm.value > 6) return 'Gold'
  return 'Pale / Straw'
})

const commonGrains = [
  { name: 'Pilsner Malt', lovibond: 1.6 },
  { name: 'Pale Malt', lovibond: 2.5 },
  { name: 'Munich Malt', lovibond: 9 },
  { name: 'Vienna Malt', lovibond: 4 },
  { name: 'Crystal 40', lovibond: 40 },
  { name: 'Crystal 60', lovibond: 60 },
  { name: 'Crystal 120', lovibond: 120 },
  { name: 'Chocolate Malt', lovibond: 350 },
  { name: 'Black Patent', lovibond: 500 },
  { name: 'Roasted Barley', lovibond: 300 },
]
</script>

<template>
  <div
    class="w-full max-w-md rounded-2xl border border-midnight-700 bg-midnight-800/80 p-6 shadow-xl backdrop-blur-sm"
  >
    <!-- Header -->
    <div class="mb-6 text-center">
      <h2 class="text-xl font-semibold text-foam-100">SRM Calculator</h2>
      <p class="mt-1 text-sm text-foam-400">Calculate beer color from your grain bill</p>
    </div>

    <!-- Batch Size -->
    <div class="mb-4">
      <label class="mb-2 block text-sm font-medium text-foam-300"> Batch Size (L) </label>
      <input
        v-model.number="batchSize"
        type="number"
        step="0.1"
        min="1"
        placeholder="20"
        class="h-12 w-full rounded-xl border border-midnight-700 bg-midnight-950 px-4 text-foam-100 placeholder-foam-400/50 transition-all duration-200 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
      />
    </div>

    <!-- Grain Additions -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-foam-300">Grain Bill</label>
        <button
          class="text-xs text-orange-400 hover:text-orange-300 transition-colors"
          @click="addGrainAddition"
        >
          + Add Grain
        </button>
      </div>

      <div
        v-for="(grain, index) in grainAdditions"
        :key="grain.id"
        class="relative p-3 bg-midnight-900/50 rounded-xl border border-midnight-700/50"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-foam-400">Grain #{{ index + 1 }}</span>
          <button
            v-if="grainAdditions.length > 1"
            class="text-xs text-red-400 hover:text-red-300 transition-colors"
            @click="removeGrainAddition(grain.id)"
          >
            Remove
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-foam-400 mb-1 block">Weight (kg)</label>
            <input
              v-model.number="grain.weight"
              type="number"
              step="0.1"
              min="0"
              placeholder="4.5"
              class="h-10 w-full rounded-lg border border-midnight-700 bg-midnight-950 px-3 text-sm text-foam-100 placeholder-foam-400/50 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
            />
          </div>
          <div>
            <label class="text-xs text-foam-400 mb-1 block">Lovibond (°L)</label>
            <input
              v-model.number="grain.lovibond"
              type="number"
              step="0.1"
              min="0"
              placeholder="2.5"
              class="h-10 w-full rounded-lg border border-midnight-700 bg-midnight-950 px-3 text-sm text-foam-100 placeholder-foam-400/50 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Separator -->
    <div class="my-6 h-px bg-midnight-700" />

    <!-- Result Display -->
    <div class="text-center">
      <p class="mb-2 text-sm font-medium text-foam-400">Estimated SRM</p>
      <div class="text-5xl font-bold tracking-tight text-orange-400">
        {{ formattedSrm }}
      </div>
      <p class="mt-2 text-sm font-medium text-orange-400">
        {{ colorLabel }}
      </p>
    </div>

    <!-- Color Preview -->
    <div class="mt-6">
      <div class="text-center mb-2 text-xs text-foam-400">Color Preview</div>
      <div
        class="h-16 rounded-xl border border-midnight-600 transition-all duration-500"
        :style="{ backgroundColor: srmToColor }"
      />

      <!-- Color Scale -->
      <div class="mt-4 flex justify-between text-xs text-foam-400">
        <span>2</span>
        <span>10</span>
        <span>20</span>
        <span>30</span>
        <span>40+</span>
      </div>
      <div class="h-3 rounded-full overflow-hidden flex">
        <div class="flex-1 bg-gradient-to-r from-yellow-100 to-yellow-300" />
        <div class="flex-1 bg-gradient-to-r from-yellow-300 to-amber-400" />
        <div class="flex-1 bg-gradient-to-r from-amber-400 to-amber-700" />
        <div class="flex-1 bg-gradient-to-r from-amber-700 to-amber-900" />
        <div class="flex-1 bg-gradient-to-r from-amber-900 to-stone-900" />
      </div>
    </div>

    <!-- Common Grains Reference -->
    <div class="mt-6">
      <div class="text-xs text-foam-400 mb-2">Common Grain Lovibond Values:</div>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="grain in commonGrains.slice(0, 6)"
          :key="grain.name"
          class="px-2 py-1 text-xs bg-midnight-900 text-foam-300 rounded-md"
        >
          {{ grain.name }}: {{ grain.lovibond }}°L
        </span>
      </div>
    </div>

    <!-- Formula Info -->
    <div class="mt-4 rounded-lg bg-midnight-900/50 p-3 text-center">
      <p class="text-xs text-foam-400">
        Using <span class="font-mono text-foam-300">Morey Equation</span> for SRM
      </p>
    </div>
  </div>
</template>
