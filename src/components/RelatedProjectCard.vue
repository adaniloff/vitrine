<script setup lang="ts">
import { t } from '../i18n'
import { tr } from '../experiences'
import type { Project } from '../projects'

defineProps<{ project: Project }>()
</script>

<template>
  <div
    class="flex flex-col gap-2 rounded border border-slate-200 px-4 py-3 text-sm dark:border-slate-800"
  >
    <p
      class="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500"
    >
      {{ t('writings.relatedProject') }}
    </p>
    <p class="text-slate-600 dark:text-slate-400">
      <span class="font-medium text-slate-900 dark:text-slate-100">{{ project.name }}</span>
      - {{ tr(project.description) }}
    </p>
    <p class="flex flex-wrap gap-x-4 gap-y-1">
      <a
        :href="project.repo"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
      >
        {{ t('projects.repo') }}
        <svg
          class="h-3 w-3 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </a>
      <a
        :href="project.demo"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
      >
        {{ t('projects.demo') }}
        <svg
          class="h-3 w-3 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </a>
    </p>
  </div>
</template>
