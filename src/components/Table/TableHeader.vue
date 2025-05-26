<template>
  <thead>
    <tr class="tr">
      <th v-if="selectionMode" class="checked">
        <input
          v-if="selectionMode === 'multiple'"
          type="checkbox"
          :checked="false"
          @change="
            emit('selectAll', ($event.target as HTMLInputElement).checked)
          "
        />
      </th>
      <th
        v-for="(column, index) in columns"
        :key="column.field"
        :draggable="drag && !border"
        :style="{ ...util.getColumnStyle(column), ...util.parseStyle(column) }"
        @dragstart="onDragStart(index)"
        @dragover="onDragOver($event)"
        @drop="onDrop($event, index)"
      >
        <div :class="{ wrap: true, empty: !column?.label?.length }">
          <span v-if="column.label?.length" :class="{ drag: drag }">
            {{ column.label }}
          </span>

          <img
            v-if="column.sortable"
            :src="icons[sort.get(column.field) || SortType.SORT]"
            @click="toggleSorted(column)"
          />
          <div
            v-if="index < columns.length - 1 && column.responsive"
            class="border"
          ></div>
        </div>
      </th>
    </tr>
  </thead>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, shallowRef } from 'vue'
import { ITableColumn, SelectedType, SortType } from './types'
import { util } from '../util'
import ASC from '../icons/asc.svg?url'
import DESC from '../icons/desc.svg?url'
import SORT from '../icons/sort.svg?url'
import { MIN_TH_WIDTH } from './constance'
import { TableService } from './service'

interface THeaderTableProps {
  columns: ITableColumn[]
  selectionMode?: SelectedType
  drag?: boolean
}

const icons: Record<SortType, string> = {
  [SortType.ASC]: ASC,
  [SortType.DESC]: DESC,
  [SortType.SORT]: SORT,
}
const emit = defineEmits<{
  (e: 'updateColumnsOrder', columns: ITableColumn[]): void
  (e: 'sorted', col: ITableColumn, type: SortType): void
  (e: 'selectAll', value: boolean): void
}>()
const {
  selectionMode,
  columns,
  drag = false,
} = defineProps<THeaderTableProps>()
const sort = reactive<Map<string, SortType>>(new Map())
const border = shallowRef<HTMLDivElement | null>(null)
const th = shallowRef<HTMLTableCellElement | null>(null)
let draggedColumnIndex = -1
const toggleSorted = (col: ITableColumn) => {
  const field = col.field
  let type =
    !sort.has(field) || sort.get(field) === SortType.SORT
      ? SortType.DESC
      : sort.get(field) === SortType.DESC
      ? SortType.ASC
      : SortType.SORT

  sort.set(field, type)
  emit('sorted', col, type)
}

const onDragStart = (index: number) => {
  draggedColumnIndex = index
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const onDrop = (e: DragEvent, index: number) => {
  e.preventDefault()
  if (draggedColumnIndex !== index) {
    const updateOrders = columns.map((col, i) =>
      i === index
        ? columns[draggedColumnIndex]
        : i === draggedColumnIndex
        ? columns[index]
        : col,
    )
    emit('updateColumnsOrder', updateOrders)
  }

  const span = th.value?.querySelector('span')

  if (span) {
    span.style.cursor = 'grab'
  }
  draggedColumnIndex = -1
}

const mouseDown = (e: MouseEvent) => {
  const isBorder = (e.target as HTMLElement).classList.contains('border')
  const isTh = (e.target as HTMLElement).closest('th')

  if (isBorder) {
    border.value = e.target as HTMLDivElement
    border.value.style.backgroundColor = `orange`
  } else if (isTh && !isTh.classList.contains('checked')) {
    const span = isTh.querySelector('span')

    if (span) {
      span.style.cursor = 'grabbing'
    }
    th.value = isTh
  }
}

const updateColumnsWidth = () => {
  if (!th.value) return
  const content = th.value.textContent ?? ''
  const firstColumns = TableService.updateColStyles(
    content,
    columns,
    th.value.style.width,
  )

  // Если есть следующая колонка, то меняем сохраняем её ширину
  if (th.value.nextElementSibling) {
    const nextElem = th.value.nextElementSibling as HTMLTableCellElement
    const secondColumns = TableService.updateColStyles(
      nextElem.textContent ?? '',
      firstColumns,
      nextElem?.style?.width,
    )
    emit('updateColumnsOrder', secondColumns)
  } else {
    // Если следующей колонки нет
    emit('updateColumnsOrder', firstColumns)
  }
}

const mouseUp = () => {
  if (border.value) {
    border.value.style.backgroundColor = `transparent`
  }

  if (th.value) {
    const span = th.value.querySelector('span')
    if (span) {
      span.style.cursor = 'grab'
    }
    updateColumnsWidth()

    th.value = null
  }
  border.value = null
}

const resize = ({ clientX }: MouseEvent) => {
  if (!border.value) return

  const thEl = border.value.closest('th')

  if (thEl) {
    const { left, width } = thEl.getBoundingClientRect()
    const nextTh = thEl.nextElementSibling as HTMLTableCellElement

    // Расчёт новой ширины текущей колонки
    let newWidth = clientX - left

    // Установка минимальной ширины
    if (newWidth < MIN_TH_WIDTH) newWidth = MIN_TH_WIDTH

    // Расчёт изменения ширины
    const deltaWidth = newWidth - width

    // Если есть следующая колонка и она будет уменьшена больше, чем минимальная ширина, уменьшаем её
    if (nextTh) {
      const nextThWidth = nextTh.getBoundingClientRect().width
      const newNextThWidth = nextThWidth - deltaWidth

      if (newNextThWidth > MIN_TH_WIDTH) {
        nextTh.style.width = `${newNextThWidth}px`
        thEl.style.width = `${newWidth}px`
      }
    } else {
      // Если следующей колонки нет, просто обновляем ширину текущей колонки
      thEl.style.width = `${newWidth}px`
    }
    th.value = thEl
  }
}

const mount = () => {
  document.addEventListener('mousedown', mouseDown)
  document.addEventListener('mouseup', mouseUp)
  document.addEventListener('mousemove', resize)
}

const unMount = () => {
  document.removeEventListener('mousedown', mouseDown)
  document.removeEventListener('mouseup', mouseUp)
  document.removeEventListener('mousemove', resize)
}

onMounted(mount)
onUnmounted(unMount)
</script>

<style scoped>
.tr {
  border-bottom: 2px solid #2c313c;

  & th {
    position: relative;
    padding: 5px 0;
    min-width: 40px;

    &:not(:last-child) {
      border-right: 1px solid #000;
    }

    & .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 10px;

      &.empty {
        justify-content: center;
        padding-left: 0;
      }
    }

    & img {
      width: 20px;
      height: 20px;

      user-select: none;
      cursor: pointer;
    }

    & span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      user-select: none;

      &.drag:hover {
        cursor: grab;
      }
    }
    &.checked {
      width: 42px;
    }
  }
}

.border {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  user-select: none;
  cursor: col-resize;
}
</style>
