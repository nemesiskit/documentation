<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { RouterLink } from 'vue-router'

const heroRef = ref(null)
const cardsRef = ref(null)

onMounted(() => {
  gsap.fromTo(
    heroRef.value,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
  )
  gsap.fromTo(
    cardsRef.value.children,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.4 }
  )
})

const packages = [
  {
    name: 'NemesisChart',
    slug: 'nemesischart',
    description: 'Componentes de gráficos para Vue 3 com animações GSAP, temas dinâmicos e integração Chart.js.',
    badge: 'v1.0.0',
    badgeType: 'purple',
    status: 'Estável',
    components: 8,
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    to: '/nemesischart/introducao'
  },
  {
    name: 'NemesisUI',
    slug: 'nemesisui',
    description: 'Biblioteca de componentes de interface para Vue 3 com design system consistente e acessível.',
    badge: 'Em breve',
    badgeType: 'yellow',
    status: 'Desenvolvimento',
    components: null,
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    to: null
  }
]
</script>

<template>
  <div class="home">
    <div class="home-bg">
      <div class="grid-overlay"></div>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>

    <div class="home-content">
      <div ref="heroRef" class="hero">
        <div class="hero-eyebrow">
          <span class="eyebrow-dot"></span>
          Documentação oficial
        </div>
        <h1 class="hero-title">
          <span class="title-nemesis">Nemesis</span><span class="title-kit">Kit</span>
        </h1>
        <p class="hero-desc">
          Um ecossistema de bibliotecas Vue 3 para criar interfaces modernas e visualizações de dados com animações fluidas.
        </p>
      </div>

      <div ref="cardsRef" class="packages-grid">
        <component
          :is="pkg.to ? RouterLink : 'div'"
          v-for="pkg in packages"
          :key="pkg.slug"
          :to="pkg.to || undefined"
          class="package-card"
          :class="{ 'card-disabled': !pkg.to }"
        >
          <div class="card-top">
            <div class="card-icon" v-html="pkg.icon"></div>
            <div class="card-badges">
              <span class="badge" :class="`badge-${pkg.badgeType}`">{{ pkg.badge }}</span>
              <span v-if="pkg.components" class="badge badge-green">{{ pkg.components }} componentes</span>
            </div>
          </div>
          <h2 class="card-title">{{ pkg.name }}</h2>
          <p class="card-desc">{{ pkg.description }}</p>
          <div v-if="pkg.to" class="card-cta">
            Ver documentação
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div v-else class="card-cta muted">Em desenvolvimento...</div>
        </component>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.home-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%);
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.glow-1 {
  width: 600px;
  height: 400px;
  background: rgba(37, 99, 235, 0.12);
  top: 10%;
  left: 20%;
  transform: translate(-50%, -50%);
}

.glow-2 {
  width: 400px;
  height: 300px;
  background: rgba(157, 143, 224, 0.07);
  bottom: 15%;
  right: 15%;
}

.home-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
}

.hero {
  margin-bottom: 3.5rem;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.25rem;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-2);
  box-shadow: 0 0 10px var(--color-accent-2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 1.25rem;
}

.title-nemesis { color: #fff; }
.title-kit { color: var(--color-accent-2); }

.hero-desc {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.25rem;
  text-align: left;
}

.package-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  cursor: pointer;
  transition: all 0.25s;
  display: block;
  text-decoration: none;
  color: inherit;
}

.package-card:hover:not(.card-disabled) {
  border-color: rgba(37, 99, 235, 0.4);
  background: var(--color-surface-2);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(37, 99, 235, 0.15);
}

.card-disabled {
  opacity: 0.55;
  cursor: default;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.card-icon {
  width: 52px;
  height: 52px;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-2);
}

.card-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: flex-end;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 0.6rem;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-bottom: 1.25rem;
}

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-accent-2);
}

.card-cta.muted {
  color: var(--color-text-muted);
}
</style>
