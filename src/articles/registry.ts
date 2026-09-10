import type { Component } from 'vue'
import type { Locale } from '../i18n'
import { projects, type Project } from '../projects'
import Webhooks5xxArticle from './Webhooks5xxArticle.vue'

// Single source of truth for every article: slug and locale drive both the
// client-side route (main.ts) and the prerendered output path
// (scripts/prerender.mjs), so they only need to be set once here.
export interface ArticleEntry {
  slug: string
  locale: Locale
  component: Component
  /** Used as the home page link text, the article <h1>, and the base <title> (SEO suffix appended at build time). */
  title: string
  /** Meta description for the article's own page (og:description, twitter:description). */
  description: string
  /** ISO date, used for the JSON-LD BlogPosting datePublished. */
  datePublished: string
  /** Show a locale badge on the home page when browsing in a different UI language. */
  frenchOnly: boolean
  relatedProject?: Project
}

export function articlePath(locale: Locale, slug: string): string {
  return `/${locale}/articles/${slug}/`
}

export const articles: ArticleEntry[] = [
  {
    slug: 'webhooks-5xx',
    locale: 'fr',
    component: Webhooks5xxArticle,
    title: 'Pourquoi mes webhooks ne renvoient plus de 5xx',
    description:
      "Un webhook qui répond 5xx déclenche un effet domino (retries, données partielles, circuit-breaker). Retour sur le pattern Transactional Outbox pour séparer l'ack technique de l'ack métier.",
    datePublished: '2026-09-10',
    frenchOnly: true,
    relatedProject: projects[0],
  },
]
