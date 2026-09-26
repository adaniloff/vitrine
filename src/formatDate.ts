import type { Locale } from './i18n'

export function formatDate(date: string, locale: Locale): string {
  const label = new Date(`${date}T00:00:00`).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return label.charAt(0).toUpperCase() + label.slice(1)
}
