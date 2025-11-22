<script setup lang="ts">
import { DialogTrigger } from 'radix-vue'

interface Props {
  asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  asChild: false,
})
</script>

<template>
  <DialogTrigger :as-child="props.asChild">
    <slot />
  </DialogTrigger>
</template>
