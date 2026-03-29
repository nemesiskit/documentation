<script setup>
import { ref, computed } from 'vue'
import { CardRosquinha, CardColuna } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'

const baseColor = ref('#2563eb')

const presets = [
  { name: 'Azul', color: '#2563eb' },
  { name: 'Índigo', color: '#4f46e5' },
  { name: 'Verde', color: '#22c55e' },
  { name: 'Laranja', color: '#f97316' },
  { name: 'Rosa', color: '#ec4899' },
  { name: 'Ciano', color: '#06b6d4' },
  { name: 'Amarelo', color: '#eab308' },
  { name: 'Vermelho', color: '#ef4444' },
]

const dados = [
  { rotulo: 'A', quantidade: 30 },
  { rotulo: 'B', quantidade: 25 },
  { rotulo: 'C', quantidade: 20 },
  { rotulo: 'D', quantidade: 15 },
  { rotulo: 'E', quantidade: 10 },
]

const dadosColuna = [
  { rotulo: 'Jan', quantidade: 42 },
  { rotulo: 'Fev', quantidade: 78 },
  { rotulo: 'Mar', quantidade: 55 },
  { rotulo: 'Abr', quantidade: 90 },
  { rotulo: 'Mai', quantidade: 63 },
]

const paletaCode = computed(() => `<!-- A cor base gera automaticamente N variações -->
<CardRosquinha
  :dados="dados"
  corPaleta="${baseColor.value}"
/>

<!-- O mesmo funciona para barras, polar, semicírculo -->
<CardColuna
  :dados="dados"
  corPaleta="${baseColor.value}"
/>`)

const algorithmCode = `/* Algoritmo interno de geração de paleta (useColorPalette.js):
   1. Converte hex -> HSL
   2. Mantém matiz (H) e saturação (S)
   3. Varia leveza (L) de forma distribuída
   4. Retorna N cores em hex
*/

// Exemplo: #2563eb (hue: 220) com 5 itens gera:
// ['#93c5fd', '#60a5fa', '#2563eb', '#1d4ed8', '#1e3a8a']`
</script>

<template>
  <div class="doc-content">
    <h1>Paleta de Cores</h1>
    <p>
      O NemesisChart gera automaticamente uma paleta harmônica a partir de uma única
      cor base informada via prop <code>corPaleta</code> ou <code>corDetalhe</code>.
    </p>

    <h2>Escolha a cor base</h2>
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

    <h2>Preview ao vivo</h2>
    <div class="preview-grid">
      <CardRosquinha
        titulo="Distribuição"
        :dados="dados"
        :corPaleta="baseColor"
        :legendaGraficoVisivel="true"
        labelRotulo="Item"
        labelQuantidade="Val."
      />
      <CardColuna
        titulo="Colunas"
        :dados="dadosColuna"
        :corPaleta="baseColor"
      />
    </div>

    <h2>Como usar</h2>
    <CodeBlock :code="paletaCode" language="vue" />

    <h2>Algoritmo</h2>
    <p>A paleta é gerada no espaço HSL, variando apenas a luminosidade:</p>
    <CodeBlock :code="algorithmCode" language="js" />

    <div class="callout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        No <strong style="color: var(--color-text)">CardLinhas</strong>, use a prop <code>corDetalhe</code>
        (uma única cor) em vez de <code>corPaleta</code>.
        A linha e o gradiente de preenchimento usam essa cor diretamente.
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
  color: var(--color-text);
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
.preview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
.callout { display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(124,111,205,0.08); border: 1px solid rgba(124,111,205,0.25); border-radius: var(--radius); padding: 1rem 1.25rem; font-size: 0.875rem; color: var(--color-text-muted); margin-top: 1.5rem; }
.callout svg { flex-shrink: 0; margin-top: 2px; color: var(--color-accent-2); }
</style>
