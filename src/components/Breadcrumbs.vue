<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { pageForPath, sectionForPath } from '@/docsNav.js'

const route = useRoute()

const crumbs = computed(() => {
  const page = pageForPath(route.path)
  const section = sectionForPath(route.path)
  const list = [{ label: 'Visão geral', to: '/' }]
  if (!page) return list
  list.push({ label: section.label, to: section.groups[0].items[0].to })
  if (page.group.label !== 'Primeiros passos') {
    list.push({ label: page.group.label })
  }
  list.push({ label: page.item.label, current: true })
  return list
})
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <template v-for="(crumb, i) in crumbs" :key="i">
      <svg v-if="i > 0" class="crumb-sep" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
      <RouterLink v-if="crumb.to && !crumb.current" :to="crumb.to" class="crumb crumb-link">
        {{ crumb.label }}
      </RouterLink>
      <span v-else class="crumb" :class="{ current: crumb.current }">{{ crumb.label }}</span>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1.75rem;
  font-size: 0.8rem;
}

.crumb {
  color: var(--color-text-subtle);
}

.crumb-link:hover {
  color: var(--color-accent-2);
}

.crumb.current {
  color: var(--color-heading);
  font-weight: 500;
}

.crumb-sep {
  color: var(--color-text-subtle);
  flex-shrink: 0;
}
</style>
