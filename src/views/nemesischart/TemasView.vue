<script setup>
import { CardColuna, CardRosquinha } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'

const dados = [
  { rotulo: 'A', quantidade: 40 },
  { rotulo: 'B', quantidade: 75 },
  { rotulo: 'C', quantidade: 55 },
  { rotulo: 'D', quantidade: 90 },
]

const dadosDonut = [
  { rotulo: 'Alpha', quantidade: 45 },
  { rotulo: 'Beta', quantidade: 30 },
  { rotulo: 'Gamma', quantidade: 25 },
]

const temaCode = `<!-- Tema Light (padrão) -->
<CardColuna tema="Light" titulo="Vendas" :dados="dados" />

<!-- Tema Dark -->
<CardColuna tema="Dark" titulo="Vendas" :dados="dados" />

<!-- Transparente (sem background) -->
<CardColuna tema="Transparent" titulo="Vendas" :dados="dados" />

<!-- Background customizado -->
<CardColuna corFundo="#1a0a2e" titulo="Vendas" :dados="dados" />`

const globalCode = `/* Encapsular num wrapper com cor de fundo -->
<div style="background: #0d1117; padding: 1.5rem; border-radius: 12px;">
  <CardColuna tema="Dark" titulo="Dashboard" :dados="dados" />
</div>`
</script>

<template>
  <div class="doc-content">
    <h1>Temas</h1>
    <p>
      Todos os componentes do NemesisChart suportam três temas via prop <code>tema</code>,
      além da possibilidade de definir um background customizado.
    </p>

    <h2>Light</h2>
    <p>Tema padrão com fundos claros e texto escuro.</p>
    <div class="demo-section">
      <CardColuna tema="Light" titulo="Tema Light" descricao="Padrão" :dados="dados" corPaleta="#2563eb" />
    </div>

    <h2>Dark</h2>
    <p>Fundo escuro com texto claro. Ideal para dashboards noturnos.</p>
    <div class="demo-section demo-dark">
      <CardColuna tema="Dark" titulo="Tema Dark" descricao="Modo escuro" :dados="dados" corPaleta="#2563eb" />
    </div>

    <h2>Transparent</h2>
    <p>Sem background — o card herda a cor de fundo do elemento pai.</p>
    <div class="demo-section demo-transparent">
      <CardRosquinha tema="Transparent" titulo="Transparente" :dados="dadosDonut" corPaleta="#fff" :legendaGraficoVisivel="false" valor="100" valorDescricao="Total" />
    </div>

    <h2>Background customizado</h2>
    <p>Use <code>corFundo</code> para qualquer cor hex ou rgb, independente do tema.</p>
    <div class="demo-section">
      <div class="custom-bg-demo">
        <CardColuna corFundo="#0f172a" titulo="Custom #0f172a" :dados="dados" corPaleta="#38bdf8" />
        <CardColuna corFundo="#1a0a2e" titulo="Custom #1a0a2e" :dados="dados" corPaleta="#a855f7" />
        <CardColuna corFundo="#0a1f1a" titulo="Custom #0a1f1a" :dados="dados" corPaleta="#22c55e" />
      </div>
    </div>

    <h2>Como usar</h2>
    <CodeBlock :code="temaCode" language="vue" />

    <h2>Dica: wrapper externo</h2>
    <p>Para o tema Dark, envolva em um container escuro para melhor integração:</p>
    <CodeBlock :code="globalCode" language="vue" />

    <div class="callout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <div>
        O tema <code>Transparent</code> é especialmente útil para embutir gráficos em cards ou
        seções que já têm um background definido no layout pai.
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-bg-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.callout { display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(124,111,205,0.08); border: 1px solid rgba(124,111,205,0.25); border-radius: var(--radius); padding: 1rem 1.25rem; font-size: 0.875rem; color: var(--color-text-muted); margin-top: 1.5rem; }
.callout svg { flex-shrink: 0; margin-top: 2px; color: var(--color-accent-2); }
</style>
