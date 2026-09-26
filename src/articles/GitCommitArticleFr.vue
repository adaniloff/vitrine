<script setup lang="ts">
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import ArticleNote from '../components/ArticleNote.vue'
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
    <SiteNav page-locale="fr" sibling-href="/en/articles/the-good-way-to-commit/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Retour
        </a>

        <Header date="2018-03-26" reading-time="~4 min de lecture" title="La bonne façon de commit !" />

        <ArticleNote>
          Ce contenu a été traduit de l'anglais vers le français à l'aide de Claude.
        </ArticleNote>

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            Donc, j'ai récemment publié un article qui explique qu'utiliser un template de message pour git m'a aidé
            à écrire des commits propres et utiles.
          </p>
          <p>
            Mais ce template n'a rien de magique et ne fera pas le travail à votre place : c'est un outil utile, mais
            ça s'arrête là. Je vais vous montrer comment je l'utilise personnellement, et pourquoi ça fonctionne bien
            - pour moi.
          </p>

          <h2 :class="h3">« Pourquoi » : la bonne façon d'écrire vos notes</h2>
          <p>
            Avant toute chose, vous voulez être sûr que le message de votre commit sera <em>pertinent</em>.
            Ce que j'ai appris, c'est que dans presque tous les cas, expliquer <em>pourquoi</em> plutôt que
            <em>quoi</em> apporte automatiquement 3 choses géniales :
          </p>
          <ol :class="orderedList">
            <li>Une façon <strong>plus simple</strong> (pour vos collaborateurs) de comprendre pourquoi vous l'avez
              fait</li>
            <li>
              Une meilleure façon de découper votre développement en différents commits, ce qui vous fait travailler
              de manière <strong>plus flexible</strong>
            </li>
            <li>Au bout du compte, une <strong>qualité</strong> plus globale dans vos projets</li>
          </ol>
          <p>Voyons voir en quoi ça change tout.</p>

          <p>Exemple du <em>quoi</em> :</p>
          <pre :class="codeBlock"><strong>commit 1</strong>
[fix] -> correction d'un bug sur la page de connexion

J'ai corrigé un bug causé par la version de PHP.
J'en ai aussi profité pour nettoyer certains usages dans la classe et refactorer la méthode où le bug apparaissait, parce qu'elle était affreuse !</pre>
          <p>
            Dans ce premier exemple, le développeur corrige un bug dans un fichier. Il se rend aussi compte que
            certains usages étaient inutiles, donc il les supprime pour nettoyer un peu le code. Il commit ensuite le
            tout en un seul bloc.
          </p>
          <p>
            Maintenant, si quelqu'un doit travailler sur le projet et consulter tout l'historique git, il ne saura
            probablement jamais pourquoi le bug est apparu, que le serveur a changé, etc. C'est une vraie
            <strong>perte d'information</strong> !
          </p>

          <p>Exemple du <em>pourquoi</em> :</p>
          <pre :class="codeBlock"><strong>commit 1</strong>
[fix] -> correction d'un bug sur la page de connexion

J'ai corrigé un bug causé par la version de PHP parce qu'on a migré notre projet vers un nouveau serveur.

<strong>commit 2</strong>
[cleanup] -> nettoyage de quelques usages inutiles

J'ai nettoyé certains usages dans la classe parce qu'ils n'étaient plus utilisés depuis un moment indéterminé.

<strong>commit 3</strong>
[refacto] -> refacto de la méthode de connexion

Le code était affreux donc je l'ai refactoré après avoir corrigé le bug initial dans *commit_1_hash*</pre>
          <p>Vous voyez qu'il y a pas mal de changements... je vais vous les expliquer pour être sûr que ce soit
            clair.</p>
          <p>
            En choisissant cette approche, le développeur est obligé de découper les modifications en 3 commits, ce
            qui rend leur lecture <strong>plus simple</strong>. Ça apporte aussi pas mal d'avantages en termes de
            <strong>flexibilité</strong> (revert d'un commit, cherry-pick etc) et c'est une meilleure façon de
            procéder en général. De plus, en découpant votre travail en petits morceaux comme ça, vous n'avez même
            plus forcément besoin de dire <em>quoi</em> vous avez fait puisque ce sera visible au premier coup d'œil
            ! Cette dernière affirmation n'est vraie que si vous faites du code propre et lisible, d'où les
            <strong>améliorations de qualité</strong> dont je parlais plus haut.
          </p>
          <p>
            On le fait (mon équipe et moi) depuis 2 jours maintenant et on voit déjà tous les changements et
            avantages que ça nous apporte. Mais ça n'aurait probablement pas été possible sans l'utilisation d'un
            template de message, comme je le disais au début de cet article.
          </p>

          <h2 :class="h3">Comment le faire efficacement</h2>
          <p>
            Vous connaissez maintenant la théorie. Mais parfois, ça peut être difficile de l'appliquer à votre
            workflow sans les bonnes stratégies / outils - on va parler de quelques commandes git spécifiques qui
            vont vous aider à bien faire les choses.
          </p>
          <p>
            Par exemple, vous êtes en train de corriger un bug ; malheureusement il y a pas mal de refacto et de
            nettoyage de code à faire... comment procéder ? Ce sera difficile de : 1) faire le fix, 2) refacto et 3)
            nettoyer... surtout si votre fonctionnalité est plutôt grosse.
          </p>
          <p>
            Mon conseil ici est de tout faire en même temps, puis de découper ça en plusieurs commits. Sans les
            bonnes commandes, ça pourrait être une vraie galère, heureusement git est génial et nous donne ce dont on
            a besoin !
          </p>

          <h3 :class="h4">git add -p (--patch)</h3>
          <p>
            Celle-là, vous devriez déjà la connaître. Sinon, apprendre à l'utiliser va vous changer la vie ! Elle va
            vous demander, morceau par morceau, si vous voulez ajouter un bloc de code à vos fichiers indexés
            (staged). Comme ça, vous pouvez n'ajouter qu'une partie d'un fichier et pas toutes les modifications que
            vous avez faites.
          </p>

          <h3 :class="h4">git reset -p (--patch)</h3>
          <p>
            En gros, l'inverse de <code :class="code">git add -p</code> : imaginez que vous ayez indexé (staged)
            certaines modifications par erreur. Avec cette commande, vous pouvez les parcourir et choisir lesquelles
            garder en staged ou repasser en unstaged.
          </p>

          <h3 :class="h4">git diff --cached</h3>
          <p>
            L'option <code :class="code">--cached</code> affichera les modifications indexées (staged) et non celles
            qui ne le sont pas. Utile pour vérifier l'état actuel de votre index.
          </p>

          <h3 :class="h4">git commit -v (--verbose) -p (--patch)</h3>
          <p>
            L'option <code :class="code">-p</code> vous permettra d'utiliser une interface interactive pour rédiger
            votre message de commit. Comme ça, vous pouvez faire des messages clairs et explicites, formatés en
            Markdown. L'option <code :class="code">-v</code> affichera toutes les modifications que vous êtes sur le
            point de commit en bas de votre message. Elle va en gros afficher à la fois un
            <code :class="code">git status</code> et un <code :class="code">git diff --cached</code> combinés,
            pendant que vous éditez votre message.
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
