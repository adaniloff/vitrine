<script setup lang="ts">
import { computed, ref } from 'vue'
import { locale, t } from '../i18n'
import { articles, articlePath, type ArticleEntry } from '../articles/registry'
import { formatDate } from '../formatDate'
import RelatedProjectCard from './RelatedProjectCard.vue'

const open = ref(false)

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
    <h2>
      <button
        type="button"
        :aria-expanded="open"
        aria-controls="writings-panel"
        class="flex w-full cursor-pointer items-center justify-between gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
        @click="open = !open"
      >
        {{ t('writings.title') }}
        <svg
          class="h-3.5 w-3.5 shrink-0 transition-transform duration-300"
          :class="open && 'rotate-180'"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M5 7.5 10 12.5 15 7.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </h2>

    <ul v-show="open" id="writings-panel" class="flex flex-col gap-5">
      <li v-for="article in visibleArticles" :key="article.slug" class="flex flex-col gap-3">
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <time
            :datetime="article.datePublished"
            class="shrink-0 whitespace-nowrap font-mono text-xs text-slate-400 dark:text-slate-500"
          >
            {{ formatDate(article.datePublished, article.locale) }}
          </time>

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
        </div>

        <RelatedProjectCard v-if="article.relatedProject" :project="article.relatedProject" />
      </li>
    </ul>
  </div>
</template>
