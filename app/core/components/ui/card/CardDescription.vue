<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/core/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <p :class="cn('text-sm text-foam-400', props.class)">
    <slot />
  </p>
</template>
