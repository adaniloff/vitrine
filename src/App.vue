<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
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
