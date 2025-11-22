<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('rounded-2xl border border-midnight-700/50 bg-midnight-800/50 text-foam-100 shadow', props.class)"
  >
    <slot />
  </div>
</template>
