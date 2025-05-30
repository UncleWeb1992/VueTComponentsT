<template>
  <div>
    <Header
      v-if="!props.hideHeader"
      :title="props.title"
      :current="columns"
      :columns="props.columns"
      @onSearch="debouncingSearch"
      @updateColumns="updateColumns"
    />
    <table class="table" :class="{ borderTop: props.hideHeader }">
      <TableHeader
        :columns="columns"
        :selection-mode="props.selectionMode"
        :drag="props.dragColumn"
        @sorted="onSorted"
        @update-columns-order="updateColumnsOrder"
        @selectAll="selectAll"
      />
      <TableBody
        :columns="columns"
        :rows="paginateRows()"
        :rowKey="props.rowKey"
        :selection-mode="props.selectionMode"
        @selectRow="onSelectRow"
      >
        <template
          v-for="slot in (Object.keys(slots) as (`column-${string}`)[])"
          :key="slot"
          #[slot]="slotProps"
        >
          <slot :name="slot" v-bind="slotProps"></slot>
        </template>
      </TableBody>
    </table>
    <Footer
      v-if="!props.hideFooter"
      v-model="activePart"
      :pagination="props.pagination"
      :count="rows.length"
    />
  </div>
</template>
<script setup lang="ts" generic="T extends object extends {selected?: boolean}">
import { onBeforeMount, shallowRef, useSlots } from 'vue'
import { TableService } from './service'
import { ITableColumn, ITableProps, LocalStorageKey, SortType } from './types'
import { util } from '../util'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import Footer from './TableFooter.vue'
import Header from './Header.vue'

type TableSlots = {
  [key: `column-${string}`]: (props: { row: any }) => any
  default?: never
}

const slots = useSlots() as unknown as TableSlots
const props = defineProps<ITableProps<T>>()
const rows = shallowRef(
  (props.rows || []).map((r) => ({ ...r, selected: false })),
)
const activePart = shallowRef(props.pagination?.part || 1)
const columns = shallowRef(props.columns)

const selected = defineModel<T[]>('selected', { default: [] })

const onSorted = (col: ITableColumn, type: SortType) => {
  const sorted =
    type === SortType.SORT
      ? props.rows
      : TableService.sorted(col, type, props.rows)
  rows.value = sorted
}

const paginateRows = () => {
  if (!props.pagination) return rows.value
  return TableService.paginate(
    rows.value,
    activePart.value,
    props.pagination.total,
  )
}

const onSelectRow = (row: T) => {
  if (!row.selected) {
    selected.value = selected.value.filter(
      (r) => r[props.rowKey] !== row[props.rowKey],
    )
  } else {
    selected.value.push(row)
  }
}

const selectAll = (ifChecked: boolean) => {
  if (ifChecked) {
    rows.value = TableService.selectAll(rows.value)
    selected.value = rows.value
  } else {
    rows.value = TableService.deselectAll(rows.value)
    selected.value = []
  }
}

const onSearch = (search: string) => {
  if (!search?.length) {
    rows.value = props.rows
  }
  activePart.value = 1
  rows.value = TableService.search(props.rows, search, columns.value)
}

const debouncingSearch = util.debounce(onSearch, 300)

const updateColumns = (data: {
  field: string
  map: Record<string, boolean>
}) => {
  columns.value = props.columns
    .filter((col) => data.map[col.field])
    .map((col) => ({ ...col, hide: false }))
  localStorage.setItem(
    LocalStorageKey.columns,
    JSON.stringify(columns.value.map((col) => col.field)),
  )
}

const updateColumnsOrder = (newColumns: ITableColumn[]) => {
  columns.value = newColumns
  localStorage.setItem(
    LocalStorageKey.columns,
    JSON.stringify(newColumns.map((col) => col.field)),
  )
}

const loadColumns = () => {
  const columnsInLS = localStorage.getItem(LocalStorageKey.columns)
  if (!columnsInLS) {
    columns.value = props.columns.filter((col) => !col.hide)
  } else {
    const parsedColumns = JSON.parse(columnsInLS) as string[]
    columns.value = parsedColumns
      .map((name) => props.columns.find((col) => col.field === name))
      .filter(Boolean) as ITableColumn[]
  }
}

onBeforeMount(loadColumns)
</script>
<style scoped>
@layer TTable {
  .table {
    width: 100%;
    height: fit-content;
    border-collapse: collapse;
    overflow: hidden;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    table-layout: fixed;

    &.borderTop {
      border-top: 2px solid #000;
    }
  }
}
</style>
