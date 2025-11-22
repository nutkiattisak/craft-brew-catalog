import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/.storybook/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/e2e/**', '**/*.stories.ts'],
    },
  },
  resolve: {
    alias: {
      '~/core': resolve(__dirname, './app/core'),
      '~/types': resolve(__dirname, './app/core/types'),
      '~/lib': resolve(__dirname, './app/core/lib'),
      '~/assets': resolve(__dirname, './app/assets'),
    },
  },
})
