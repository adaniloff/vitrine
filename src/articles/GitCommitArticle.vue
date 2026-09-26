<script setup lang="ts">
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import Header from '../components/Header.vue'

const code =
  'rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300'
const codeBlock =
  'whitespace-pre-wrap rounded bg-slate-100 px-4 py-3 font-mono text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300'
const orderedList =
  'flex list-decimal flex-col gap-2 border-l-2 border-slate-300 py-1 pl-8 marker:text-slate-400 dark:border-slate-700 dark:marker:text-slate-600'
const h3 = 'mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50'
const h4 = 'mt-2 text-lg font-medium text-slate-900 dark:text-slate-50'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <SiteNav page-locale="en" sibling-href="/fr/articles/the-good-way-to-commit/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Back
        </a>

        <Header date="2018-03-26" reading-time="~4 min read" locale="en" title="The good way to commit !" />

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            So, I recently published a post which explains that using a message template for git helped me to write
            nice and useful commits.
          </p>
          <p>
            But this template is not magic and won't do the job for you: it's an helpful tool, but that's it. I'm
            gonna show you how I personally use it, and why it works fine - for me.
          </p>

          <h2 :class="h3">"Why": the good way to write your notes</h2>
          <p>
            Before anything, you want to be sure that you're commit's message will be <em>pertinent</em>.
            What I learned is that in almost all case, explaining <em>why</em> instead of <em>what</em> will
            automatically bring 3 great things:
          </p>
          <ol :class="orderedList">
            <li>An <strong>easier</strong> way (for your collaborators) to understand why you did it</li>
            <li>
              A better way to split your development into different commits, which make you to work in a
              <strong>more flexible</strong> way
            </li>
            <li>At the very end, more global <strong>quality</strong> in your projects</li>
          </ol>
          <p>Let's see how it can make the difference.</p>

          <p>Example of <em>what</em>:</p>
          <pre :class="codeBlock"><strong>commit 1</strong>
[fix] -> fix a bug on login page

I fixed a bug caused by the PHP version.
Also, I cleaned up some usages in the classe and refactored the method in which the bug appeared since it was awful!</pre>
          <p>
            In this first example, the developer fix a bug in a file. He also finds out that some usages where
            useless so he removes them to clean the code a little bit. He then commits the whole thing.
          </p>
          <p>
            Now, if someone have to work on the project and check all the git history, he will probably never know
            the bug appears since the server has changed etc. That's some <strong>lost of information</strong>!
          </p>

          <p>Example of <em>why</em>:</p>
          <pre :class="codeBlock"><strong>commit 1</strong>
[fix] -> fix a bug on login page

I fixed a bug caused by the PHP version because we migrated our project to a new server.

<strong>commit 2</strong>
[cleanup] -> clean some useless usages

I cleaned up some usages in the class because they were not used since an undefined period of time.

<strong>commit 3</strong>
[refacto] -> refacto the login method

The code was awful so I refacto it after fixing the initial bug in *commit_1_hash*</pre>
          <p>You can see that there are a lot of changes... I'll explain them to be sure it's clear for you.</p>
          <p>
            By choosing this approach, the dev. is forced to split the modifications in 3 commits, making the reading
            of them <strong>easier</strong>. It also brings a lot of advantages in term of <strong>flexibility</strong>
            (reverting a commit, cherry-pick etc) and is a better way to proceed in general. Furthermore, by
            splitting your work into little pieces like that, you don't even necessarily need to say <em>what</em>
            you did since it will be visible at the first sight! This last statement is only true if you make a
            clean, readable code, thus the <strong>quality improvements</strong> I was talking before.
          </p>
          <p>
            We've done it (my team and me) since 2 days rightnow and we already see all the changes and advantages
            that bring to us. But this may have not happen without the usage of a message template as I said at the
            beginning of this article.
          </p>

          <h2 :class="h3">How to do it efficiently</h2>
          <p>
            You now know the theory. But sometimes, it can be hard to apply it to your workflow without the good
            strategy / tools - we will be talking about some specific git commands that will help you to do it right.
          </p>
          <p>
            For example, you're working to fix a bug ; unfortunately there is a lot of refactoring and code cleanup
            to do... how de you proceed? It will be hard to: 1st make the fix, 2sd refacto and 3 clean-up...
            especially if your feature is somehow big.
          </p>
          <p>
            My advice here is to do it all at the same time then to split it into multiple commits. Without the good
            commands it could be a pain in the ass, fortunately git is awesome and provides us what we need!
          </p>

          <h3 :class="h4">git add -p (--patch)</h3>
          <p>
            This one you should already know. Otherwise, learning to use it will change your life! It will ask you,
            chunk by chunk, if you want to add a bloc of code to your staged files. That way you can add only parts
            of a file and not all the modifications you've done.
          </p>

          <h3 :class="h4">git reset -p (--patch)</h3>
          <p>
            Basically, the opposite of <code :class="code">git add -p</code>: imagine that you've had some
            modifications as staged by error. With this command you can parse them and choose which one you want to
            keep as staged or change to unstaged.
          </p>

          <h3 :class="h4">git diff --cached</h3>
          <p>
            The option <code :class="code">--cached</code> will display the modifications staged and not the
            unstaged ones. Usefull to review your current stage state.
          </p>

          <h3 :class="h4">git commit -v (--verbose) -p (--patch)</h3>
          <p>
            The <code :class="code">-p</code> option will allow you to use an interactive interface to write down
            your commit message. That way you can make clear, explicit messages formatted in Markdown.
            The <code :class="code">-v</code> option will display all the modifications you are going to commit at
            the bottom of your message. It will basically print both a <code :class="code">git status</code> and a
            <code :class="code">git diff --cached</code> combined, while editing your message.
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
