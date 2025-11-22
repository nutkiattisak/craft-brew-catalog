<script setup lang="ts">
import { DialogRoot } from 'radix-vue'

interface Props {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modal: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DialogRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
    @update:open="(val) => emit('update:open', val)"
  >
    <slot />
  </DialogRoot>
</template>
