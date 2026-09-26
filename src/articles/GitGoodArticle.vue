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
const h4 = 'mt-2 text-lg font-medium text-slate-900 dark:text-slate-50'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <SiteNav page-locale="en" sibling-href="/fr/articles/fastest-way-to-git-good-for-beginners/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Back
        </a>

        <Header date="2018-04-06" reading-time="~3 min read" locale="en"
          title="Fastest way to git good (for beginners)" />

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            (Sorry but no, you don't need to be an
            <a href="http://knowyourmeme.com/memes/git-gud" class="underline underline-offset-4">hardcore gamer</a>
            to be good with git!)
          </p>
          <p>
            In a few words: <strong>always</strong> check what you're doing &amp; what you're dealing with.
          </p>

          <h2 :class="h3">Know your environment</h2>
          <p>
            From my - short - experience, most people tend to run commands like <code :class="code">commit</code>,
            <code :class="code">pull</code>, <code :class="code">push</code> without being sure of where they are
            working (the damn branch they are on), not refreshing their index and sometimes they even don't just look
            to their current - git - history/tree!
            It always annoy me when someone decide to make a <code :class="code">merge's commit</code> for features
            that could have been fast-forwarded overwise.
          </p>
          <p>
            I like to compare the way to do your git with the way you play an RTS (like SC2):
            <strong>you should always be aware of what's going on</strong> otherwise you expose yourself - and your
            team - to some troubles.
          </p>

          <h2 :class="h3">Habits to take for improvement</h2>
          <p>Following some rules that I'm gonna list below will result in:</p>
          <ul :class="unorderedList">
            <li>📉 less mistakes overall</li>
            <li>📈 a better understanding of git in the really short term</li>
          </ul>
          <p>
            Those 2 changes will lead to more experimentation because of your confidence, thus more knowledges and
            productivity.
          </p>
          <p>Here are my basic recos:</p>

          <h3 :class="h4">Be aware of the branch you're working on, as same as the directory you're in!</h3>
          <ul :class="unorderedList">
            <li>The first thing you wanna avoid is not working where you were supposed to.</li>
            <li>
              In your terminal, you can show (with plugins or configurations) the branch you're on without executing
              any command: I personnaly use
              <a href="http://ohmyz.sh" class="underline underline-offset-4">oh-my-zsh</a> which directly print this
              information.
              <ArticleNote>
                ⚠️ You can abuse of the usage of <code :class="code">git branch</code> if you have no way to
                configure the shell you're using.
              </ArticleNote>
            </li>
          </ul>

          <h3 :class="h4">Do <code :class="code">git fetch</code> regularly and frequently.</h3>
          <ul :class="unorderedList">
            <li>
              There is no problem <em>at all</em> in doing it a lot!
              <ArticleNote>
                Actually there is one case when this tip does not apply: if you have a very bad connection or if the
                service (bitbucket, github) is either very slow or down.
              </ArticleNote>
            </li>
            <li>
              Doing so you will be sure to see if any change is made and you won't have to do some extra tricks that
              you may not know yet.
            </li>
            <li>
              ⚠️ The minimum is to do it before every commit, checkout, pull, push etc...
              <ArticleNote>
                Of course that also depends of the size of your team so don't take it literally! Try to force
                yourself to be used to do it first, then adapt the frequency to your needs.
              </ArticleNote>
            </li>
          </ul>

          <h3 :class="h4">
            Always <code :class="code">fetch</code> with the prune option
            (<code :class="code">git fetch -p</code> or <code :class="code">git fetch --prune</code>).
          </h3>
          <ul :class="unorderedList">
            <li>Because it shows you if a/some branch(es) has been removed.</li>
            <li>Free information right here!</li>
          </ul>

          <h3 :class="h4">Use <code :class="code">git status</code> a lot.</h3>
          <ul :class="unorderedList">
            <li>
              It takes no time and it will give you some informations about your work.
              <ArticleNote>
                Heck, I even use it to remind myself what I'm doing when I need to do "multitasking"!
              </ArticleNote>
            </li>
          </ul>

          <h3 :class="h4">
            While trying new things, always take advantages of <code :class="code">git status</code>,
            <code :class="code">git diff</code> and <code :class="code">git log</code>
          </h3>
          <ul :class="unorderedList">
            <li>
              Did I just said "while trying new things"? Well I should have said "while doing anything" instead
              because it's a must do!
              <ArticleNote>
                ⚠️ Again, don't take it literally unless you're a beginner
              </ArticleNote>
            </li>
            <li>
              That way you'll understand what practices are good/bad etc
              <ArticleNote>
                For example, you'll understand <strong>why</strong> <code :class="code">rebase</code> can be whether
                awesome or awful, depending on how you used it.
              </ArticleNote>
            </li>
          </ul>

          <h3 :class="h4">Last but not least, use the terminal and rtfm!</h3>
          <ul :class="unorderedList">
            <li>
              Stay in charge of everything by working with the term.
              <ArticleNote>
                You'll need a
                <a href="/en/articles/a-beautiful-way-to-display-your-git-history/"
                  class="underline underline-offset-4">git log starter pack</a> ;)
              </ArticleNote>
            </li>
            <li>It's a thing to know when to ask for help, it's another thing to learn reading docs and manuals!</li>
          </ul>

          <h2 :class="h3">More to come...</h2>
          <p>
            Those were the basics - mine, at least.
            There are plenty of good commands/options that will help you to "git gud" and even better ; but after
            reading this and with a little practice, you should be able to find all what you need later on by
            yourself.
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
