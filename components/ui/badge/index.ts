import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-amber-500/20 text-amber-400',
        secondary: 'border-transparent bg-midnight-700 text-foam-300',
        destructive: 'border-transparent bg-red-500/20 text-red-400',
        outline: 'border-midnight-600 text-foam-300',
        amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        green: 'bg-green-500/20 text-green-400 border-green-500/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
