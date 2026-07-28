<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <main>
      <HeroSection />
      <SkillsSection />
      <ContactSection />
    </main>
    <footer
      class="border-t border-slate-200 px-6 py-8 text-center text-sm text-slate-500 dark:border-slate-800"
    >
      © {{ new Date().getFullYear() }} Aleksandr Daniloff
    </footer>
  </div>
</template>
