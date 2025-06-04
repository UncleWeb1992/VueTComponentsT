# @gaspacho/table

Vue 3 компонент таблицы с возможностью ресайза колонок. Прост в использовании, написан на Composition API с поддержкой TypeScript.


## Installation

Install my-project with npm

```bash
  npm install @gaspacho/table
```

## Usage/Examples

```javascript
<template>
  <Table :columns="columns" :rows="rows"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table, type ITableColumn } from '@gaspacho/table'   +
import '@gaspacho/table/style.css'                           +

const selected = ref<typeof rows>([])

const rows = new Array(500).fill(0).map((_, index) => ({
  id: index + 1,
  name: 'Name ' + (index + 1),
  street: { id: index, name: 'Avenue ' + (index + 1) },
  userName: 'User ' + (index + 1),
  UserAge: Math.ceil(Math.random() * 30),
  action: 'delete',
}))

const columns: ITableColumn[] = [
  {
    field: 'id',
    label: '',
    align: 'center',
    sortable: true,
    style: { width: '50px' },
  },
  {
    field: 'name',
    label: 'Name',
    align: 'left',
    sortable: true,
    responsive: true,
  },
  {
    field: 'secondName',
    label: 'Second Name',
    align: 'left',
    sortable: true,
    responsive: true,
  },
  {
    field: 'userName',
    label: 'User Name',
    align: 'left',
    sortable: true,
    responsive: false,
  },
  {
    field: 'UserAge',
    label: 'Age',
    align: 'center',
    sortable: true,
    responsive: false,
    hide: true,
    style: { width: '60px' },
  },
  {
    field: 'street',
    label: 'Street Name',
    align: 'left',
    sortable: true,
    responsive: false,
    format: (value) => value.name,
  },
  {
    field: 'action',
    label: 'Action',
    responsive:false,
    style:{width: "80px"}
  },
]
</script>
```

## Slots

```javascript
<Table :columns="columns" :rows="rows">
    <template #column-street="{ props }">
        {{ props.row.street.name }}
    </template>
    <template #column-action="{ props }">
        <button>{{ props.row.action }}</button>
    </template>
</Table>
```
## Props

| Name          |Required| Type                    | Description
| ------------- |--------|-------------------------|--------------------|
| rows          |   yes  |  object[]               |  Rows table       
| columns       |   yes  |  ITableColumn[]         |  Columns table       
| rowKey        |   yes  |  unique keyof row       |  settings pagination       
| pagination    |   no   |  IPagination            |  left header title table     
| title         |   no   |  string                 |  type selection rows 
| selectionMode |   no   |  'multiple' / 'single'  |  hide or show 
| hideFooter    |   no   |  boolean                |  hide or show 
| hideHeader    |   no   |  boolean                |  hide or show 
| dragColumn    |   no   |  boolean                |  on drag header mode 


## Authors

- [Gaspacho](https://github.com/UncleWeb1992)


## License

[MIT](https://choosealicense.com/licenses/mit/)


