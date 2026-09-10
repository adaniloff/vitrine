<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <SiteNav />

    <main>
      <HeroSection />
    </main>
    <SiteFooter />
  </div>
</template>
