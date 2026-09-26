<script setup lang="ts">
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import ArticleNote from '../components/ArticleNote.vue'
import Header from '../components/Header.vue'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <SiteNav page-locale="fr" sibling-href="/en/articles/my-unsuccessful-attempt-to-make-git-easier-than-it-is/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Retour
        </a>

        <Header date="2018-03-24" reading-time="~1 min de lecture"
          title="Ma tentative infructueuse de rendre git plus simple qu'il ne l'est déjà" />

        <ArticleNote>
          Ce contenu a été traduit de l'anglais vers le français à l'aide de Claude.
        </ArticleNote>

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            Il y a quelques mois, je me suis surpris à essayer de faire une comparaison entre git et un dictionnaire
            (n'importe quoi, hein ?). L'idée était de pouvoir expliquer git à des personnes n'ayant aucune (ou très
            peu de) connaissance en développement et en gestion de versions. Je m'y suis mis parce qu'à l'époque je
            formais des stagiaires qui n'en avaient presque jamais entendu parler ; et je n'avais pas beaucoup de
            temps pour leur expliquer encore et encore (non pas que ça me dérangeait).
          </p>
          <p>
            Au début, je me suis vraiment investi dans la création d'une telle documentation puisque je n'en avais
            trouvé aucune de ce genre. Mais plus j'essayais de décrire les choses clairement, plus je trouvais ça
            incompréhensible.
          </p>
          <p>
            Avec le recul, je ne suis même plus sûr aujourd'hui que ça puisse être utile : « pour comprendre, il faut
            pratiquer » résumerait bien mon propos.
          </p>
          <p>
            Quoi qu'il en soit, vous pouvez retrouver ma tentative infructueuse dans
            <a href="https://github.com/adaniloff/sample-git-explanation/blob/master/README.md"
              class="underline underline-offset-4">ce wiki</a>
          </p>
        </div>

        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Retour
        </a>
      </article>
    </main>

    <SiteFooter />
  </div>
</template>
