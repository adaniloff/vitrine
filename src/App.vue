<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import { locale, setLocale, type Locale } from './i18n'

const locales: Locale[] = ['fr', 'en']
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <nav
      aria-label="Langue / Language"
      class="flex items-center justify-end gap-1 px-4 pt-4 text-xs font-medium sm:fixed sm:right-4 sm:top-4 sm:px-0 sm:pt-0"
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
    </nav>

    <main>
      <HeroSection />
    </main>
    <footer
      class="mx-auto max-w-2xl px-6 py-8 text-sm text-slate-400 dark:text-slate-500"
    >
      © {{ new Date().getFullYear() }} Aleksandr Daniloff
    </footer>
  </div>
</template>
