<script setup lang="ts">
const stack = ['Symfony', 'PHP', 'Vue.js', 'Docker']
</script>

<template>
  <section
    class="flex min-h-[90svh] flex-col items-center justify-center gap-6 px-6 py-24 text-center"
  >
    <p
      class="rounded-full border border-violet-300/40 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-500 dark:text-violet-300"
    >
      Freelance · disponible pour vos projets
    </p>

    <h1
      class="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl dark:text-slate-50"
    >
      Aleksandr Daniloff
    </h1>

    <p class="max-w-2xl text-lg text-slate-600 sm:text-xl dark:text-slate-300">
      ~15 ans d'expérience en développement web. Tech lead pendant 8 ans, puis
      CTO d'une startup. J'accompagne vos projets
      <span class="font-semibold text-slate-900 dark:text-slate-100">
        Symfony / PHP
      </span>
      et
      <span class="font-semibold text-slate-900 dark:text-slate-100">
        Vue.js
      </span>
      — du proto à la mise en production.
    </p>

    <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
      <span
        v-for="tech in stack"
        :key="tech"
        class="rounded-md bg-slate-100 px-3 py-1 font-mono text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        {{ tech }}
      </span>
    </div>

    <a
      href="#contact"
      class="mt-6 rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
    >
      Me contacter
    </a>
  </section>
</template>
