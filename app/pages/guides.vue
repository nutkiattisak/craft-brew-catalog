<script setup lang="ts">
import { Search, BookOpen, Clock, User, Calendar } from 'lucide-vue-next'
import { guides } from '~/core/data/guides'
import type { GuideCategory } from '~/core/types/beer'

const { gsap, cleanup } = useGsap()

const searchQuery = ref('')
const selectedCategory = ref<'all' | GuideCategory>('all')

// Template refs for animations
const pageTitle = ref<HTMLElement | null>(null)
const pageSubtitle = ref<HTMLElement | null>(null)
const searchSection = ref<HTMLElement | null>(null)
const featuredSection = ref<HTMLElement | null>(null)
const guidesGrid = ref<HTMLElement | null>(null)

const categories = [
  { value: 'all', label: 'All Guides' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'ingredients', label: 'Ingredients' },
]

const featuredGuides = computed(() => guides.filter((g) => g.featured))

const filteredGuides = computed(() => {
  return guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      guide.tags.some((tag) => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesCategory =
      selectedCategory.value === 'all' || guide.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'beginner':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'intermediate':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'advanced':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'equipment':
      return 'bg-sky-500/20 text-sky-400 border-sky-500/30'
    case 'ingredients':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// GSAP animations
onMounted(() => {
  if (import.meta.client) {
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

    if (featuredSection.value) {
      tl.fromTo(
        featuredSection.value.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
        '-=0.2'
      )
    }

    // Scroll-triggered grid animation
    if (guidesGrid.value) {
      gsap.fromTo(
        guidesGrid.value.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: guidesGrid.value,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }
})

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
            Brewing <span class="text-gradient">Guides</span>
          </h1>
          <p ref="pageSubtitle" class="text-lg text-foam-300 max-w-2xl mx-auto opacity-0">
            Learn the art and science of brewing. From beginner basics to advanced techniques, our
            guides will help you craft better beer.
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
              placeholder="Search guides..."
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

    <!-- Featured Guides -->
    <section v-if="selectedCategory === 'all' && !searchQuery" class="pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-foam-50 mb-6">Featured Guides</h2>
        <div ref="featuredSection" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="guide in featuredGuides"
            :key="guide.id"
            class="group relative bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300"
          >
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="guide.image"
                :alt="guide.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent"
              />
              <div class="absolute top-4 left-4">
                <span
                  class="px-3 py-1 text-xs font-medium rounded-full border capitalize"
                  :class="getCategoryColor(guide.category)"
                >
                  {{ guide.category }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span
                  class="px-2 py-1 text-xs bg-amber-500 text-midnight-950 rounded-full font-medium"
                >
                  Featured
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3
                class="text-xl font-bold text-foam-50 mb-2 group-hover:text-amber-400 transition-colors line-clamp-2"
              >
                {{ guide.title }}
              </h3>
              <p class="text-sm text-foam-400 mb-4 line-clamp-2">
                {{ guide.description }}
              </p>
              <div class="flex items-center gap-4 text-xs text-foam-500">
                <span class="flex items-center gap-1">
                  <Clock class="w-3.5 h-3.5" />
                  {{ guide.readTime }}
                </span>
                <span class="flex items-center gap-1">
                  <User class="w-3.5 h-3.5" />
                  {{ guide.author }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Guides Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Count -->
        <div class="mb-6 text-foam-400">
          <span class="text-amber-400 font-medium">{{ filteredGuides.length }}</span> guides found
        </div>

        <!-- Grid -->
        <div ref="guidesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="guide in filteredGuides"
            :key="guide.id"
            class="group relative bg-midnight-900/50 backdrop-blur-sm border border-midnight-800 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
          >
            <!-- Image -->
            <div class="relative h-44 overflow-hidden">
              <img
                :src="guide.image"
                :alt="guide.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent"
              />
              <div class="absolute top-4 left-4">
                <span
                  class="px-3 py-1 text-xs font-medium rounded-full border capitalize"
                  :class="getCategoryColor(guide.category)"
                >
                  {{ guide.category }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5">
              <h3
                class="text-lg font-bold text-foam-50 mb-2 group-hover:text-amber-400 transition-colors line-clamp-2"
              >
                {{ guide.title }}
              </h3>
              <p class="text-sm text-foam-400 mb-4 line-clamp-2">
                {{ guide.description }}
              </p>

              <!-- Meta -->
              <div class="flex items-center justify-between text-xs text-foam-500 mb-3">
                <span class="flex items-center gap-1">
                  <Clock class="w-3.5 h-3.5" />
                  {{ guide.readTime }}
                </span>
                <span class="flex items-center gap-1">
                  <Calendar class="w-3.5 h-3.5" />
                  {{ formatDate(guide.publishedAt) }}
                </span>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in guide.tags.slice(0, 3)"
                  :key="tag"
                  class="px-2 py-0.5 text-xs bg-midnight-800 text-foam-300 rounded-md"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredGuides.length === 0" class="text-center py-20">
          <BookOpen class="w-16 h-16 text-foam-600 mx-auto mb-4" />
          <h3 class="text-xl font-medium text-foam-300 mb-2">No guides found</h3>
          <p class="text-foam-500">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    </section>
  </div>
</template>
