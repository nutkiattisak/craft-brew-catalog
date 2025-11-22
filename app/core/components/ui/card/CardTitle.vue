<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/core/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <h3 :class="cn('font-semibold leading-none tracking-tight text-foam-50', props.class)">
    <slot />
  </h3>
</template>
