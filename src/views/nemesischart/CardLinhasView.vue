<script setup>
import { ref } from 'vue'
import { CardLinhas } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import RefTable from '@/components/RefTable.vue'

const tema = ref('light')
const tipoValor = ref('moeda')
const corDetalhes = ref('#3B82F6')
const tension = ref(0.45)

const data = [
  { rotulo: 'Jan', quantidade: 1200, pedidos: 34 },
  { rotulo: 'Fev', quantidade: 2800, pedidos: 61 },
  { rotulo: 'Mar', quantidade: 3200, pedidos: 79 },
  { rotulo: 'Abr', quantidade: 2100, pedidos: 48 },
  { rotulo: 'Mai', quantidade: 4500, pedidos: 102 },
  { rotulo: 'Jun', quantidade: 3900, pedidos: 88 },
  { rotulo: 'Jul', quantidade: 5200, pedidos: 121 },
]

const props = [
  { name: 'data', type: 'Array<{ rotulo, quantidade }>', default: 'amostra', description: 'Pontos do gráfico. Campos extras ficam disponíveis para detalheTooltip.' },
  { name: 'corDetalhes', type: 'String', default: "'#3B82F6'", description: 'Cor da linha e do gradiente sob a curva.' },
  { name: 'tension', type: 'Number', default: '0.45', description: 'Curvatura da linha: 0 desenha segmentos retos, 1 arredonda ao máximo. Valores fora do intervalo são limitados a 0–1.' },
  { name: 'detalheTooltip', type: '(item, index) => String | String[]', default: 'null', description: 'Devolve texto(s) extra(s) exibidos no tooltip abaixo do valor. Recebe o item original de data.' },
  { name: 'linhasReferencia', type: 'Object | Array', default: 'null', description: 'Linhas horizontais de referência sobre o gráfico ({ valor, rotulo, cor }).' },
  { name: 'tema', type: "'light' | 'dark'", default: "'light'", description: 'Paleta base do card.' },
  { name: 'direcao', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posição do header em relação ao gráfico.' },
  { name: 'tipoValor', type: "'numero' | 'moeda' | 'percentual'", default: "'numero'", description: 'Formatação dos valores no tooltip e eixo.' },
  { name: 'locale', type: 'String', default: "'pt-BR'", description: 'Locale do Intl.' },
  { name: 'moeda', type: 'String', default: "'BRL'", description: 'Código ISO da moeda.' },
  { name: 'height', type: 'String | Number', default: '280', description: 'Altura do gráfico em px.' },
  { name: 'legenda / sublegenda / titulo / descricao', type: 'String', default: 'null', description: 'Cabeçalho do card.' },
  { name: 'botaoVisivel', type: 'Boolean', default: 'false', description: 'Exibe o botão "Ver mais".' },
  { name: 'textoBotao', type: 'String', default: "'Ver mais'", description: 'Texto do botão.' },
  { name: 'exportar', type: 'Boolean', default: 'false', description: 'Exibe o botão de exportação como PNG.' },
  { name: 'nomeArquivoExport', type: 'String', default: "'card-linhas.png'", description: 'Nome do arquivo gerado.' },
  { name: 'corFundo / corTexto / corBorda', type: 'String', default: '—', description: 'Overrides do tema.' },
  { name: 'borderRadius / sombra', type: 'String | Number', default: '—', description: 'Customização do card.' },
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

const basicCode = `<script setup>
import { CardLinhas } from 'nemesischart'

const data = [
  { rotulo: 'Jan', quantidade: 1200 },
  { rotulo: 'Fev', quantidade: 2800 },
  { rotulo: 'Mar', quantidade: 3200 },
]
<\/script>

<template>
  <CardLinhas
    legenda="Faturamento"
    sublegenda="2026"
    titulo="R$ 7.2k"
    descricao="acumulado"
    tipoValor="moeda"
    corDetalhes="#3B82F6"
    :data="data"
  />
</template>`

const referenciaCode = `<CardLinhas
  legenda="Receita"
  titulo="R$ 5.4k"
  :data="data"
  :linhasReferencia="{ valor: 3000, rotulo: 'Meta', cor: '#10B981' }"
/>`

const tooltipCode = `<script setup>
import { CardLinhas } from 'nemesischart'

// Campos extras do item ficam disponíveis no callback
const data = [
  { rotulo: 'Jan', quantidade: 2456173.9, pagamentos: 1353 },
  { rotulo: 'Fev', quantidade: 3889895.3, pagamentos: 1269 },
]
<\/script>

<template>
  <CardLinhas
    legenda="Pagamentos realizados"
    tipoValor="moeda"
    :data="data"
    :detalheTooltip="(item) => \`\${item.pagamentos} pagamentos\`"
  />
</template>`

const tensionCode = `<!-- Linha bem arredondada (padrão) -->
<CardLinhas :data="data" :tension="0.45" />

<!-- Segmentos retos, ponto a ponto -->
<CardLinhas :data="data" :tension="0" />

<!-- Curvatura máxima -->
<CardLinhas :data="data" :tension="1" />`

const slotCode = `<CardLinhas legenda="Receita" :data="data" exportar>
  <!-- título customizado com markup -->
  <template #titulo>
    <span style="color: #10B981">R$ 22.9k</span>
    <small style="font-size: 0.7rem"> ▲ 12%</small>
  </template>

  <!-- rodapé customizado -->
  <template #footer>
    <small>Atualizado há 5 minutos.</small>
  </template>
</CardLinhas>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardLinhas</h1>
    <p class="doc-lead">
      Quando o objetivo é mostrar a evolução de um valor ao longo do tempo — faturamento, tráfego,
      métricas acumuladas — o <code>CardLinhas</code> desenha a série como uma linha com gradiente
      sob a curva, com tooltips formatados e suporte a linhas de referência para metas.
    </p>

    <h2>Demonstração</h2>
    <p>
      Passe o mouse sobre o gráfico: o tooltip mostra o valor formatado e, abaixo dele, a
      quantidade de pedidos vinda do campo extra <code>pedidos</code> via
      <code>detalheTooltip</code>.
    </p>

    <div class="demo-controls">
      <div class="control-row">
        <label class="control-label">Tema:</label>
        <div class="control-group">
          <button v-for="t in ['light', 'dark']" :key="t" class="control-btn" :class="{ active: tema === t }" @click="tema = t">{{ t }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Valor:</label>
        <div class="control-group">
          <button v-for="v in ['numero', 'moeda', 'percentual']" :key="v" class="control-btn" :class="{ active: tipoValor === v }" @click="tipoValor = v">{{ v }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Cor:</label>
        <input type="color" v-model="corDetalhes" class="color-input" />
        <span class="color-value">{{ corDetalhes }}</span>
      </div>
      <div class="control-row">
        <label class="control-label">Curva:</label>
        <input type="range" min="0" max="1" step="0.05" v-model.number="tension" class="range-input" />
        <span class="color-value">tension: {{ tension }}</span>
      </div>
    </div>

    <div class="demo-section" :class="{ 'demo-dark': tema === 'dark' }">
      <CardLinhas
        :tema="tema"
        legenda="Faturamento"
        sublegenda="Jan — Jul 2026"
        titulo="R$ 22.9k"
        descricao="acumulado no semestre"
        :tipoValor="tipoValor"
        :corDetalhes="corDetalhes"
        :tension="tension"
        :data="data"
        :detalheTooltip="(item) => `${item.pedidos} pedidos`"
        :botaoVisivel="true"
      />
    </div>

    <h2>Exibindo uma série temporal</h2>
    <p>
      Cada ponto do gráfico é um objeto com <code>rotulo</code> e <code>quantidade</code>:
    </p>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Marcando metas com linhas de referência</h2>
    <p>Defina uma ou várias linhas horizontais sobre o gráfico (por exemplo: meta, média):</p>
    <CodeBlock :code="referenciaCode" language="vue" />

    <h2>Adicionando contexto ao tooltip</h2>
    <p>
      Às vezes o valor sozinho não conta a história completa — R$ 2.4M vieram de quantos
      pagamentos? A prop <code>detalheTooltip</code> recebe o item original de <code>data</code>
      (incluindo campos extras que você adicionar) e devolve uma string, ou um array de strings,
      exibidas no tooltip abaixo do valor:
    </p>
    <CodeBlock :code="tooltipCode" language="vue" />

    <h2>Ajustando a curvatura da linha</h2>
    <p>
      Desde a <strong>2.0.12</strong>, a prop <code>tension</code> controla o quanto a linha é
      suavizada. O padrão <code>0.45</code> mantém a curva arredondada; <code>0</code> liga os
      pontos com segmentos retos, útil quando os valores precisam ser lidos com precisão. Valores
      fora do intervalo são limitados a 0–1:
    </p>
    <CodeBlock :code="tensionCode" language="vue" />

    <h2>Substituindo textos com slots</h2>
    <p>Use os slots de cabeçalho para inserir markup rico no lugar das props de texto:</p>
    <CodeBlock :code="slotCode" language="vue" />

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
.control-label { font-size: 0.8rem; color: var(--color-text-muted); min-width: 50px; }
.control-group { display: flex; gap: 0.35rem; }
.control-btn { padding: 0.3rem 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-muted); font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.control-btn.active { background: var(--color-accent-soft); border-color: var(--color-accent-border); color: var(--color-accent-2); }
.color-input { width: 32px; height: 28px; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; background: transparent; }
.color-value { font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-text-muted); }
.range-input { width: 140px; accent-color: var(--color-accent-2); cursor: pointer; }
</style>
