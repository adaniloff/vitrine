<script setup lang="ts">
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
      Freelance · disponible pour vos projets
    </p>

    <h1
      class="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50"
    >
      Aleksandr Daniloff
    </h1>

    <p class="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
      ~15 ans d'expérience en développement web, dont plus de 10 comme
      <span class="text-slate-900 dark:text-slate-100">Tech Lead</span>
      puis
      <span class="text-slate-900 dark:text-slate-100">CTO</span>.
      J'accompagne vos projets
      <span class="text-slate-900 dark:text-slate-100">Symfony / PHP</span>
      et
      <span class="text-slate-900 dark:text-slate-100">Vue.js</span>,
      du proto à la mise en production.
    </p>

    <blockquote
      class="border-l-2 border-slate-300 pl-4 text-base leading-relaxed text-slate-500 dark:border-slate-700 dark:text-slate-400"
    >
      CTO d'une startup, de sa création à la production : conception produit,
      architecture, setup CI/CD et observabilité, constitution
      et encadrement de l'équipe technique (~6 personnes).
    </blockquote>

    <ul class="flex flex-wrap gap-x-3 gap-y-1.5">
      <li
        v-for="tech in stack"
        :key="tech"
        class="font-mono text-xs text-slate-600 after:ml-3 after:text-slate-400 last:after:content-none dark:text-slate-400 dark:after:text-slate-600 after:content-['·']"
      >
        {{ tech }}
      </li>
    </ul>

    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        :href="`mailto:${email}`"
        class="border border-slate-900 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900"
      >
        Me contacter
      </a>
      <a
        href="https://www.linkedin.com/in/aleksandr-daniloff-38728b34"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
      >
        LinkedIn
      </a>
      <a
        href="https://www.malt.fr/profile/aleksandrdaniloff"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
      >
        Malt
      </a>
    </div>
  </section>
</template>
