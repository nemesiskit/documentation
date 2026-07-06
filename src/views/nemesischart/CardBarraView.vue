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

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
function serie(valores) {
  return valores.map((quantidade, i) => ({ rotulo: meses[i], quantidade }))
}

const series = [
  { nome: 'Receita', dados: serie([40, 60, 55, 80, 70, 90]) },
  { nome: 'Despesa', dados: serie([25, 35, 40, 55, 50, 65]) },
  { nome: 'Lucro',   dados: serie([15, 25, 15, 25, 20, 25]) },
]

const props = [
  { name: 'data', type: 'Array<{ rotulo, quantidade }>', default: 'amostra', description: 'Dados em série única.' },
  { name: 'series', type: 'Array<{ nome, dados, cor? }>', default: 'null', description: 'Múltiplas séries (têm prioridade sobre data). Cada dados é um array de { rotulo, quantidade }; os rótulos do eixo vêm da primeira série.' },
  { name: 'orientacao', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Direção das barras.' },
  { name: 'empilhado', type: 'Boolean', default: 'false', description: 'Empilha as séries em vez de agrupá-las lado a lado.' },
  { name: 'corDetalhes', type: 'String', default: "'#3B82F6'", description: 'Cor das barras quando há apenas uma série.' },
  { name: 'cores', type: 'Array<String>', default: 'paleta padrão', description: 'Cores aplicadas em ordem às séries (cada série pode sobrescrever com cor).' },
  { name: 'corHover', type: 'String', default: 'null', description: 'Cor da barra ao passar o mouse.' },
  { name: 'detalheTooltip', type: '(item, index) => String | String[]', default: 'null', description: 'Texto(s) extra(s) exibidos no tooltip abaixo dos valores. Recebe o item da primeira série.' },
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

// Cada série tem nome, dados e, opcionalmente, cor.
// Os rótulos do eixo vêm da primeira série.
const series = [
  {
    nome: 'Receita',
    dados: [
      { rotulo: 'Jan', quantidade: 40 },
      { rotulo: 'Fev', quantidade: 60 },
      { rotulo: 'Mar', quantidade: 55 },
    ],
  },
  {
    nome: 'Despesa',
    cor: '#EF4444',
    dados: [
      { rotulo: 'Jan', quantidade: 25 },
      { rotulo: 'Fev', quantidade: 35 },
      { rotulo: 'Mar', quantidade: 40 },
    ],
  },
]
<\/script>

<template>
  <CardBarra
    legenda="Resultado"
    titulo="Comparativo"
    :series="series"
    :empilhado="false"
  />
</template>`

const tooltipCode = `<CardBarra
  legenda="Vendas"
  :data="[
    { rotulo: 'Jan', quantidade: 42, vendedores: 5 },
    { rotulo: 'Fev', quantidade: 78, vendedores: 7 },
  ]"
  :detalheTooltip="(item) => \`\${item.vendedores} vendedores ativos\`"
/>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardBarra</h1>
    <p class="doc-lead">
      Para comparar quantidades entre categorias ou períodos — vendas por mês, resultado por área —
      o <code>CardBarra</code> desenha barras verticais ou horizontais, agrupadas ou empilhadas,
      com uma ou várias séries.
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
        <label class="control-label">Cor:</label>
        <input type="color" v-model="corDetalhes" class="color-input" />
        <span class="color-value">{{ corDetalhes }}</span>
      </div>
    </div>

    <div class="demo-section" :class="{ 'demo-dark': tema === 'dark' }">
      <CardBarra
        :key="orientacao"
        :tema="tema"
        legenda="Vendas Mensais"
        sublegenda="Jan — Jun 2026"
        titulo="416"
        descricao="total no semestre"
        :corDetalhes="corDetalhes"
        :data="dataSimples"
        :orientacao="orientacao"
        :botaoVisivel="true"
      />
    </div>

    <h2>Comparando uma única série</h2>
    <CodeBlock :code="simpleCode" language="vue" />

    <h2>Comparando várias séries</h2>
    <p>
      Passe a prop <code>series</code> para desenhar várias séries no mesmo gráfico. Cada série
      carrega os próprios dados no formato <code>{ rotulo, quantidade }</code>, e os rótulos do
      eixo vêm da primeira. Ative <code>empilhado</code> para mostrar o acumulado:
    </p>

    <div class="demo-controls">
      <div class="control-row">
        <label class="control-label">Empilhado:</label>
        <div class="control-group">
          <button class="control-btn" :class="{ active: empilhado }" @click="empilhado = !empilhado">{{ empilhado ? 'sim' : 'não' }}</button>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <CardBarra
        legenda="Resultado"
        sublegenda="Jan — Jun 2026"
        titulo="Comparativo"
        :series="series"
        :empilhado="empilhado"
      />
    </div>

    <CodeBlock :code="seriesCode" language="vue" />

    <h2>Adicionando contexto ao tooltip</h2>
    <p>
      A prop <code>detalheTooltip</code> recebe o item original da primeira série — incluindo
      campos extras — e devolve linhas adicionais para o tooltip:
    </p>
    <CodeBlock :code="tooltipCode" language="vue" />

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
.control-btn.active { background: var(--color-accent-soft); border-color: var(--color-accent-border); color: var(--color-accent-2); }
.color-input { width: 32px; height: 28px; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; background: transparent; }
.color-value { font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-text-muted); }
</style>
