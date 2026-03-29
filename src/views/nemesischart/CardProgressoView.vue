<script setup>
import { ref } from 'vue'
import { CardProgresso } from 'nemesischart'
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'

const tema = ref('Light')
const executado = ref(65)
const total = ref(100)
const moeda = ref(false)

const props = [
  { name: 'total', type: 'Number', default: '100', description: 'Valor máximo / meta.' },
  { name: 'executado', type: 'Number', default: '0', description: 'Valor atual / realizado.' },
  { name: 'rotulo', type: 'String', default: "''", description: 'Rótulo exibido acima da barra.' },
  { name: 'exibirValores', type: 'Boolean', default: 'true', description: 'Exibir os valores executado/total abaixo da barra.' },
  { name: 'moeda', type: 'Boolean', default: 'false', description: 'Formatar os valores como BRL.' },
  { name: 'animado', type: 'Boolean', default: 'true', description: 'Animar o preenchimento da barra na entrada.' },
  { name: 'tema', type: "'Light' | 'Dark' | 'Transparent'", default: "'Light'", description: 'Tema visual.' },
  { name: 'titulo', type: 'String', default: "''", description: 'Título do card.' },
]

const code = `<script setup>
import { CardProgresso } from 'nemesischart'
<\/script>

<template>
  <!-- Progresso simples -->
  <CardProgresso
    titulo="Meta de Vendas"
    rotulo="Janeiro 2025"
    :total="100"
    :executado="65"
  />

  <!-- Com formatação de moeda -->
  <CardProgresso
    titulo="Orçamento"
    rotulo="Utilizado"
    :total="50000"
    :executado="32500"
    :moeda="true"
  />

  <!-- Limite ultrapassado (> 100%) -->
  <CardProgresso
    titulo="Horas Trabalhadas"
    :total="160"
    :executado="195"
  />
</template>`

const colorLogic = `/* Lógica de cores automática:
   Verde:   executado < 75% do total
   Amarelo: executado entre 75% e 90%
   Vermelho: executado >= 90% ou ultrapassou o total
*/`
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">Componente</span>
    </div>
    <h1>CardProgresso</h1>
    <p>
      Barra de progresso com animação e mudança automática de cor conforme o percentual.
      Não depende do Chart.js — renderizado puramente em CSS.
    </p>

    <h2>Demonstração</h2>
    <div class="demo-controls">
      <div class="control-row">
        <label class="control-label">Tema:</label>
        <div class="control-group">
          <button v-for="t in ['Light', 'Dark', 'Transparent']" :key="t" class="control-btn" :class="{ active: tema === t }" @click="tema = t">{{ t }}</button>
        </div>
      </div>
      <div class="control-row">
        <label class="control-label">Executado:</label>
        <input type="range" v-model.number="executado" min="0" max="130" class="range-input" />
        <span class="range-value">{{ executado }}%</span>
      </div>
      <div class="control-row">
        <label class="control-label">Moeda:</label>
        <div class="control-group">
          <button class="control-btn" :class="{ active: moeda }" @click="moeda = !moeda">{{ moeda ? 'Sim' : 'Não' }}</button>
        </div>
      </div>
    </div>
    <div class="demo-section" :class="{ 'demo-dark': tema === 'Dark', 'demo-transparent': tema === 'Transparent' }">
      <CardProgresso
        :tema="tema"
        titulo="Meta de Vendas"
        rotulo="Janeiro 2025"
        :total="moeda ? 50000 : 100"
        :executado="moeda ? executado * 500 : executado"
        :moeda="moeda"
        style="max-width: 500px; margin: 0 auto;"
      />
    </div>

    <h2>Uso</h2>
    <CodeBlock :code="code" language="vue" />

    <h2>Lógica de cores</h2>
    <CodeBlock :code="colorLogic" language="css" />

    <div class="color-states">
      <div class="color-state green">
        <span class="state-dot"></span>
        <div>
          <div class="state-label">Verde</div>
          <div class="state-desc">executado &lt; 75%</div>
        </div>
      </div>
      <div class="color-state yellow">
        <span class="state-dot"></span>
        <div>
          <div class="state-label">Amarelo</div>
          <div class="state-desc">75% — 90%</div>
        </div>
      </div>
      <div class="color-state red">
        <span class="state-dot"></span>
        <div>
          <div class="state-label">Vermelho</div>
          <div class="state-desc">&gt;= 90% ou ultrapassado</div>
        </div>
      </div>
    </div>

    <h2>Props</h2>
    <PropsTable :props="props" />
  </div>
</template>

<style scoped>
.demo-controls { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
.control-row { display: flex; align-items: center; gap: 0.75rem; }
.control-label { font-size: 0.8rem; color: var(--color-text-muted); min-width: 70px; }
.control-group { display: flex; gap: 0.35rem; }
.control-btn { padding: 0.3rem 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); color: var(--color-text-muted); font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.control-btn.active { background: rgba(124,111,205,0.15); border-color: rgba(124,111,205,0.4); color: var(--color-accent-2); }
.range-input { flex: 1; max-width: 200px; accent-color: var(--color-accent-2); }
.range-value { font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-text-muted); min-width: 40px; }
.color-states { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1rem 0; }
.color-state { display: flex; align-items: center; gap: 0.6rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 0.65rem 1rem; }
.state-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.green .state-dot { background: #4ade80; }
.yellow .state-dot { background: #fbbf24; }
.red .state-dot { background: #f87171; }
.state-label { font-size: 0.85rem; font-weight: 600; color: var(--color-text); }
.state-desc { font-size: 0.75rem; color: var(--color-text-muted); font-family: var(--font-mono); }
</style>
