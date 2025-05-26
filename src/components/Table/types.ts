import { CSSProperties } from 'vue'

export interface ITableColumn {
  label: string
  field: string
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  responsive?: boolean
  style?: Partial<CSSProperties>
  hide?: boolean
  format?: (value: any, row: object) => string
}

export interface IPagination {
  total: number
  part: number
  maxViewParts?: number
}

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
  SORT = 'sort',
}

export enum LocalStorageKey {
  columns = 'columns',
}

export type SelectedType = 'multiple' | 'single'

export interface TableBodyProps<T> {
  columns: ITableColumn[]
  rows: T[]
  rowKey: keyof T
  selectionMode?: SelectedType
}

export interface ITableProps<T> {
  rows: T[]
  columns: ITableColumn[]
  rowKey: keyof T
  pagination?: IPagination
  title?: string
  selectionMode?: SelectedType
  hideFooter?: boolean
  hideHeader?: boolean
  dragColumn?: boolean
}
