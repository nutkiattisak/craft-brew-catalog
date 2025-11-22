<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { DialogTitle } from 'radix-vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <DialogTitle
    :class="cn('text-lg font-semibold leading-none tracking-tight text-foam-50', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
