<script setup>
defineProps({
  columns: {
    type: Array,
    default: () => ['Nome', 'Descrição']
    // rótulos das duas colunas
  },
  rows: {
    type: Array,
    required: true
    // [{ name, description }]
  }
})
</script>

<template>
  <div class="table-wrap">
    <table class="props-table">
      <thead>
        <tr>
          <th>{{ columns[0] }}</th>
          <th>{{ columns[1] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td><span class="prop-name">{{ row.name }}</span></td>
          <td>{{ row.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  margin-bottom: 1.5rem;
}
</style>
