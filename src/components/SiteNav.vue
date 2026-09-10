<script setup lang="ts">
import { locale, setLocale, t, type Locale } from '../i18n'
import { theme, toggleTheme } from '../theme'

withDefaults(defineProps<{ showLangSwitch?: boolean }>(), {
  showLangSwitch: true,
})

const locales: Locale[] = ['fr', 'en']
</script>

<template>
  <nav
    class="flex items-center justify-end gap-3 px-4 pt-4 text-xs font-medium sm:fixed sm:right-4 sm:top-4 sm:px-0 sm:pt-0"
  >
    <button
      type="button"
      :aria-label="theme === 'dark' ? t('theme.light') : t('theme.dark')"
      class="flex cursor-pointer items-center p-1 text-slate-500 transition hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
      @click="toggleTheme"
    >
      <svg
        v-if="theme === 'dark'"
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
      </svg>
      <svg
        v-else
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>

    <span
      v-if="showLangSwitch"
      class="flex items-center gap-1"
      role="group"
      aria-label="Langue / Language"
    >
      <button
        v-for="(lang, i) in locales"
        :key="lang"
        type="button"
        :aria-pressed="locale === lang"
        :class="[
          'cursor-pointer px-1.5 py-0.5 uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100',
          locale === lang
            ? 'text-slate-900 dark:text-slate-100'
            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
          i > 0 && 'border-l border-slate-300 dark:border-slate-700',
        ]"
        @click="setLocale(lang)"
      >
        {{ lang }}
      </button>
    </span>
  </nav>
</template>
