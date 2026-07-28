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
    'exp.title': "Ma dernière expérience en date:",
    'exp.description':
      "CTO d'une startup, de sa création à la production : conception produit, architecture, setup CI/CD et observabilité, constitution et encadrement de l'équipe technique (~6 personnes).",
    contact: 'Me contacter',
  },
  en: {
    available: 'Freelance · available for your projects',
    pitch: `~15 years of web development experience, 10+ of them as ${strong(
      'Tech Lead',
    )} then ${strong('CTO')}. I help build your ${strong(
      'Symfony / PHP',
    )} and ${strong('Vue.js')} projects, from prototype to production.`,
    'exp.title': 'My most recent role:',
    'exp.description':
      'CTO of a startup, from inception to production: product design, architecture, CI/CD and observability setup, building and leading the engineering team (~6 people).',
    contact: 'Get in touch',
  },
} as const

export type MessageKey = keyof (typeof messages)['fr']

const STORAGE_KEY = 'lang'

function detectLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'fr' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'fr'
}

export const locale = ref<Locale>(detectLocale())
document.documentElement.lang = locale.value

export function setLocale(next: Locale) {
  locale.value = next
  localStorage.setItem(STORAGE_KEY, next)
  document.documentElement.lang = next
}

// Reactive: reading locale.value inside render tracks locale changes.
export function t(key: MessageKey): string {
  return messages[locale.value][key]
}
