import { TdHTMLAttributes } from 'vue'
import { ITableColumn } from './Table/types'
import { MIN_TH_WIDTH } from './Table/constance'

function getColumnStyle(column: ITableColumn) {
  const style: Partial<TdHTMLAttributes['style']> = {
    textAlign: 'center',
  }

  if (column.align) {
    style.textAlign = column.align
  }

  return style
}

function parseStyle(col: ITableColumn) {
  const style = col.style ? col.style : {}

  if (style['width']) {
    const onlyDigits = Number(style['width'].toString().match(/\d+/)?.[0])

    if (onlyDigits < MIN_TH_WIDTH) {
      style.width = MIN_TH_WIDTH + 'px'
    }
  }

  if (style['minWidth']) {
    const onlyDigits = Number(style['minWidth'].toString().match(/\d+/)?.[0])

    if (onlyDigits < MIN_TH_WIDTH) {
      style['minWidth'] = MIN_TH_WIDTH + 'px'
    }
  }

  return style
}

function generatePaginationArray(
  currentPage: number,
  totalPages: number,
  visiblePages: number,
) {
  let paginationArray = []
  const halfVisible = Math.floor(visiblePages / 2)

  // Если текущая страница ближе к началу
  if (currentPage <= halfVisible) {
    for (let i = 1; i <= visiblePages; i++) {
      paginationArray.push(i)
    }
  }
  // Если текущая страница ближе к концу
  else if (currentPage > totalPages - halfVisible) {
    for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
      paginationArray.push(i)
    }
  }
  // Если текущая страница находится где-то посередине
  else {
    for (
      let i = currentPage - halfVisible;
      i <= currentPage + halfVisible;
      i++
    ) {
      paginationArray.push(i)
    }
  }

  return totalPages < visiblePages
    ? paginationArray.slice(0, totalPages)
    : paginationArray
}

function excludeObjectKeys<T extends object>(obj: T, keys: (keyof T)[]) {
  const copy = { ...obj }
  keys.forEach((key) => delete copy[key])
  return copy
}

function debounce<T extends Function>(cb: T, wait = 20) {
  let h = 0
  let callable = (...args: any) => {
    clearTimeout(h)
    h = setTimeout(() => cb(...args), wait)
  }
  return <T>(<any>callable)
}

export const util = {
  debounce,
  parseStyle,
  getColumnStyle,
  excludeObjectKeys,
  generatePaginationArray,
}
