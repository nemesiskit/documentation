<script setup>
import { ref, computed } from 'vue'

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

/* Realce leve por regex: comentários, strings, tags, atributos,
   palavras-chave e números. Suficiente para os exemplos da doc. */
function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function buildRules(language) {
  const rules = []
  if (language === 'bash') {
    rules.push(['token-comment', /#[^\n]*/y])
    rules.push(['token-string', /'[^'\n]*'|"[^"\n]*"/y])
    return rules
  }
  rules.push(['token-comment', /<!--[\s\S]*?-->|\/\/[^\n]*|\/\*[\s\S]*?\*\//y])
  rules.push(['token-string', /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/y])
  rules.push(['token-keyword', /=>/y])
  rules.push(['token-tag', /<\/?[A-Za-z][\w.-]*|\/>/y])
  rules.push(['token-attr', /[:@][\w-]+(?==)|#[\w-]+|\b[\w-]+(?==")/y])
  rules.push(['token-keyword', /\b(?:import|from|export|default|const|let|var|function|return|new|typeof|async|await|if|else|for|of|in|true|false|null|undefined)\b/y])
  rules.push(['token-number', /\b\d[\d_]*(?:\.\d+)?\b/y])
  return rules
}

const highlighted = computed(() => {
  const source = props.code.trim()
  const rules = buildRules(props.language)
  let html = ''
  let i = 0
  while (i < source.length) {
    let matched = false
    for (const [cls, re] of rules) {
      re.lastIndex = i
      const m = re.exec(source)
      if (m && m[0]) {
        html += `<span class="${cls}">${escapeHtml(m[0])}</span>`
        i += m[0].length
        matched = true
        break
      }
    }
    if (!matched) {
      html += escapeHtml(source[i])
      i++
    }
  }
  return html
})
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
    <pre class="code-block"><code v-html="highlighted"></code></pre>
  </div>
</template>

<style scoped>
.code-wrap {
  margin-bottom: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--code-header-bg);
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
  color: var(--color-heading);
  background: var(--color-surface-2);
}

.code-block {
  margin: 0;
  padding: 1.25rem 1.5rem;
  background: var(--code-bg);
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.75;
  color: var(--code-text);
  border-radius: 0;
  border: none;
  box-shadow: none;
}
</style>
