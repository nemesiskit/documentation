<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import { RouterLink } from 'vue-router'

const installCode = `npm install nemesischart chart.js primevue primeflex primeicons`

const setupCode = `// main.js
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import NemesisChart from 'nemesischart'

import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'nemesischart/style.css'  // estilos obrigatórios

import App from './App.vue'

createApp(App)
  .use(PrimeVue)
  .use(NemesisChart)
  .mount('#app')`

const usageCode = `<script setup>
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
    :data="data"
  />
</template>`

const features = [
  {
    title: '7 componentes',
    desc: 'Linhas, barras, pizza, polar, progresso, container base e wrapper Chart.js.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>`
  },
  {
    title: '2 temas',
    desc: 'light e dark prontos, com override total via corFundo, corTexto e corBorda.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`
  },
  {
    title: 'Formatação inteligente',
    desc: 'tipoValor numero/moeda/percentual com locale e moeda configuráveis via Intl.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
  },
  {
    title: 'Exportação para PNG',
    desc: 'Ative exportar e baixe o card como imagem com um clique.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
  },
  {
    title: 'Slots flexíveis',
    desc: 'Substitua legenda, título, descrição, actions e footer com seus próprios componentes.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`
  },
  {
    title: 'Vue 3 + Composition API',
    desc: 'Composables expostos: useTema, useFormatadorValor, useTooltipExterno, useExportarImagem.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  },
  {
    title: 'Cards interativos',
    desc: 'CardPizza e CardPolar emitem @itemClicado ao clicar nas fatias quando itensClicaveis está ativo.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11.5V5.5a1.5 1.5 0 0 1 3 0v5"/><path d="M12 10V4.5a1.5 1.5 0 0 1 3 0V10"/><path d="M15 9.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L3.5 14a1.5 1.5 0 0 1 2.5-1.6L8 14"/></svg>`
  },
]

const components = [
  { name: 'CardBase', label: 'Container base', to: '/nemesischart/card-base', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>` },
  { name: 'CardLinhas', label: 'Gráfico de linha', to: '/nemesischart/card-linhas', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
  { name: 'CardBarra', label: 'Barras vertical/horizontal', to: '/nemesischart/card-barra', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="18" width="18" height="4" rx="1"/><rect x="3" y="10" width="12" height="4" rx="1"/><rect x="3" y="2" width="7" height="4" rx="1"/></svg>` },
  { name: 'CardPizza', label: 'Donut com tabela', to: '/nemesischart/card-pizza', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>` },
  { name: 'CardPolar', label: 'Área polar', to: '/nemesischart/card-polar', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>` },
  { name: 'CardProgresso', label: 'Progresso linear/circular', to: '/nemesischart/card-progresso', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="9" width="20" height="6" rx="3"/><rect x="2" y="9" width="14" height="6" rx="3" fill="currentColor" opacity="0.4"/></svg>` },
  { name: 'ChartBase', label: 'Wrapper Chart.js', to: '/nemesischart/chart-base', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>` },
]
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">NemesisChart</span>
      <span class="badge badge-green">v2.0.9</span>
    </div>

    <h1>Introdução</h1>
    <p>
      <strong style="color: #fff">NemesisChart</strong> é uma biblioteca de componentes Vue 3 para construção
      rápida de cards e dashboards com gráficos. Construída sobre
      <strong style="color: var(--color-accent-2)">Chart.js</strong>,
      <strong style="color: var(--color-accent-2)">PrimeVue</strong> e
      <strong style="color: var(--color-accent-2)">PrimeFlex</strong>, todos os cards seguem o mesmo padrão:
      legenda, sublegenda, valor de destaque, descrição e o gráfico correspondente — com suporte a temas
      claro/escuro, formatação automática de valores e exportação como imagem.
    </p>

    <div class="feature-grid">
      <div class="feature-item" v-for="f in features" :key="f.title">
        <div class="feature-icon" v-html="f.icon"></div>
        <div>
          <div class="feature-title">{{ f.title }}</div>
          <div class="feature-desc">{{ f.desc }}</div>
        </div>
      </div>
    </div>

    <h2>Componentes disponíveis</h2>
    <p>A biblioteca exporta 7 componentes prontos para uso:</p>

    <div class="components-grid">
      <RouterLink
        v-for="comp in components"
        :key="comp.name"
        :to="comp.to"
        class="comp-card"
      >
        <div class="comp-icon" v-html="comp.icon"></div>
        <div class="comp-name">{{ comp.name }}</div>
        <div class="comp-desc">{{ comp.label }}</div>
      </RouterLink>
    </div>

    <h2>Início rápido</h2>
    <p>Instale o pacote e seus peer dependencies:</p>
    <CodeBlock :code="installCode" language="bash" />

    <p>Registre o plugin no seu <code>main.js</code>:</p>
    <CodeBlock :code="setupCode" language="js" />

    <p>Use qualquer componente diretamente no template:</p>
    <CodeBlock :code="usageCode" language="vue" />

    <div class="next-links">
      <RouterLink to="/nemesischart/instalacao" class="next-link">
        <div class="next-label">Próximo</div>
        <div class="next-title">Instalação & Configuração →</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page-badge {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 2.5rem;
}

.feature-item {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem 1.1rem;
}

.feature-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-2);
}

.feature-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.2rem;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0 2rem;
}

.comp-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: inherit;
}

.comp-card:hover {
  border-color: rgba(37, 99, 235, 0.35);
  background: var(--color-surface-2);
}

.comp-icon {
  color: var(--color-accent-2);
  opacity: 0.8;
}

.comp-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  font-family: var(--font-mono);
}

.comp-desc {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.next-links {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
}

.next-link {
  text-align: right;
  color: inherit;
}

.next-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.next-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-accent-2);
  transition: gap 0.2s;
}

.next-link:hover .next-title {
  text-decoration: underline;
}
</style>
