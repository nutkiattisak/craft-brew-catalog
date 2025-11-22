import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Input } from '.'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" placeholder="Enter text..." />',
  }),
}

export const WithValue: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Craft Beer Catalog')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Disabled input')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" disabled />',
  }),
}

export const WithPlaceholder: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" placeholder="Search for beers..." />',
  }),
}

export const SearchInput: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const search = ref('')
      return { search }
    },
    template: `
      <div class="w-full max-w-md">
        <Input
          v-model="search"
          type="search"
          placeholder="Search craft beers..."
        />
      </div>
    `,
  }),
}

export const EmailInput: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const email = ref('')
      return { email }
    },
    template: `
      <div class="w-full max-w-md">
        <Input
          v-model="email"
          type="email"
          placeholder="your@email.com"
        />
      </div>
    `,
  }),
}

export const PasswordInput: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const password = ref('')
      return { password }
    },
    template: `
      <div class="w-full max-w-md">
        <Input
          v-model="password"
          type="password"
          placeholder="Enter password..."
        />
      </div>
    `,
  }),
}
