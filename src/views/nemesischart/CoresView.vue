<script setup>
import { ref, computed } from 'vue'
import { CardPizza, CardLinhas } from 'nemesischart'
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

function gerarTons(hex, n) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const tones = []
  for (let i = 0; i < n; i++) {
    const t = (i - (n - 1) / 2) / (n - 1) * 0.55
    const f = (c) => {
      const target = t >= 0 ? 0 : 255
      return Math.round(c + (target - c) * Math.abs(t))
    }
    const v = (c) => f(c).toString(16).padStart(2, '0')
    tones.push('#' + v(r) + v(g) + v(b))
  }
  return tones
}

const tons = computed(() => gerarTons(baseColor.value, 7))

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

const coresCode = computed(() => `<!-- CardPizza, CardPolar, CardBarra, CardProgresso usam um array \`cores\` -->
<CardPizza
  :data="data"
  :cores="['${tons.value[0]}', '${tons.value[1]}', '${tons.value[2]}', '${tons.value[3]}']"
/>`)

const detalhesCode = computed(() => `<!-- CardLinhas, CardBarra (1 série), CardProgresso usam \`corDetalhes\` -->
<CardLinhas
  :data="data"
  corDetalhes="${baseColor.value}"
/>`)
</script>

<template>
  <div class="doc-content">
    <h1>Paleta de Cores</h1>
    <p>
      O NemesisChart usa duas formas de configurar cores nos componentes: a prop
      <code>corDetalhes</code> (uma única cor — usada em <code>CardLinhas</code>,
      <code>CardBarra</code> de série única e no anel central do <code>CardProgresso</code>
      circular), e a prop <code>cores</code> (um array — usada em <code>CardPizza</code>,
      <code>CardPolar</code>, <code>CardBarra</code> multi-série e <code>CardProgresso</code> linear).
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

    <h2>Tons derivados</h2>
    <p>Sete tons calculados a partir da cor base — útil para popular o array <code>cores</code>:</p>
    <div class="tons-row">
      <div v-for="t in tons" :key="t" class="ton-chip" :style="{ background: t }">
        <span>{{ t }}</span>
      </div>
    </div>

    <h2>Preview ao vivo</h2>
    <div class="preview-grid">
      <CardPizza
        legenda="Distribuição"
        titulo="100"
        :data="data"
        :cores="tons"
        direcao="bottom"
      />
      <CardLinhas
        legenda="Receita"
        titulo="328"
        :data="dataLinha"
        :corDetalhes="baseColor"
      />
    </div>

    <h2>Usando um array de cores</h2>
    <CodeBlock :code="coresCode" language="vue" />

    <h2>Usando uma única cor</h2>
    <CodeBlock :code="detalhesCode" language="vue" />

    <div class="callout">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        Se <code>cores</code> tiver menos itens que <code>data</code>, o componente repete as cores em
        ciclo. Por isso é recomendável fornecer ao menos tantas cores quanto categorias.
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
.tons-row { display: flex; gap: 0.4rem; flex-wrap: wrap; margin: 1rem 0 1.5rem; }
.ton-chip { flex: 1 1 90px; min-height: 56px; border-radius: var(--radius-sm); display: flex; align-items: flex-end; padding: 0.4rem 0.5rem; font-size: 0.7rem; font-family: var(--font-mono); color: rgba(255,255,255,0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.4); }
.preview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
.callout { display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(124,111,205,0.08); border: 1px solid rgba(124,111,205,0.25); border-radius: var(--radius); padding: 1rem 1.25rem; font-size: 0.875rem; color: var(--color-text-muted); margin-top: 1.5rem; }
.callout svg { flex-shrink: 0; margin-top: 2px; color: var(--color-accent-2); }
</style>
