<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from 'radix-vue'
import { X } from 'lucide-vue-next'
import { cn } from '~/core/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  forceMount?: boolean
  trapFocus?: boolean
  disableOutsidePointerEvents?: boolean
}

const props = defineProps<Props>()

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
      :class="
        cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-midnight-700 bg-midnight-900 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl',
          props.class
        )
      "
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
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-midnight-900 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-midnight-800 data-[state=open]:text-foam-400"
      >
        <X class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
