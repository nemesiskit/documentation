<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

defineProps({ open: Boolean })

const route = useRoute()

const allGroups = {
  nemesischart: [
    {
      label: 'NemesisChart',
      items: [
        { label: 'Introdução', to: '/nemesischart/introducao' },
        { label: 'Instalação', to: '/nemesischart/instalacao' },
      ]
    },
    {
      label: 'Componentes',
      items: [
        { label: 'CardBase', to: '/nemesischart/card-base' },
        { label: 'CardColuna', to: '/nemesischart/card-coluna' },
        { label: 'CardBarra', to: '/nemesischart/card-barra' },
        { label: 'CardLinhas', to: '/nemesischart/card-linhas' },
        { label: 'CardRosquinha', to: '/nemesischart/card-rosquinha' },
        { label: 'CardSemiCirculo', to: '/nemesischart/card-semi-circulo' },
        { label: 'CardPolar', to: '/nemesischart/card-polar' },
        { label: 'CardProgresso', to: '/nemesischart/card-progresso' },
      ]
    },
    {
      label: 'Guias',
      items: [
        { label: 'Temas', to: '/nemesischart/temas' },
        { label: 'Paleta de Cores', to: '/nemesischart/cores' },
      ]
    },
  ],
  nemesiselements: [
    {
      label: 'NemesisElements',
      items: [
        { label: 'Introdução', to: '/nemesiselements/introducao' },
        { label: 'Instalação', to: '/nemesiselements/instalacao' },
      ]
    },
    {
      label: 'Componentes',
      items: [
        { label: 'ToastNotificacao', to: '/nemesiselements/toast-notificacao' },
        { label: 'TooltipElemento', to: '/nemesiselements/tooltip-elemento' },
      ]
    },
  ],
}

const navGroups = computed(() => {
  if (route.path.startsWith('/nemesiselements')) return allGroups.nemesiselements
  return allGroups.nemesischart
})
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <div class="sidebar-inner">
      <div class="sidebar-section">
        <RouterLink to="/" class="back-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Início
        </RouterLink>
      </div>

      <nav class="sidebar-nav">
        <div v-for="group in navGroups" :key="group.label" class="nav-group">
          <div class="nav-group-label">{{ group.label }}</div>
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="nav-item"
            :class="{ active: route.path === item.to }"
          >
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
  padding: 1.5rem 0.75rem;
}

.sidebar-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  padding-left: 0.5rem;
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
  color: var(--color-text);
}

.nav-group {
  margin-bottom: 1.75rem;
}

.nav-group-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  padding: 0 0.75rem;
  margin-bottom: 0.4rem;
}

.nav-item {
  display: block;
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  transition: all 0.15s;
  cursor: pointer;
}

.nav-item:hover {
  background: var(--color-surface-2);
  color: var(--color-text);
}

.nav-item.active {
  background: rgba(37, 99, 235, 0.12);
  color: var(--color-accent-2);
  font-weight: 500;
}
</style>
