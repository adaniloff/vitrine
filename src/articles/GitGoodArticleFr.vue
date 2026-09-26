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
    <SiteNav page-locale="fr" sibling-href="/en/articles/fastest-way-to-git-good-for-beginners/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Retour
        </a>

        <Header date="2018-04-06" reading-time="~3 min de lecture"
          title="La façon la plus rapide de devenir bon en git (pour débutants)" />

        <ArticleNote>
          Ce contenu a été traduit de l'anglais vers le français à l'aide de Claude.
        </ArticleNote>

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            (Désolé mais non, pas besoin d'être un
            <a href="http://knowyourmeme.com/memes/git-gud" class="underline underline-offset-4">hardcore gamer</a>
            pour être bon avec git !)
          </p>
          <p>
            En quelques mots : vérifiez <strong>toujours</strong> ce que vous faites et ce à quoi vous avez affaire.
          </p>

          <h2 :class="h3">Connaissez votre environnement</h2>
          <p>
            D'après ma - courte - expérience, la plupart des gens ont tendance à lancer des commandes comme
            <code :class="code">commit</code>, <code :class="code">pull</code>, <code :class="code">push</code> sans
            être sûrs de l'endroit où ils travaillent (cette fichue branche sur laquelle ils sont), sans rafraîchir
            leur index, et parfois sans même jeter un œil à leur historique/arbre git actuel !
            Ça m'agace toujours quand quelqu'un fait un <code :class="code">commit de merge</code> pour des
            fonctionnalités qui auraient pu être fast-forward autrement.
          </p>
          <p>
            J'aime comparer votre façon de faire du git à la manière de jouer à un RTS (comme SC2) :
            <strong>vous devez toujours être conscient de ce qui se passe</strong>, sinon vous vous exposez - vous et
            votre équipe - à des problèmes.
          </p>

          <h2 :class="h3">Les habitudes à prendre pour progresser</h2>
          <p>Suivre quelques règles que je vais lister ci-dessous va vous permettre :</p>
          <ul :class="unorderedList">
            <li>📉 moins d'erreurs dans l'ensemble</li>
            <li>📈 une meilleure compréhension de git à très court terme</li>
          </ul>
          <p>
            Ces 2 changements vont mener à plus d'expérimentation grâce à votre confiance, donc plus de connaissances
            et de productivité.
          </p>
          <p>Voici mes recommandations de base :</p>

          <h3 :class="h4">Soyez conscient de la branche sur laquelle vous travaillez, tout comme du dossier dans
            lequel vous êtes !</h3>
          <ul :class="unorderedList">
            <li>La première chose à éviter est de ne pas travailler là où vous étiez censé le faire.</li>
            <li>
              Dans votre terminal, vous pouvez afficher (avec des plugins ou des configurations) la branche sur
              laquelle vous êtes sans exécuter la moindre commande : personnellement, j'utilise
              <a href="http://ohmyz.sh" class="underline underline-offset-4">oh-my-zsh</a> qui affiche directement
              cette information.
              <ArticleNote>
                ⚠️ Vous pouvez abuser de <code :class="code">git branch</code> si vous n'avez aucun moyen de
                configurer le shell que vous utilisez.
              </ArticleNote>
            </li>
          </ul>

          <h3 :class="h4">Faites <code :class="code">git fetch</code> régulièrement et fréquemment.</h3>
          <ul :class="unorderedList">
            <li>
              Il n'y a <em>absolument aucun</em> problème à le faire souvent !
              <ArticleNote>
                En réalité, il y a un cas où ce conseil ne s'applique pas : si vous avez une très mauvaise connexion
                ou si le service (bitbucket, github) est très lent ou down.
              </ArticleNote>
            </li>
            <li>
              En faisant ça, vous êtes sûr de voir si un changement a été fait et vous n'aurez pas à faire d'astuces
              que vous ne connaissez peut-être pas encore.
            </li>
            <li>
              ⚠️ Le minimum est de le faire avant chaque commit, checkout, pull, push etc...
              <ArticleNote>
                Bien sûr, ça dépend aussi de la taille de votre équipe, donc ne le prenez pas au pied de la lettre !
                Essayez déjà de vous forcer à en prendre l'habitude, puis adaptez la fréquence à vos besoins.
              </ArticleNote>
            </li>
          </ul>

          <h3 :class="h4">
            <code :class="code">fetch</code>-ez toujours avec l'option prune
            (<code :class="code">git fetch -p</code> ou <code :class="code">git fetch --prune</code>).
          </h3>
          <ul :class="unorderedList">
            <li>Parce que ça vous montre si une ou plusieurs branches ont été supprimées.</li>
            <li>De l'information gratuite, autant en profiter !</li>
          </ul>

          <h3 :class="h4">Utilisez <code :class="code">git status</code> tout le temps.</h3>
          <ul :class="unorderedList">
            <li>
              Ça ne prend pas de temps et ça vous donne des infos sur votre travail.
              <ArticleNote>
                Perso, je m'en sers même pour me rappeler ce que je suis en train de faire quand je dois faire du
                « multitâche » !
              </ArticleNote>
            </li>
          </ul>

          <h3 :class="h4">
            En essayant de nouvelles choses, servez-vous toujours de <code :class="code">git status</code>,
            <code :class="code">git diff</code> et <code :class="code">git log</code>
          </h3>
          <ul :class="unorderedList">
            <li>
              Je viens de dire « en essayant de nouvelles choses » ? J'aurais dû dire « en faisant quoi que ce soit »,
              parce que c'est un indispensable !
              <ArticleNote>
                ⚠️ Encore une fois, ne le prenez pas au pied de la lettre à moins d'être débutant
              </ArticleNote>
            </li>
            <li>
              Comme ça, vous comprendrez quelles pratiques sont bonnes ou mauvaises, etc.
              <ArticleNote>
                Par exemple, vous comprendrez <strong>pourquoi</strong> <code :class="code">rebase</code> peut être
                aussi bien génial qu'horrible, selon la façon dont vous l'utilisez.
              </ArticleNote>
            </li>
          </ul>

          <h3 :class="h4">Enfin, dernier point mais pas des moindres, utilisez le terminal et lisez la doc !</h3>
          <ul :class="unorderedList">
            <li>
              Gardez le contrôle sur tout en travaillant avec le terminal.
              <ArticleNote>
                Il vous faudra
                <a href="/fr/articles/a-beautiful-way-to-display-your-git-history/"
                  class="underline underline-offset-4">un kit de démarrage git log</a> ;)
              </ArticleNote>
            </li>
            <li>Savoir demander de l'aide est une chose, apprendre à lire la documentation et les manuels en est une
              autre !</li>
          </ul>

          <h2 :class="h3">La suite au prochain épisode...</h2>
          <p>
            Voilà les bases - les miennes en tout cas.
            Il existe encore plein de bonnes commandes/options qui vous aideront à devenir encore meilleur en git ;
            mais après avoir lu ça, et avec un peu de pratique, vous devriez être capable de trouver par vous-même
            tout ce dont vous aurez besoin par la suite.
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
