<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="relative p-2 rounded-lg transition-all duration-200 hover:bg-midnight-800 dark:hover:bg-midnight-800 light:hover:bg-foam-200"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <Sun
      v-if="colorMode.value === 'dark'"
      class="w-5 h-5 text-foam-300 hover:text-amber-400 transition-colors"
    />
    <Moon v-else class="w-5 h-5 text-midnight-600 hover:text-amber-500 transition-colors" />
  </button>
</template>
