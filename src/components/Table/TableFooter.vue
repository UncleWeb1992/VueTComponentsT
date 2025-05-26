<template>
  <div class="footer">
    <div>Всего: {{ props.count }}</div>
    <Pagination
      v-if="props.pagination && props.count !== 0"
      :model-value="props.modelValue"
      :total="mathTotalParts()"
      :viewParts="props.pagination.maxViewParts || MAX_VIEW_PARTS"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>
<script setup lang="ts">
import { IPagination } from './types'
import { MAX_VIEW_PARTS } from './constance'
import Pagination from '../Pagination/Pagination.vue'

const props = defineProps<{
  pagination?: IPagination
  count: number
  modelValue: number
}>()
const emit = defineEmits(['update:modelValue'])
const mathTotalParts = () =>
  Math.ceil(props.count / (props.pagination?.total || 1))
</script>

<style scoped>
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 600;
  padding: 10px;
  border: 1px solid #000;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & li {
    width: 30px;
    height: 20px;
    border: 1px solid #000;

    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    cursor: pointer;

    &:not(:last-child) {
      margin-right: 2px;
    }

    &.active {
      background-color: #000;
      color: #fff;
    }
  }
}
</style>
