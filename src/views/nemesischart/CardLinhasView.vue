<script setup>
import { ref } from 'vue'
import { CardLinhas } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const tema = ref('light')
const tipoValor = ref('moeda')
const corDetalhes = ref('#3B82F6')

const data = [
  { rotulo: 'Jan', quantidade: 1200 },
  { rotulo: 'Fev', quantidade: 2800 },
  { rotulo: 'Mar', quantidade: 3200 },
  { rotulo: 'Abr', quantidade: 2100 },
  { rotulo: 'Mai', quantidade: 4500 },
  { rotulo: 'Jun', quantidade: 3900 },
  { rotulo: 'Jul', quantidade: 5200 },
]

const props = [
  { name: 'data', type: 'Array<{ rotulo, quantidade }>', default: 'amostra', description: 'Pontos do gráfico.' },
  { name: 'corDetalhes', type: 'String', default: "'#3B82F6'", description: 'Cor da linha e do gradiente sob a curva.' },
  { name: 'tema', type: "'light' | 'dark'", default: "'light'", description: 'Paleta base do card.' },
  { name: 'direcao', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posição do header em relação ao gráfico.' },
  { name: 'tipoValor', type: "'numero' | 'moeda' | 'percentual'", default: "'numero'", description: 'Formatação dos valores no tooltip e eixo.' },
  { name: 'locale', type: 'String', default: "'pt-BR'", description: 'Locale do Intl.' },
  { name: 'moeda', type: 'String', default: "'BRL'", description: 'Código ISO da moeda.' },
  { name: 'height', type: 'String | Number', default: '280', description: 'Altura do gráfico em px.' },
  { name: 'linhasReferencia', type: 'Object | Array', default: 'null', description: 'Linhas horizontais de referência sobre o gráfico.' },
  { name: 'legenda / sublegenda / titulo / descricao', type: 'String', default: 'null', description: 'Cabeçalho do card.' },
  { name: 'botaoVisivel', type: 'Boolean', default: 'false', description: 'Exibe o botão "Ver mais".' },
  { name: 'textoBotao', type: 'String', default: "'Ver mais'", description: 'Texto do botão.' },
  { name: 'exportar', type: 'Boolean', default: 'false', description: 'Exibe o botão de exportação como PNG.' },
  { name: 'nomeArquivoExport', type: 'String', default: "'card-linhas.png'", description: 'Nome do arquivo gerado.' },
  { name: 'corFundo / corTexto / corBorda', type: 'String', default: '—', description: 'Overrides do tema.' },
  { name: 'borderRadius / sombra', type: 'String | Number', default: '—', description: 'Customização do card.' },
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
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardLinhas</h1>
    <p>
      Gráfico de linhas com gradiente sob a curva. Ideal para séries temporais — faturamento,
      tráfego, métricas acumuladas — com tooltips formatados e suporte a linhas de referência.
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
        :data="data"
        :botaoVisivel="true"
      />
    </div>

    <h2>Uso básico</h2>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Linhas de referência</h2>
    <p>Defina uma ou várias linhas horizontais sobre o gráfico (ex.: meta, média):</p>
    <CodeBlock :code="referenciaCode" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />
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
</style>
