<script setup>
import { ref } from 'vue'
import { CardProgresso } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import RefTable from '@/components/RefTable.vue'

const tema = ref('light')
const formato = ref('linear')
const corDetalhes = ref('#3B82F6')

const dataLinear = [
  { rotulo: 'Vendas',       quantidade: 72,  meta: 100 },
  { rotulo: 'Assinaturas',  quantidade: 48,  meta: 80 },
  { rotulo: 'Suporte',      quantidade: 35,  meta: 60 },
  { rotulo: 'Reclamações',  quantidade: 320, meta: 100, valor_referencia: 500, modo: 'reducao' },
]

const props = [
  { name: 'data', type: 'Array<Item>', default: 'amostra', description: 'Itens de progresso (ver estrutura abaixo).' },
  { name: 'formato', type: "'linear' | 'circular'", default: "'linear'", description: 'Barras horizontais ou gráfico de rosca.' },
  { name: 'direcao', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posição do gráfico circular em relação à lista.' },
  { name: 'metaPadrao', type: 'Number', default: '100', description: 'Meta aplicada a itens sem meta definida.' },
  { name: 'mostrarValor', type: 'Boolean', default: 'true', description: 'Exibe quantidade / meta.' },
  { name: 'mostrarPercentual', type: 'Boolean', default: 'true', description: 'Exibe o percentual de progresso.' },
  { name: 'alturaBarra', type: 'String | Number', default: '8', description: 'Altura das barras lineares em px.' },
  { name: 'raioBarra', type: 'String | Number', default: "'999px'", description: 'Border-radius das barras.' },
  { name: 'cutout', type: 'String | Number', default: "'78%'", description: 'Espessura do anel no modo circular.' },
  { name: 'corDetalhes', type: 'String', default: "'#3B82F6'", description: 'Cor do gráfico circular em modo crescimento.' },
  { name: 'corExcesso', type: 'String', default: "'#EF4444'", description: 'Cor de alerta para itens em modo redução.' },
  { name: 'cores', type: 'Array<String>', default: 'paleta padrão', description: 'Cores automáticas dos itens.' },
  { name: 'height', type: 'String | Number', default: '220', description: 'Altura do gráfico (modo circular) em px.' },
  { name: 'tema', type: "'light' | 'dark'", default: "'light'", description: 'Paleta base.' },
  { name: 'tipoValor / locale / moeda', type: 'String', default: 'numero / pt-BR / BRL', description: 'Formatação dos valores.' },
  { name: 'legenda / sublegenda / titulo / descricao', type: 'String', default: 'null', description: 'Cabeçalho do card.' },
  { name: 'botaoVisivel / textoBotao', type: 'Boolean / String', default: "false / 'Ver mais'", description: 'Botão de ação no topo direito.' },
  { name: 'corFundo / corTexto / corBorda', type: 'String', default: '—', description: 'Overrides do tema.' },
  { name: 'borderRadius / sombra', type: 'String | Number', default: '—', description: 'Customização do card.' },
  { name: 'exportar / nomeArquivoExport', type: 'Boolean / String', default: "false / 'card-progresso.png'", description: 'Exportação como PNG.' },
]

const events = [
  { name: '@botaoAcao', description: 'Emitido ao clicar no botão "Ver mais".' },
  { name: '@exportado', description: 'Emitido após o PNG ser gerado e baixado.' },
]

const slots = [
  { name: '#legenda', description: 'Substitui a legenda (texto superior).' },
  { name: '#sublegenda', description: 'Substitui a sublegenda.' },
  { name: '#titulo', description: 'Substitui o valor de destaque.' },
  { name: '#descricao', description: 'Substitui a descrição do título.' },
  { name: '#actions', description: 'Área superior direita do card (substitui o botão padrão).' },
  { name: '#footer', description: 'Conteúdo extra abaixo das barras/gráfico.' },
]

const itemFields = [
  { field: 'rotulo', tipo: 'String', obrigatorio: 'sim', desc: 'Label exibido.' },
  { field: 'quantidade', tipo: 'Number', obrigatorio: 'sim', desc: 'Valor atual.' },
  { field: 'meta', tipo: 'Number', obrigatorio: 'não', desc: 'Valor alvo. Usa metaPadrao se omitido.' },
  { field: 'modo', tipo: "'crescimento' | 'reducao'", obrigatorio: 'não', desc: "Omitir = 'crescimento'." },
  { field: 'valor_referencia', tipo: 'Number', obrigatorio: 'em reducao', desc: 'Ponto de partida (0% de progresso) em metas de redução.' },
  { field: 'cor', tipo: 'String', obrigatorio: 'não', desc: 'Cor hex da barra (sobrescreve a paleta).' },
]

const basicCode = `<script setup>
import { CardProgresso } from 'nemesischart'

const data = [
  { rotulo: 'Vendas', quantidade: 72, meta: 100 },
  { rotulo: 'Reclamações', quantidade: 320, meta: 100, valor_referencia: 500, modo: 'reducao' },
]
<\/script>

<template>
  <CardProgresso
    legenda="Metas do trimestre"
    titulo="Q2 2026"
    formato="linear"
    :data="data"
  />
</template>`

const circularCode = `<CardProgresso
  legenda="Performance"
  titulo="72%"
  descricao="da meta anual"
  formato="circular"
  direcao="right"
  corDetalhes="#3B82F6"
  :data="data"
/>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardProgresso</h1>
    <p>
      Barras de progresso lineares ou circulares com suporte a metas de
      <strong>crescimento</strong> e de <strong>redução</strong> por item.
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
        <label class="control-label">Formato:</label>
        <div class="control-group">
          <button v-for="f in ['linear', 'circular']" :key="f" class="control-btn" :class="{ active: formato === f }" @click="formato = f">{{ f }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Cor:</label>
        <input type="color" v-model="corDetalhes" class="color-input" />
        <span class="color-value">{{ corDetalhes }}</span>
      </div>
    </div>

    <div class="demo-section" :class="{ 'demo-dark': tema === 'dark' }">
      <CardProgresso
        :tema="tema"
        legenda="Metas do trimestre"
        sublegenda="Q2 2026"
        titulo="72%"
        descricao="médio das metas"
        :formato="formato"
        :corDetalhes="corDetalhes"
        :data="dataLinear"
        :botaoVisivel="true"
      />
    </div>

    <h2>Modo linear</h2>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Modo circular</h2>
    <CodeBlock :code="circularCode" language="vue" />

    <h2>Estrutura do <code>data</code></h2>
    <div class="table-wrap">
      <table class="props-table">
        <thead><tr><th>Campo</th><th>Tipo</th><th>Obrigatório</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr v-for="it in itemFields" :key="it.field">
            <td><span class="prop-name">{{ it.field }}</span></td>
            <td><code>{{ it.tipo }}</code></td>
            <td>{{ it.obrigatorio }}</td>
            <td>{{ it.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>Crescimento:</strong> percentual = <code>quantidade / meta</code>. A barra cresce em direção à meta.<br />
      <strong>Redução:</strong> percentual = <code>(valor_referencia − quantidade) / (valor_referencia − meta)</code>.
      A barra representa o progresso de redução, e a trilha de fundo usa <code>corExcesso</code>.
    </p>

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
.control-label { font-size: 0.8rem; color: var(--color-text-muted); min-width: 70px; }
.control-group { display: flex; gap: 0.35rem; }
.control-btn { padding: 0.3rem 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-muted); font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.control-btn.active { background: rgba(124,111,205,0.15); border-color: rgba(124,111,205,0.4); color: var(--color-accent-2); }
.color-input { width: 32px; height: 28px; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; background: transparent; }
.color-value { font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-text-muted); }
.table-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius); margin-bottom: 1.5rem; }
</style>
