<template>
  <div class="select">
    <div class="value" @click="menu = !menu">
      <span>Selected columns</span>
      <img src="../icons/arrow.svg" :class="{ active: menu }" />
    </div>
    <ul v-if="menu">
      <li
        v-for="column in props.columns.filter((col) => !!col.label)"
        :key="column.field"
      >
        <div class="option" @click="handleSelect(column.field)">
          <input :checked="map[column.field]" type="checkbox" />
          <span>{{ column.label }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { ITableColumn } from '../Table/types'

type MapType = Record<string, boolean>

interface Props {
  columns: ITableColumn[]
  current: ITableColumn[]
}

const emits = defineEmits<{
  (e: 'updateColumns', value: { field: string; map: MapType }): void
}>()
const props = defineProps<Props>()
const menu = shallowRef(false)
const map = shallowRef(
  props.columns.reduce((acc, col) => {
    acc[col.field] = !!props.current.includes(col)
    return acc
  }, {} as MapType),
)

const handleSelect = (value: string) => {
  map.value = { ...map.value, [value]: !map.value[value] }

  emits('updateColumns', {
    field: value,
    map: map.value,
  })
}
</script>
<style scoped>
.select {
  height: 30px;
  min-width: 200px;
  position: relative;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 4px 10px;
  margin-right: 20px;

  & .value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 1rem;
  }

  & span {
    font-weight: 400;
    margin-right: 50px;
  }

  & img {
    width: 20px;
    height: 20px;
    fill: red;
    transform: rotate(180deg);
    transition: transform 0.2s linear;

    &.active {
      transform: rotate(0deg);
    }
  }

  & ul {
    width: 100%;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 1000;
    background-color: #ccc;

    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    & li {
      padding: 4px 10px;

      &:not(:last-child) {
        border-bottom: 1px solid #000;
      }

      & .option {
        cursor: pointer;
      }
    }
  }
}
</style>
