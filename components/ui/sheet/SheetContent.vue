<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from 'radix-vue'
import { X } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { sheetVariants, type SheetVariants } from '.'

interface Props {
  class?: HTMLAttributes['class']
  side?: SheetVariants['side']
  forceMount?: boolean
  trapFocus?: boolean
  disableOutsidePointerEvents?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  side: 'right',
})

const emit = defineEmits<{
  escapeKeyDown: [event: KeyboardEvent]
  pointerDownOutside: [event: Event]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
  openAutoFocus: [event: Event]
  closeAutoFocus: [event: Event]
}>()
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-midnight-950/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
      :class="cn(sheetVariants({ side }), props.class)"
      :force-mount="props.forceMount"
      :trap-focus="props.trapFocus"
      :disable-outside-pointer-events="props.disableOutsidePointerEvents"
      @escape-key-down="(e) => emit('escapeKeyDown', e)"
      @pointer-down-outside="(e) => emit('pointerDownOutside', e)"
      @focus-outside="(e) => emit('focusOutside', e)"
      @interact-outside="(e) => emit('interactOutside', e)"
      @open-auto-focus="(e) => emit('openAutoFocus', e)"
      @close-auto-focus="(e) => emit('closeAutoFocus', e)"
    >
      <slot />

      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-midnight-900 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-midnight-800"
      >
        <X class="w-4 h-4 text-foam-300" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
