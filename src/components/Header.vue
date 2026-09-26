<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '../i18n'
import { formatDate } from '../formatDate'

const props = withDefaults(
  defineProps<{
    date: string
    readingTime: string
    title: string
    locale?: Locale
  }>(),
  { locale: 'fr' },
)

const dateLabel = computed(() => formatDate(props.date, props.locale))
</script>

<template>
  <header class="flex flex-col gap-3">
    <p
      class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
    >
      <time :datetime="date">{{ dateLabel }}</time>
      <span aria-hidden="true">·</span>
      <span class="inline-flex items-center gap-1">
        <svg
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
        {{ readingTime }}
      </span>
    </p>
    <h1 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
      {{ title }}
    </h1>
  </header>
</template>
