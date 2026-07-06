<script setup>
import { ref } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
const tab = ref('npm')

const npmInstall = `npm install nemesischart chart.js`
const yarnInstall = `yarn add nemesischart chart.js`
const pnpmInstall = `pnpm add nemesischart chart.js`

const pluginReg = `// main.js — registro como plugin (todos os componentes globais)
import { createApp } from 'vue'
import NemesisChart from 'nemesischart'

import 'nemesischart/style.css'

import App from './App.vue'

createApp(App)
  .use(NemesisChart)
  .mount('#app')`

const localImport = `<script setup>
// Importação local por componente (tree-shaking)
import { CardLinhas } from 'nemesischart'
<\/script>`

const peerDeps = `{
  "peerDependencies": {
    "vue": "^3.4.0",
    "chart.js": "^4.0.0"
  }
}`

const migracaoRemover = `npm uninstall primevue primeflex primeicons`

const migracaoMain = `// main.js — antes (até a 2.0.9)
import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'nemesischart/style.css'

createApp(App).use(PrimeVue).use(NemesisChart).mount('#app')

// main.js — depois (2.0.10+)
import 'nemesischart/style.css'

createApp(App).use(NemesisChart).mount('#app')`

const migracaoCores = `<!-- Antes (até a 2.0.9): um array de cores -->
<CardPizza :data="data" :cores="['#3B82F6', '#10B981', '#F59E0B']" />

<!-- Depois (2.0.10+): uma cor base gera a paleta... -->
<CardPizza :data="data" corDetalhes="#3B82F6" />

<!-- ...e cada item pode definir a própria cor -->
<CardPizza
  :data="[
    { rotulo: 'Desktop', quantidade: 4800, cor: '#3B82F6' },
    { rotulo: 'Mobile',  quantidade: 3200, cor: '#10B981' },
  ]"
/>`

const migracaoClique = `// Antes (até a 2.0.9): o handler recebia o item
function aoClicar(item) {
  console.log(item.rotulo)
}

// Depois (2.0.10+): o handler recebe { item, index, cor }
function aoClicar({ item, index, cor }) {
  console.log(item.rotulo, index, cor)
}`
</script>

<template>
  <div class="doc-content">
    <h1>Instalação</h1>
    <p class="doc-lead">
      O NemesisChart precisa de <code>vue@^3.4</code> e <code>chart.js@^4</code> no seu projeto —
      e de nada mais. Desde a versão 2.0.10, PrimeVue, PrimeFlex e PrimeIcons deixaram de ser
      dependências: os estilos utilitários usados pelos componentes vêm embutidos em
      <code>nemesischart/style.css</code>, com prefixo <code>nc-</code>, mantendo o mesmo visual.
    </p>

    <h2>Instalando o pacote</h2>

    <div class="tab-group">
      <button class="tab-btn" :class="{ active: tab === 'npm' }" @click="tab = 'npm'">npm</button>
      <button class="tab-btn" :class="{ active: tab === 'yarn' }" @click="tab = 'yarn'">yarn</button>
      <button class="tab-btn" :class="{ active: tab === 'pnpm' }" @click="tab = 'pnpm'">pnpm</button>
    </div>
    <CodeBlock v-if="tab === 'npm'" :code="npmInstall" language="bash" />
    <CodeBlock v-if="tab === 'yarn'" :code="yarnInstall" language="bash" />
    <CodeBlock v-if="tab === 'pnpm'" :code="pnpmInstall" language="bash" />

    <h2>Registrando os componentes globalmente</h2>
    <p>
      Quando vários lugares do app usam os cards, registre o NemesisChart como plugin Vue e importe
      o CSS <strong>uma vez</strong> no arquivo de entrada:
    </p>
    <CodeBlock :code="pluginReg" language="js" />

    <h2>Importando somente o que usar</h2>
    <p>
      Quando poucos componentes são necessários, importe cada um no próprio arquivo — o
      tree-shaking mantém o bundle final menor. O CSS continua sendo importado no
      <code>main.js</code> nesse modo.
    </p>
    <CodeBlock :code="localImport" language="vue" />

    <h2>Peer dependencies</h2>
    <p>O NemesisChart não inclui Vue nem Chart.js no bundle — eles vêm do seu projeto:</p>
    <CodeBlock :code="peerDeps" language="json" />

    <h2>Migrando de uma versão anterior à 2.0.10</h2>
    <p>
      A atualização pede três ajustes. O visual dos cards permanece o mesmo depois de todos eles.
    </p>

    <h3>1. Remova as dependências do Prime</h3>
    <p>
      Se PrimeVue, PrimeFlex e PrimeIcons eram usados apenas pelo NemesisChart, remova os pacotes.
      Se outras partes do app dependem deles, mantenha-os — os dois convivem sem conflito.
    </p>
    <CodeBlock :code="migracaoRemover" language="bash" />
    <p>Depois, limpe o <code>main.js</code>:</p>
    <CodeBlock :code="migracaoMain" language="js" />

    <h3>2. Troque <code>cores</code> por <code>corDetalhes</code></h3>
    <p>
      Em <code>CardPizza</code>, <code>CardPolar</code> e <code>CardProgresso</code>, o array
      <code>cores</code> deixou de existir. A paleta agora é derivada de uma cor base, e itens
      individuais podem sobrescrevê-la:
    </p>
    <CodeBlock :code="migracaoCores" language="vue" />

    <h3>3. Ajuste o handler de <code>@itemClicado</code></h3>
    <p>
      O evento passou a emitir um objeto com o item, o índice e a cor da fatia clicada:
    </p>
    <CodeBlock :code="migracaoClique" language="js" />

    <div class="callout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <strong>Nota:</strong> o <code>CardBarra</code> multi-série continua aceitando o array
        <code>cores</code> — nele, cada cor colore uma série inteira, não um item.
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
  background: var(--code-header-bg);
  color: var(--color-heading);
  border-color: var(--color-border);
}
</style>
