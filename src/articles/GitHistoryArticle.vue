<script setup lang="ts">
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import ArticleNote from '../components/ArticleNote.vue'
import Header from '../components/Header.vue'

const code =
  'rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300'
const unorderedList =
  'flex list-disc flex-col gap-2 border-l-2 border-slate-300 py-1 pl-8 marker:text-slate-400 dark:border-slate-700 dark:marker:text-slate-600'
const h3 = 'mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <SiteNav page-locale="en" sibling-href="/fr/articles/a-beautiful-way-to-display-your-git-history/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Back
        </a>

        <Header date="2018-04-03" reading-time="~2 min read" locale="en"
          title="A beautiful way to display your (git) history" />

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            Today we're going to talk about
            <a href="https://git-scm.com/docs/git-log" class="underline underline-offset-4">git log</a>!
          </p>

          <ArticleNote>
            If you're only interested in the command, you can scroll a bit ;)
          </ArticleNote>

          <h2 :class="h3">A <em>short</em> introduction</h2>
          <p>
            I know that there is a lot of tools to display your git index (blade, kraken... check
            <a href="https://git-scm.com/download/gui/linux" class="underline underline-offset-4">the list here</a>).
            Believe me or not, I never used one.
          </p>
          <p>
            Well... to be honest, this is a lie :p. Actually, I tried 2 or 3 of those but they never satisfied me as
            much as the terminal.
          </p>
          <p>
            You're probably gonna say that working only with the term is fucking hard - if not impossible, and UI
            softwares were made exactly to simplify your life, but I'm gonna disagree - just by checking how I use
            vim as an IDE you should have an idea of my way to do things ahah.
          </p>

          <ArticleNote>
            Of course, this is not always true - generalisation is a bad thing to do! But we're gonna say that it is,
            for the sake of this topic!
          </ArticleNote>

          <p>
            Later, I'll make another post about the "why you should always learn to do things through your terminal"
            ~ kind of a rule that I like ~ but not for now.
          </p>

          <h2 :class="h3">Getting right back to the subject!</h2>
          <p>
            The command <code :class="code">git log</code> will show you the history of the current branch you're
            working on. That is, "when who (did) what" - kinda our own 3w ;)
          </p>
          <p>
            With 4 to 6 additional options, we're going to change this unsightly printing to an awesome one.
          </p>
          <p>
            <strong>Here is the command:</strong><br />
            <code :class="code">git log --all --decorate --graph --oneline [--color]
              [--simplify-by-decoration]</code>
          </p>
          <p><strong>And now comes some explanations about the options:</strong></p>
          <ul :class="unorderedList">
            <li><strong>all</strong> -&gt; printing all branches, commits etc. Basically asking for "full git history"
              instead of "just the current branch"</li>
            <li><strong>decorate</strong> -&gt; showing useful informations like the <code :class="code">HEAD</code>,
              tags etc</li>
            <li><strong>graph</strong> -&gt; rendering the result as a beautiful graph</li>
            <li><strong>oneline</strong> -&gt; making the overall history easier to display because shorter (a commit
              will literally be rendered in "one line")</li>
            <li><em>color</em> -&gt; 99% of the time your term/conf will have color enabled by default... 1% of the
              time you'll need this option ;)</li>
            <li><em>simplify-by-decoration</em> -&gt; only useful if your history is all messed up and you need a
              global view of the working tree</li>
          </ul>
          <p>You can play with it, adding or removing some options to see the differences.</p>

          <h2 :class="h3">In short</h2>
          <p>
            I <strong>STRONGLY</strong> recommand you to learn it (and not making an alias or cheating in any way) -
            though learning to read the graph <em>may</em> take some time.
          </p>
          <p>
            It will definitely be worth it. I've made
            <a href="/en/articles/fastest-way-to-git-good-for-beginners/" class="underline underline-offset-4">a
              dedicated post</a>
            to explain "how to learn it", the good way.
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
