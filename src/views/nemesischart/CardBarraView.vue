<script setup>
import { ref, computed } from 'vue'
import { CardBarra } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const tema = ref('Light')
const modo = ref('simples')
const corPaleta = ref('#2563eb')

const dadosSimples = [
  { rotulo: 'Produto A', quantidade: 320 },
  { rotulo: 'Produto B', quantidade: 210 },
  { rotulo: 'Produto C', quantidade: 480 },
  { rotulo: 'Produto D', quantidade: 175 },
  { rotulo: 'Produto E', quantidade: 390 },
]

const dadosDual = [
  { rotulo: 'Produto A', meta: 400, realizado: 320 },
  { rotulo: 'Produto B', meta: 250, realizado: 210 },
  { rotulo: 'Produto C', meta: 450, realizado: 480 },
  { rotulo: 'Produto D', meta: 200, realizado: 175 },
  { rotulo: 'Produto E', meta: 360, realizado: 390 },
]

const segmentosDual = [
  { key: 'meta', label: 'Meta' },
  { key: 'realizado', label: 'Realizado' },
]

const dadosAtivos = computed(() => modo.value === 'dual' ? dadosDual : dadosSimples)

const props = [
  { name: 'dados', type: 'Array', default: 'exemplo', description: 'Array com rotulo e quantidade (simples) ou chaves customizadas (dual).' },
  { name: 'corPaleta', type: 'String', default: "'#1D4ED8'", description: 'Cor base para a paleta de cores.' },
  { name: 'moeda', type: 'Boolean', default: 'false', description: 'Formata valores como BRL nos tooltips.' },
  { name: 'modo', type: "'simples' | 'dual'", default: "'simples'", description: 'Modo de renderização: barra simples ou comparação dual.' },
  { name: 'segmentos', type: 'Array<{ key, label }>', default: 'padrão', description: 'Chaves e rótulos para o modo dual.' },
  { name: 'tema', type: "'Light' | 'Dark' | 'Transparent'", default: "'Light'", description: 'Tema visual.' },
  { name: 'titulo', type: 'String', default: "''", description: 'Título do card.' },
  { name: 'descricao', type: 'String', default: "''", description: 'Subtítulo do card.' },
]

const code = `<script setup>
import { CardBarra } from 'nemesischart'

const dados = [
  { rotulo: 'Produto A', quantidade: 320 },
  { rotulo: 'Produto B', quantidade: 210 },
  { rotulo: 'Produto C', quantidade: 480 },
]
<\/script>

<template>
  <CardBarra
    titulo="Vendas por Produto"
    descricao="Top produtos do mês"
    :dados="dados"
    corPaleta="#2563eb"
  />
</template>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardBarra</h1>
    <p>
      Gráfico de barras horizontais. Funciona como o CardColuna mas com orientação
      invertida — ideal para rótulos longos ou rankings.
      Suporta os modos simples e dual com a mesma API.
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
        <label class="control-label">Modo:</label>
        <div class="control-group">
          <button v-for="m in ['simples', 'dual']" :key="m" class="control-btn" :class="{ active: modo === m }" @click="modo = m">{{ m }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Cor:</label>
        <input type="color" v-model="corPaleta" class="color-input" />
        <span class="color-value">{{ corPaleta }}</span>
      </div>
    </div>
    <div class="demo-section" :class="{ 'demo-dark': tema === 'Dark', 'demo-transparent': tema === 'Transparent' }">
      <CardBarra
        :tema="tema"
        titulo="Vendas por Produto"
        descricao="Top produtos — Março 2025"
        legenda="Produtos"
        :dados="dadosAtivos"
        :modo="modo"
        :segmentos="modo === 'dual' ? segmentosDual : undefined"
        :corPaleta="corPaleta"
        :botaoVisivel="true"
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
        O CardBarra compartilha exatamente a mesma API que o CardColuna.
        A diferença está somente na orientação das barras.
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
