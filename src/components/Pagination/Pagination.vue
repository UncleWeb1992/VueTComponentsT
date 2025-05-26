<template>
  <div>
    <ul class="pagination">
      <li class="prev" @click="updateValue(modelValue - 1)"></li>
      <li v-if="isPrev" @click="updateValue(1)">1</li>
      <span v-if="isPrev">...</span>
      <li
        v-for="i in total"
        :key="i.toString()"
        :class="{ active: i === modelValue }"
        @click="updateValue(i)"
      >
        {{ i }}
      </li>
      <span v-if="isNext">...</span>
      <li v-if="isNext" @click="updateValue(propsTotal)">
        {{ propsTotal }}
      </li>
      <li class="next" @click="updateValue(modelValue + 1)"></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { util } from '../util'

interface Props {
  total: number
  modelValue: number
  viewParts: number
}

const emit = defineEmits<{
  (even: 'update:modelValue', i: number): void
}>()
const { modelValue, total: propsTotal, viewParts } = defineProps<Props>()
const total = computed(() =>
  util.generatePaginationArray(modelValue, propsTotal, viewParts),
)
const isPrev = computed(() => !total.value.includes(1))
const isNext = computed(() => !total.value.includes(propsTotal))

const updateValue = (i: number) => {
  const value = i >= propsTotal ? propsTotal : i <= 1 ? 1 : i
  emit('update:modelValue', value)
}
</script>
<style>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & li {
    width: 30px;
    height: 20px;

    font-size: 12px;
    font-weight: 600;

    border: 1px solid #000;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    margin-left: 5px;

    cursor: pointer;

    &.active {
      background-color: #000;
      color: #fff;
    }

    &.prev {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        border-top: 2px solid #000;
        border-left: 2px solid #000;

        transform: translate(-40%, -50%) rotate(315deg);
      }
    }

    &.next {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        border-top: 2px solid #000;
        border-left: 2px solid #000;

        transform: translate(-60%, -50%) rotate(135deg);
      }
    }
  }

  & span {
    margin-left: 5px;
    font-weight: 600;
  }
}
</style>
