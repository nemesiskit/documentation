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

const tokensCode = `<!-- Sem borda arredondada e sem sombra -->
<CardBarra :data="data" borderRadius="0" sombra="none" />

<!-- Sombra e raio customizados -->
<CardBarra
  :data="data"
  borderRadius="1.5rem"
  sombra="0 10px 30px rgba(0, 0, 0, 0.15)"
/>`

const wrapperCode = `<!-- Envolva o card dark em um container escuro para melhor integração -->
<div style="background: #0d1117; padding: 1.5rem; border-radius: 12px;">
  <CardBarra tema="dark" titulo="Dashboard" :data="data" />
</div>`
</script>

<template>
  <div class="doc-content">
    <h1>Temas</h1>
    <p class="doc-lead">
      Todos os componentes do NemesisChart aceitam a prop <code>tema</code> com dois valores:
      <code>light</code> (padrão) e <code>dark</code>. Para personalizações mais finas, use
      <code>corFundo</code>, <code>corTexto</code> e <code>corBorda</code> — esses overrides têm
      prioridade sobre o tema escolhido.
    </p>

    <h2>Usando o tema claro</h2>
    <p>Tema padrão com fundos claros e texto escuro.</p>
    <div class="demo-section">
      <CardBarra tema="light" legenda="Tema" titulo="Light" descricao="padrão" :data="data" corDetalhes="#3B82F6" />
    </div>

    <h2>Usando o tema escuro</h2>
    <p>Fundo escuro com texto claro, para dashboards em dark mode.</p>
    <div class="demo-section demo-dark">
      <CardBarra tema="dark" legenda="Tema" titulo="Dark" descricao="modo escuro" :data="data" corDetalhes="#60A5FA" />
    </div>

    <h2>Definindo cores próprias</h2>
    <p>
      Use <code>corFundo</code> (e opcionalmente <code>corTexto</code> e <code>corBorda</code>)
      para qualquer cor hex/rgb, sobrescrevendo o tema. A cor base <code>corDetalhes</code>
      completa o conjunto gerando a paleta do gráfico:
    </p>
    <div class="demo-section">
      <div class="custom-bg-demo">
        <CardPizza corFundo="#0f172a" corTexto="#fff" corBorda="#1e293b" legenda="Custom" titulo="#0f172a" :data="dataPizza" corDetalhes="#38bdf8" />
        <CardPizza corFundo="#1a0a2e" corTexto="#fff" corBorda="#2d1845" legenda="Custom" titulo="#1a0a2e" :data="dataPizza" corDetalhes="#a855f7" />
        <CardPizza corFundo="#0a1f1a" corTexto="#fff" corBorda="#143028" legenda="Custom" titulo="#0a1f1a" :data="dataPizza" corDetalhes="#22c55e" />
      </div>
    </div>
    <CodeBlock :code="temaCode" language="vue" />

    <h2>Ajustando borda e sombra</h2>
    <p>
      Os tokens visuais completam o tema: <code>borderRadius</code> (padrão <code>0.75rem</code>)
      e <code>sombra</code> (padrão: sombra suave da biblioteca) aceitam qualquer valor CSS.
    </p>
    <CodeBlock :code="tokensCode" language="vue" />

    <h2>Integrando o card dark ao layout</h2>
    <p>No tema <code>dark</code>, envolva o card em um container escuro para melhor integração visual:</p>
    <CodeBlock :code="wrapperCode" language="vue" />
  </div>
</template>

<style scoped>
.custom-bg-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
