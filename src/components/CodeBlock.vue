<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'vue' }
})

const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.code.trim())
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="code-wrap">
    <div class="code-header">
      <span class="code-lang">{{ language }}</span>
      <button class="copy-btn" @click="copy">
        <template v-if="!copied">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copiar
        </template>
        <template v-else>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copiado!
        </template>
      </button>
    </div>
    <pre class="code-block"><code>{{ code.trim() }}</code></pre>
  </div>
</template>

<style scoped>
.code-wrap {
  margin-bottom: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface-2);
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.code-lang {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-family: var(--font-sans);
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.copy-btn:hover {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

.code-block {
  margin: 0;
  padding: 1.25rem 1.5rem;
  background: #0d0d14;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.75;
  color: #c9d1d9;
  border-radius: 0;
  border: none;
}
</style>
