# adaniloff.dev

Portfolio / vitrine freelance — [adaniloff.dev](https://adaniloff.dev)

Single-page bilingue (FR/EN), thème clair/sombre.
Vue 3 · TypeScript · Tailwind CSS v4 · Vite · déployée sur Cloudflare Workers.

## Développement

```bash
npm install
npm run dev        # serveur de dev Vite
npm run build      # type-check (vue-tsc) + build de prod dans dist/ + prerender
npm run preview    # sert le build de prod localement
```

## Déploiement

Auto par l'intégration Git Cloudflare à chaque push sur `main`.
Worker déployé = **`vitrine`** (`wrangler.jsonc`) — nom fixé par Cloudflare, ne pas renommer.

## Structure

```
public/            assets statiques (favicon, og, CV, robots, sitemap, _headers)
src/               codebase
index.html         template + meta SEO/OG + JSON-LD + script anti-flash thème
```

## SEO / sécurité

- Meta description, Open Graph, Twitter Card, canonical dans `index.html`.
- Structured data `Person` (JSON-LD).
- `public/_headers` : CSP + en-têtes de sécurité (lus automatiquement par Cloudflare).
- `public/sitemap.xml` + `public/robots.txt`.
- HTML prérendu au build pour un contenu indexable sans exécuter le JS.
