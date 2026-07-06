// Fonte única de navegação da documentação.
// Alimenta a sidebar, o breadcrumb e a busca do header.

const icons = {
  intro: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  install: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  cardBase: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`,
  linhas: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  barra: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="18" width="18" height="4" rx="1"/><rect x="3" y="10" width="12" height="4" rx="1"/><rect x="3" y="2" width="7" height="4" rx="1"/></svg>`,
  pizza: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>`,
  polar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
  progresso: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="9" width="20" height="6" rx="3"/><rect x="2" y="9" width="14" height="6" rx="3" fill="currentColor" opacity="0.4"/></svg>`,
  chart: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>`,
  tema: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`,
  cores: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  toast: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  tooltip: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
}

export const sections = {
  nemesischart: {
    label: 'NemesisChart',
    version: 'v2.0.11',
    base: '/nemesischart',
    groups: [
      {
        label: 'Primeiros passos',
        items: [
          { label: 'Introdução', to: '/nemesischart/introducao', icon: icons.intro, keywords: 'visao geral overview novidades changelog o que ha de novo' },
          { label: 'Instalação', to: '/nemesischart/instalacao', icon: icons.install, keywords: 'npm yarn pnpm setup peer dependencies migracao migrar plugin' },
        ],
      },
      {
        label: 'Componentes',
        items: [
          { label: 'CardBase', to: '/nemesischart/card-base', icon: icons.cardBase, keywords: 'container esqueleto slots card customizado' },
          { label: 'CardLinhas', to: '/nemesischart/card-linhas', icon: icons.linhas, keywords: 'grafico de linha serie temporal line chart tooltip linhas de referencia meta' },
          { label: 'CardBarra', to: '/nemesischart/card-barra', icon: icons.barra, keywords: 'grafico de barras bar chart series empilhado horizontal vertical' },
          { label: 'CardPizza', to: '/nemesischart/card-pizza', icon: icons.pizza, keywords: 'pizza donut doughnut fatias tabela categorias percentual' },
          { label: 'CardPolar', to: '/nemesischart/card-polar', icon: icons.polar, keywords: 'polar area radial setores comparacao' },
          { label: 'CardProgresso', to: '/nemesischart/card-progresso', icon: icons.progresso, keywords: 'progresso metas barras circular crescimento reducao' },
          { label: 'ChartBase', to: '/nemesischart/chart-base', icon: icons.chart, keywords: 'chartjs wrapper canvas grafico customizado' },
        ],
      },
      {
        label: 'Guias',
        items: [
          { label: 'Temas', to: '/nemesischart/temas', icon: icons.tema, keywords: 'tema claro escuro light dark corfundo cortexto corborda sombra' },
          { label: 'Paleta de cores', to: '/nemesischart/cores', icon: icons.cores, keywords: 'cores paleta cordetalhes gerarpaleta tons' },
        ],
      },
    ],
  },
  nemesiselements: {
    label: 'NemesisElements',
    version: 'v0.1.2',
    base: '/nemesiselements',
    groups: [
      {
        label: 'Primeiros passos',
        items: [
          { label: 'Introdução', to: '/nemesiselements/introducao', icon: icons.intro, keywords: 'visao geral overview' },
          { label: 'Instalação', to: '/nemesiselements/instalacao', icon: icons.install, keywords: 'npm setup' },
        ],
      },
      {
        label: 'Componentes',
        items: [
          { label: 'ToastNotificacao', to: '/nemesiselements/toast-notificacao', icon: icons.toast, keywords: 'toast notificacao alerta feedback' },
          { label: 'TooltipElemento', to: '/nemesiselements/tooltip-elemento', icon: icons.tooltip, keywords: 'tooltip dica hover' },
        ],
      },
    ],
  },
}

export function sectionForPath(path) {
  if (path.startsWith('/nemesiselements')) return sections.nemesiselements
  return sections.nemesischart
}

export function pageForPath(path) {
  for (const section of Object.values(sections)) {
    for (const group of section.groups) {
      const item = group.items.find((i) => i.to === path)
      if (item) return { section, group, item }
    }
  }
  return null
}

// Lista plana usada pela busca do header.
export function flatPages() {
  const pages = []
  for (const section of Object.values(sections)) {
    for (const group of section.groups) {
      for (const item of group.items) {
        pages.push({
          label: item.label,
          to: item.to,
          icon: item.icon,
          keywords: item.keywords || '',
          context: `${section.label} · ${group.label}`,
        })
      }
    }
  }
  return pages
}
