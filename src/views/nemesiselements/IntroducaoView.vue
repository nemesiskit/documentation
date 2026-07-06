<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import { RouterLink } from 'vue-router'

const installCode = `npm install nemesiselements`

const setupCode = `// main.js
import { createApp } from 'vue'
import App from './App.vue'
import 'nemesiselements/style.css'  // estilos obrigatórios

createApp(App).mount('#app')`

const usageCode = `<script setup>
import { ToastNotificacao } from 'nemesiselements'
import { useToastNotificacao } from 'nemesiselements'

const toast = useToastNotificacao()
<\/script>

<template>
  <ToastNotificacao>
    <button @click="toast.sucesso('Salvo com sucesso!')">Salvar</button>
    <button @click="toast.erro('Algo deu errado.')">Erro</button>
  </ToastNotificacao>
</template>`

const features = [
  {
    title: 'Notificações Toast',
    desc: 'Toasts com 4 severidades, auto-close, countdown e barra de progresso.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`
  },
  {
    title: 'Composable API',
    desc: 'Use useToastNotificacao() em qualquer componente filho sem prop drilling.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
  },
  {
    title: 'Tema claro e escuro',
    desc: 'Prop dark para adaptar o toast ao contexto visual da aplicação.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
  },
  {
    title: 'Animações suaves',
    desc: 'Slide de entrada/saída e flash de cor ao aparecer.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  },
  {
    title: 'Pause no countdown',
    desc: 'Clique no timer para pausar o auto-close e retomar quando quiser.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></svg>`
  },
  {
    title: 'Vue 3 + Composition API',
    desc: 'Construído com script setup, provide/inject e composables.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`
  },
]

const components = [
  {
    name: 'ToastNotificacao',
    label: 'Container provider',
    to: '/nemesiselements/toast-notificacao',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`
  },
  {
    name: 'TooltipElemento',
    label: 'Componente + diretiva',
    to: '/nemesiselements/tooltip-elemento',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
  },
]
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">NemesisElements</span>
      <span class="badge badge-yellow">v0.1.2</span>
    </div>

    <h1>Introdução</h1>
    <p>
      <strong>NemesisElements</strong> é uma biblioteca de componentes de interface para Vue 3
      focada em feedback ao usuário. Construída com Composition API, oferece componentes prontos para produção
      com animações, temas e uma API simples via composables.
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
    <p>A versão atual exporta os seguintes componentes e composables:</p>

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
    <p>Instale o pacote:</p>
    <CodeBlock :code="installCode" language="bash" />

    <p>Importe o CSS no seu <code>main.js</code>:</p>
    <CodeBlock :code="setupCode" language="js" />

    <p>Envolva sua aplicação com o provider e use o composable:</p>
    <CodeBlock :code="usageCode" language="vue" />

    <div class="next-links">
      <RouterLink to="/nemesiselements/instalacao" class="next-link">
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
}

.next-link:hover .next-title {
  text-decoration: underline;
}
</style>
