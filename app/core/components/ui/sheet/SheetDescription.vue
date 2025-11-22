<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogDescription } from 'radix-vue'
import { cn } from '~/core/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <DialogDescription :class="cn('text-sm text-foam-400', props.class)">
    <slot />
  </DialogDescription>
</template>
