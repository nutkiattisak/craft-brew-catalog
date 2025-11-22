<script setup lang="ts">
import { Beer, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-midnight-900 border-t border-midnight-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer -->
      <div class="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center"
            >
              <Beer class="w-5 h-5 text-midnight-950" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-foam-50">CraftBrew</h3>
              <p class="text-xs text-foam-400">Premium Catalog</p>
            </div>
          </div>
          <p class="text-sm text-foam-400 mb-6">
            Discover the finest craft beers from around the world. Curated selections for the
            discerning beer enthusiast.
          </p>
          <div class="flex items-center gap-2">
            <UiButton variant="ghost" size="icon" class="hover:text-amber-400">
              <Facebook class="w-5 h-5" />
            </UiButton>
            <UiButton variant="ghost" size="icon" class="hover:text-amber-400">
              <Twitter class="w-5 h-5" />
            </UiButton>
            <UiButton variant="ghost" size="icon" class="hover:text-amber-400">
              <Instagram class="w-5 h-5" />
            </UiButton>
            <UiButton variant="ghost" size="icon" class="hover:text-amber-400">
              <Youtube class="w-5 h-5" />
            </UiButton>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-sm font-semibold text-foam-100 uppercase tracking-wider mb-4">Explore</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >All Beers</a
              >
            </li>
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >Breweries</a
              >
            </li>
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >Beer Styles</a
              >
            </li>
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >New Arrivals</a
              >
            </li>
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >Top Rated</a
              >
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-sm font-semibold text-foam-100 uppercase tracking-wider mb-4">Support</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >Help Center</a
              >
            </li>
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >Shipping Info</a
              >
            </li>
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >Returns</a
              >
            </li>
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >Track Order</a
              >
            </li>
            <li>
              <a href="#" class="text-sm text-foam-400 hover:text-amber-400 transition-colors"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-sm font-semibold text-foam-100 uppercase tracking-wider mb-4">
            Stay Updated
          </h4>
          <p class="text-sm text-foam-400 mb-4">
            Subscribe to get notified about new releases and exclusive offers.
          </p>
          <div class="flex gap-2">
            <div class="flex-1 relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foam-500" />
              <UiInput type="email" placeholder="Your email" class="pl-10" />
            </div>
            <UiButton>Join</UiButton>
          </div>
        </div>
      </div>

      <UiSeparator />

      <!-- Bottom Bar -->
      <div class="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-foam-500">© 2024 CraftBrew Catalog. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-sm text-foam-500 hover:text-foam-300 transition-colors"
            >Privacy Policy</a
          >
          <a href="#" class="text-sm text-foam-500 hover:text-foam-300 transition-colors"
            >Terms of Service</a
          >
          <a href="#" class="text-sm text-foam-500 hover:text-foam-300 transition-colors"
            >Cookies</a
          >
        </div>
      </div>
    </div>

    <!-- Age Verification Note -->
    <div class="bg-midnight-950 py-3">
      <p class="text-center text-xs text-foam-500">
        You must be of legal drinking age in your country to purchase alcohol. Please drink
        responsibly.
      </p>
    </div>
  </footer>
</template>
