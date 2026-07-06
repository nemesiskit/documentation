<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import { RouterLink } from 'vue-router'

const installCode = `npm install nemesischart chart.js`

const setupCode = `// main.js
import { createApp } from 'vue'
import NemesisChart from 'nemesischart'

import 'nemesischart/style.css'  // estilos obrigatórios

import App from './App.vue'

createApp(App)
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

const heroCode = `<CardPizza
  legenda="Dispositivos"
  titulo="9.770"
  corDetalhes="#2563eb"
  :detalheTooltip="(item) => \`\${item.share}% do total\`"
  :data="data"
/>`

const features = [
  {
    title: 'Sem dependências de UI',
    desc: 'Só o Chart.js como peer dependency. Todo o CSS necessário já vem embutido no bundle, com prefixo nc-.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`
  },
  {
    title: '7 componentes',
    desc: 'Linhas, barras, pizza, polar, progresso, container base e wrapper Chart.js.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>`
  },
  {
    title: 'Tooltips com contexto',
    desc: 'A prop detalheTooltip adiciona informações extras do seu dataset ao tooltip, abaixo do valor.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  },
  {
    title: 'Paleta automática',
    desc: 'Uma única corDetalhes gera os tons das fatias e setores. Cada item pode sobrescrever com cor.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`
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
    title: 'Composables expostos',
    desc: 'useTema, useFormatadorValor, useLinhasReferencia, gerarPaleta e outros utilitários para criar seus próprios cards.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
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

const changes = [
  {
    title: 'Zero dependências de UI',
    desc: 'PrimeVue, PrimeFlex e PrimeIcons deixaram de ser necessários. As únicas peer dependencies agora são vue e chart.js — o CSS utilitário vem embutido em nemesischart/style.css, mantendo o mesmo visual.',
  },
  {
    title: 'Tooltips com informações extras',
    desc: 'CardLinhas, CardBarra, CardPizza e CardPolar ganharam a prop detalheTooltip, que recebe o item original de data e devolve linhas adicionais para o tooltip.',
  },
  {
    title: 'Tooltip nas linhas da tabela',
    desc: 'Em CardPizza e CardPolar, a prop tooltipLinha define o texto exibido ao pousar o mouse sobre uma linha da tabela lateral. Sem ela, o componente usa item.descricao.',
  },
  {
    title: 'Paleta gerada a partir de uma cor',
    desc: 'CardPizza, CardPolar e CardProgresso trocaram o array cores pela prop corDetalhes: os tons das fatias são derivados dela, e cada item pode definir a própria cor. A função gerarPaleta ficou disponível para uso externo.',
  },
  {
    title: 'Mais utilitários exportados',
    desc: 'useLinhasReferencia, useExportarCard, gerarPaleta, toRgba, helpers de tooltip e as fábricas de props (propsCartao, propsValor, propsDirecao, propsTabela) agora fazem parte da API pública.',
  },
]
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">NemesisChart</span>
      <span class="badge badge-green">v2.0.11</span>
    </div>

    <h1>Introdução</h1>
    <p class="doc-lead">
      Montar um dashboard costuma exigir repetir a mesma estrutura em todos os cards: título, valor de
      destaque, gráfico, formatação de moeda, tema claro ou escuro. O
      <strong>NemesisChart</strong> resolve essa repetição com cards prontos para Vue 3, construídos
      sobre <strong>Chart.js</strong> e sem nenhuma dependência de UI externa — todo o CSS necessário
      já vem no bundle.
    </p>

    <div class="hero-panel">
      <div class="hero-glow"></div>
      <div class="hero-card">
        <div class="hero-card-header">
          <span class="hero-dot" style="background:#f87171"></span>
          <span class="hero-dot" style="background:#fbbf24"></span>
          <span class="hero-dot" style="background:#4ade80"></span>
          <span class="hero-card-title">card-pizza.vue</span>
        </div>
        <CodeBlock :code="heroCode" language="vue" class="hero-code" />
      </div>
    </div>

    <h2>Por que usar o NemesisChart?</h2>
    <p>
      Todos os cards seguem o mesmo padrão — legenda, sublegenda, valor de destaque, descrição e o
      gráfico correspondente — para que o seu dashboard tenha consistência visual sem esforço extra:
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

    <h2>O que há de novo na 2.0.11</h2>
    <p>
      A série 2.0.10/2.0.11 removeu as dependências externas de UI e ampliou a customização de
      tooltips e cores. Se você vem de uma versão anterior, veja o
      <RouterLink to="/nemesischart/instalacao" class="text-accent">guia de migração</RouterLink>.
    </p>

    <div class="changes-list">
      <div v-for="c in changes" :key="c.title" class="change-item">
        <div class="change-marker"></div>
        <div>
          <div class="change-title">{{ c.title }}</div>
          <div class="change-desc">{{ c.desc }}</div>
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

    <h2>Comece em cinco minutos</h2>
    <p>Instale o pacote junto com o Chart.js — nenhuma outra dependência é necessária:</p>
    <CodeBlock :code="installCode" language="bash" />

    <p>Registre o plugin no seu <code>main.js</code>:</p>
    <CodeBlock :code="setupCode" language="js" />

    <p>Use qualquer componente diretamente no template:</p>
    <CodeBlock :code="usageCode" language="vue" />

    <div class="next-links">
      <RouterLink to="/nemesischart/instalacao" class="next-link">
        <div class="next-label">Próximo</div>
        <div class="next-title">Instalação & Migração →</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.hero-panel {
  position: relative;
  border-radius: var(--radius-lg);
  background: linear-gradient(120deg, #c7d2fe 0%, #a5b4fc 28%, #93c5fd 55%, #a5f3fc 100%);
  padding: 2.5rem 2rem;
  margin: 1.75rem 0 0.5rem;
  overflow: hidden;
}

.dark .hero-panel {
  background: linear-gradient(120deg, #312e81 0%, #1e3a8a 45%, #164e63 100%);
}

.hero-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 10%, rgba(255, 255, 255, 0.55), transparent 55%);
  pointer-events: none;
}

.dark .hero-glow {
  background: radial-gradient(ellipse at 20% 10%, rgba(255, 255, 255, 0.12), transparent 55%);
}

.hero-card {
  position: relative;
  max-width: 520px;
  margin: 0 auto;
  border-radius: var(--radius);
  background: var(--color-bg);
  box-shadow: var(--shadow-pop);
  overflow: hidden;
}

.hero-card-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.hero-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.hero-card-title {
  margin-left: 0.5rem;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}

.hero-code {
  margin-bottom: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.hero-code :deep(.code-header) {
  display: none;
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
  background: var(--color-accent-soft);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-2);
}

.feature-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.2rem;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.changes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0 2rem;
  border-left: 2px solid var(--color-border);
  padding-left: 1.25rem;
}

.change-item {
  position: relative;
  display: flex;
  gap: 0.75rem;
}

.change-marker {
  position: absolute;
  left: calc(-1.25rem - 6px);
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent-2);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.change-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.2rem;
}

.change-desc {
  font-size: 0.83rem;
  color: var(--color-text-muted);
  line-height: 1.6;
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
  border-color: var(--color-accent-border);
  background: var(--color-bg);
  box-shadow: var(--shadow-card);
}

.comp-icon {
  color: var(--color-accent-2);
  opacity: 0.8;
}

.comp-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-heading);
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
}

.next-link:hover .next-title {
  text-decoration: underline;
}
</style>
