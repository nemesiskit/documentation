<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const headings = ref([])
const activeId = ref('')

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

let elements = []

function collect() {
  const found = Array.from(document.querySelectorAll('.doc-content h2, .doc-content h3'))
  const used = new Set()
  elements = found
  headings.value = found.map((el) => {
    if (!el.id) {
      let id = slugify(el.textContent)
      while (used.has(id)) id += '-x'
      el.id = id
    }
    used.add(el.id)
    return { id: el.id, text: el.textContent, level: el.tagName === 'H3' ? 3 : 2 }
  })
  onScroll()
}

// As páginas são carregadas sob demanda; tenta coletar até o conteúdo existir.
let attempts = 0
function collectWhenReady() {
  attempts = 0
  const tick = () => {
    collect()
    if (!headings.value.length && attempts < 10) {
      attempts++
      setTimeout(tick, 100)
    }
  }
  nextTick(tick)
}

function onScroll() {
  const offset = 130 // altura do header + respiro
  let current = ''
  for (const el of elements) {
    if (el.getBoundingClientRect().top <= offset) current = el.id
    else break
  }
  activeId.value = current || (headings.value[0]?.id ?? '')
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

watch(() => route.fullPath, collectWhenReady)
onMounted(() => {
  collectWhenReady()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <aside v-if="headings.length > 1" class="on-this-page">
    <div class="toc-title">Nesta página</div>
    <ul class="toc-list">
      <li v-for="h in headings" :key="h.id">
        <a
          class="toc-item"
          :class="{ active: h.id === activeId, sub: h.level === 3 }"
          :href="`#${h.id}`"
          @click.prevent="scrollTo(h.id)"
        >
          {{ h.text }}
        </a>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.on-this-page {
  position: sticky;
  top: calc(var(--header-height) + 3rem);
  width: var(--toc-width);
  max-height: calc(100vh - var(--header-height) - 6rem);
  overflow-y: auto;
  flex-shrink: 0;
  font-size: 0.8rem;
}

.toc-title {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-heading);
  margin-bottom: 0.6rem;
}

.toc-list {
  list-style: none;
  border-left: 1px solid var(--color-border);
}

.toc-item {
  position: relative;
  display: block;
  padding: 0.3rem 0 0.3rem 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.4;
  transition: color 0.15s;
}

.toc-item.sub {
  padding-left: 1.7rem;
  font-size: 0.76rem;
}

.toc-item:hover {
  color: var(--color-heading);
}

.toc-item.active {
  color: var(--color-accent-2);
  font-weight: 500;
}

.toc-item.active::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 4px;
  bottom: 4px;
  width: 2px;
  background: var(--color-accent-2);
  border-radius: 2px;
}
</style>
