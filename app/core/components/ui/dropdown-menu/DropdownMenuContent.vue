<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuContent, DropdownMenuPortal } from 'radix-vue'
import { cn } from '~/core/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  sideOffset?: number
  alignOffset?: number
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  avoidCollisions?: boolean
  forceMount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4,
  align: 'center',
  side: 'bottom',
  avoidCollisions: true,
})

const emit = defineEmits<{
  closeAutoFocus: [event: Event]
  escapeKeyDown: [event: KeyboardEvent]
  pointerDownOutside: [event: Event]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
}>()
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :class="
        cn(
          'z-50 min-w-32 overflow-hidden rounded-xl border border-midnight-700 bg-midnight-800 p-1 text-foam-100 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class
        )
      "
      :side-offset="props.sideOffset"
      :align-offset="props.alignOffset"
      :align="props.align"
      :side="props.side"
      :avoid-collisions="props.avoidCollisions"
      :force-mount="props.forceMount"
      @close-auto-focus="(e) => emit('closeAutoFocus', e)"
      @escape-key-down="(e) => emit('escapeKeyDown', e)"
      @pointer-down-outside="(e) => emit('pointerDownOutside', e)"
      @focus-outside="(e) => emit('focusOutside', e)"
      @interact-outside="(e) => emit('interactOutside', e)"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
