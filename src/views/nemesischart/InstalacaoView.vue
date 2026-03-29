<script setup>
import { ref } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
const tab = ref('npm')

const npmInstall = `npm install nemesischart chart.js`
const yarnInstall = `yarn add nemesischart chart.js`
const pnpmInstall = `pnpm add nemesischart chart.js`

const mainJs = `// main.js
import { createApp } from 'vue'
import App from './App.vue'
import 'nemesischart/style.css'

createApp(App).mount('#app')`

const globalReg = `// Registro global (opcional)
import { CardColuna, CardBarra, CardLinhas } from 'nemesischart'
import 'nemesischart/style.css'

const app = createApp(App)
app.component('CardColuna', CardColuna)
app.component('CardBarra', CardBarra)
app.component('CardLinhas', CardLinhas)
app.mount('#app')`

const localImport = `<script setup>
// Importação local por componente (recomendado)
import { CardColuna } from 'nemesischart'
<\/script>`

const peerDeps = `{
  "peerDependencies": {
    "vue": "^3.x",
    "chart.js": "^4.x"
  }
}`
</script>

<template>
  <div class="doc-content">
    <h1>Instalação</h1>
    <p>
      O NemesisChart requer <code>vue@^3</code> e <code>chart.js@^4</code> como peer dependencies.
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

    <h2>Configuração do CSS</h2>
    <p>
      O CSS deve ser importado <strong style="color: var(--color-text)">uma vez</strong> no arquivo de entrada do projeto.
      Ele contém os estilos base e variáveis de tema dos componentes.
    </p>
    <CodeBlock :code="mainJs" language="js" />

    <h2>Importação dos componentes</h2>
    <p>
      Recomendamos a importação local por componente (tree-shaking automático).
      O registro global é uma alternativa válida para projetos com uso intensivo.
    </p>

    <h3>Local (recomendado)</h3>
    <CodeBlock :code="localImport" language="vue" />

    <h3>Global</h3>
    <CodeBlock :code="globalReg" language="js" />

    <h2>Peer dependencies</h2>
    <p>O NemesisChart não inclui Vue ou Chart.js no bundle. Eles devem estar presentes no projeto:</p>
    <CodeBlock :code="peerDeps" language="json" />

    <div class="callout callout-info">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <strong>Nota:</strong> O GSAP já está incluído no bundle do NemesisChart. Não é necessário instalá-lo separadamente, a menos que queira usá-lo diretamente no seu projeto.
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
