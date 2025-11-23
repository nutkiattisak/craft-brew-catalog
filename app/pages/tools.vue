<script setup lang="ts">
import { Calculator, Droplets, Palette, Percent } from 'lucide-vue-next'

const activeTool = ref<'abv' | 'ibu' | 'srm'>('abv')

const tools = [
  {
    id: 'abv',
    name: 'ABV Calculator',
    description: 'Calculate alcohol by volume from gravity readings',
    icon: Percent,
    color: 'amber',
  },
  {
    id: 'ibu',
    name: 'IBU Calculator',
    description: 'Estimate bitterness units from hop additions',
    icon: Droplets,
    color: 'green',
  },
  {
    id: 'srm',
    name: 'SRM Calculator',
    description: 'Calculate beer color from grain bill',
    icon: Palette,
    color: 'orange',
  },
] as const

const getToolColor = (toolId: string, isActive: boolean) => {
  if (!isActive) return 'bg-midnight-800/50 border-midnight-700 hover:border-midnight-600'

  switch (toolId) {
    case 'abv':
      return 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
    case 'ibu':
      return 'bg-green-500/10 border-green-500/50 shadow-lg shadow-green-500/10'
    case 'srm':
      return 'bg-orange-500/10 border-orange-500/50 shadow-lg shadow-orange-500/10'
    default:
      return 'bg-midnight-800/50 border-midnight-700'
  }
}

const getIconColor = (toolId: string) => {
  switch (toolId) {
    case 'abv':
      return 'text-amber-400'
    case 'ibu':
      return 'text-green-400'
    case 'srm':
      return 'text-orange-400'
    default:
      return 'text-foam-400'
  }
}
</script>

<template>
  <div class="min-h-screen bg-midnight-950">
    <!-- Hero Section -->
    <section class="relative pt-24 pb-12 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-midnight-900/50 to-midnight-950" />
        <div class="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6"
          >
            <Calculator class="w-8 h-8 text-amber-400" />
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-foam-50 mb-4">
            Brewing <span class="text-gradient">Tools</span>
          </h1>
          <p class="text-lg text-foam-300 max-w-2xl mx-auto">
            Essential calculators and tools to help you craft the perfect brew. From ABV to IBU,
            we've got you covered.
          </p>
        </div>

        <!-- Tool Selector -->
        <div class="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          <button
            v-for="tool in tools"
            :key="tool.id"
            class="flex items-center gap-3 px-5 py-4 rounded-xl border transition-all duration-300 cursor-pointer"
            :class="getToolColor(tool.id, activeTool === tool.id)"
            @click="activeTool = tool.id"
          >
            <component :is="tool.icon" class="w-5 h-5" :class="getIconColor(tool.id)" />
            <div class="text-left">
              <div class="font-medium text-foam-100">{{ tool.name }}</div>
              <div class="text-xs text-foam-400 hidden sm:block">{{ tool.description }}</div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center">
          <!-- ABV Calculator -->
          <div v-show="activeTool === 'abv'">
            <AbvCalculator />
          </div>

          <!-- IBU Calculator -->
          <div v-show="activeTool === 'ibu'">
            <IbuCalculator />
          </div>

          <!-- SRM Calculator -->
          <div v-show="activeTool === 'srm'">
            <SrmCalculator />
          </div>
        </div>
      </div>
    </section>

    <!-- Tips Section -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-midnight-900/50 backdrop-blur-sm border border-midnight-800 rounded-2xl p-6">
          <h3 class="text-lg font-semibold text-foam-100 mb-4">Quick Tips</h3>
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Percent class="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div class="text-sm font-medium text-foam-200">ABV</div>
                <div class="text-xs text-foam-400">
                  Session beers: 3-5%, Standard: 5-7%, Strong: 7%+
                </div>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Droplets class="w-4 h-4 text-green-400" />
              </div>
              <div>
                <div class="text-sm font-medium text-foam-200">IBU</div>
                <div class="text-xs text-foam-400">
                  Light lagers: 5-15, Pale ales: 30-50, IPAs: 40-70+
                </div>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Palette class="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div class="text-sm font-medium text-foam-200">SRM</div>
                <div class="text-xs text-foam-400">
                  Pale: 2-6, Amber: 10-18, Brown: 18-35, Black: 35+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
