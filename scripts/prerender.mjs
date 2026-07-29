// Injects the SSR-rendered app HTML into dist/index.html.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))
const appHtml = await render()

const indexPath = resolve(root, 'dist/index.html')
const template = readFileSync(indexPath, 'utf-8')

const marker = '<div id="app"></div>'
if (!template.includes(marker)) {
  throw new Error(`Prerender marker not found in dist/index.html: ${marker}`)
}

writeFileSync(indexPath, template.replace(marker, `<div id="app">${appHtml}</div>`))
console.log('Prerendered dist/index.html')
