<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from 'vue'
import { cn } from '~/core/lib/utils'

interface Props {
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const attrs = useAttrs()
</script>

<template>
  <input
    :class="
      cn(
        'flex h-10 w-full rounded-xl border border-midnight-700 bg-midnight-800/50 px-4 py-2 text-sm text-foam-100 ring-offset-midnight-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foam-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
        props.class
      )
    "
    :value="modelValue"
    v-bind="attrs"
    @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
