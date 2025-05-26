<template>
  <input :model-value="props.modelValue" @input="handleChange" />
</template>
<script setup lang="ts">
import { shallowRef } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const search = shallowRef('')
const handleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  search.value = value
  emits('update:modelValue', value)
}
</script>
<style scoped>
input {
  height: 30px;
  padding: 0 10px;

  background-color: transparent;
  border: 0;
  outline: none;

  border: 1px solid #000;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
