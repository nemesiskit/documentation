<script setup>
import { ref, computed } from 'vue'
import { CardPizza, CardLinhas, gerarPaleta } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'

const baseColor = ref('#2563eb')

const presets = [
  { name: 'Azul',     color: '#2563eb' },
  { name: 'Índigo',   color: '#4f46e5' },
  { name: 'Verde',    color: '#22c55e' },
  { name: 'Laranja',  color: '#f97316' },
  { name: 'Rosa',     color: '#ec4899' },
  { name: 'Ciano',    color: '#06b6d4' },
  { name: 'Amarelo',  color: '#eab308' },
  { name: 'Vermelho', color: '#ef4444' },
]

// gerarPaleta é exportada pela própria biblioteca — os tons abaixo
// são exatamente os que os cards usam internamente.
const tons = computed(() => gerarPaleta(baseColor.value, 7))

const data = [
  { rotulo: 'A', quantidade: 30 },
  { rotulo: 'B', quantidade: 25 },
  { rotulo: 'C', quantidade: 20 },
  { rotulo: 'D', quantidade: 15 },
  { rotulo: 'E', quantidade: 10 },
]

const dataLinha = [
  { rotulo: 'Jan', quantidade: 42 },
  { rotulo: 'Fev', quantidade: 78 },
  { rotulo: 'Mar', quantidade: 55 },
  { rotulo: 'Abr', quantidade: 90 },
  { rotulo: 'Mai', quantidade: 63 },
]

const baseCode = computed(() => `<!-- Uma cor base colore o card inteiro -->
<CardLinhas :data="data" corDetalhes="${baseColor.value}" />

<!-- Em CardPizza/CardPolar/CardProgresso, ela gera a paleta dos itens -->
<CardPizza :data="data" corDetalhes="${baseColor.value}" />`)

const itemCode = `<CardPizza
  corDetalhes="#3B82F6"
  :data="[
    { rotulo: 'Desktop', quantidade: 4800 },
    { rotulo: 'Mobile',  quantidade: 3200 },
    { rotulo: 'Outros',  quantidade: 320, cor: '#9CA3AF' },
  ]"
/>`

const paletaCode = `import { gerarPaleta } from 'nemesischart'

// Devolve n tons da cor base, do mais escuro ao mais claro,
// variando a luminosidade e preservando o matiz.
const tons = gerarPaleta('#2563eb', 5)`

const seriesCode = `<!-- CardBarra multi-série: cores colore uma série inteira por posição -->
<CardBarra
  :series="[
    { nome: 'Receita', dados: dadosReceita },
    { nome: 'Despesa', dados: dadosDespesa },
  ]"
  :cores="['#3B82F6', '#EF4444']"
/>`
</script>

<template>
  <div class="doc-content">
    <h1>Paleta de cores</h1>
    <p class="doc-lead">
      Escolher uma cor para cada fatia de cada gráfico não escala. Desde a versão 2.0.10, o
      NemesisChart trabalha com uma <strong>cor base</strong>: a prop <code>corDetalhes</code>
      colore a linha do <code>CardLinhas</code> e a barra única do <code>CardBarra</code>, e em
      <code>CardPizza</code>, <code>CardPolar</code> e <code>CardProgresso</code> gera
      automaticamente os tons de todos os itens. Quando um item precisa de uma cor específica,
      defina <code>cor</code> nele.
    </p>

    <h2>Escolhendo a cor base</h2>
    <div class="color-picker-section">
      <div class="preset-colors">
        <button
          v-for="p in presets"
          :key="p.color"
          class="preset-btn"
          :class="{ active: baseColor === p.color }"
          :style="{ '--pc': p.color }"
          @click="baseColor = p.color"
        >
          <span class="preset-dot"></span>
          {{ p.name }}
        </button>
      </div>
      <div class="custom-row">
        <label class="control-label">Personalizada:</label>
        <input type="color" v-model="baseColor" class="color-input-lg" />
        <span class="color-hex font-mono">{{ baseColor }}</span>
      </div>
    </div>

    <h2>Tons gerados pela biblioteca</h2>
    <p>
      Estes são os tons que <code>gerarPaleta</code> deriva da cor base — os mesmos aplicados às
      fatias e setores dos cards:
    </p>
    <div class="tons-row">
      <div v-for="t in tons" :key="t" class="ton-chip" :style="{ background: t }">
        <span>{{ t }}</span>
      </div>
    </div>

    <h2>Vendo a cor base em ação</h2>
    <div class="preview-grid">
      <CardPizza
        legenda="Distribuição"
        titulo="100"
        :data="data"
        :corDetalhes="baseColor"
        direcao="bottom"
      />
      <CardLinhas
        legenda="Receita"
        titulo="328"
        :data="dataLinha"
        :corDetalhes="baseColor"
      />
    </div>
    <CodeBlock :code="baseCode" language="vue" />

    <h2>Definindo a cor de um item específico</h2>
    <p>
      A propriedade <code>cor</code> do item tem prioridade sobre a paleta gerada — útil para
      destacar uma categoria ou neutralizar a fatia "Outros":
    </p>
    <CodeBlock :code="itemCode" language="vue" />

    <h2>Reutilizando a paleta fora dos cards</h2>
    <p>
      Para colorir legendas próprias, chips ou tabelas com os mesmos tons dos gráficos, importe
      <code>gerarPaleta</code>:
    </p>
    <CodeBlock :code="paletaCode" language="js" />

    <h2>Colorindo várias séries</h2>
    <p>
      No <code>CardBarra</code> multi-série, a lógica é outra: cada cor colore uma série inteira.
      Use o array <code>cores</code> (por posição) ou defina <code>cor</code> em cada série:
    </p>
    <CodeBlock :code="seriesCode" language="vue" />

    <div class="callout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        Tons derivados de cores muito claras (amarelo, por exemplo) podem perder contraste sobre o
        tema <code>light</code>. Verifique a leitura do gráfico nos dois temas antes de publicar.
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-picker-section { margin: 1rem 0 2rem; }
.preset-colors { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.preset-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
}
.preset-btn.active {
  border-color: var(--pc);
  background: rgba(from var(--pc) r g b / 0.1);
  color: var(--color-heading);
}
.preset-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--pc);
  flex-shrink: 0;
}
.custom-row { display: flex; align-items: center; gap: 0.75rem; }
.control-label { font-size: 0.8rem; color: var(--color-text-muted); }
.color-input-lg { width: 40px; height: 32px; border: 1px solid var(--color-border); border-radius: 4px; cursor: pointer; background: transparent; }
.color-hex { font-size: 0.85rem; color: var(--color-text-muted); }
.tons-row { display: flex; gap: 0.4rem; flex-wrap: wrap; margin: 1rem 0 1.5rem; }
.ton-chip { flex: 1 1 90px; min-height: 56px; border-radius: var(--radius-sm); display: flex; align-items: flex-end; padding: 0.4rem 0.5rem; font-size: 0.7rem; font-family: var(--font-mono); color: rgba(255,255,255,0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.4); }
.preview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
</style>
