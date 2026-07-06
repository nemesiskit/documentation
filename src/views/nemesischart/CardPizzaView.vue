<script setup>
import { ref } from 'vue'
import { CardPizza } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import RefTable from '@/components/RefTable.vue'

const tema = ref('light')
const direcao = ref('right')
const cutout = ref('70%')
const corDetalhes = ref('#3B82F6')

const data = [
  { rotulo: 'Desktop', quantidade: 4800, descricao: 'Sessões em navegadores desktop' },
  { rotulo: 'Mobile',  quantidade: 3200, descricao: 'Sessões em dispositivos móveis' },
  { rotulo: 'Tablet',  quantidade: 1450, descricao: 'Sessões em tablets' },
  { rotulo: 'Outros',  quantidade: 320,  descricao: 'TVs, consoles e leitores' },
]

const props = [
  { name: 'data', type: 'Array<{ rotulo, quantidade, cor?, descricao? }>', default: 'amostra', description: 'Fatias do doughnut. cor sobrescreve a paleta; descricao vira tooltip da linha da tabela.' },
  { name: 'corDetalhes', type: 'String', default: "'#3B82F6'", description: 'Cor base: a paleta das fatias é gerada em tons derivados dela.' },
  { name: 'cutout', type: 'String | Number', default: "'70%'", description: 'Espessura do anel (0% = pizza cheia, 85% = anel fino).' },
  { name: 'direcao', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Posição da tabela lateral em relação ao gráfico.' },
  { name: 'mostrarCabecalho', type: 'Boolean', default: 'true', description: 'Exibe o cabeçalho da tabela.' },
  { name: 'rotuloCategoria / rotuloQuantidade', type: 'String', default: "'Categoria' / 'Quantidade'", description: 'Títulos das colunas da tabela.' },
  { name: 'itensClicaveis', type: 'Boolean', default: 'false', description: 'Torna as fatias e linhas da tabela clicáveis; o card passa a emitir @itemClicado.' },
  { name: 'detalheTooltip', type: '(item, index) => String | String[]', default: 'null', description: 'Texto(s) extra(s) exibidos no tooltip do gráfico, abaixo do valor.' },
  { name: 'tooltipLinha', type: '(item, index) => String', default: 'null', description: 'Tooltip nativo (title) da linha da tabela lateral. Quando omitido, usa item.descricao.' },
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
  { name: '@itemClicado', description: 'Emitido ao clicar numa fatia ou linha quando itensClicaveis está ativo. Recebe { item, index, cor }.' },
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

const coresCode = `<!-- A paleta é derivada da cor base -->
<CardPizza corDetalhes="#10B981" :data="data" />

<!-- Um item pode fixar a própria cor -->
<CardPizza
  corDetalhes="#3B82F6"
  :data="[
    { rotulo: 'Desktop', quantidade: 4800 },
    { rotulo: 'Mobile',  quantidade: 3200 },
    { rotulo: 'Outros',  quantidade: 320, cor: '#9CA3AF' },
  ]"
/>`

const pizzaCheiaCode = `<!-- cutout de 0% transforma o donut em pizza cheia -->
<CardPizza
  legenda="Mix"
  cutout="0%"
  direcao="bottom"
  :data="data"
/>`

const clicavelCode = `<script setup>
import { CardPizza } from 'nemesischart'

function aoClicar({ item, index, cor }) {
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

const tooltipCode = `<CardPizza
  legenda="Dispositivos"
  :data="[
    { rotulo: 'Desktop', quantidade: 4800, share: 49 },
    { rotulo: 'Mobile',  quantidade: 3200, share: 33 },
  ]"
  :detalheTooltip="(item) => \`\${item.share}% do total\`"
  :tooltipLinha="(item) => \`Clique para filtrar por \${item.rotulo}\`"
/>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardPizza</h1>
    <p class="doc-lead">
      Quando a pergunta é "quanto cada categoria representa do total" — dispositivos, canais,
      fontes de tráfego, mix de produtos — o <code>CardPizza</code> desenha um doughnut (ou pizza
      cheia) acompanhado de uma tabela lateral com os valores.
    </p>

    <h2>Demonstração</h2>
    <p>
      Passe o mouse sobre as linhas da tabela para ver o tooltip nativo alimentado pelo campo
      <code>descricao</code> de cada item.
    </p>

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
      <div class="control-row">
        <label class="control-label">Cor base:</label>
        <input type="color" v-model="corDetalhes" class="color-input" />
        <span class="color-value">{{ corDetalhes }}</span>
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
        :corDetalhes="corDetalhes"
        :botaoVisivel="true"
      />
    </div>

    <h2>Mostrando a participação de categorias</h2>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Definindo as cores das fatias</h2>
    <p>
      As fatias são coloridas com tons derivados de <code>corDetalhes</code> — uma cor base gera a
      paleta inteira. Para destacar (ou neutralizar) uma categoria específica, defina
      <code>cor</code> no próprio item:
    </p>
    <CodeBlock :code="coresCode" language="vue" />

    <h2>Trocando o anel por uma pizza cheia</h2>
    <CodeBlock :code="pizzaCheiaCode" language="vue" />

    <h2>Reagindo ao clique nas fatias</h2>
    <p>
      Com <code>itensClicaveis</code>, cada fatia (e a linha correspondente na tabela) dispara
      <code>@itemClicado</code> com o item, o índice e a cor da fatia:
    </p>
    <CodeBlock :code="clicavelCode" language="vue" />

    <h2>Mostrando detalhes nos tooltips</h2>
    <p>
      Dois tooltips podem ser customizados de forma independente: o do gráfico, com
      <code>detalheTooltip</code>, e o das linhas da tabela, com <code>tooltipLinha</code>:
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
.control-label { font-size: 0.8rem; color: var(--color-text-muted); min-width: 80px; }
.control-group { display: flex; gap: 0.35rem; }
.control-btn { padding: 0.3rem 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-muted); font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.control-btn.active { background: var(--color-accent-soft); border-color: var(--color-accent-border); color: var(--color-accent-2); }
.color-input { width: 32px; height: 28px; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; background: transparent; }
.color-value { font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-text-muted); }
</style>
