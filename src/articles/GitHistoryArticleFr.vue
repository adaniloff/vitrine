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
    <SiteNav page-locale="fr" sibling-href="/en/articles/a-beautiful-way-to-display-your-git-history/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Retour
        </a>

        <Header date="2018-04-03" reading-time="~2 min de lecture"
          title="Une belle façon d'afficher son historique (git)" />

        <ArticleNote>
          Ce contenu a été traduit de l'anglais vers le français à l'aide de Claude.
        </ArticleNote>

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            Aujourd'hui, on va parler de
            <a href="https://git-scm.com/docs/git-log" class="underline underline-offset-4">git log</a> !
          </p>

          <ArticleNote>
            Si seule la commande vous intéresse, vous pouvez scroller un peu ;)
          </ArticleNote>

          <h2 :class="h3">Une <em>courte</em> introduction</h2>
          <p>
            Je sais qu'il existe plein d'outils pour afficher votre index git (blade, kraken... jetez un œil à
            <a href="https://git-scm.com/download/gui/linux" class="underline underline-offset-4">la liste ici</a>).
            Croyez-le ou non, je n'en ai jamais utilisé un seul.
          </p>
          <p>
            Enfin... pour être honnête, c'est un mensonge :p. En fait, j'en ai essayé 2 ou 3, mais aucun ne m'a autant
            satisfait que le terminal.
          </p>
          <p>
            Vous allez sans doute me dire que travailler uniquement avec le terminal est carrément galère - voire
            impossible, et que les logiciels graphiques ont justement été conçus pour vous simplifier la vie, mais je
            ne suis pas d'accord - il suffit de voir comment j'utilise vim en guise d'IDE pour avoir une idée de ma
            façon de faire les choses ahah.
          </p>

          <ArticleNote>
            Bien sûr, ce n'est pas toujours vrai - généraliser est une mauvaise idée ! Mais on va dire que si, pour
            les besoins de cet article !
          </ArticleNote>

          <p>
            Plus tard, je ferai un autre article sur le « pourquoi il faut toujours apprendre à faire les choses via
            le terminal » ~ une règle que j'aime bien ~ mais pas maintenant.
          </p>

          <h2 :class="h3">Revenons-en au sujet !</h2>
          <p>
            La commande <code :class="code">git log</code> affiche l'historique de la branche sur laquelle vous
            travaillez. Autrement dit, « qui a fait quoi, quand » - une sorte de 3w bien à nous ;)
          </p>
          <p>
            Avec 4 à 6 options supplémentaires, on va transformer cet affichage disgracieux en quelque chose de
            superbe.
          </p>
          <p>
            <strong>Voici la commande :</strong><br />
            <code :class="code">git log --all --decorate --graph --oneline [--color]
              [--simplify-by-decoration]</code>
          </p>
          <p><strong>Et maintenant, quelques explications sur les options :</strong></p>
          <ul :class="unorderedList">
            <li><strong>all</strong> -&gt; affiche toutes les branches, tous les commits etc. En clair, demande
              « l'historique git complet » plutôt que « juste la branche actuelle »</li>
            <li><strong>decorate</strong> -&gt; affiche des infos utiles comme le <code :class="code">HEAD</code>,
              les tags etc</li>
            <li><strong>graph</strong> -&gt; restitue le résultat sous forme de graphe</li>
            <li><strong>oneline</strong> -&gt; rend l'historique plus facile à lire car plus court (un commit sera
              littéralement rendu sur « une seule ligne »)</li>
            <li><em>color</em> -&gt; 99% du temps votre terminal/config aura la couleur activée par défaut... les 1%
              restants, vous aurez besoin de cette option ;)</li>
            <li><em>simplify-by-decoration</em> -&gt; utile seulement si votre historique est complètement en bazar
              et que vous avez besoin d'une vue d'ensemble de l'arbre de travail</li>
          </ul>
          <p>Vous pouvez jouer avec, ajouter ou retirer des options pour voir les différences.</p>

          <h2 :class="h3">En bref</h2>
          <p>
            Je vous recommande <strong>FORTEMENT</strong> de l'apprendre (sans faire d'alias ni tricher d'une
            quelconque manière) - même si apprendre à lire le graphe peut prendre un peu de temps.
          </p>
          <p>
            Ça en vaudra clairement la peine. J'ai fait
            <a href="/fr/articles/fastest-way-to-git-good-for-beginners/" class="underline underline-offset-4">un
              article dédié</a>
            pour expliquer « comment l'apprendre », la bonne méthode.
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
