<script setup>
import { ref } from 'vue'
import { CardPolar } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import RefTable from '@/components/RefTable.vue'

const tema = ref('light')
const direcao = ref('right')
const mostrarLinhasGrade = ref(true)

const data = [
  { rotulo: 'Marketing',  quantidade: 4200 },
  { rotulo: 'Vendas',     quantidade: 3100 },
  { rotulo: 'Suporte',    quantidade: 2450 },
  { rotulo: 'Pesquisa',   quantidade: 1800 },
  { rotulo: 'Operações',  quantidade: 1250 },
]

const props = [
  { name: 'data', type: 'Array<{ rotulo, quantidade }>', default: 'amostra', description: 'Fatias polares.' },
  { name: 'cores', type: 'Array<String>', default: 'paleta padrão', description: 'Cores das fatias.' },
  { name: 'mostrarLinhasGrade', type: 'Boolean', default: 'true', description: 'Exibe as linhas radiais e angulares do grid.' },
  { name: 'direcao', type: "'top' | 'bottom' | 'left' | 'right'", default: "'right'", description: 'Posição da tabela lateral em relação ao gráfico.' },
  { name: 'mostrarCabecalho', type: 'Boolean', default: 'true', description: 'Exibe o cabeçalho (Categoria/Quantidade) da tabela.' },
  { name: 'rotuloCategoria / rotuloQuantidade', type: 'String', default: "'Categoria' / 'Quantidade'", description: 'Títulos das colunas da tabela.' },
  { name: 'itensClicaveis', type: 'Boolean', default: 'false', description: 'Torna as fatias/linhas da tabela clicáveis e emite @itemClicado.' },
  { name: 'tema', type: "'light' | 'dark'", default: "'light'", description: 'Paleta base.' },
  { name: 'corDetalhes', type: 'String', default: "'#3B82F6'", description: 'Cor de destaque do card.' },
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
  { name: '@itemClicado', description: 'Emitido ao clicar numa fatia/linha quando itensClicaveis está ativo. Recebe o item ({ rotulo, quantidade, ... }).' },
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

const clicavelCode = `<CardPolar
  legenda="Investimento por área"
  :data="data"
  :itensClicaveis="true"
  @itemClicado="(item) => filtrarPor(item.rotulo)"
/>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardPolar</h1>
    <p>
      Gráfico de área polar com tabela lateral opcional, ideal para comparar categorias em escala
      radial — investimentos por área, distribuição de horas, performance multi-dimensional.
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
        :mostrarLinhasGrade="mostrarLinhasGrade"
        :botaoVisivel="true"
      />
    </div>

    <h2>Uso básico</h2>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Itens clicáveis</h2>
    <p>Ative <code>itensClicaveis</code> para tornar fatias e linhas da tabela interativas via <code>@itemClicado</code>:</p>
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
.control-btn.active { background: rgba(124,111,205,0.15); border-color: rgba(124,111,205,0.4); color: var(--color-accent-2); }
</style>
