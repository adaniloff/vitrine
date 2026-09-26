<script setup lang="ts">
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Header from '../components/Header.vue'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <SiteNav page-locale="en" sibling-href="/fr/articles/my-unsuccessful-attempt-to-make-git-easier-than-it-is/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Back
        </a>

        <Header date="2018-03-24" reading-time="~1 min read" locale="en"
          title="My unsuccessful attempt to make git easier than it already is" />

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            A few months ago, I found myself trying to make a comparison between git and a dictionnary (wtf, right?).
            The idea was to be able to explain git for people without any (or very few) knowledges in development and
            versionning. I've had it because at this time I was training some interns whom had almost not heard of
            it; and I hadn't much time explaining it again and again (not that I didn't wanted to).
          </p>
          <p>
            At the beginning I was really involved in the creation of such a documentation since I hadn't found such
            one like that. But the more I was trying to describe things clearly, the more I found it
            incomprehensible.
          </p>
          <p>
            With hindsight, I'm not even sure now, that this could be useful: "to understand, you must practice"
            would resume my point.
          </p>
          <p>
            Whatever, you can found my unsuccessful attempt in
            <a href="https://github.com/adaniloff/sample-git-explanation/blob/master/README.md"
              class="underline underline-offset-4">this wiki</a>
          </p>
        </div>

        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Back
        </a>
      </article>
    </main>

    <SiteFooter />
  </div>
</template>
