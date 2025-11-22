<script setup lang="ts">
import { Primitive } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'
import { buttonVariants, type ButtonVariants } from '.'

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  as?: string
  asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  asChild: false,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
