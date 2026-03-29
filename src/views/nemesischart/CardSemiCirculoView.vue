<script setup>
import { ref } from 'vue'
import { CardSemiCirculo } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const tema = ref('Light')
const legendaVisivel = ref(true)
const corPaleta = ref('#2563eb')

const dados = [
  { rotulo: 'Concluído', quantidade: 68 },
  { rotulo: 'Em andamento', quantidade: 22 },
  { rotulo: 'Pendente', quantidade: 10 },
]

const props = [
  { name: 'dados', type: 'Array<{ rotulo, quantidade }>', default: 'exemplo', description: 'Segmentos do arco.' },
  { name: 'corPaleta', type: 'String', default: "'#1D4ED8'", description: 'Cor base da paleta.' },
  { name: 'valor', type: 'String', default: "''", description: 'Texto principal na base do semicírculo.' },
  { name: 'valorDescricao', type: 'String', default: "''", description: 'Texto menor abaixo do valor.' },
  { name: 'labelRotulo', type: 'String', default: "'Rótulo'", description: 'Cabeçalho da coluna na legenda.' },
  { name: 'labelQuantidade', type: 'String', default: "'Qtd.'", description: 'Cabeçalho da coluna de valores.' },
  { name: 'legendaGraficoVisivel', type: 'Boolean', default: 'true', description: 'Exibir legenda lateral.' },
  { name: 'opcoes', type: 'Object', default: '{}', description: 'Opções Chart.js extras.' },
  { name: 'tema', type: "'Light' | 'Dark' | 'Transparent'", default: "'Light'", description: 'Tema visual.' },
  { name: 'titulo', type: 'String', default: "''", description: 'Título do card.' },
]

const code = `<script setup>
import { CardSemiCirculo } from 'nemesischart'

const dados = [
  { rotulo: 'Concluído', quantidade: 68 },
  { rotulo: 'Em andamento', quantidade: 22 },
  { rotulo: 'Pendente', quantidade: 10 },
]
<\/script>

<template>
  <CardSemiCirculo
    titulo="Progresso do Projeto"
    :dados="dados"
    corPaleta="#2563eb"
    valor="68%"
    valorDescricao="Concluído"
  />
</template>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardSemiCirculo</h1>
    <p>
      Gráfico de donut em formato de semicírculo (180°). Perfeito para
      representar progresso ou status com indicador central.
    </p>

    <h2>Demonstração</h2>
    <div class="demo-controls">
      <div class="control-row">
        <label class="control-label">Tema:</label>
        <div class="control-group">
          <button v-for="t in ['Light', 'Dark', 'Transparent']" :key="t" class="control-btn" :class="{ active: tema === t }" @click="tema = t">{{ t }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Legenda:</label>
        <div class="control-group">
          <button class="control-btn" :class="{ active: legendaVisivel }" @click="legendaVisivel = !legendaVisivel">{{ legendaVisivel ? 'Visível' : 'Oculta' }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Cor:</label>
        <input type="color" v-model="corPaleta" class="color-input" />
        <span class="color-value">{{ corPaleta }}</span>
      </div>
    </div>
    <div class="demo-section" :class="{ 'demo-dark': tema === 'Dark', 'demo-transparent': tema === 'Transparent' }">
      <CardSemiCirculo
        :tema="tema"
        titulo="Progresso do Projeto"
        descricao="Sprint atual"
        :dados="dados"
        :corPaleta="corPaleta"
        valor="68%"
        valorDescricao="Concluído"
        :legendaGraficoVisivel="legendaVisivel"
      />
    </div>

    <h2>Uso</h2>
    <CodeBlock :code="code" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />
  </div>
</template>

<style scoped>
.demo-controls { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
.control-row { display: flex; align-items: center; gap: 0.75rem; }
.control-label { font-size: 0.8rem; color: var(--color-text-muted); min-width: 50px; }
.control-group { display: flex; gap: 0.35rem; }
.control-btn { padding: 0.3rem 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-muted); font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.control-btn.active { background: rgba(124,111,205,0.15); border-color: rgba(124,111,205,0.4); color: var(--color-accent-2); }
.color-input { width: 32px; height: 28px; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; background: transparent; }
.color-value { font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-text-muted); }
</style>
