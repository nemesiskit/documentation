<script setup>
import { ref } from 'vue'
import { CardLinhas } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const tema = ref('Light')
const moeda = ref(false)
const corDetalhe = ref('#2563eb')

const dados = [
  { rotulo: 'Jan', quantidade: 12400 },
  { rotulo: 'Fev', quantidade: 18900 },
  { rotulo: 'Mar', quantidade: 14200 },
  { rotulo: 'Abr', quantidade: 22100 },
  { rotulo: 'Mai', quantidade: 19800 },
  { rotulo: 'Jun', quantidade: 28500 },
  { rotulo: 'Jul', quantidade: 24300 },
  { rotulo: 'Ago', quantidade: 31000 },
]

const props = [
  { name: 'dados', type: 'Array<{ rotulo, quantidade }>', default: 'exemplo', description: 'Pontos da linha com rótulo e valor.' },
  { name: 'corDetalhe', type: 'String', default: 'Obrigatório', description: 'Cor da linha e do gradiente de preenchimento.' },
  { name: 'moeda', type: 'Boolean', default: 'false', description: 'Formata o eixo Y e tooltips como BRL.' },
  { name: 'legendaGraficoVisivel', type: 'Boolean', default: 'false', description: 'Exibir legenda abaixo do gráfico.' },
  { name: 'opcoes', type: 'Object', default: '{}', description: 'Opções extras do Chart.js para customização avançada.' },
  { name: 'minHeight', type: 'String', default: "'250px'", description: 'Altura mínima do canvas.' },
  { name: 'tema', type: "'Light' | 'Dark' | 'Transparent'", default: "'Light'", description: 'Tema visual.' },
  { name: 'titulo', type: 'String', default: "''", description: 'Título do card.' },
  { name: 'descricao', type: 'String', default: "''", description: 'Subtítulo do card.' },
]

const code = `<script setup>
import { CardLinhas } from 'nemesischart'

const dados = [
  { rotulo: 'Jan', quantidade: 12400 },
  { rotulo: 'Fev', quantidade: 18900 },
  { rotulo: 'Mar', quantidade: 14200 },
  { rotulo: 'Abr', quantidade: 22100 },
]
<\/script>

<template>
  <CardLinhas
    titulo="Receita Acumulada"
    descricao="Janeiro — Abril 2025"
    :dados="dados"
    corDetalhe="#2563eb"
    :moeda="true"
  />
</template>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardLinhas</h1>
    <p>
      Gráfico de linhas com preenchimento gradiente. Inclui tooltip customizado com
      indicador vertical, animação de entrada via scroll e formatação de moeda no eixo Y.
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
        <label class="control-label">Moeda:</label>
        <div class="control-group">
          <button class="control-btn" :class="{ active: moeda }" @click="moeda = !moeda">{{ moeda ? 'Sim' : 'Não' }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Cor:</label>
        <input type="color" v-model="corDetalhe" class="color-input" />
        <span class="color-value">{{ corDetalhe }}</span>
      </div>
    </div>
    <div class="demo-section" :class="{ 'demo-dark': tema === 'Dark', 'demo-transparent': tema === 'Transparent' }">
      <CardLinhas
        :tema="tema"
        titulo="Receita Mensal"
        descricao="Jan — Ago 2025"
        legenda="Financeiro"
        :dados="dados"
        :corDetalhe="corDetalhe"
        :moeda="moeda"
      />
    </div>

    <h2>Uso</h2>
    <CodeBlock :code="code" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />

    <div class="callout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        O CardLinhas usa <strong style="color: var(--color-text)">IntersectionObserver</strong> para
        inicializar o gráfico apenas quando ele entra na viewport, otimizando a performance em páginas longas.
      </div>
    </div>
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
.callout { display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(124,111,205,0.08); border: 1px solid rgba(124,111,205,0.25); border-radius: var(--radius); padding: 1rem 1.25rem; font-size: 0.875rem; color: var(--color-text-muted); margin-top: 1.5rem; }
.callout svg { flex-shrink: 0; margin-top: 2px; color: var(--color-accent-2); }
</style>
