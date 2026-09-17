// Injects SSR-rendered HTML into dist/index.html and generates one static
// page per article under dist/<locale>/articles/<slug>/index.html, each with
// its own title/description/canonical/OG/Twitter meta and BlogPosting
// JSON-LD. Runs after `vite build` (client) and `vite build --ssr` (server).
// Article slug/locale/component live in src/articles/registry.ts, the single
// source of truth also used by main.ts (client routing) and entry-server.ts.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const marker = '<div id="app"></div>'
const siteName = 'Aleksandr Daniloff'
const siteUrl = 'https://adaniloff.dev'

const { renderHome, renderArticle, articleMeta } = await import(
  resolve(root, 'dist-ssr/entry-server.js')
)

const indexPath = resolve(root, 'dist/index.html')
// Pristine client-built template: correct hashed asset tags, anti-flash
// theme script, and the default (home) meta tags — reused as the base for
// every article page too.
const template = readFileSync(indexPath, 'utf-8')

function withMeta(html, { title, description, path, locale, ogType = 'website', alternates = [] }) {
  const canonical = `${siteUrl}${path}`
  const altLinks = alternates
    .map((alt) => `<link rel="alternate" hreflang="${alt.locale}" href="${siteUrl}${alt.path}" />`)
    .join('\n    ')
  const hreflang = locale
    ? `<link rel="canonical" href="${canonical}" />\n    ${altLinks}`
    : `<link rel="canonical" href="${canonical}" />`

  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(/<link rel="canonical" href=".*?" \/>/, hreflang)
    .replace(
      /<meta property="og:type" content=".*?" \/>/,
      `<meta property="og:type" content="${ogType}" />`,
    )
    .replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${canonical}" />`,
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta name="twitter:description" content=".*?" \/>/,
      `<meta name="twitter:description" content="${description}" />`,
    )
}

function withBlogPostingJsonLd(html, { title, description, path, locale, datePublished }) {
  const canonical = `${siteUrl}${path}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: canonical,
    datePublished,
    inLanguage: locale,
    image: `${siteUrl}/og.png`,
    author: { '@type': 'Person', name: siteName, url: `${siteUrl}/` },
    publisher: { '@type': 'Person', name: siteName, url: `${siteUrl}/` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  }
  const script = `<script type="application/ld+json">\n      ${JSON.stringify(jsonLd)}\n    </script>`
  return html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, script)
}

function writePage(outPath, html, appHtml) {
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html.replace(marker, `<div id="app">${appHtml}</div>`))
}

// Home page
writePage(indexPath, template, await renderHome())
console.log('Prerendered dist/index.html')

// Articles as static pages
for (const article of articleMeta) {
  // hreflang must be reciprocal: list every translated locale for this slug
  // (including itself), plus x-default pointing at the FR version — the
  // site's primary language.
  const translations = articleMeta.filter((a) => a.slug === article.slug)
  const defaultTranslation = translations.find((a) => a.locale === 'fr') ?? article
  const alternates = [
    ...translations.map((a) => ({ locale: a.locale, path: a.path })),
    { locale: 'x-default', path: defaultTranslation.path },
  ]

  let html = withMeta(template, {
    title: `${article.title} - ${siteName}`,
    description: article.description,
    path: article.path,
    locale: article.locale,
    ogType: 'article',
    alternates,
  })
  html = withBlogPostingJsonLd(html, {
    title: article.title,
    description: article.description,
    path: article.path,
    locale: article.locale,
    datePublished: article.datePublished,
  })
  writePage(
    resolve(root, `dist${article.path}index.html`),
    html,
    await renderArticle(article.slug, article.locale),
  )
  console.log(`Prerendered dist${article.path}index.html`)
}
