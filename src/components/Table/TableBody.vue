<template>
  <tbody>
    <tr class="tr" v-for="row in rows" :key="String(row[rowKey as keyof T])">
      <td v-if="selectionMode" class="checked">
        <input
          :checked="row.selected"
          type="checkbox"
          @change="onSelect(row)"
        />
      </td>
      <td
        v-for="column in columns"
        :style="util.getColumnStyle(column)"
        :key="column.field"
      >
        <slot
          v-if="slots[`column-${column.field}`]"
          :name="`column-${column.field}`"
          :props="{ column, row }"
        ></slot>
        <span v-else>{{ getRowValue(column, row) }}</span>
      </td>
    </tr>
  </tbody>
</template>
<script setup lang="ts" generic="T extends object extends {selected?: boolean}">
import { useSlots } from 'vue'
import { ITableColumn, TableBodyProps } from './types'
import { util } from '../util'

const {
  columns = [],
  rowKey,
  rows,
  selectionMode,
} = defineProps<TableBodyProps<T>>()
const slots = useSlots()

const emit = defineEmits<{ (e: 'selectRow', value: T): void }>()

const onSelect = (row: T) => {
  row.selected = !row.selected
  emit('selectRow', row)
}

const getRowValue = (column: ITableColumn, row: T) => {
  const field = column.field as keyof T
  if (!row[field]) return ''

  if (column?.format) {
    return column.format(row[field], row)
  } else {
    return row[field]
  }
}
</script>

<style>
@layer TTable {
  .tr {
    border-bottom: 1px solid #2c313c;

    & td {
      padding: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:not(:last-child) {
        border-right: 1px solid #2c313c;
      }

      &.checked {
        text-align: center;
      }
    }
  }
}
</style>
