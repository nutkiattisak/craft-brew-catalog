import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '~/core': resolve(__dirname, '../app/core'),
          '~/types': resolve(__dirname, '../app/core/types'),
          '~/lib': resolve(__dirname, '../app/core/lib'),
          '~/assets': resolve(__dirname, '../app/assets'),
        },
      },
    })
  },
}

export default config
