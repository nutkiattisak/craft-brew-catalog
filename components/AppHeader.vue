<script setup lang="ts">
import { Beer, Search, User, ShoppingCart, Heart, Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'

const { cart, wishlist } = useBeerStore()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
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
            <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
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
          <a href="#" class="text-foam-300 hover:text-amber-400 transition-colors font-medium">Discover</a>
          <a href="#" class="text-foam-300 hover:text-amber-400 transition-colors font-medium">Breweries</a>
          <a href="#" class="text-foam-300 hover:text-amber-400 transition-colors font-medium">Events</a>
          <a href="#" class="text-foam-300 hover:text-amber-400 transition-colors font-medium">About</a>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2 lg:gap-4">
          <!-- Wishlist -->
          <button class="relative p-2 lg:p-3 rounded-xl hover:bg-midnight-800/50 transition-colors group">
            <Heart class="w-5 h-5 lg:w-6 lg:h-6 text-foam-300 group-hover:text-amber-400 transition-colors" />
            <span
              v-if="wishlist.length > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-midnight-950 text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ wishlist.length }}
            </span>
          </button>

          <!-- Cart -->
          <button class="relative p-2 lg:p-3 rounded-xl hover:bg-midnight-800/50 transition-colors group">
            <ShoppingCart class="w-5 h-5 lg:w-6 lg:h-6 text-foam-300 group-hover:text-amber-400 transition-colors" />
            <span
              v-if="cart.length > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-midnight-950 text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ cart.length }}
            </span>
          </button>

          <!-- User Profile / My Cellar -->
          <button class="hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-midnight-800/50 hover:bg-midnight-700/50 border border-midnight-700 transition-all group">
            <User class="w-5 h-5 text-foam-300 group-hover:text-amber-400 transition-colors" />
            <span class="text-sm font-medium text-foam-200">My Cellar</span>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-xl hover:bg-midnight-800/50 transition-colors"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-foam-300" />
            <X v-else class="w-6 h-6 text-foam-300" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden glass-dark border-t border-midnight-700">
        <nav class="px-4 py-4 space-y-2">
          <a href="#" class="block px-4 py-3 rounded-xl text-foam-200 hover:bg-midnight-800 hover:text-amber-400 transition-colors">Discover</a>
          <a href="#" class="block px-4 py-3 rounded-xl text-foam-200 hover:bg-midnight-800 hover:text-amber-400 transition-colors">Breweries</a>
          <a href="#" class="block px-4 py-3 rounded-xl text-foam-200 hover:bg-midnight-800 hover:text-amber-400 transition-colors">Events</a>
          <a href="#" class="block px-4 py-3 rounded-xl text-foam-200 hover:bg-midnight-800 hover:text-amber-400 transition-colors">About</a>
          <div class="pt-2 border-t border-midnight-700">
            <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-foam-200 hover:bg-midnight-800 hover:text-amber-400 transition-colors">
              <User class="w-5 h-5" />
              My Cellar
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
