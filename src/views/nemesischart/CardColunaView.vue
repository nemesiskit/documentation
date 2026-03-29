<script setup>
import { ref, computed } from 'vue'
import { CardColuna } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const tema = ref('Light')
const modo = ref('simples')
const moeda = ref(false)
const corPaleta = ref('#2563eb')

const dadosSimples = [
  { rotulo: 'Jan', quantidade: 42 },
  { rotulo: 'Fev', quantidade: 78 },
  { rotulo: 'Mar', quantidade: 55 },
  { rotulo: 'Abr', quantidade: 90 },
  { rotulo: 'Mai', quantidade: 63 },
  { rotulo: 'Jun', quantidade: 88 },
]

const dadosDual = [
  { rotulo: 'Jan', meta: 60, realizado: 42 },
  { rotulo: 'Fev', meta: 80, realizado: 78 },
  { rotulo: 'Mar', meta: 70, realizado: 55 },
  { rotulo: 'Abr', meta: 85, realizado: 90 },
  { rotulo: 'Mai', meta: 75, realizado: 63 },
  { rotulo: 'Jun', meta: 90, realizado: 88 },
]

const segmentosDual = [
  { key: 'meta', label: 'Meta' },
  { key: 'realizado', label: 'Realizado' },
]

const dadosAtivos = computed(() => modo.value === 'dual' ? dadosDual : dadosSimples)

const props = [
  { name: 'dados', type: 'Array', default: 'exemplo', description: 'Array de objetos com rotulo e quantidade (modo simples) ou chaves personalizadas (modo dual).' },
  { name: 'corPaleta', type: 'String', default: "'#1D4ED8'", description: 'Cor base para geração da paleta. No modo simples gera N variações; no dual usa 2 tons.' },
  { name: 'moeda', type: 'Boolean', default: 'false', description: 'Formata os valores como BRL (R$) nos tooltips.' },
  { name: 'modo', type: "'simples' | 'dual'", default: "'simples'", description: 'Simples: uma barra por rótulo. Dual: barras sobrepostas para comparação.' },
  { name: 'segmentos', type: 'Array<{ key, label }>', default: 'padrão', description: 'Define as chaves e rótulos dos campos no modo dual.' },
  { name: 'segmentoTooltip', type: 'Object', default: 'null', description: 'Campo extra exibido apenas no tooltip no modo dual.' },
  { name: 'tema', type: "'Light' | 'Dark' | 'Transparent'", default: "'Light'", description: 'Tema visual (herdado do CardBase).' },
  { name: 'titulo', type: 'String', default: "''", description: 'Título do card.' },
  { name: 'descricao', type: 'String', default: "''", description: 'Subtítulo do card.' },
  { name: 'legenda', type: 'String', default: '—', description: 'Rótulo da categoria.' },
  { name: 'botaoVisivel', type: 'Boolean', default: 'false', description: 'Exibir link de ação.' },
  { name: 'textoBotao', type: 'String', default: "'Ver Todos'", description: 'Texto do link.' },
]

const simpleCode = `<script setup>
import { CardColuna } from 'nemesischart'

const dados = [
  { rotulo: 'Jan', quantidade: 42 },
  { rotulo: 'Fev', quantidade: 78 },
  { rotulo: 'Mar', quantidade: 55 },
]
<\/script>

<template>
  <CardColuna
    titulo="Vendas Mensais"
    descricao="Primeiro trimestre"
    legenda="Vendas"
    :dados="dados"
    corPaleta="#2563eb"
  />
</template>`

const dualCode = `<script setup>
import { CardColuna } from 'nemesischart'

const dados = [
  { rotulo: 'Jan', meta: 60, realizado: 42 },
  { rotulo: 'Fev', meta: 80, realizado: 78 },
  { rotulo: 'Mar', meta: 70, realizado: 55 },
]

const segmentos = [
  { key: 'meta', label: 'Meta' },
  { key: 'realizado', label: 'Realizado' },
]
<\/script>

<template>
  <CardColuna
    titulo="Meta vs Realizado"
    :dados="dados"
    modo="dual"
    :segmentos="segmentos"
    corPaleta="#2563eb"
  />
</template>`

const moedaCode = `<CardColuna
  titulo="Receita"
  :dados="dados"
  :moeda="true"
  corPaleta="#22c55e"
/>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardColuna</h1>
    <p>
      Gráfico de barras verticais com suporte a modo simples (uma barra por dado) e
      modo dual (barras sobrepostas para comparação). Inclui tooltips customizados,
      animações e formatação de moeda.
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
      <CardColuna
        :tema="tema"
        titulo="Vendas Mensais"
        descricao="Janeiro — Junho 2025"
        legenda="Vendas"
        :dados="dadosAtivos"
        :modo="modo"
        :segmentos="modo === 'dual' ? segmentosDual : undefined"
        :corPaleta="corPaleta"
        :moeda="moeda"
        :botaoVisivel="true"
      />
    </div>

    <h2>Modo simples</h2>
    <p>O formato padrão espera objetos com <code>rotulo</code> e <code>quantidade</code>.</p>
    <CodeBlock :code="simpleCode" language="vue" />

    <h2>Modo dual</h2>
    <p>Exibe barras sobrepostas para comparar dois valores. Defina as chaves com <code>segmentos</code>.</p>
    <CodeBlock :code="dualCode" language="vue" />

    <h2>Formatação de moeda</h2>
    <CodeBlock :code="moedaCode" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />

    <h2>Eventos</h2>
    <div class="table-wrap">
      <table class="props-table">
        <thead><tr><th>Evento</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td><span class="prop-name">@botao-click</span></td><td>Emitido ao clicar no botão de ação.</td></tr>
        </tbody>
      </table>
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
.table-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius); margin-bottom: 1.5rem; }
</style>
