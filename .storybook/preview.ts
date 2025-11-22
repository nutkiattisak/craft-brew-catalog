import type { Preview } from '@storybook/vue3'
import '../app/assets/css/tailwind.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0b' },
        { name: 'light', value: '#fefefe' },
      ],
    },
  },
}

export default preview
