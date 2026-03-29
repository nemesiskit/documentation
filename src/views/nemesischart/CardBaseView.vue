<script setup>
import { ref } from 'vue'
import { CardBase } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const tema = ref('Light')

const props = [
  { name: 'tema', type: "'Light' | 'Dark' | 'Transparent'", default: "'Light'", description: 'Tema visual do card.' },
  { name: 'corFundo', type: 'String', default: '—', description: 'Cor de fundo customizada (hex/rgb). Sobrescreve o tema.' },
  { name: 'legenda', type: 'String', default: '—', description: 'Rótulo superior esquerdo (exibido em maiúsculo).' },
  { name: 'sublegenda', type: 'String', default: '—', description: 'Subtítulo abaixo da legenda.' },
  { name: 'tituloVisivel', type: 'Boolean', default: 'true', description: 'Exibir ou ocultar o bloco de título/descrição.' },
  { name: 'titulo', type: 'String', default: "''", description: 'Título principal do card.' },
  { name: 'descricao', type: 'String', default: "''", description: 'Subtítulo abaixo do título.' },
  { name: 'botaoVisivel', type: 'Boolean', default: 'false', description: 'Exibir link de ação no canto superior direito.' },
  { name: 'textoBotao', type: 'String', default: "'Ver Todos'", description: 'Texto do link de ação.' },
  { name: 'direcao', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Direção do layout do conteúdo.' },
  { name: 'minHeight', type: 'String', default: "'0px'", description: 'Altura mínima da área de conteúdo.' },
]

const events = [
  { name: '@botao-click', description: 'Emitido ao clicar no botão/link de ação.' },
  { name: '@anim-complete', description: 'Emitido quando a animação GSAP de entrada finaliza.' },
]

const slots = [
  { name: '#slot-content', description: 'Área principal para o conteúdo (gráfico, tabela, etc).' },
  { name: '#slot-legenda', description: 'Conteúdo customizado para a legenda (quando prop não informada).' },
  { name: '#slot-sublegenda', description: 'Conteúdo customizado para a sublegenda.' },
  { name: '#slot-actions', description: 'Área de ações no topo direito.' },
]

const basicCode = `<CardBase
  titulo="Relatório Mensal"
  descricao="Dados de Março 2025"
  legenda="Vendas"
  botaoVisivel
  textoBotao="Ver detalhes"
  @botao-click="handleClick"
>
  <template #slot-content>
    <!-- seu conteúdo aqui -->
    <p>Gráfico ou tabela...</p>
  </template>
</CardBase>`

const temaCode = `<!-- Tema escuro -->
<CardBase tema="Dark" titulo="Dashboard" />

<!-- Fundo transparente -->
<CardBase tema="Transparent" titulo="Embutido" />

<!-- Cor personalizada -->
<CardBase corFundo="#1a1040" titulo="Custom" />`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardBase</h1>
    <p>
      Container base que envolve todos os componentes do NemesisChart. Fornece o layout padrão com
      título, legenda, botão de ação e animações de entrada via GSAP.
      Pode ser usado diretamente para criar cards customizados.
    </p>

    <h2>Demonstração</h2>

    <div class="demo-controls">
      <label class="control-label">Tema:</label>
      <div class="control-group">
        <button
          v-for="t in ['Light', 'Dark', 'Transparent']"
          :key="t"
          class="control-btn"
          :class="{ active: tema === t }"
          @click="tema = t"
        >{{ t }}</button>
      </div>
    </div>

    <div class="demo-section" :class="{ 'demo-dark': tema === 'Dark', 'demo-transparent': tema === 'Transparent' }">
      <CardBase
        :tema="tema"
        titulo="Exemplo de Card"
        descricao="Subtítulo do card"
        legenda="Categoria"
        sublegenda="Detalhes"
        :botaoVisivel="true"
        textoBotao="Ver todos"
        style="max-width: 500px; margin: 0 auto;"
      >
        <template #slot-content>
          <div style="padding: 2rem; text-align: center; opacity: 0.5; font-size: 0.875rem;">
            Conteúdo do card aqui
          </div>
        </template>
      </CardBase>
    </div>

    <h2>Uso básico</h2>
    <CodeBlock :code="basicCode" language="vue" />

    <h2>Temas</h2>
    <CodeBlock :code="temaCode" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />

    <h2>Eventos</h2>
    <div class="table-wrap">
      <table class="props-table">
        <thead>
          <tr>
            <th>Evento</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ev in events" :key="ev.name">
            <td><span class="prop-name">{{ ev.name }}</span></td>
            <td>{{ ev.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Slots</h2>
    <div class="table-wrap">
      <table class="props-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sl in slots" :key="sl.name">
            <td><span class="prop-name">{{ sl.name }}</span></td>
            <td>{{ sl.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.demo-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.control-label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
.control-group {
  display: flex;
  gap: 0.35rem;
}
.control-btn {
  padding: 0.3rem 0.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
}
.control-btn.active {
  background: rgba(37, 99, 235, 0.15);
  border-color: rgba(37, 99, 235, 0.4);
  color: var(--color-accent-2);
}
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  margin-bottom: 1.5rem;
}
</style>
