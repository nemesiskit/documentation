<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { sectionForPath, flatPages } from '@/docsNav.js'
import { isDark, toggleTheme } from '@/theme.js'

const emit = defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()

const version = computed(() => sectionForPath(route.path).version)

const navLinks = [
  { label: 'Visão geral', to: '/', exact: true },
  { label: 'NemesisChart', to: '/nemesischart/introducao', match: '/nemesischart' },
  { label: 'NemesisElements', to: '/nemesiselements/introducao', match: '/nemesiselements' },
]

function isActive(link) {
  if (link.exact) return route.path === link.to
  return route.path.startsWith(link.match)
}

/* ------------------------------- Busca ---------------------------------- */
const allPages = flatPages()
const searchEl = ref(null)
const query = ref('')
const open = ref(false)
const highlighted = ref(0)

function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const results = computed(() => {
  const q = normalize(query.value.trim())
  if (!q) return []
  return allPages
    .filter((p) => normalize(`${p.label} ${p.context} ${p.keywords}`).includes(q))
    .slice(0, 8)
})

watch(results, () => { highlighted.value = 0 })

function goTo(page) {
  if (!page) return
  router.push(page.to)
  query.value = ''
  open.value = false
  searchEl.value?.blur()
}

function onSearchKeydown(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlighted.value = Math.min(highlighted.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlighted.value = Math.max(highlighted.value - 1, 0)
  } else if (e.key === 'Enter') {
    goTo(results.value[highlighted.value])
  } else if (e.key === 'Escape') {
    open.value = false
    searchEl.value?.blur()
  }
}

function onGlobalKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchEl.value?.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <header class="doc-header">
    <div class="header-row header-top">
      <div class="header-left">
        <button class="menu-btn" @click="emit('toggle-sidebar')" aria-label="Alternar sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <RouterLink to="/" class="logo">
          <span class="logo-nemesis">Nemesis</span><span class="logo-kit">Kit</span>
        </RouterLink>
        <span class="version-pill">{{ version }}</span>
      </div>

      <div class="header-search" :class="{ open: open && results.length }">
        <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref="searchEl"
          v-model="query"
          type="text"
          class="search-input"
          placeholder="Buscar na documentação..."
          @focus="open = true"
          @blur="open = false"
          @keydown="onSearchKeydown"
        />
        <kbd class="search-kbd">Ctrl K</kbd>

        <div v-if="open && results.length" class="search-results">
          <button
            v-for="(page, i) in results"
            :key="page.to"
            class="search-result"
            :class="{ highlighted: i === highlighted }"
            @mousedown.prevent="goTo(page)"
            @mouseenter="highlighted = i"
          >
            <span class="result-icon" v-html="page.icon"></span>
            <span class="result-label">{{ page.label }}</span>
            <span class="result-context">{{ page.context }}</span>
          </button>
        </div>
      </div>

      <div class="header-right">
        <button class="icon-btn" @click="toggleTheme" :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'">
          <svg v-if="isDark" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
        <a href="https://github.com/nemesiskit" target="_blank" rel="noopener" class="icon-btn" aria-label="GitHub">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
        </a>
      </div>
    </div>

    <div class="header-row header-nav">
      <nav class="nav-links">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link) }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
      <div class="nav-social">
        <a href="https://github.com/nemesiskit" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
        </a>
        <a href="https://www.npmjs.com/package/nemesischart" target="_blank" rel="noopener" class="social-link" aria-label="npm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.doc-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
}

.header-row {
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1rem;
}

.header-top {
  height: 64px;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: var(--color-surface);
  color: var(--color-heading);
  border-color: var(--color-border-hover);
}

.logo {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.logo-nemesis { color: var(--color-heading); }
.logo-kit { color: var(--color-accent-2); }

.version-pill {
  font-size: 0.7rem;
  font-weight: 500;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 0.15em 0.6em;
  border-radius: 99px;
}

/* Busca */
.header-search {
  position: relative;
  flex: 1;
  max-width: 420px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.8rem;
  color: var(--color-text-subtle);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 38px;
  padding: 0 4.5rem 0 2.35rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  outline: none;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: var(--color-text-subtle);
}

.search-input:focus {
  background: var(--color-bg);
  border-color: var(--color-accent-border);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.search-kbd {
  position: absolute;
  right: 0.6rem;
  pointer-events: none;
}

.search-results {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-pop);
  padding: 0.35rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 320px;
  overflow-y: auto;
}

.search-result {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.5rem 0.65rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
}

.search-result.highlighted {
  background: var(--color-accent-soft);
}

.result-icon {
  display: flex;
  color: var(--color-accent-2);
  flex-shrink: 0;
}

.result-label {
  font-weight: 500;
  color: var(--color-heading);
}

.result-context {
  margin-left: auto;
  font-size: 0.72rem;
  color: var(--color-text-subtle);
  white-space: nowrap;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: var(--color-surface);
  color: var(--color-heading);
  border-color: var(--color-border);
}

/* Linha de navegação */
.header-nav {
  height: 44px;
  border-top: 1px solid var(--color-border);
  justify-content: space-between;
  overflow-x: auto;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.3rem 0.8rem;
  border-radius: 99px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-text-muted);
  white-space: nowrap;
  transition: all 0.15s;
}

.nav-link:hover {
  color: var(--color-heading);
  background: var(--color-surface);
}

.nav-link.active {
  color: var(--color-heading);
  background: var(--color-surface-2);
}

.nav-social {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.social-link {
  display: flex;
  color: var(--color-text-subtle);
  transition: color 0.2s;
}

.social-link:hover {
  color: var(--color-heading);
}

@media (max-width: 768px) {
  .header-search { display: none; }
  .version-pill { display: none; }
}
</style>
