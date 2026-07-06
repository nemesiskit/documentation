<script setup>
import { ref } from 'vue'
import DocSidebar from './DocSidebar.vue'
import DocHeader from './DocHeader.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import OnThisPage from './OnThisPage.vue'

const sidebarOpen = ref(typeof window === 'undefined' ? true : window.innerWidth > 960)
</script>

<template>
  <div class="doc-layout">
    <DocHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="doc-body">
      <DocSidebar :open="sidebarOpen" />
      <main class="doc-main" :class="{ 'sidebar-open': sidebarOpen }">
        <div class="doc-container">
          <div class="doc-page">
            <Breadcrumbs />
            <slot />
          </div>
          <div class="doc-rail">
            <OnThisPage />
          </div>
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

.doc-container {
  display: flex;
  gap: 3rem;
  max-width: 1080px;
  margin: 0 auto;
  padding: 3rem 2.5rem 4rem;
  align-items: flex-start;
}

.doc-page {
  flex: 1;
  min-width: 0;
  max-width: 780px;
  margin: 0 auto;
}

.doc-rail {
  flex-shrink: 0;
}

@media (max-width: 1240px) {
  .doc-rail {
    display: none;
  }
}

@media (max-width: 768px) {
  .doc-main.sidebar-open {
    margin-left: 0;
  }

  .doc-container {
    padding: 2rem 1.25rem 3rem;
  }
}
</style>
