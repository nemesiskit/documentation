<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sectionForPath } from '@/docsNav.js'

defineProps({ open: Boolean })

const route = useRoute()
const section = computed(() => sectionForPath(route.path))
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <div class="sidebar-inner">
      <div class="sidebar-head">
        <RouterLink to="/" class="back-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Início
        </RouterLink>
        <span class="sidebar-version">{{ section.label }} · {{ section.version }}</span>
      </div>

      <nav class="sidebar-nav">
        <div v-for="group in section.groups" :key="group.label" class="nav-group">
          <div class="nav-group-label">{{ group.label }}</div>
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="nav-item"
            :class="{ active: route.path === item.to }"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--header-height);
  left: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--header-height));
  background: var(--color-bg-2);
  border-right: 1px solid var(--color-border);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 90;
  overflow-y: auto;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-inner {
  padding: 1.5rem 1rem;
}

.sidebar-head {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--color-heading);
}

.sidebar-version {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--color-text-subtle);
}

.nav-group {
  margin-bottom: 1.6rem;
}

.nav-group-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-subtle);
  padding: 0 0.75rem;
  margin-bottom: 0.4rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.42rem 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-size: 0.865rem;
  color: var(--color-text-muted);
  transition: all 0.15s;
  cursor: pointer;
}

.nav-icon {
  display: flex;
  color: var(--color-text-subtle);
  transition: color 0.15s;
}

.nav-item:hover {
  background: var(--color-surface);
  color: var(--color-heading);
}

.nav-item:hover .nav-icon {
  color: var(--color-text-muted);
}

.nav-item.active {
  background: var(--color-surface-2);
  border-color: var(--color-border);
  color: var(--color-heading);
  font-weight: 500;
}

.nav-item.active .nav-icon {
  color: var(--color-accent-2);
}
</style>
