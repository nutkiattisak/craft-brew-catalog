<script setup lang="ts">
import { Beer, Search, Bookmark, Menu, BookOpen, FlaskConical, Calculator } from 'lucide-vue-next'

const { savedRecipes } = useBeerStore()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: 'Styles', href: '/styles', icon: BookOpen },
  { name: 'Ingredients', href: '/ingredients', icon: FlaskConical },
  { name: 'Tools', href: '/tools', icon: Calculator },
  { name: 'Guides', href: '/guides', icon: BookOpen },
]

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'glass-dark shadow-lg' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="relative">
            <div
              class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20"
            >
              <Beer class="w-5 h-5 lg:w-6 lg:h-6 text-midnight-950" />
            </div>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-lg lg:text-xl font-bold text-foam-50">
              Craft<span class="text-gradient">Brew</span>
            </h1>
            <p class="text-xs text-foam-400 -mt-1">Premium Catalog</p>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.href"
            class="text-foam-300 hover:text-amber-400 transition-colors font-medium"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2 lg:gap-4">
          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Search -->
          <UiButton variant="ghost" size="icon" class="relative">
            <Search
              class="w-5 h-5 lg:w-6 lg:h-6 text-foam-300 hover:text-amber-400 transition-colors"
            />
          </UiButton>

          <!-- Saved Recipes (Bookmark) -->
          <UiButton variant="ghost" size="icon" class="relative">
            <Bookmark
              class="w-5 h-5 lg:w-6 lg:h-6 text-foam-300 hover:text-amber-400 transition-colors"
            />
            <span
              v-if="savedRecipes.length > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-midnight-950 text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ savedRecipes.length }}
            </span>
          </UiButton>

          <!-- Mobile Menu Button -->
          <UiSheet v-model:open="isMobileMenuOpen">
            <UiSheetTrigger as-child>
              <UiButton variant="ghost" size="icon" class="lg:hidden">
                <Menu class="w-6 h-6 text-foam-300" />
              </UiButton>
            </UiSheetTrigger>
            <UiSheetContent side="right" class="w-80">
              <UiSheetHeader>
                <UiSheetTitle>
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center"
                    >
                      <Beer class="w-5 h-5 text-midnight-950" />
                    </div>
                    <div>
                      <span class="text-lg font-bold text-foam-50">CraftBrew</span>
                    </div>
                  </div>
                </UiSheetTitle>
              </UiSheetHeader>

              <UiSeparator class="my-4" />

              <nav class="space-y-2">
                <NuxtLink
                  v-for="link in navLinks"
                  :key="link.name"
                  :to="link.href"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl text-foam-200 hover:bg-midnight-800 hover:text-amber-400 transition-colors"
                  @click="isMobileMenuOpen = false"
                >
                  <component :is="link.icon" class="w-5 h-5" />
                  {{ link.name }}
                </NuxtLink>
              </nav>

              <UiSeparator class="my-4" />

              <NuxtLink
                to="/saved"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-foam-200 hover:bg-midnight-800 hover:text-amber-400 transition-colors"
                @click="isMobileMenuOpen = false"
              >
                <Bookmark class="w-5 h-5" />
                Saved Recipes
              </NuxtLink>
            </UiSheetContent>
          </UiSheet>
        </div>
      </div>
    </div>
  </header>
</template>
