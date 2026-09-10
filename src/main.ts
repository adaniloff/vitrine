import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { articles, articlePath } from './articles/registry'
import { initI18n } from './i18n'
import { initTheme } from './theme'

initI18n()
initTheme()

// No router: each static page is its own prerendered file (see
// scripts/prerender.mjs), matched here by pathname to mount the right root.
// Routes are derived from articles/registry.ts, the single source of truth
// for each article's slug/locale, so the path only needs to be set once.
const routes = new Map(
  articles.map((article) => [
    articlePath(article.locale, article.slug).replace(/\/$/, ''),
    article.component,
  ]),
)

const path = window.location.pathname.replace(/\/$/, '') || '/'
const Root = routes.get(path) ?? App

createApp(Root).mount('#app')
