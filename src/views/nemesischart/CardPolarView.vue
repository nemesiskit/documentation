<script setup>
import { ref } from 'vue'
import { CardPolar } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import RefTable from '@/components/RefTable.vue'

const tema = ref('light')
const direcao = ref('right')
const mostrarLinhasGrade = ref(true)
const corDetalhes = ref('#3B82F6')

const data = [
  { rotulo: 'Marketing',  quantidade: 4200 },
  { rotulo: 'Vendas',     quantidade: 3100 },
  { rotulo: 'Suporte',    quantidade: 2450 },
  { rotulo: 'Pesquisa',   quantidade: 1800 },
  { rotulo: 'Operações',  quantidade: 1250 },
]

const props = [
  { name: 'data', type: 'Array<{ rotulo, quantidade, cor?, descricao? }>', default: 'amostra', description: 'Setores polares. cor sobrescreve a paleta; descricao vira tooltip da linha da tabela.' },
  { name: 'corDetalhes', type: 'String', default: "'#3B82F6'", description: 'Cor base: a paleta dos setores é gerada em tons derivados dela.' },
  { name: 'mostrarLinhasGrade', type: 'Boolean', default: 'true', description: 'Exibe as linhas radiais e angulares do grid.' },
  { name: 'direcao', type: "'top' | 'bottom' | 'left' | 'right'", default: "'right'", description: 'Posição da tabela lateral em relação ao gráfico.' },
  { name: 'mostrarCabecalho', type: 'Boolean', default: 'true', description: 'Exibe o cabeçalho (Categoria/Quantidade) da tabela.' },
  { name: 'rotuloCategoria / rotuloQuantidade', type: 'String', default: "'Categoria' / 'Quantidade'", description: 'Títulos das colunas da tabela.' },
  { name: 'itensClicaveis', type: 'Boolean', default: 'false', description: 'Torna os setores e linhas da tabela clicáveis; o card passa a emitir @itemClicado.' },
  { name: 'detalheTooltip', type: '(item, index) => String | String[]', default: 'null', description: 'Texto(s) extra(s) exibidos no tooltip do gráfico, abaixo do valor.' },
  { name: 'tooltipLinha', type: '(item, index) => String', default: 'null', description: 'Tooltip nativo (title) da linha da tabela lateral. Quando omitido, usa item.descricao.' },
  { name: 'tema', type: "'light' | 'dark'", default: "'light'", description: 'Paleta base.' },
  { name: 'tipoValor / locale / moeda', type: 'String', default: 'numero / pt-BR / BRL', description: 'Formatação dos valores.' },
  { name: 'height', type: 'String | Number', default: '260', description: 'Altura do gráfico em px.' },
  { name: 'legenda / sublegenda / titulo / descricao', type: 'String', default: 'null', description: 'Cabeçalho do card.' },
  { name: 'botaoVisivel / textoBotao', type: 'Boolean / String', default: "false / 'Ver mais'", description: 'Botão de ação no topo direito.' },
  { name: 'corFundo / corTexto / corBorda', type: 'String', default: '—', description: 'Overrides do tema.' },
  { name: 'borderRadius / sombra', type: 'String | Number', default: '—', description: 'Customização do card.' },
  { name: 'exportar / nomeArquivoExport', type: 'Boolean / String', default: "false / 'card-polar.png'", description: 'Exportação como PNG.' },
]

const events = [
  { name: '@botaoAcao', description: 'Emitido ao clicar no botão "Ver mais".' },
  { name: '@exportado', description: 'Emitido após o PNG ser gerado e baixado.' },
  { name: '@itemClicado', description: 'Emitido ao clicar num setor ou linha quando itensClicaveis está ativo. Recebe { item, index, cor }.' },
]

const slots = [
  { name: '#legenda', description: 'Substitui a legenda (texto superior).' },
  { name: '#sublegenda', description: 'Substitui a sublegenda.' },
  { name: '#titulo', description: 'Substitui o valor de destaque.' },
  { name: '#descricao', description: 'Substitui a descrição do título.' },
  { name: '#actions', description: 'Área superior direita do card (substitui o botão padrão).' },
  { name: '#footer', description: 'Conteúdo extra abaixo do gráfico.' },
]

const basicCode = `<script setup>
import { CardPolar } from 'nemesischart'

const data = [
  { rotulo: 'Marketing', quantidade: 4200 },
  { rotulo: 'Vendas',    quantidade: 3100 },
  { rotulo: 'Suporte',   quantidade: 2450 },
]
<\/script>

<template>
  <CardPolar
    legenda="Investimento"
    titulo="R$ 9.7k"
    tipoValor="moeda"
    :data="data"
    direcao="right"
  />
</template>`

const coresCode = `<!-- A paleta dos setores nasce da cor base -->
<CardPolar corDetalhes="#8B5CF6" :data="data" />

<!-- Um setor pode fixar a própria cor -->
<CardPolar
  :data="[
    { rotulo: 'Marketing', quantidade: 4200 },
    { rotulo: 'Vendas',    quantidade: 3100, cor: '#F59E0B' },
  ]"
/>`

const clicavelCode = `<CardPolar
  legenda="Investimento por área"
  :data="data"
  :itensClicaveis="true"
  @itemClicado="({ item }) => filtrarPor(item.rotulo)"
/>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardPolar</h1>
    <p class="doc-lead">
      Para comparar categorias em escala radial — investimento por área, distribuição de horas,
      desempenho multi-dimensional — o <code>CardPolar</code> desenha um gráfico de área polar com
      tabela lateral opcional.
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
        <label class="control-label">Tabela em:</label>
        <div class="control-group">
          <button v-for="d in ['top','right','bottom','left']" :key="d" class="control-btn" :class="{ active: direcao === d }" @click="direcao = d">{{ d }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Grid:</label>
        <div class="control-group">
          <button class="control-btn" :class="{ active: mostrarLinhasGrade }" @click="mostrarLinhasGrade = !mostrarLinhasGrade">{{ mostrarLinhasGrade ? 'visível' : 'oculto' }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Cor base:</label>
        <input type="color" v-model="corDetalhes" class="color-input" />
        <span class="color-value">{{ corDetalhes }}</span>
      </div>
    </div>

    <div class="demo-section" :class="{ 'demo-dark': tema === 'dark' }">
      <CardPolar
        :tema="tema"
        legenda="Investimento por área"
        sublegenda="2026"
        titulo="R$ 12.8k"
        descricao="total alocado"
        tipoValor="moeda"
        :data="data"
        :direcao="direcao"
        :corDetalhes="corDetalhes"
        :mostrarLinhasGrade="mostrarLinhasGrade"
        :botaoVisivel="true"
      />
    </div>

    <h2>Comparando categorias em escala radial</h2>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Definindo as cores dos setores</h2>
    <p>
      Assim como no <code>CardPizza</code>, os setores recebem tons derivados de
      <code>corDetalhes</code>, e cada item pode fixar a própria <code>cor</code>:
    </p>
    <CodeBlock :code="coresCode" language="vue" />

    <h2>Reagindo ao clique nos setores</h2>
    <p>
      Ative <code>itensClicaveis</code> para tornar setores e linhas da tabela interativos. O
      evento <code>@itemClicado</code> entrega <code>{ item, index, cor }</code>:
    </p>
    <CodeBlock :code="clicavelCode" language="vue" />

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
.control-label { font-size: 0.8rem; color: var(--color-text-muted); min-width: 80px; }
.control-group { display: flex; gap: 0.35rem; }
.control-btn { padding: 0.3rem 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-muted); font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.control-btn.active { background: var(--color-accent-soft); border-color: var(--color-accent-border); color: var(--color-accent-2); }
.color-input { width: 32px; height: 28px; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; background: transparent; }
.color-value { font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-text-muted); }
</style>
