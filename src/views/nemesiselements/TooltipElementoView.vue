<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import { RouterLink } from 'vue-router'
import { TooltipElemento } from 'nemesiselements'

const componentUsage = `<script setup>
import { TooltipElemento } from 'nemesiselements'
<\/script>

<template>
  <TooltipElemento text="Texto do tooltip">
    <button>Passe o mouse</button>
  </TooltipElemento>
</template>`

const withTitle = `<TooltipElemento
  text="Descrição detalhada da ação."
  title="Título"
>
  <button>Hover</button>
</TooltipElemento>`

const positionCode = `<TooltipElemento text="Acima" position="top">
  <button>Top (padrão)</button>
</TooltipElemento>

<TooltipElemento text="Abaixo" position="bottom">
  <button>Bottom</button>
</TooltipElemento>

<TooltipElemento text="À esquerda" position="left">
  <button>Left</button>
</TooltipElemento>

<TooltipElemento text="À direita" position="right">
  <button>Right</button>
</TooltipElemento>`

const darkCode = `<TooltipElemento text="Tema escuro" :dark="true">
  <button>Dark</button>
</TooltipElemento>`

const directiveSetup = `// main.js — registro global
import { TooltipPlugin } from 'nemesiselements'

app.use(TooltipPlugin)`

const directiveLocal = `// Registro local em um componente
import { vTooltip } from 'nemesiselements'`

const directiveUsage = `<!-- String simples -->
<button v-tooltip="'Texto do tooltip'">Hover</button>

<!-- Objeto completo -->
<button v-tooltip="{ text: 'Descrição', title: 'Título', position: 'bottom', dark: true }">
  Hover
</button>

<!-- Reativo -->
<button :v-tooltip="tooltipConfig">Hover</button>`

const props = [
  { name: 'text', type: 'String', default: '—', description: 'Obrigatório. Texto principal do tooltip.' },
  { name: 'title', type: 'String', default: 'null', description: 'Título em negrito exibido acima do texto.' },
  { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posição do tooltip em relação ao elemento.' },
  { name: 'dark', type: 'Boolean', default: 'false', description: 'Ativa o tema escuro (fundo #0b0e13).' },
]

const directiveOptions = [
  { name: 'text', type: 'String', default: '—', description: 'Obrigatório. Texto do tooltip.' },
  { name: 'title', type: 'String', default: 'null', description: 'Título em negrito acima do texto.' },
  { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posição do tooltip.' },
  { name: 'dark', type: 'Boolean', default: 'false', description: 'Tema escuro (fundo #1f2937).' },
]

const positions = ['top', 'bottom', 'left', 'right']
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">NemesisElements</span>
    </div>

    <h1>TooltipElemento</h1>
    <p>
      Tooltip para Vue 3 disponível em duas formas: componente <code>TooltipElemento</code>
      (via slot) e diretiva <code>v-tooltip</code> (via atributo). Ambos suportam 4 posições,
      título opcional e tema escuro. A diretiva injeta os estilos automaticamente no
      <code>&lt;head&gt;</code> sem precisar importar CSS adicional.
    </p>

    <h2>Demonstração</h2>

    <div class="demo-section demo-dark">
      <div class="demo-label">Posições</div>
      <div class="demo-grid">
        <TooltipElemento
          v-for="pos in positions"
          :key="pos"
          :text="`Tooltip ${pos}`"
          :position="pos"
          title="Título"
        >
          <button class="demo-btn">{{ pos }}</button>
        </TooltipElemento>
      </div>

      <div class="demo-label" style="margin-top: 1.5rem">Tema escuro</div>
      <div class="demo-grid">
        <TooltipElemento text="Tooltip dark" title="Título" :dark="true">
          <button class="demo-btn">dark</button>
        </TooltipElemento>
        <TooltipElemento text="Sem título, dark" :dark="true">
          <button class="demo-btn">sem título</button>
        </TooltipElemento>
      </div>
    </div>

    <h2>Uso básico</h2>
    <p>Envolva qualquer elemento com <code>TooltipElemento</code> e passe o texto via prop:</p>
    <CodeBlock :code="componentUsage" language="vue" />

    <h2>Com título</h2>
    <p>Use a prop <code>title</code> para exibir um cabeçalho em negrito acima do texto:</p>
    <CodeBlock :code="withTitle" language="vue" />

    <h2>Posições</h2>
    <CodeBlock :code="positionCode" language="vue" />

    <h2>Tema escuro</h2>
    <CodeBlock :code="darkCode" language="vue" />

    <h2>Props</h2>
    <PropsTable :props="props" />

    <h2>Diretiva v-tooltip</h2>
    <p>
      Alternativa ao componente. Funciona como atributo em qualquer elemento,
      sem precisar de slot. Os estilos são injetados automaticamente na primeira utilização.
    </p>

    <h3>Registro global</h3>
    <CodeBlock :code="directiveSetup" language="js" />

    <h3>Registro local</h3>
    <CodeBlock :code="directiveLocal" language="vue" />

    <h3>Uso</h3>
    <CodeBlock :code="directiveUsage" language="vue" />

    <h3>Opções da diretiva</h3>
    <PropsTable :props="directiveOptions" />

    <h2>Comportamento</h2>
    <ul>
      <li>Aparece no <strong style="color: var(--color-text)">hover</strong> e no <strong style="color: var(--color-text)">focus</strong> do elemento.</li>
      <li>Animação de fade + slide de 4px em direção ao elemento.</li>
      <li><code>pointer-events: none</code> — o tooltip nunca bloqueia cliques.</li>
      <li><code>z-index: 9999</code> em ambas as implementações.</li>
      <li>A diretiva atualiza o tooltip reativamente quando o binding muda.</li>
      <li>Remove o tooltip do DOM automaticamente no <code>unmounted</code>.</li>
    </ul>

    <div class="nav-links">
      <RouterLink to="/nemesiselements/toast-notificacao" class="nav-link">
        <div class="nav-label">Anterior</div>
        <div class="nav-title">← ToastNotificacao</div>
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

.demo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  padding: 1rem 0.5rem;
  align-items: center;
}

.demo-btn {
  padding: 0.4rem 1rem;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-hover);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-size: 0.8rem;
  cursor: default;
  font-family: var(--font-mono);
}

.nav-links {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.nav-link { color: inherit; }

.nav-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.nav-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-accent-2);
}

.nav-link:hover .nav-title { text-decoration: underline; }
</style>
