<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import { RouterLink } from 'vue-router'

const installCode = `npm install nemesischart chart.js`

const setupCode = `// main.js
import { createApp } from 'vue'
import App from './App.vue'
import 'nemesischart/style.css'  // estilos obrigatórios

createApp(App).mount('#app')`

const usageCode = `<script setup>
import { CardColuna } from 'nemesischart'

const dados = [
  { rotulo: 'Jan', quantidade: 40 },
  { rotulo: 'Fev', quantidade: 65 },
  { rotulo: 'Mar', quantidade: 30 },
]
<\/script>

<template>
  <CardColuna
    titulo="Vendas Mensais"
    descricao="Últimos 3 meses"
    :dados="dados"
    corPaleta="#2563eb"
  />
</template>`

const features = [
  {
    title: '8 componentes',
    desc: 'Barras, colunas, linhas, rosquinha, polar, semi-círculo e progresso.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>`
  },
  {
    title: '3 temas',
    desc: 'Light, Dark e Transparent para se adaptar a qualquer layout.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`
  },
  {
    title: 'Animações GSAP',
    desc: 'Entrada suave com stagger e animações baseadas em scroll.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  },
  {
    title: 'Paleta automática',
    desc: 'Gere N cores harmônicas a partir de uma cor base.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`
  },
  {
    title: 'Responsivo',
    desc: 'Layout automático entre horizontal e vertical conforme espaço.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
  },
  {
    title: 'Vue 3 + Composition API',
    desc: 'Construído com script setup e composables reutilizáveis.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  },
]

const components = [
  { name: 'CardBase', label: 'Container base', to: '/nemesischart/card-base', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>` },
  { name: 'CardColuna', label: 'Barras verticais', to: '/nemesischart/card-coluna', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>` },
  { name: 'CardBarra', label: 'Barras horizontais', to: '/nemesischart/card-barra', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="18" width="18" height="4" rx="1"/><rect x="3" y="10" width="12" height="4" rx="1"/><rect x="3" y="2" width="7" height="4" rx="1"/></svg>` },
  { name: 'CardLinhas', label: 'Gráfico de linha', to: '/nemesischart/card-linhas', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
  { name: 'CardRosquinha', label: 'Gráfico donut', to: '/nemesischart/card-rosquinha', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>` },
  { name: 'CardSemiCirculo', label: 'Semicírculo', to: '/nemesischart/card-semi-circulo', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2z"/></svg>` },
  { name: 'CardPolar', label: 'Área polar', to: '/nemesischart/card-polar', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>` },
  { name: 'CardProgresso', label: 'Barra de progresso', to: '/nemesischart/card-progresso', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="9" width="20" height="6" rx="3"/><rect x="2" y="9" width="14" height="6" rx="3" fill="currentColor" opacity="0.4"/></svg>` },
]
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">NemesisChart</span>
      <span class="badge badge-green">v1.0.0</span>
    </div>

    <h1>Introdução</h1>
    <p>
      <strong style="color: #fff">NemesisChart</strong> é uma biblioteca de componentes Vue 3 para visualização de dados.
      Combina <strong style="color: var(--color-accent-2)">Chart.js</strong> para renderização e
      <strong style="color: var(--color-accent-2)">GSAP</strong> para animações de entrada, entregando
      gráficos elegantes prontos para produção.
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
    <p>A biblioteca exporta 8 componentes prontos para uso:</p>

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
    <p>Instale o pacote e o peer dependency Chart.js:</p>
    <CodeBlock :code="installCode" language="bash" />

    <p>Importe o CSS no seu <code>main.js</code>:</p>
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
