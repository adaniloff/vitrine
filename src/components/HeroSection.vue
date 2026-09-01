<script setup lang="ts">
import { t } from '../i18n'
import CareerAccordion from './CareerAccordion.vue'

const stack = [
  'Symfony',
  'PHP',
  'Vue.js',
  'ELK',
  'Redis',
  'RabbitMQ',
  'Docker',
  'CI/CD',
  'RESTful API',
  'TDD',
  'CQRS',
  'Event Sourcing',
  'Clean Code',
  'Domain Driven Design',
  'Tech leadership',
]
const email = 'adaniloff@proton.me'
</script>

<template>
  <section
    class="mx-auto flex min-h-[90svh] max-w-2xl flex-col justify-center gap-8 px-6 py-24"
  >
    <p
      class="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
    >
      {{ t('available') }}
    </p>

    <h1
      class="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50"
    >
      Aleksandr Daniloff
    </h1>

    <p
      class="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
      v-html="t('pitch')"
    ></p>

    <ul class="flex flex-wrap gap-x-3 gap-y-1.5">
      <li
        v-for="tech in stack"
        :key="tech"
        class="font-mono text-xs text-slate-600 after:ml-3 after:text-slate-400 last:after:content-none dark:text-slate-400 dark:after:text-slate-600 after:content-['·']"
      >
        {{ tech }}
      </li>
    </ul>

    <CareerAccordion />

    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        :href="`mailto:${email}`"
        class="border border-slate-900 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900"
      >
        {{ t('contact') }}
      </a>
      <a
        href="https://www.linkedin.com/in/aleksandr-daniloff-38728b34"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        class="inline-flex items-center gap-1.5 text-sm text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4 shrink-0">
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
        <span class="hidden sm:inline">LinkedIn</span>
      </a>
      <a
        href="https://www.malt.fr/profile/aleksandrdaniloff"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Malt"
        class="inline-flex items-center gap-1.5 text-sm text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4 shrink-0">
          <path
            d="M20.195 8.581c-.069 0-.285.026-.484.113-.432.181-.597.311-.597.58v5.023c0 .277.26.355.735.355.467 0 .649-.087.649-.355V8.858c0-.173-.113-.277-.303-.277zm3.502 4.903c-.345.087-.45.113-.57.113-.147 0-.2-.044-.2-.2v-2.161h.788c.207 0 .285-.078.285-.285 0-.173-.078-.26-.285-.26h-.787v-.839c0-.259-.087-.363-.268-.363-.173 0-.415.156-.934.597-.528.45-.83.744-.83.951 0 .121.086.199.224.199h.424v2.335c0 .683.337 1.08.925 1.08.39 0 .675-.146 1.012-.406.311-.242.51-.432.51-.596 0-.139-.103-.217-.294-.165zm-15.21-3.078c-.13 0-.285.026-.484.112-.433.19-.597.312-.597.58v3.2c0 .276.26.354.735.354.467 0 .649-.087.649-.355v-3.614c0-.173-.113-.277-.303-.277Zm1.816 0c-.355 0-.675.121-.986.363-.173.138-.32.294-.32.424 0 .112.078.173.19.173.19 0 .251-.078.416-.078.164 0 .25.173.25.476v2.533c0 .277.26.355.735.355.467 0 .649-.087.649-.355v-2.776c0-.657-.39-1.115-.934-1.115zm2.43 0c-.337 0-.692.121-1.003.363-.173.138-.32.294-.32.424 0 .112.078.173.19.173.19 0 .25-.078.432-.078s.268.173.268.476v2.533c0 .277.26.355.735.355.467 0 .649-.087.649-.355v-2.776c0-.657-.39-1.115-.951-1.115zm5.335 0a1.29 1.29 0 0 0-.484.112c-.26.113-.398.2-.467.312-.26-.303-.597-.398-.977-.398-1.116 0-1.911.942-1.911 2.283 0 1.124.605 1.954 1.461 1.954.26 0 .493-.104.77-.363.216-.2.32-.329.32-.45a.14.14 0 0 0-.147-.147c-.121 0-.251.104-.416.104-.354 0-.596-.545-.596-1.35 0-.803.32-1.348.804-1.348.32 0 .562.242.562.657v2.525c0 .277.26.355.735.355.467 0 .649-.087.649-.355v-3.614c0-.173-.113-.277-.303-.277ZM3.499 13.563l-.21.21.619.618c.304.304.79.598 1.244.144.339-.34.26-.695.073-.98-.06.004-1.726.008-1.726.008zm-.963-2.325.21-.21-.608-.607c-.304-.303-.765-.621-1.243-.143-.351.35-.273.692-.087.97Zm2.86.416c-.037.043-1.511 1.524-1.511 1.524h1.154c.43 0 .981-.101.981-.777 0-.496-.296-.683-.624-.747zm-3.244-.031H.981c-.43 0-.981.135-.981.778 0 .479.307.676.641.745.04-.046 1.511-1.523 1.511-1.523zm1.484 3.04-.618-.618-.608.607a2.613 2.613 0 0 1-.137.128c.07.333.266.639.745.639s.676-.307.745-.641c-.043-.037-.085-.073-.127-.115zM2.41 10.15l.608.607.618-.618a2.25 2.25 0 0 1 .128-.118c-.065-.327-.251-.623-.747-.623s-.682.297-.746.625c.046.04.092.08.14.127zm2.742.117c-.455-.454-.94-.16-1.244.144l-2.87 2.87c-.303.303-.621.765-.143 1.243.478.478.94.16 1.243-.143l2.87-2.87c.304-.304.598-.79.144-1.244Z"
          />
        </svg>
        <span class="hidden sm:inline">Malt</span>
      </a>
      <a
        href="https://github.com/adaniloff"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        class="inline-flex items-center gap-1.5 text-sm text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4 shrink-0">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
        <span class="hidden sm:inline">GitHub</span>
      </a>
    </div>
  </section>
</template>
