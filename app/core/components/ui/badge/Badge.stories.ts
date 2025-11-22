import type { Meta, StoryObj } from '@storybook/vue3'
import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'amber', 'purple', 'green'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
  args: {
    variant: 'default',
  },
}

export const Secondary: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Secondary</Badge>',
  }),
  args: {
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Destructive</Badge>',
  }),
  args: {
    variant: 'destructive',
  },
}

export const Outline: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Outline</Badge>',
  }),
  args: {
    variant: 'outline',
  },
}

export const Amber: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Amber</Badge>',
  }),
  args: {
    variant: 'amber',
  },
}

export const Purple: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Purple</Badge>',
  }),
  args: {
    variant: 'purple',
  },
}

export const Green: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Green</Badge>',
  }),
  args: {
    variant: 'green',
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap gap-4">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="amber">Amber</Badge>
        <Badge variant="purple">Purple</Badge>
        <Badge variant="green">Green</Badge>
      </div>
    `,
  }),
}

export const BeerStyles: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge variant="amber">IPA</Badge>
        <Badge variant="purple">Stout</Badge>
        <Badge variant="green">Lager</Badge>
        <Badge variant="default">Ale</Badge>
        <Badge variant="secondary">Pilsner</Badge>
      </div>
    `,
  }),
}
