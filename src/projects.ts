import type { Locale } from './i18n'

export interface Project {
  name: string
  description: Record<Locale, string>
  repo: string
  demo: string
}

export const projects: Project[] = [
  {
    name: 'Webhook Ledger',
    description: {
      fr: 'Réception & journalisation de webhooks, avec retry automatique des échecs.',
      en: 'Webhook reception and logging, with automatic retry of failed deliveries.',
    },
    repo: 'https://github.com/adaniloff/webhook-ledger',
    demo: 'https://app-db2e6f52-cf54-424d-b954-935fb2975e52.cleverapps.io',
  },
]
