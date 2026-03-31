import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'

import 'primeflex/primeflex.css'
import 'nemesischart/style.css'
import 'nemesiselements/style.css'
import './assets/main.css'

import HomeView from './views/HomeView.vue'
import NemesisChartView from './views/NemesisChartView.vue'
import NemesisElementsView from './views/NemesisElementsView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/nemesiselements',
    component: NemesisElementsView,
    children: [
      { path: '', redirect: '/nemesiselements/introducao' },
      { path: 'introducao', name: 'ne-intro', component: () => import('./views/nemesiselements/IntroducaoView.vue') },
      { path: 'instalacao', name: 'ne-install', component: () => import('./views/nemesiselements/InstalacaoView.vue') },
      { path: 'toast-notificacao', name: 'ne-toast', component: () => import('./views/nemesiselements/ToastNotificacaoView.vue') },
      { path: 'tooltip-elemento', name: 'ne-tooltip', component: () => import('./views/nemesiselements/TooltipElementoView.vue') },
    ]
  },
  {
    path: '/nemesischart',
    component: NemesisChartView,
    children: [
      { path: '', redirect: '/nemesischart/introducao' },
      { path: 'introducao', name: 'nc-intro', component: () => import('./views/nemesischart/IntroducaoView.vue') },
      { path: 'instalacao', name: 'nc-install', component: () => import('./views/nemesischart/InstalacaoView.vue') },
      { path: 'card-base', name: 'nc-cardbase', component: () => import('./views/nemesischart/CardBaseView.vue') },
      { path: 'card-coluna', name: 'nc-cardcoluna', component: () => import('./views/nemesischart/CardColunaView.vue') },
      { path: 'card-barra', name: 'nc-cardbarra', component: () => import('./views/nemesischart/CardBarraView.vue') },
      { path: 'card-linhas', name: 'nc-cardlinhas', component: () => import('./views/nemesischart/CardLinhasView.vue') },
      { path: 'card-rosquinha', name: 'nc-cardrosquinha', component: () => import('./views/nemesischart/CardRosquinhaView.vue') },
      { path: 'card-semi-circulo', name: 'nc-cardsemicirculo', component: () => import('./views/nemesischart/CardSemiCirculoView.vue') },
      { path: 'card-polar', name: 'nc-cardpolar', component: () => import('./views/nemesischart/CardPolarView.vue') },
      { path: 'card-progresso', name: 'nc-cardprogresso', component: () => import('./views/nemesischart/CardProgressoView.vue') },
      { path: 'temas', name: 'nc-temas', component: () => import('./views/nemesischart/TemasView.vue') },
      { path: 'cores', name: 'nc-cores', component: () => import('./views/nemesischart/CoresView.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark'
    }
  }
})
app.mount('#app')
