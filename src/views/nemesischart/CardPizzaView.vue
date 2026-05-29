<script setup>
import { ref } from 'vue'
import { CardPizza } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import RefTable from '@/components/RefTable.vue'

const tema = ref('light')
const direcao = ref('right')
const cutout = ref('70%')

const data = [
  { rotulo: 'Desktop', quantidade: 4800 },
  { rotulo: 'Mobile',  quantidade: 3200 },
  { rotulo: 'Tablet',  quantidade: 1450 },
  { rotulo: 'Outros',  quantidade: 320 },
]

const props = [
  { name: 'data', type: 'Array<{ rotulo, quantidade }>', default: 'amostra', description: 'Fatias do doughnut.' },
  { name: 'cores', type: 'Array<String>', default: 'paleta padrão', description: 'Cores das fatias (em ordem).' },
  { name: 'cutout', type: 'String | Number', default: "'70%'", description: 'Espessura do anel (0% = pizza, 80% = donut fino).' },
  { name: 'direcao', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Posição da tabela lateral em relação ao gráfico.' },
  { name: 'mostrarCabecalho', type: 'Boolean', default: 'true', description: 'Exibe o cabeçalho da tabela.' },
  { name: 'rotuloCategoria / rotuloQuantidade', type: 'String', default: "'Categoria' / 'Quantidade'", description: 'Títulos das colunas da tabela.' },
  { name: 'itensClicaveis', type: 'Boolean', default: 'false', description: 'Torna as fatias/linhas da tabela clicáveis e emite @itemClicado.' },
  { name: 'tema', type: "'light' | 'dark'", default: "'light'", description: 'Paleta base.' },
  { name: 'tipoValor / locale / moeda', type: 'String', default: 'numero / pt-BR / BRL', description: 'Formatação dos valores.' },
  { name: 'height', type: 'String | Number', default: '260', description: 'Altura do gráfico em px.' },
  { name: 'legenda / sublegenda / titulo / descricao', type: 'String', default: 'null', description: 'Cabeçalho do card.' },
  { name: 'botaoVisivel / textoBotao', type: 'Boolean / String', default: "false / 'Ver mais'", description: 'Botão de ação no topo direito.' },
  { name: 'corFundo / corTexto / corBorda', type: 'String', default: '—', description: 'Overrides do tema.' },
  { name: 'borderRadius / sombra', type: 'String | Number', default: '—', description: 'Customização do card.' },
  { name: 'exportar / nomeArquivoExport', type: 'Boolean / String', default: "false / 'card-pizza.png'", description: 'Exportação como PNG.' },
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
import { CardPizza } from 'nemesischart'

const data = [
  { rotulo: 'Desktop', quantidade: 4800 },
  { rotulo: 'Mobile',  quantidade: 3200 },
  { rotulo: 'Tablet',  quantidade: 1450 },
]
<\/script>

<template>
  <CardPizza
    legenda="Dispositivos"
    titulo="9.770"
    descricao="sessões"
    tipoValor="numero"
    cutout="70%"
    :data="data"
  />
</template>`

const pizzaCheiaCode = `<!-- cutout=0 transforma o donut em pizza cheia -->
<CardPizza
  legenda="Mix"
  cutout="0%"
  direcao="bottom"
  :data="data"
/>`

const clicavelCode = `<script setup>
import { CardPizza } from 'nemesischart'

function aoClicar(item) {
  // item = { rotulo: 'Mobile', quantidade: 3200 }
  console.log('Categoria selecionada:', item.rotulo)
}
<\/script>

<template>
  <CardPizza
    legenda="Dispositivos"
    :data="data"
    :itensClicaveis="true"
    @itemClicado="aoClicar"
  />
</template>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardPizza</h1>
    <p>
      Doughnut (ou pizza cheia) com tabela lateral opcional. Use para participação percentual de
      categorias — dispositivos, canais, fontes de tráfego, mix de produtos.
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
        <label class="control-label">Cutout:</label>
        <div class="control-group">
          <button v-for="c in ['0%','40%','70%','85%']" :key="c" class="control-btn" :class="{ active: cutout === c }" @click="cutout = c">{{ c }}</button>
        </div>
      </div>
    </div>

    <div class="demo-section" :class="{ 'demo-dark': tema === 'dark' }">
      <CardPizza
        :tema="tema"
        legenda="Dispositivos"
        sublegenda="Últimos 30 dias"
        titulo="9.770"
        descricao="sessões"
        :data="data"
        :direcao="direcao"
        :cutout="cutout"
        :botaoVisivel="true"
      />
    </div>

    <h2>Uso básico (donut)</h2>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Pizza cheia</h2>
    <CodeBlock :code="pizzaCheiaCode" language="vue" />

    <h2>Itens clicáveis</h2>
    <p>Com <code>itensClicaveis</code>, cada fatia (e a linha correspondente na tabela) dispara <code>@itemClicado</code> com o item selecionado:</p>
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
