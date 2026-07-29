import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'

// Build-time prerender. Client re-mounts with createApp (no hydration).
export async function render(): Promise<string> {
  const app = createSSRApp(App)
  return await renderToString(app)
}
