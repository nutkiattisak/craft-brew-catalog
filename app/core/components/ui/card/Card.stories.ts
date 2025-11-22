import type { Meta, StoryObj } from '@storybook/vue3'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '.'
import { Button } from '../button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
    template: `
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content with some details about the item.</p>
        </CardContent>
      </Card>
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button },
    template: `
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Featured Beer</CardTitle>
          <CardDescription>Discover this amazing craft brew.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A rich, hoppy IPA with notes of citrus and pine.</p>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline">Learn More</Button>
          <Button>Add to Cart</Button>
        </CardFooter>
      </Card>
    `,
  }),
}

export const BeerCard: Story = {
  render: () => ({
    components: { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button },
    template: `
      <Card class="w-[350px] card-hover">
        <CardHeader>
          <CardTitle class="text-amber-400">Sierra Nevada Pale Ale</CardTitle>
          <CardDescription>American Pale Ale</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <p class="text-foam-300">A bold, assertively hopped American Pale Ale with a deep amber color.</p>
          <div class="flex gap-2">
            <span class="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">5.6% ABV</span>
            <span class="text-xs bg-midnight-700 text-foam-300 px-2 py-1 rounded">37 IBU</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full">View Details</Button>
        </CardFooter>
      </Card>
    `,
  }),
}

export const SimpleCard: Story = {
  render: () => ({
    components: { Card, CardContent },
    template: `
      <Card class="w-[250px]">
        <CardContent class="pt-6">
          <p class="text-center text-foam-200">Simple card with only content.</p>
        </CardContent>
      </Card>
    `,
  }),
}
