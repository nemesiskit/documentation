<script setup>
defineProps({
  props: {
    type: Array,
    required: true
    // [{ name, type, default, description }]
  }
})
</script>

<template>
  <div class="table-wrap">
    <table class="props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Tipo</th>
          <th>Padrão</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in props" :key="prop.name">
          <td><span class="prop-name">{{ prop.name }}</span></td>
          <td><span class="prop-type">{{ prop.type }}</span></td>
          <td><span class="prop-default">{{ prop.default ?? '—' }}</span></td>
          <td>{{ prop.description }}</td>
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
