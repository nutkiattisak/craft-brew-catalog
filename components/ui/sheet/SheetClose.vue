<script setup lang="ts">
import { DialogClose } from 'radix-vue'

interface Props {
  asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  asChild: false,
})
</script>

<template>
  <DialogClose :as-child="props.asChild">
    <slot />
  </DialogClose>
</template>
