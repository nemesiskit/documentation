<script setup>
import { RouterLink } from 'vue-router'

const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
  <header class="doc-header">
    <div class="header-left">
      <button class="menu-btn" @click="emit('toggle-sidebar')" aria-label="Toggle sidebar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <RouterLink to="/" class="logo">
        <span class="logo-nemesis">Nemesis</span><span class="logo-kit">Kit</span>
        <span class="logo-docs">Docs</span>
      </RouterLink>
    </div>
    <div class="header-right">
      <a href="https://github.com/nemesiskit" target="_blank" rel="noopener" class="header-link" aria-label="GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
      </a>
    </div>
  </header>
</template>

<style scoped>
.doc-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  background: var(--color-surface-2);
  color: var(--color-text);
  border-color: var(--color-border-hover);
}

.logo {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 0.15em;
}

.logo-nemesis { color: #fff; }
.logo-kit { color: var(--color-accent-2); }
.logo-docs {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-left: 0.5em;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  padding: 0.1em 0.5em;
  border-radius: 99px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-link {
  display: flex;
  align-items: center;
  color: var(--color-text-muted);
  transition: color 0.2s;
}

.header-link:hover {
  color: var(--color-text);
}
</style>
