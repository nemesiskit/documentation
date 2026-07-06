<script setup>
import { ref } from 'vue'
import { CardBase } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import RefTable from '@/components/RefTable.vue'

const tema = ref('light')

const props = [
  { name: 'legenda', type: 'String', default: 'null', description: 'Rótulo superior (categoria do card).' },
  { name: 'sublegenda', type: 'String', default: 'null', description: 'Texto auxiliar exibido abaixo da legenda.' },
  { name: 'titulo', type: 'String', default: 'null', description: 'Valor de destaque do card.' },
  { name: 'descricao', type: 'String', default: 'null', description: 'Texto complementar do título.' },
  { name: 'tema', type: "'light' | 'dark'", default: "'light'", description: 'Paleta base do card.' },
  { name: 'corFundo', type: 'String', default: 'null', description: 'Sobrescreve a cor de fundo do tema.' },
  { name: 'corTexto', type: 'String', default: 'null', description: 'Sobrescreve a cor do texto.' },
  { name: 'corBorda', type: 'String', default: "'#EAE8E8'", description: 'Cor da borda externa.' },
  { name: 'borderRadius', type: 'String | Number', default: "'0.75rem'", description: 'Raio da borda do card.' },
  { name: 'sombra', type: 'String', default: "'none'", description: 'Box-shadow do card.' },
  { name: 'alinhamento', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Alinhamento horizontal do conteúdo principal.' },
  { name: 'botaoVisivel', type: 'Boolean', default: 'true', description: 'Exibe o botão "Ver mais" no canto superior direito.' },
  { name: 'textoBotao', type: 'String', default: "'Ver Todos'", description: 'Texto do botão de ação.' },
  { name: 'exportar', type: 'Boolean', default: 'false', description: 'Exibe o botão de exportação como PNG.' },
  { name: 'nomeArquivoExport', type: 'String', default: "'card-base.png'", description: 'Nome do arquivo gerado ao exportar.' },
]

const events = [
  { name: '@botaoAcao', description: 'Emitido ao clicar no botão "Ver mais".' },
  { name: '@exportado', description: 'Emitido após o PNG ser gerado e baixado.' },
]

const slots = [
  { name: '#legenda', description: 'Substitui a legenda.' },
  { name: '#sublegenda', description: 'Substitui a sublegenda.' },
  { name: '#titulo', description: 'Substitui o título.' },
  { name: '#descricao', description: 'Substitui a descrição.' },
  { name: '#actions', description: 'Área de ações no topo direito (substitui o botão padrão).' },
  { name: '#default', description: 'Conteúdo principal — onde entra seu gráfico ou conteúdo customizado.' },
  { name: '#footer', description: 'Conteúdo extra abaixo do gráfico/conteúdo principal.' },
]

const basicCode = `<CardBase
  legenda="Vendas"
  sublegenda="Março"
  titulo="R$ 12.450"
  descricao="acumulado no mês"
  botaoVisivel
  textoBotao="Ver detalhes"
  @botaoAcao="abrirRelatorio"
>
  <p>Conteúdo customizado aqui (gráfico, tabela, etc.)</p>

  <template #footer>
    <small>Atualizado há 5 minutos.</small>
  </template>
</CardBase>`

const temaCode = `<!-- Tema escuro -->
<CardBase tema="dark" titulo="Dashboard" />

<!-- Cor de fundo personalizada -->
<CardBase corFundo="#1a1040" corTexto="#fff" titulo="Custom" />

<!-- Sem botão de ação -->
<CardBase :botaoVisivel="false" titulo="Somente leitura" />`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardBase</h1>
    <p class="doc-lead">
      Nem todo card de dashboard tem um gráfico pronto na biblioteca. O <code>CardBase</code> é o
      esqueleto sem gráfico: fornece o layout padrão do NemesisChart — legenda, título, descrição,
      botão de ação e área de conteúdo via slot — para você criar visualizações próprias sem abrir
      mão da consistência visual.
    </p>

    <h2>Demonstração</h2>

    <div class="demo-controls">
      <label class="control-label">Tema:</label>
      <div class="control-group">
        <button
          v-for="t in ['light', 'dark']"
          :key="t"
          class="control-btn"
          :class="{ active: tema === t }"
          @click="tema = t"
        >{{ t }}</button>
      </div>
    </div>

    <div class="demo-section" :class="{ 'demo-dark': tema === 'dark' }">
      <CardBase
        :tema="tema"
        legenda="Vendas"
        sublegenda="Março"
        titulo="R$ 12.450"
        descricao="acumulado no mês"
        :botaoVisivel="true"
        textoBotao="Ver detalhes"
        style="max-width: 500px; margin: 0 auto;"
      >
        <div style="padding: 1.5rem 0; text-align: center; opacity: 0.6; font-size: 0.875rem;">
          Conteúdo customizado aqui
        </div>
      </CardBase>
    </div>

    <h2>Montando um card customizado</h2>
    <p>
      O slot padrão recebe o conteúdo principal — um gráfico próprio, uma tabela, um indicador —
      e os slots nomeados cobrem cabeçalho e rodapé:
    </p>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Ajustando tema e cores</h2>
    <CodeBlock :code="temaCode" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />

    <h2>Eventos</h2>
    <RefTable :columns="['Evento', 'Descrição']" :rows="events" />

    <h2>Slots</h2>
    <RefTable :columns="['Slot', 'Descrição']" :rows="slots" />
  </div>
</template>

<style scoped>
.demo-controls { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.control-label { font-size: 0.8rem; color: var(--color-text-muted); }
.control-group { display: flex; gap: 0.35rem; }
.control-btn { padding: 0.3rem 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-muted); font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.control-btn.active { background: var(--color-accent-soft); border-color: var(--color-accent-border); color: var(--color-accent-2); }
</style>
