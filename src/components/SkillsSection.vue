<script setup lang="ts">
interface SkillGroup {
  title: string
  items: string[]
}

const groups: SkillGroup[] = [
  {
    title: 'Backend',
    items: ['Symfony', 'PHP', 'API REST', 'MySQL / PostgreSQL', 'Doctrine'],
  },
  {
    title: 'Frontend',
    items: ['Vue.js', 'TypeScript', 'Vite', 'Tailwind CSS'],
  },
  {
    title: 'Ops & outillage',
    items: ['Docker', 'CI/CD', 'Git', 'Architecture', 'Tech leadership'],
  },
]
</script>

<template>
  <section
    id="skills"
    class="border-t border-slate-200 px-6 py-20 dark:border-slate-800"
  >
    <div class="mx-auto max-w-4xl">
      <h2
        class="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50"
      >
        Compétences
      </h2>

      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <div
          v-for="group in groups"
          :key="group.title"
          class="rounded-xl border border-slate-200 p-6 text-left dark:border-slate-800"
        >
          <h3 class="font-semibold text-slate-900 dark:text-slate-100">
            {{ group.title }}
          </h3>
          <ul class="mt-4 space-y-2">
            <li
              v-for="item in group.items"
              :key="item"
              class="text-slate-600 dark:text-slate-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
