<template>
  <div class="header">
    <span v-show="props.title">{{ props.title }}</span>
    <div class="header-inner">
      <Select
        :columns="props.columns"
        :current="props.current"
        @update-columns="emits('updateColumns', $event)"
      />
      <TextField :model-value="search" @update:model-value="handleChange" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue'
import { ITableColumn } from './types'
import Select from '../Select/Select.vue'
import TextField from '../TextField/TextField.vue'

type MapType = Record<string, boolean>

const emits = defineEmits<{
  (e: 'onSearch', value: string): void
  (e: 'updateColumns', value: { field: string; map: MapType }): void
}>()
const props = defineProps<{
  title?: string
  columns: ITableColumn[]
  current: ITableColumn[]
}>()
const search = shallowRef('')

const handleChange = (val: string) => {
  search.value = val
  emits('onSearch', val)
}
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #000;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  & span {
    font-weight: 600;
    font-size: 18px;
  }

  & .header-inner {
    display: flex;
    align-items: center;
  }
}
</style>
