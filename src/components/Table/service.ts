import { ITableColumn, SortType } from './types'
import { util } from '../util'

export class TableService {
  public static sorted<T>(col: ITableColumn, type: SortType, arr: T[]) {
    const copy = arr.concat()
    const key = col.field as keyof T

    if (type === SortType.ASC) {
      copy.sort((a, b) => {
        const a_val =
          col.format && a[key] ? col.format(a[key], a as object) : a[key]
        const b_val =
          col.format && b[key] ? col.format(b[key], b as object) : b[key]

        if (a_val < b_val) return -1
        if (a_val > b_val) return 1
        return 0
      })
    } else {
      copy.sort((a, b) => {
        const a_val =
          col.format && a[key] ? col.format(a[key], a as object) : a[key]
        const b_val =
          col.format && b[key] ? col.format(b[key], b as object) : b[key]
        if (a_val > b_val) return -1
        if (a_val < b_val) return 1
        return 0
      })
    }

    return copy
  }

  public static paginate<T>(rows: T[], part: number, total: number) {
    const copy = rows.concat()
    return copy.slice((part - 1) * total, part * total)
  }

  public static selectAll<T>(rows: T[]) {
    return rows.map((row) => ({ ...row, selected: true }))
  }

  public static deselectAll<T>(rows: T[]) {
    return rows.map((row) => ({ ...row, selected: false }))
  }

  public static search<T extends object>(
    rows: T[],
    search: string,
    columns: ITableColumn[],
  ) {
    if (!search) return rows
    return rows.filter((row) => {
      return Object.keys(row).some((key) => {
        const col = columns.find((col) => col.field === key)
        if (col?.format)
          return String(col
            .format(row[key as keyof T], row))
            .toLowerCase()
            .includes(search.toLowerCase())
        return String(row[key as keyof T])
          .toLowerCase()
          .includes(search.toLowerCase())
      })
    })
  }

  public static updateColStyles(
    content: string | null,
    columns: ITableColumn[],
    width?: string,
  ) {
    return columns.map((col) => {
      if (col.label === content) {
        return {
          ...col,
          style: {
            ...util.parseStyle(col),
            width: width ?? 'auto',
          },
        }
      }
      return col
    })
  }
}
