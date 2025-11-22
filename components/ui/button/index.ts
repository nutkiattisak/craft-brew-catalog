import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-amber-500 text-midnight-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20',
        destructive: 'bg-red-500 text-foam-50 hover:bg-red-600',
        outline: 'border border-midnight-700 bg-midnight-800 text-foam-100 hover:bg-midnight-700 hover:border-midnight-600',
        secondary: 'bg-midnight-700 text-foam-100 hover:bg-midnight-600',
        ghost: 'text-foam-300 hover:bg-midnight-800 hover:text-foam-100',
        link: 'text-amber-400 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-lg px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
