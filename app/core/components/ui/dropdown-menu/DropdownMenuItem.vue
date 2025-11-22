<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuItem } from 'radix-vue'
import { cn } from '~/core/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  inset?: boolean
  disabled?: boolean
  textValue?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [event: Event]
}>()
</script>

<template>
  <DropdownMenuItem
    :class="
      cn(
        'relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:bg-midnight-700 focus:text-foam-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        props.class
      )
    "
    :disabled="props.disabled"
    :text-value="props.textValue"
    @select="(e) => emit('select', e)"
  >
    <slot />
  </DropdownMenuItem>
</template>
