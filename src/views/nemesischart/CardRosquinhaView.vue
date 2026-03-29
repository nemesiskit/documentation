<script setup>
import { ref } from 'vue'
import { CardRosquinha } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const tema = ref('Light')
const legendaVisivel = ref(true)
const corPaleta = ref('#2563eb')

const dados = [
  { rotulo: 'Eletrônicos', quantidade: 42 },
  { rotulo: 'Roupas', quantidade: 28 },
  { rotulo: 'Livros', quantidade: 15 },
  { rotulo: 'Alimentos', quantidade: 10 },
  { rotulo: 'Outros', quantidade: 5 },
]

const props = [
  { name: 'dados', type: 'Array<{ rotulo, quantidade }>', default: 'exemplo', description: 'Segmentos do donut com rótulo e valor.' },
  { name: 'corPaleta', type: 'String', default: "'#1D4ED8'", description: 'Cor base para geração da paleta dos segmentos.' },
  { name: 'valor', type: 'String', default: "''", description: 'Texto grande exibido no centro do donut.' },
  { name: 'valorDescricao', type: 'String', default: "''", description: 'Texto menor abaixo do valor central.' },
  { name: 'labelRotulo', type: 'String', default: "'Rótulo'", description: 'Cabeçalho da coluna de rótulos na legenda.' },
  { name: 'labelQuantidade', type: 'String', default: "'Qtd.'", description: 'Cabeçalho da coluna de valores na legenda.' },
  { name: 'legendaGraficoVisivel', type: 'Boolean', default: 'true', description: 'Exibir a legenda lateral com detalhes dos segmentos.' },
  { name: 'opcoes', type: 'Object', default: '{}', description: 'Opções extras do Chart.js.' },
  { name: 'tema', type: "'Light' | 'Dark' | 'Transparent'", default: "'Light'", description: 'Tema visual.' },
  { name: 'titulo', type: 'String', default: "''", description: 'Título do card.' },
]

const code = `<script setup>
import { CardRosquinha } from 'nemesischart'

const dados = [
  { rotulo: 'Eletrônicos', quantidade: 42 },
  { rotulo: 'Roupas', quantidade: 28 },
  { rotulo: 'Livros', quantidade: 15 },
  { rotulo: 'Outros', quantidade: 15 },
]
<\/script>

<template>
  <CardRosquinha
    titulo="Categorias de Venda"
    :dados="dados"
    corPaleta="#2563eb"
    valor="100"
    valorDescricao="Total"
    labelRotulo="Categoria"
    labelQuantidade="Qtd."
  />
</template>`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardRosquinha</h1>
    <p>
      Gráfico de rosca (donut) com legenda lateral e suporte a texto central.
      Ideal para mostrar distribuição proporcional de categorias.
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
        <label class="control-label">Legenda:</label>
        <div class="control-group">
          <button class="control-btn" :class="{ active: legendaVisivel }" @click="legendaVisivel = !legendaVisivel">{{ legendaVisivel ? 'Visível' : 'Oculta' }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Cor:</label>
        <input type="color" v-model="corPaleta" class="color-input" />
        <span class="color-value">{{ corPaleta }}</span>
      </div>
    </div>
    <div class="demo-section" :class="{ 'demo-dark': tema === 'Dark', 'demo-transparent': tema === 'Transparent' }">
      <CardRosquinha
        :tema="tema"
        titulo="Vendas por Categoria"
        descricao="Março 2025"
        legenda="Categorias"
        :dados="dados"
        :corPaleta="corPaleta"
        valor="100%"
        valorDescricao="Total"
        :legendaGraficoVisivel="legendaVisivel"
        labelRotulo="Categoria"
        labelQuantidade="Qtd."
      />
    </div>

    <h2>Uso</h2>
    <CodeBlock :code="code" language="vue" />

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
