<script setup lang="ts">
import { Search, Beer, Flame, Droplets, Palette } from 'lucide-vue-next'
import { beerStyles } from '~/core/data/styles'

const { gsap, cleanup } = useGsap()

const searchQuery = ref('')
const selectedCategory = ref<'all' | 'ales' | 'lagers' | 'hybrid' | 'wild'>('all')

// Template refs for animations
const pageTitle = ref<HTMLElement | null>(null)
const pageSubtitle = ref<HTMLElement | null>(null)
const searchSection = ref<HTMLElement | null>(null)
const stylesGrid = ref<HTMLElement | null>(null)

const categories = [
  { value: 'all', label: 'All Styles' },
  { value: 'ales', label: 'Ales' },
  { value: 'lagers', label: 'Lagers' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'wild', label: 'Wild / Sour' },
]

const filteredStyles = computed(() => {
  return beerStyles.filter((style) => {
    const matchesSearch =
      style.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      style.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === 'all' || style.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ales':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'lagers':
      return 'bg-sky-500/20 text-sky-400 border-sky-500/30'
    case 'hybrid':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case 'wild':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }
}

// GSAP animations
onMounted(() => {
  if (import.meta.client) {
    // Hero section animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (pageTitle.value) {
      tl.fromTo(pageTitle.value, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
    }

    if (pageSubtitle.value) {
      tl.fromTo(
        pageSubtitle.value,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
    }

    if (searchSection.value) {
      tl.fromTo(
        searchSection.value,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
    }

    // Scroll-triggered grid animation
    if (stylesGrid.value) {
      gsap.fromTo(
        stylesGrid.value.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stylesGrid.value,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }
})

// Cleanup scroll triggers on unmount
onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <div class="min-h-screen bg-midnight-950">
    <!-- Hero Section -->
    <section class="relative pt-24 pb-16 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-midnight-900/50 to-midnight-950" />
        <div class="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h1 ref="pageTitle" class="text-4xl sm:text-5xl font-bold text-foam-50 mb-4 opacity-0">
            Beer <span class="text-gradient">Styles</span> Encyclopedia
          </h1>
          <p ref="pageSubtitle" class="text-lg text-foam-300 max-w-2xl mx-auto opacity-0">
            Explore the diverse world of beer styles. From crisp lagers to bold stouts, discover the
            characteristics that make each style unique.
          </p>
        </div>

        <!-- Search and Filter -->
        <div ref="searchSection" class="max-w-3xl mx-auto space-y-4 opacity-0">
          <!-- Search Bar -->
          <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foam-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search beer styles..."
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
              {{ cat.label }}
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Styles Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Count -->
        <div class="mb-6 text-foam-400">
          <span class="text-amber-400 font-medium">{{ filteredStyles.length }}</span> styles found
        </div>

        <!-- Grid -->
        <div ref="stylesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="style in filteredStyles"
            :key="style.id"
            class="group relative bg-midnight-900/50 backdrop-blur-sm border border-midnight-800 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
          >
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="style.image"
                :alt="style.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent"
              />

              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span
                  class="px-3 py-1 text-xs font-medium rounded-full border capitalize"
                  :class="getCategoryColor(style.category)"
                >
                  {{ style.category }}
                </span>
              </div>

              <!-- Origin -->
              <div class="absolute bottom-4 left-4">
                <span class="text-sm text-foam-300">{{ style.origin }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3
                class="text-xl font-bold text-foam-50 mb-2 group-hover:text-amber-400 transition-colors"
              >
                {{ style.name }}
              </h3>
              <p class="text-sm text-foam-400 mb-4 line-clamp-2">
                {{ style.description }}
              </p>

              <!-- Characteristics -->
              <div class="grid grid-cols-3 gap-3 mb-4">
                <div class="text-center p-2 bg-midnight-800/50 rounded-lg">
                  <div class="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    <Flame class="w-4 h-4" />
                  </div>
                  <div class="text-xs text-foam-400">ABV</div>
                  <div class="text-sm font-medium text-foam-200">
                    {{ style.characteristics.abvRange }}
                  </div>
                </div>
                <div class="text-center p-2 bg-midnight-800/50 rounded-lg">
                  <div class="flex items-center justify-center gap-1 text-green-400 mb-1">
                    <Droplets class="w-4 h-4" />
                  </div>
                  <div class="text-xs text-foam-400">IBU</div>
                  <div class="text-sm font-medium text-foam-200">
                    {{ style.characteristics.ibuRange }}
                  </div>
                </div>
                <div class="text-center p-2 bg-midnight-800/50 rounded-lg">
                  <div class="flex items-center justify-center gap-1 text-orange-400 mb-1">
                    <Palette class="w-4 h-4" />
                  </div>
                  <div class="text-xs text-foam-400">Body</div>
                  <div class="text-sm font-medium text-foam-200 capitalize">
                    {{ style.characteristics.body }}
                  </div>
                </div>
              </div>

              <!-- Flavor Tags -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="flavor in style.flavorProfile.slice(0, 4)"
                  :key="flavor"
                  class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-300 rounded-md"
                >
                  {{ flavor }}
                </span>
                <span
                  v-if="style.flavorProfile.length > 4"
                  class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-500 rounded-md"
                >
                  +{{ style.flavorProfile.length - 4 }}
                </span>
              </div>

              <!-- Popular Examples -->
              <div class="pt-4 border-t border-midnight-700">
                <div class="text-xs text-foam-500 mb-2">Popular Examples:</div>
                <div class="text-sm text-foam-300 line-clamp-1">
                  {{ style.popularExamples.join(', ') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredStyles.length === 0" class="text-center py-20">
          <Beer class="w-16 h-16 text-foam-600 mx-auto mb-4" />
          <h3 class="text-xl font-medium text-foam-300 mb-2">No styles found</h3>
          <p class="text-foam-500">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    </section>
  </div>
</template>
