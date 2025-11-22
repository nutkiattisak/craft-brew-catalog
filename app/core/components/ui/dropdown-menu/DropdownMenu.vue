<script setup lang="ts">
import { DropdownMenuRoot } from 'radix-vue'

interface Props {
  open?: boolean
  defaultOpen?: boolean
  dir?: 'ltr' | 'rtl'
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
  <DropdownMenuRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    :dir="props.dir"
    :modal="props.modal"
    @update:open="(val) => emit('update:open', val)"
  >
    <slot />
  </DropdownMenuRoot>
</template>
