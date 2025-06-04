<script setup lang="ts">
import { ref } from 'vue'
import Table from './components/Table/Table.vue'
import { ITableColumn } from './components/Table/types'

const rows = new Array(500).fill(0).map((_, index) => ({
  id: index + 1,
  name: 'Name ' + (index + 1),
  secondName: 'Test ' + (index + 1),
  street: { id: index, name: 'Avenue ' + (index + 1) },
  userName: 'User ' + (index + 1),
  UserAge: Math.ceil(Math.random() * 30),
  action: 'delete',
}))

const selected = ref<typeof rows>([])

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

const pagination = {
  total: 18,
  part: 1,
  maxViewParts: 5,
}
</script>

<template>
  <div style="height: calc(100vh - 60px); width: 80vw; margin: 30px auto">
    <Table
      title="Таблица"
      row-key="id"
      v-model:selected="selected"
      drag-column
      selection-mode="multiple"
      :columns="columns"
      :rows="rows"
      :pagination="pagination"
    >
      <template #column-street="{ props }">
        {{ props.row.street.name }}
      </template>
      <template #column-action="{ props }">
        <button>{{ props.row.action }}</button>
      </template>
    </Table>
  </div>
</template>
