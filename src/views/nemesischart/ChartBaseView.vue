<script setup>
import { ChartBase } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const chartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Receita',
      data: [1200, 2800, 3200, 2100, 4500, 3900],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.35,
      fill: true,
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' } },
  scales: { y: { beginAtZero: true } }
}

const props = [
  { name: 'type', type: 'String', default: 'obrigatório', description: "Tipo do Chart.js: 'line', 'bar', 'pie', 'doughnut', 'polarArea'." },
  { name: 'data', type: 'Object', default: 'obrigatório', description: 'Objeto data nativo do Chart.js ({ labels, datasets }).' },
  { name: 'options', type: 'Object', default: '{}', description: 'Opções do Chart.js (mescladas com defaults responsivos).' },
  { name: 'plugins', type: 'Array', default: '[]', description: 'Plugins customizados do Chart.js.' },
  { name: 'height', type: 'String | Number', default: '300', description: 'Altura do canvas em px.' },
  { name: 'width', type: 'String | Number', default: 'null', description: 'Largura do canvas em px (opcional).' },
]

const basicCode = `<script setup>
import { ChartBase } from 'nemesischart'

const chartData = {
  labels: ['Jan', 'Fev', 'Mar'],
  datasets: [
    {
      label: 'Receita',
      data: [1200, 2800, 3200],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
    }
  ]
}

const chartOptions = {
  scales: { y: { beginAtZero: true } }
}
<\/script>

<template>
  <ChartBase
    type="line"
    :data="chartData"
    :options="chartOptions"
    :height="300"
  />
</template>`

const barCode = `<ChartBase
  type="bar"
  :data="{
    labels: ['A', 'B', 'C'],
    datasets: [{ label: 'Vendas', data: [10, 25, 18], backgroundColor: '#10B981' }]
  }"
/>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>ChartBase</h1>
    <p>
      Wrapper fino sobre <strong style="color: var(--color-text)">Chart.js</strong> que cuida do
      registro dos controllers/scales mais usados, do ciclo de vida (criar/atualizar/destruir) e
      aplica defaults responsivos. Use quando precisar de um gráfico que os <code>Card*</code> não cobrem
      ou para construir visualizações totalmente customizadas.
    </p>

    <h2>Demonstração</h2>

    <div class="demo-section" style="background: #fff; padding: 1.25rem; border-radius: var(--radius);">
      <ChartBase type="line" :data="chartData" :options="chartOptions" :height="300" />
    </div>

    <h2>Uso básico</h2>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Barras</h2>
    <CodeBlock :code="barCode" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />

    <div class="callout callout-info">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <strong>Dica:</strong> O ChartBase reage automaticamente a mudanças em <code>data</code> e
        <code>options</code>. Para forçar redesenho com novas séries, troque a referência (não mute o
        array existente).
      </div>
    </div>
  </div>
</template>

<style scoped>
.callout {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.25);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: 1.5rem;
}
.callout svg { flex-shrink: 0; margin-top: 2px; color: var(--color-accent-2); }
.callout strong { color: var(--color-text); }
</style>
