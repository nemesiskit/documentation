<script setup>
import { CardBarra, CardPizza } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'

const data = [
  { rotulo: 'A', quantidade: 40 },
  { rotulo: 'B', quantidade: 75 },
  { rotulo: 'C', quantidade: 55 },
  { rotulo: 'D', quantidade: 90 },
]

const dataPizza = [
  { rotulo: 'Alpha', quantidade: 45 },
  { rotulo: 'Beta',  quantidade: 30 },
  { rotulo: 'Gamma', quantidade: 25 },
]

const temaCode = `<!-- Tema light (padrão) -->
<CardBarra tema="light" titulo="Vendas" :data="data" />

<!-- Tema dark -->
<CardBarra tema="dark" titulo="Vendas" :data="data" />

<!-- Override de cores (independente do tema) -->
<CardBarra
  corFundo="#1a0a2e"
  corTexto="#fff"
  corBorda="#2d1845"
  titulo="Custom"
  :data="data"
/>`

const wrapperCode = `<!-- Envolva o card dark em um container escuro para melhor integração -->
<div style="background: #0d1117; padding: 1.5rem; border-radius: 12px;">
  <CardBarra tema="dark" titulo="Dashboard" :data="data" />
</div>`
</script>

<template>
  <div class="doc-content">
    <h1>Temas</h1>
    <p>
      Todos os componentes do NemesisChart aceitam a prop <code>tema</code> com dois valores:
      <code>light</code> (padrão) e <code>dark</code>. Para personalizações mais finas, use
      <code>corFundo</code>, <code>corTexto</code> e <code>corBorda</code> — esses overrides têm
      prioridade sobre o tema escolhido.
    </p>

    <h2>Light</h2>
    <p>Tema padrão com fundos claros e texto escuro.</p>
    <div class="demo-section">
      <CardBarra tema="light" legenda="Tema" titulo="Light" descricao="padrão" :data="data" corDetalhes="#3B82F6" />
    </div>

    <h2>Dark</h2>
    <p>Fundo escuro com texto claro. Ideal para dashboards noturnos.</p>
    <div class="demo-section demo-dark">
      <CardBarra tema="dark" legenda="Tema" titulo="Dark" descricao="modo escuro" :data="data" corDetalhes="#60A5FA" />
    </div>

    <h2>Background customizado</h2>
    <p>Use <code>corFundo</code> (e opcionalmente <code>corTexto</code>) para qualquer cor hex/rgb, sobrescrevendo o tema.</p>
    <div class="demo-section">
      <div class="custom-bg-demo">
        <CardPizza corFundo="#0f172a" corTexto="#fff" corBorda="#1e293b" legenda="Custom" titulo="#0f172a" :data="dataPizza" :cores="['#38bdf8','#0ea5e9','#0284c7']" />
        <CardPizza corFundo="#1a0a2e" corTexto="#fff" corBorda="#2d1845" legenda="Custom" titulo="#1a0a2e" :data="dataPizza" :cores="['#a855f7','#9333ea','#7e22ce']" />
        <CardPizza corFundo="#0a1f1a" corTexto="#fff" corBorda="#143028" legenda="Custom" titulo="#0a1f1a" :data="dataPizza" :cores="['#22c55e','#16a34a','#15803d']" />
      </div>
    </div>

    <h2>Como usar</h2>
    <CodeBlock :code="temaCode" language="vue" />

    <h2>Dica: wrapper externo</h2>
    <p>No tema <code>dark</code>, envolva o card em um container escuro para melhor integração visual:</p>
    <CodeBlock :code="wrapperCode" language="vue" />

    <div class="callout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <div>
        Os tokens visuais (<code>borderRadius</code>, <code>sombra</code>) também podem ser ajustados
        em conjunto com o tema, dando aos cards um visual customizado sem renunciar à paleta padrão.
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-bg-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
.callout { display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(124,111,205,0.08); border: 1px solid rgba(124,111,205,0.25); border-radius: var(--radius); padding: 1rem 1.25rem; font-size: 0.875rem; color: var(--color-text-muted); margin-top: 1.5rem; }
.callout svg { flex-shrink: 0; margin-top: 2px; color: var(--color-accent-2); }
</style>
