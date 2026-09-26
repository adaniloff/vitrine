import { ref } from 'vue'

export type Locale = 'fr' | 'en'

const strong = (text: string) =>
  `<strong class="font-normal text-slate-900 dark:text-slate-100">${text}</strong>`

const messages = {
  fr: {
    available: 'Freelance · disponible pour vos projets',
    pitch: `~15 ans d'expérience en développement web, dont plus de 10 comme ${strong(
      'Tech Lead',
    )} puis ${strong('CTO')}. J'accompagne vos projets ${strong(
      'Symfony / PHP',
    )} et ${strong('Vue.js')}, du proto à la mise en production.`,
    contact: 'Me contacter',
    'career.title': 'Voir mon parcours',
    'career.download': 'CV (PDF)',
    'career.experiences': 'Expériences',
    'career.pause': 'Mettre en pause le défilement',
    'career.play': 'Reprendre le défilement',
    'projects.repo': 'Voir le dépôt',
    'projects.demo': "Voir l'instance live",
    'writings.title': 'Articles',
    'writings.frenchOnly': 'FR',
    'writings.relatedProject': 'Projet de démo lié',
    'theme.dark': 'Activer le thème sombre',
    'theme.light': 'Activer le thème clair',
  },
  en: {
    available: 'Freelance · available for your projects',
    pitch: `~15 years of web development experience, 10+ of them as ${strong(
      'Tech Lead',
    )} then ${strong('CTO')}. I help build your ${strong(
      'Symfony / PHP',
    )} and ${strong('Vue.js')} projects, from prototype to production.`,
    contact: 'Get in touch',
    'career.title': 'See my career',
    'career.download': 'CV (PDF)',
    'career.experiences': 'Experience',
    'career.pause': 'Pause the rotation',
    'career.play': 'Resume the rotation',
    'projects.repo': 'View repository',
    'projects.demo': 'View live instance',
    'writings.title': 'Articles',
    'writings.frenchOnly': 'FR',
    'writings.relatedProject': 'Related demo project',
    'theme.dark': 'Switch to dark theme',
    'theme.light': 'Switch to light theme',
  },
} as const

export type MessageKey = keyof (typeof messages)['fr']

const STORAGE_KEY = 'lang'

// Imported by the SSR build too: keep browser access out of module load and
// inside initI18n() (client-only). Default reconciled on the client.

function detectLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'fr' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'fr'
}

export const locale = ref<Locale>('fr')

export function setLocale(next: Locale) {
  locale.value = next
  localStorage.setItem(STORAGE_KEY, next)
  document.documentElement.lang = next
}

export function initI18n() {
  locale.value = detectLocale()
  document.documentElement.lang = locale.value
}

export function t(key: MessageKey): string {
  return messages[locale.value][key]
}
