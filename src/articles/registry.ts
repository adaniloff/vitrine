import type { Component } from 'vue'
import type { Locale } from '../i18n'
import { projects, type Project } from '../projects'
import Webhooks5xxArticle from './Webhooks5xxArticle.vue'
import Webhooks5xxArticleEn from './Webhooks5xxArticleEn.vue'
import GitHistoryArticle from './GitHistoryArticle.vue'
import GitGoodArticle from './GitGoodArticle.vue'
import GitHistoryArticleFr from './GitHistoryArticleFr.vue'
import GitGoodArticleFr from './GitGoodArticleFr.vue'
import GitEasierArticle from './GitEasierArticle.vue'
import GitCommitArticle from './GitCommitArticle.vue'
import GitEasierArticleFr from './GitEasierArticleFr.vue'
import GitCommitArticleFr from './GitCommitArticleFr.vue'

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
  /** Shows an in-article disclaimer noting the content was AI-translated. */
  aiTranslated: boolean
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
    datePublished: '2026-09-17',
    frenchOnly: false,
    aiTranslated: false,
    relatedProject: projects[0],
  },
  {
    slug: 'webhooks-5xx',
    locale: 'en',
    component: Webhooks5xxArticleEn,
    title: 'Why my webhooks no longer return 5xx',
    description:
      "A webhook that answers 5xx triggers a domino effect (retries, partial data, open circuit-breaker). A look back at the Transactional Outbox pattern to separate the technical ack from the business ack.",
    datePublished: '2026-09-10',
    frenchOnly: false,
    aiTranslated: true,
    relatedProject: projects[0],
  },
  {
    slug: 'a-beautiful-way-to-display-your-git-history',
    locale: 'en',
    component: GitHistoryArticle,
    title: 'A beautiful way to display your (git) history',
    description:
      "A short walkthrough of git log --all --decorate --graph --oneline and why it's worth learning to read a real git history graph instead of relying on a GUI.",
    datePublished: '2018-04-03',
    frenchOnly: false,
    aiTranslated: false,
  },
  {
    slug: 'fastest-way-to-git-good-for-beginners',
    locale: 'en',
    component: GitGoodArticle,
    title: 'Fastest way to git good (for beginners)',
    description:
      'A handful of basic habits (fetch often, check status constantly, stay in the terminal) that make you comfortable with git fast.',
    datePublished: '2018-04-06',
    frenchOnly: false,
    aiTranslated: false,
  },
  {
    slug: 'a-beautiful-way-to-display-your-git-history',
    locale: 'fr',
    component: GitHistoryArticleFr,
    title: "Une belle façon d'afficher son historique (git)",
    description:
      "Un petit tour de git log --all --decorate --graph --oneline, et pourquoi ça vaut le coup d'apprendre à lire un vrai graphe d'historique plutôt que de se reposer sur une interface graphique.",
    datePublished: '2018-04-03',
    frenchOnly: false,
    aiTranslated: true,
  },
  {
    slug: 'fastest-way-to-git-good-for-beginners',
    locale: 'fr',
    component: GitGoodArticleFr,
    title: 'La façon la plus rapide de devenir bon en git (pour débutants)',
    description:
      'Quelques habitudes de base (fetch souvent, vérifier le status en continu, rester dans le terminal) pour être vite à l’aise avec git.',
    datePublished: '2018-04-06',
    frenchOnly: false,
    aiTranslated: true,
  },
  {
    slug: 'my-unsuccessful-attempt-to-make-git-easier-than-it-is',
    locale: 'en',
    component: GitEasierArticle,
    title: 'My unsuccessful attempt to make git easier than it already is',
    description:
      'An attempt to explain git through a dictionary analogy for people with little to no dev background, and why it turned out to not really work.',
    datePublished: '2018-03-24',
    frenchOnly: false,
    aiTranslated: false,
  },
  {
    slug: 'the-good-way-to-commit',
    locale: 'en',
    component: GitCommitArticle,
    title: 'The good way to commit !',
    description:
      "Writing commit messages that explain why instead of what, and the git add/reset/diff/commit --patch commands that make it easy to split work into clean commits.",
    datePublished: '2018-03-26',
    frenchOnly: false,
    aiTranslated: false,
  },
  {
    slug: 'my-unsuccessful-attempt-to-make-git-easier-than-it-is',
    locale: 'fr',
    component: GitEasierArticleFr,
    title: 'Ma tentative infructueuse de rendre git plus simple qu\'il ne l\'est déjà',
    description:
      "Une tentative d'expliquer git via une analogie avec un dictionnaire pour des personnes sans (ou avec très peu de) bagage dev, et pourquoi ça n'a pas vraiment fonctionné.",
    datePublished: '2018-03-24',
    frenchOnly: false,
    aiTranslated: true,
  },
  {
    slug: 'the-good-way-to-commit',
    locale: 'fr',
    component: GitCommitArticleFr,
    title: 'La bonne façon de commit !',
    description:
      "Écrire des messages de commit qui expliquent le pourquoi plutôt que le quoi, et les commandes git add/reset/diff/commit --patch qui permettent de découper son travail en commits propres.",
    datePublished: '2018-03-26',
    frenchOnly: false,
    aiTranslated: true,
  },
]
