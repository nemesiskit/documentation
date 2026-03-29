<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import DocSidebar from './DocSidebar.vue'
import DocHeader from './DocHeader.vue'

const sidebarOpen = ref(true)
</script>

<template>
  <div class="doc-layout">
    <DocHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="doc-body">
      <DocSidebar :open="sidebarOpen" />
      <main class="doc-main" :class="{ 'sidebar-open': sidebarOpen }">
        <div class="doc-page">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.doc-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.doc-body {
  display: flex;
  flex: 1;
  padding-top: var(--header-height);
}

.doc-main {
  flex: 1;
  min-width: 0;
  transition: margin-left 0.3s ease;
}

.doc-main.sidebar-open {
  margin-left: var(--sidebar-width);
}

.doc-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 3rem 2.5rem;
}

@media (max-width: 768px) {
  .doc-main.sidebar-open {
    margin-left: 0;
  }

  .doc-page {
    padding: 2rem 1.25rem;
  }
}
</style>
