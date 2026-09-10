import { createSSRApp, type Component } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { articles, articlePath } from './articles/registry'

// Build-time prerender. Client re-mounts with createApp (no hydration).
async function render(component: Component): Promise<string> {
  const app = createSSRApp(component)
  return await renderToString(app)
}

export const renderHome = () => render(App)

export function renderArticle(slug: string): Promise<string> {
  const article = articles.find((a) => a.slug === slug)
  if (!article) throw new Error(`Unknown article slug: ${slug}`)
  return render(article.component)
}

// Used in scripts/prerender.mjs.
export const articleMeta = articles.map((article) => ({
  slug: article.slug,
  locale: article.locale,
  path: articlePath(article.locale, article.slug),
  title: article.title,
  description: article.description,
  datePublished: article.datePublished,
}))
