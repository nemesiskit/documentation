<script setup>
import { ref } from 'vue'
import { CardBarra } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import RefTable from '@/components/RefTable.vue'

const tema = ref('light')
const orientacao = ref('vertical')
const empilhado = ref(false)
const corDetalhes = ref('#10B981')

const dataSimples = [
  { rotulo: 'Jan', quantidade: 42 },
  { rotulo: 'Fev', quantidade: 78 },
  { rotulo: 'Mar', quantidade: 55 },
  { rotulo: 'Abr', quantidade: 90 },
  { rotulo: 'Mai', quantidade: 63 },
  { rotulo: 'Jun', quantidade: 88 },
]

const series = [
  { nome: 'Receita',    data: [40, 60, 55, 80, 70, 90] },
  { nome: 'Despesa',    data: [25, 35, 40, 55, 50, 65] },
  { nome: 'Lucro',      data: [15, 25, 15, 25, 20, 25] },
]

const props = [
  { name: 'data', type: 'Array<{ rotulo, quantidade }>', default: 'amostra', description: 'Dados em série simples.' },
  { name: 'series', type: 'Array<{ nome, data, cor? }>', default: 'null', description: 'Múltiplas séries (sobrescreve data).' },
  { name: 'orientacao', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Direção das barras.' },
  { name: 'empilhado', type: 'Boolean', default: 'false', description: 'Empilha as séries em vez de agrupá-las lado a lado.' },
  { name: 'corDetalhes', type: 'String', default: "'#3B82F6'", description: 'Cor primária quando há apenas uma série.' },
  { name: 'cores', type: 'Array<String>', default: 'paleta padrão', description: 'Cores aplicadas em ordem nas séries.' },
  { name: 'corHover', type: 'String', default: 'null', description: 'Cor da barra ao passar o mouse.' },
  { name: 'mostrarLegendaSeries', type: 'Boolean', default: 'true', description: 'Exibe a legenda quando há múltiplas séries.' },
  { name: 'larguraBarra', type: 'String | Number', default: '0.92', description: 'Percentual de largura da barra (Chart.js barPercentage).' },
  { name: 'raioBarra', type: 'Number', default: '6', description: 'Raio da borda das barras em px.' },
  { name: 'linhasReferencia', type: 'Object | Array', default: 'null', description: 'Linhas de meta sobre o gráfico.' },
  { name: 'tema', type: "'light' | 'dark'", default: "'light'", description: 'Paleta base.' },
  { name: 'direcao', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posição do header em relação ao gráfico.' },
  { name: 'tipoValor / locale / moeda', type: 'String', default: 'numero / pt-BR / BRL', description: 'Formatação dos valores.' },
  { name: 'height', type: 'String | Number', default: '280', description: 'Altura do gráfico em px.' },
  { name: 'legenda / sublegenda / titulo / descricao', type: 'String', default: 'null', description: 'Cabeçalho do card.' },
  { name: 'exportar / nomeArquivoExport', type: 'Boolean / String', default: "false / 'card-barra.png'", description: 'Exportação como PNG.' },
]

const events = [
  { name: '@botaoAcao', description: 'Emitido ao clicar no botão "Ver mais" (quando botaoVisivel está ativo).' },
  { name: '@exportado', description: 'Emitido após o PNG ser gerado e baixado (quando exportar está ativo).' },
]

const slots = [
  { name: '#legenda', description: 'Substitui a legenda (texto superior).' },
  { name: '#sublegenda', description: 'Substitui a sublegenda.' },
  { name: '#titulo', description: 'Substitui o valor de destaque.' },
  { name: '#descricao', description: 'Substitui a descrição do título.' },
  { name: '#actions', description: 'Área superior direita do card (substitui o botão padrão).' },
  { name: '#footer', description: 'Conteúdo extra abaixo do gráfico.' },
]

const simpleCode = `<script setup>
import { CardBarra } from 'nemesischart'

const data = [
  { rotulo: 'Jan', quantidade: 42 },
  { rotulo: 'Fev', quantidade: 78 },
  { rotulo: 'Mar', quantidade: 55 },
]
<\/script>

<template>
  <CardBarra
    legenda="Vendas"
    titulo="1.160"
    orientacao="vertical"
    corDetalhes="#10B981"
    :data="data"
  />
</template>`

const seriesCode = `<script setup>
import { CardBarra } from 'nemesischart'

const series = [
  { nome: 'Receita', data: [40, 60, 55, 80, 70, 90] },
  { nome: 'Despesa', data: [25, 35, 40, 55, 50, 65] },
  { nome: 'Lucro',   data: [15, 25, 15, 25, 20, 25] },
]

const data = [
  { rotulo: 'Jan' }, { rotulo: 'Fev' }, { rotulo: 'Mar' },
  { rotulo: 'Abr' }, { rotulo: 'Mai' }, { rotulo: 'Jun' },
]
<\/script>

<template>
  <CardBarra
    legenda="Resultado"
    titulo="Comparativo"
    :data="data"
    :series="series"
    :empilhado="false"
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
      Barras verticais ou horizontais, com suporte a séries múltiplas e empilhamento. Use
      <code>data</code> para uma única série ou <code>series</code> para comparar várias.
    </p>

    <h2>Demonstração</h2>

    <div class="demo-controls">
      <div class="control-row">
        <label class="control-label">Tema:</label>
        <div class="control-group">
          <button v-for="t in ['light', 'dark']" :key="t" class="control-btn" :class="{ active: tema === t }" @click="tema = t">{{ t }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Orientação:</label>
        <div class="control-group">
          <button v-for="o in ['vertical', 'horizontal']" :key="o" class="control-btn" :class="{ active: orientacao === o }" @click="orientacao = o">{{ o }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Empilhado:</label>
        <div class="control-group">
          <button class="control-btn" :class="{ active: empilhado }" @click="empilhado = !empilhado">{{ empilhado ? 'sim' : 'não' }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Cor:</label>
        <input type="color" v-model="corDetalhes" class="color-input" />
        <span class="color-value">{{ corDetalhes }}</span>
      </div>
    </div>

    <div class="demo-section" :class="{ 'demo-dark': tema === 'dark' }">
      <CardBarra
        :tema="tema"
        legenda="Vendas Mensais"
        sublegenda="Jan — Jun 2026"
        titulo="416"
        descricao="total no semestre"
        :corDetalhes="corDetalhes"
        :data="dataSimples"
        :orientacao="orientacao"
        :empilhado="empilhado"
        :botaoVisivel="true"
      />
    </div>

    <h2>Série simples</h2>
    <CodeBlock :code="simpleCode" language="vue" />

    <h2>Múltiplas séries</h2>
    <p>Passe a prop <code>series</code> para comparar várias séries no mesmo gráfico. Combine com <code>empilhado</code> para mostrar acumulado.</p>
    <CodeBlock :code="seriesCode" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />

    <h2>Eventos</h2>
    <RefTable :columns="['Evento', 'Descrição']" :rows="events" />

    <h2>Slots</h2>
    <RefTable :columns="['Slot', 'Descrição']" :rows="slots" />
  </div>
</template>

<style scoped>
.demo-controls { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
.control-row { display: flex; align-items: center; gap: 0.75rem; }
.control-label { font-size: 0.8rem; color: var(--color-text-muted); min-width: 90px; }
.control-group { display: flex; gap: 0.35rem; }
.control-btn { padding: 0.3rem 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-muted); font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.control-btn.active { background: rgba(124,111,205,0.15); border-color: rgba(124,111,205,0.4); color: var(--color-accent-2); }
.color-input { width: 32px; height: 28px; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; background: transparent; }
.color-value { font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-text-muted); }
</style>
