<script setup>
import { ref } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
const tab = ref('npm')

const npmInstall = `npm install nemesischart chart.js primevue primeflex primeicons`
const yarnInstall = `yarn add nemesischart chart.js primevue primeflex primeicons`
const pnpmInstall = `pnpm add nemesischart chart.js primevue primeflex primeicons`

const pluginReg = `// main.js — registro como plugin (todos os componentes globais)
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import NemesisChart from 'nemesischart'

import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'nemesischart/style.css'

import App from './App.vue'

createApp(App)
  .use(PrimeVue)
  .use(NemesisChart)
  .mount('#app')`

const localImport = `<script setup>
// Importação local por componente (recomendado, tree-shaking)
import { CardLinhas } from 'nemesischart'
<\/script>`

const peerDeps = `{
  "peerDependencies": {
    "vue": "^3.x",
    "chart.js": "^4.x",
    "primevue": "^4.x",
    "primeflex": "^3.x"
  }
}`
</script>

<template>
  <div class="doc-content">
    <h1>Instalação</h1>
    <p>
      O NemesisChart requer <code>vue@^3</code>, <code>chart.js@^4</code>,
      <code>primevue@^4</code> e <code>primeflex@^3</code> como peer dependencies.
      Certifique-se de tê-los instalados no seu projeto.
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

    <h2>Registro como plugin</h2>
    <p>
      A forma mais simples é registrar o NemesisChart como plugin Vue, importando
      o CSS <strong style="color: var(--color-text)">uma vez</strong> no arquivo de entrada.
    </p>
    <CodeBlock :code="pluginReg" language="js" />

    <h2>Importação local</h2>
    <p>
      Alternativamente, importe apenas os componentes que usar — o bundle final é menor (tree-shaking
      automático). Lembre-se de importar o CSS no <code>main.js</code> mesmo nesse modo.
    </p>
    <CodeBlock :code="localImport" language="vue" />

    <h2>Peer dependencies</h2>
    <p>O NemesisChart não inclui Vue, Chart.js, PrimeVue ou PrimeFlex no bundle:</p>
    <CodeBlock :code="peerDeps" language="json" />

    <div class="callout callout-info">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <strong>Nota:</strong> O PrimeIcons é opcional e necessário apenas se você quiser usar ícones de fonte do PrimeVue dentro dos slots dos cards.
      </div>
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

.callout {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.25);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: 1.5rem;
}

.callout svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-accent-2);
}

.callout strong {
  color: var(--color-text);
}
</style>
