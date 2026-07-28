<script setup lang="ts">
const email = 'aleksandr.daniloff@ayruu.com'
</script>

<template>
  <section
    id="contact"
    class="border-t border-slate-200 px-6 py-20 text-center dark:border-slate-800"
  >
    <div class="mx-auto max-w-2xl">
      <h2
        class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50"
      >
        Contact
      </h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Un projet, une mission, une question ? Écrivez-moi.
      </p>

      <a
        :href="`mailto:${email}`"
        class="mt-8 inline-block rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
      >
        {{ email }}
      </a>

      <div class="mt-8 flex items-center justify-center gap-6">
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline dark:hover:text-slate-100"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline dark:hover:text-slate-100"
        >
          GitHub
        </a>
      </div>
    </div>
  </section>
</template>
