<script setup lang="ts">
import { computed } from 'vue'
import { locale, t } from '../i18n'
import { articles, articlePath, type ArticleEntry } from '../articles/registry'
import RelatedProjectCard from './RelatedProjectCard.vue'

// One entry per slug: prefer the article matching the current UI locale,
// falling back to whichever locale exists (tagged via frenchOnly) so a
// translated slug doesn't show up twice in the list.
const visibleArticles = computed(() => {
  const bySlug = new Map<string, ArticleEntry>()
  for (const article of articles) {
    if (!bySlug.has(article.slug) || article.locale === locale.value) {
      bySlug.set(article.slug, article)
    }
  }
  return [...bySlug.values()]
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <h2
      class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
    >
      {{ t('writings.title') }}
    </h2>

    <ul class="flex flex-col gap-5">
      <li v-for="article in visibleArticles" :key="article.slug" class="flex flex-col gap-3">
        <a
          :href="articlePath(article.locale, article.slug)"
          class="inline-flex w-fit flex-wrap items-center gap-2 text-base text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
        >
          <svg
            class="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          {{ article.title }}
          <span
            v-if="article.frenchOnly && locale === 'en'"
            class="rounded border border-slate-300 px-1.5 py-0.5 font-mono text-xs text-slate-400 no-underline dark:border-slate-700 dark:text-slate-500"
          >
            {{ t('writings.frenchOnly') }}
          </span>
        </a>

        <RelatedProjectCard v-if="article.relatedProject" :project="article.relatedProject" />
      </li>
    </ul>
  </div>
</template>
