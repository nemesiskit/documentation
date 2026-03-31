<script setup>
import { ref } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

const tab = ref('npm')

const npmInstall = `npm install nemesiselements`
const yarnInstall = `yarn add nemesiselements`
const pnpmInstall = `pnpm add nemesiselements`

const mainJs = `// main.js
import { createApp } from 'vue'
import App from './App.vue'
import 'nemesiselements/style.css'

createApp(App).mount('#app')`

const localImport = `<script setup>
import { ToastNotificacao } from 'nemesiselements'
import { useToastNotificacao } from 'nemesiselements'
<\/script>`

const peerDeps = `{
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}`
</script>

<template>
  <div class="doc-content">
    <h1>Instalação</h1>
    <p>
      O NemesisElements requer apenas <code>vue@^3</code> como peer dependency.
    </p>

    <h2>Instalação do pacote</h2>

    <div class="tab-group">
      <button class="tab-btn" :class="{ active: tab === 'npm' }" @click="tab = 'npm'">npm</button>
      <button class="tab-btn" :class="{ active: tab === 'yarn' }" @click="tab = 'yarn'">yarn</button>
      <button class="tab-btn" :class="{ active: tab === 'pnpm' }" @click="tab = 'pnpm'">pnpm</button>
    </div>
    <CodeBlock v-if="tab === 'npm'" :code="npmInstall" language="bash" />
    <CodeBlock v-if="tab === 'yarn'" :code="yarnInstall" language="bash" />
    <CodeBlock v-if="tab === 'pnpm'" :code="pnpmInstall" language="bash" />

    <h2>Configuração do CSS</h2>
    <p>
      Importe o CSS <strong style="color: var(--color-text)">uma vez</strong> no arquivo de entrada do projeto.
      Ele contém as fontes Geist e os estilos dos componentes.
    </p>
    <CodeBlock :code="mainJs" language="js" />

    <h2>Importação dos componentes</h2>
    <p>
      Importe <code>ToastNotificacao</code> e o composable <code>useToastNotificacao</code> diretamente no componente onde for usar.
    </p>
    <CodeBlock :code="localImport" language="vue" />

    <h2>Peer dependencies</h2>
    <p>O NemesisElements não inclui Vue no bundle. Ele deve estar presente no projeto:</p>
    <CodeBlock :code="peerDeps" language="json" />

    <div class="next-links">
      <RouterLink to="/nemesiselements/toast-notificacao" class="next-link">
        <div class="next-label">Próximo</div>
        <div class="next-title">ToastNotificacao →</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.tab-group {
  display: flex;
  gap: 0.25rem;
  margin-bottom: -1px;
  position: relative;
  z-index: 1;
}

.tab-btn {
  padding: 0.4rem 0.9rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  font-family: var(--font-mono);
  transition: all 0.15s;
}

.tab-btn.active {
  background: #0d0d14;
  color: var(--color-text);
  border-color: var(--color-border);
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
