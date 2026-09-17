<script setup lang="ts">
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import RelatedProjectCard from '../components/RelatedProjectCard.vue'
import ArticleNote from '../components/ArticleNote.vue'
import Header from '../components/Header.vue'
import { projects } from '../projects'

const code =
  'rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300'
const orderedList =
  'flex list-decimal flex-col gap-2 border-l-2 border-slate-300 py-1 pl-8 marker:text-slate-400 dark:border-slate-700 dark:marker:text-slate-600'
const unorderedList =
  'flex list-disc flex-col gap-2 border-l-2 border-slate-300 py-1 pl-8 marker:text-slate-400 dark:border-slate-700 dark:marker:text-slate-600'
const statusList = 'flex flex-col gap-2 text-justify'
const h3 = 'mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50'
const h4 = 'mt-2 text-lg font-medium text-slate-900 dark:text-slate-50'
</script>

<template>
  <div class="min-h-svh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
    <SiteNav page-locale="fr" sibling-href="/en/articles/webhooks-5xx/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Retour
        </a>

        <Header date="2026-09-10" reading-time="~10 min de lecture"
          title="Pourquoi mes webhooks ne renvoient plus de 5xx" />

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            Mardi, 15h - vous vous apprêtez à effectuer un petit déploiement.
          </p>
          <p>
            Tout a l'air de bien se passer, parfait ; mais 2 heures plus tard, un
            souci apparaît !
          </p>
          <p>
            Votre endpoint
            <code :class="code">/bank/card/webhook</code>
            lève, sous certaines conditions, une exception ! À cause d'une des
            nouvelles règles métier !
          </p>
          <p>
            Non seulement c'est embêtant, mais en plus le snowball effect est
            instantané :
          </p>
          <ul :class="unorderedList">
            <li>
              un empilement d'erreurs (et oui... le client/émetteur - du endpoint/du webhook - retry, avec du
              délai, à chaque 500)
            </li>
            <li>
              un traitement partiellement effectué - des cartes sont générées
              chez le client/émetteur, puis chez vous, mais le traitement n'arrive
              pas au bout de la chaîne et vos utilisateurs finaux ne les reçoivent pas...
              en fin de compte vous allez devoir faire un dev de réparation
              sur mesure JUSTE pour de la donnée... sans compter le support !
            </li>
            <li>des clients/émetteurs qui ne vous contactent plus pendant un temps (circuit-breaker open)</li>
          </ul>
          <p>
            ... Bref, vous allez passer une mauvaise semaine, et vous risquez
            certainement de ne pas être en mesure de fix parfaitement une
            partie des opérations précédemment jouées.
          </p>
          <p>
            Ce cas, vous l'avez probablement déjà rencontré, et quelle que
            soit la cause de votre erreur (typo, timeout sur un tiers,
            problème de cache, dépendance manquante...), la solution à mettre
            en place sera identique.
          </p>
          <p>
            Le problème principal est le suivant: <strong>votre endpoint fait un ack
              métier, il devrait faire un ack technique</strong>.
          </p>
          <p>
            Et pour le résoudre, on va pouvoir se reposer sur plusieurs patterns !
          </p>

          <ArticleNote>
            À noter que pour la suite de cet article, je vais constamment me référer
            à mon projet démo "Webhook Ledger".
            Un repository contenant le code est également disponible, contenant un
            README.md qui revient sur certaines approches et certains choix techniques.
          </ArticleNote>
          <RelatedProjectCard :project="projects[0]" />

          <h3 :class="h3">
            Introduction : mise en place du endpoint de consommation de webhook
          </h3>
          <p>
            Le but de notre ledger est d'automatiser et sécuriser la réception de webhook, et de lister ces derniers.
            Le plan que j'ai mis en place est le suivant (avec entre parenthèse les thèmes techniques abordés dans
            chaque phase):
          </p>
          <ol :class="orderedList">
            <li>
              réception et validation -
              (<strong class="font-medium text-slate-900 dark:text-slate-100">idempotency</strong>)
            </li>
            <li>
              persistance, dispatch & réponse -
              (<strong class="font-medium text-slate-900 dark:text-slate-100">atomicity</strong>,
              <strong class="font-medium text-slate-900 dark:text-slate-100">dual-write</strong>,
              <strong class="font-medium text-slate-900 dark:text-slate-100">transactional outbox</strong>)
            </li>
            <li>
              traitement asynchrone -
              (<strong class="font-medium text-slate-900 dark:text-slate-100">at-least-once</strong>,
              <strong class="font-medium text-slate-900 dark:text-slate-100">pessimistic locking</strong>)
            </li>
          </ol>

          <h4 :class="h4">
            Réception & validation
          </h4>
          <p>
            La réception du message se fait via une route de controller (Symfony).
            Toute la question va être de déterminer ce dont ce dernier est en charge, et ce qu'il ne doit surtout pas
            faire.
          </p>
          <ArticleNote>
            J'en profite pour insister sur le fait que notre webhook est mis à disposition de <u>clients</u>.
            Il s'agit de Stripe et Github dans ce projet, mais ça pourrait également être des services internes
            dans une architecture distribuée. Notre stack / infra peut être faillible à un instant T,
            tout comme celle de nos clients. Ainsi, il est important de <u>se prémunir</u> contre des appels
            identiques répétés, que ce soit à cause d'un retry (suite à une 5xx de notre part) ou une défaillance
            du client (sait-on jamais).
          </ArticleNote>
          <p>
            La note ci-dessus établit que nous avons besoin d'un comportement
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotent</u></strong>:
            avoir un acteur tiers effectuant des modifications dans notre système peut toujours mal tourner.

            Aussi, l'<strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotence</u></strong>
            permet de se prémunir d'effets doublons. Sur notre projet
            démo, cela n'a pas trop d'incidence, mais sur une prod, <u>cela signifierait démultiplier les
              exécutions métier</u> <i>(ex: plusieurs envois du même e-mail pour le même utilisateur)</i>. Bref, on
            préfère éviter.
          </p>
          <p>
            Pour ce faire, nous devons déterminer ce qui définit l'unicité d'un webhook. Les Stripe, Github
            et autres consorts fournissent toujours un id d'évènement, sur lequel nous allons nous baser (ainsi qu'un
            autre attribut ... mais ne précipitons pas les choses !).
          </p>
          <ArticleNote>
            Dorénavant, lorsque je parlerai d'évènement de webhook, j'utiliserai le terme
            <code :class="code">"webhook_entry"</code> qui est le nom de table que j'ai choisi.
          </ArticleNote>
          <p>
            Ensuite, l'appel étant fait par un tiers, il faut s'assurer de deux points: que l'émetteur soit bien
            le bon, et que le payload soit interprétable de notre côté (le fameux id d'évènement dont je viens de
            faire mention).
          </p>
          <p>
            Voici une petite représentation de ce que devrait faire notre controller:
          </p>
          <ol :class="orderedList">
            <li>vérifier la validité de la signature (via <code :class="code">hash_equals</code>)</li>
            <li>
              (SI -> signature non valide) on enregistre (via une classe de service dédiée) mais on ne publie pas, on
              répond par une 401
            </li>
            <li>(SINON) validation du format</li>
            <li>(SI -> format non valide) on répond par une 422</li>
            <li>on enregistre & on dispatch (via classe dédiée)</li>
            <li>on répond par une 202</li>
          </ol>
          <ArticleNote>
            J'ai décidé d'enregistrer un <code :class="code">webhook_entry</code> malgré une signature invalide en
            pensant que ça pourrait être une donnée intéressante. Ce n'est pas une obligation, il s'agit encore une
            fois d'un projet de démo et ce type de décision doit être prise en fonction de votre business.
          </ArticleNote>

          <h4 :class="h4">
            Persistance, dispatch & response
          </h4>
          <p>
            Cette section risque d'être assez longue, alors attachez vos ceintures. Maintenant que notre controller
            existe, et que nous avons décidé de partir sur de
            l'<strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotence</u></strong>, il faut
            construire un système qui
            permette de garantir cette dernière.
          </p>
          <p>
            Plus tôt, j'ai abordé le fait de définir ce qui rendait notre <code :class="code">webhook_entry</code>
            unique. Afin de matérialiser cette unicité, j'ai décidé de mettre en place une contrainte SQL via
            l'attribut Doctrine <code :class="code">#[ORM\UniqueConstraint]</code>.
          </p>
          <p>
            Cette dernière est assurée par la combinaison <code :class="code">external_event_id</code> +
            <code :class="code">source</code>. Dans mon repository, lors de la création de mes
            <code :class="code">webhook_entry</code>, je catch les éventuelles
            <code :class="code">UniqueConstraintViolationException</code> afin de les encapsuler dans une exception
            maison, que je re-throw. Je peux ainsi garantir mon
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotence</u></strong> via un ultime
            catch du controller, tout
            en <u>évitant un couplage direct à Doctrine</u>.
          </p>
          <p>
            J'ai mon unicité, ma persistance, mon
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotence</u></strong> ... je peux
            maintenant passer au comportement
            asynchrone de mon app, à savoir: traiter le métier relatif au webhook - enfin !
          </p>
          <p>
            Malheureusement, ce n'est pas aussi simple... nous allons nous attaquer à un nouveau problème: le
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Dual-Write</u></strong> !
          </p>
          <ArticleNote>
            Le <strong class="font-medium text-slate-900 dark:text-slate-100"><u>dual-write</u></strong>, pour faire
            simple, est un cas qui se pose lorsque vous avez besoin de cohérence
            entre deux systèmes de gestion de la donnée. Ici, d'un côté il y a la base de données, et de l'autre
            votre transport AMQP... et rien ne garantit, si votre donnée est bien sauvegardée, que votre
            message ne soit pas perdu ! <br /><br />
            Si cela arrivait, vous perdriez le traitement métier lié à cette donnée. <u>Un cas concret</u>:
            vous avez une carte bancaire émise et enregistrée en base, mais le mail n'a pas été envoyé au client !
          </ArticleNote>
          <p>
            <u>Ce que ça implique dans notre cas:</u>
            Même si notre <code :class="code">webhook_entry</code> est dorénavant enregistré en base de données, il
            existe un risque que le traitement métier post-enregistrement ne soit pas exécuté.
          </p>
          <p>
            Et pour résoudre ce problème, on va passer par le
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Transactional Outbox</u></strong>
            - un pattern adapté à notre situation.
          </p>
          <ArticleNote>
            L'idée de base du pattern
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Transactional Outbox</u></strong> est
            d'écrire en base à la fois notre donnée, mais aussi l'intention de la publier, et ce de manière
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>atomique</u></strong> (même
            transaction).
            Ensuite, un relais s'occupe de publier le message. On ne peut alors plus se retrouver
            avec une donnée enregistrée dont le traitement ne partira jamais, ni l'inverse.
          </ArticleNote>
          <p>
            Afin de rendre ce pattern opérationnel, il faut donc s'assurer de
            l'<strong class="font-medium text-slate-900 dark:text-slate-100"><u>atomicité</u></strong> des insertions
            en base de
            données.
          </p>
          <p>
            Le composant messenger de Symfony permet, lorsque l'on utilise Doctrine, de stocker les messages en attente
            de traitement dans une table <code :class="code">messenger_messages</code>. Et on peut utiliser
            Doctrine en tant que <code :class="code">dsn</code> ! Ainsi, plutôt que de refaire une table outbox
            complète avec son propre relais, j'utilise directement le mécanisme de messenger :).
          </p>
          <figure class="flex flex-col items-center gap-2">
            <img src="./../assets/articles_images/webhooks-5xx/messenger_config.png"
              alt="Extrait de configuration Symfony Messenger" width="967" height="441" loading="lazy"
              class="max-w-full rounded border border-slate-200 dark:border-slate-800" />
            <figcaption class="text-center text-sm text-slate-400 dark:text-slate-500">
              Configuration du package messenger de Symfony
            </figcaption>
          </figure>
          <ArticleNote>
            Plusieurs choses à noter ici: la valeur du dsn async, l'auto_setup, la retry_strategy ... on vient
            d'aborder le dsn.
            <br />
            L'auto_setup=0 permet d'éviter la création de la table lors du premier dispatch (comportement par défaut
            du package). Or, en MySQL, <strong>toute instruction DDL provoque un commit implicite</strong> ! On se
            retrouverait - lors du premier dispatch - avec deux transactions, et une perte de
            l'<strong class="font-medium text-slate-900 dark:text-slate-100"><u>atomicité</u></strong>. Le risque
            n'est pas énorme, mais autant l'éviter: il faudra donc s'assurer qu'une migration créant la table soit
            générée.
            <br />
            Enfin, la stratégie de retry permet d'avoir un rejeu en cas d'échec, toujours utile, surtout sur
            des systèmes distribués. J'en parle plus en détail un peu plus loin dans cet article.
          </ArticleNote>
          <p>
            On branche ensuite un listener sur les events de sorte à changer le statut de notre
            <code :class="code">webhook_entry</code> afin de signifier qu'il a bien été dispatch.
          </p>
          <ul :class="statusList">
            <li><code :class="code">WorkerMessageReceivedEvent</code> → "dispatched"</li>
          </ul>
          <p>
            La dernière étape est de s'assurer que les enregistrements soient bien effectués au sein d'une transaction
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>atomique</u></strong>.
          </p>
          <figure class="flex flex-col items-center gap-2">
            <img src="./../assets/articles_images/webhooks-5xx/transaction_wrap.png"
              alt="Pseudo-code d'un wrap transactionnel avec Doctrine" width="967" height="441" loading="lazy"
              class="max-w-full rounded border border-slate-200 dark:border-slate-800" />
            <figcaption class="text-center text-sm text-slate-400 dark:text-slate-500">
              Pseudo-code d'un wrap transactionnel avec Doctrine (version simplifiée)
            </figcaption>
          </figure>
          <ArticleNote>
            Attention, cela fonctionne parce qu'ici nous passons par la <strong>même connexion DBAL</strong> que pour
            notre insertion. Si vous utilisez deux connexions différentes, vous vous retrouverez avec deux transactions
            et ça ne fonctionnera plus ; et là, le
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>dual-write</u></strong> réapparaîtra.
          </ArticleNote>
          <p>
            Et voilà ! Grâce à l'utilisation de Doctrine en tant que dsn, et à notre listener qui écoute ces
            3 évènements Symfony, on obtient un début de
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Transactional Outbox</u></strong> très
            simple
            à mettre en place ! Plus que quelques branchements et elle sera complètement fonctionnelle !
          </p>
          <p>
            À partir de là, tout le reste est traité en différé (asynchrone) car pris en charge par les workers de
            Symfony. Une fois le wrap terminé, la transaction est COMMIT (ou ROLLBACK en cas d'erreur) et notre
            controller reprend la main afin de choisir le type de réponse à retourner: 202, 401 ou 422.
          </p>

          <h4 :class="h4">
            Traitement asynchrone
          </h4>
          <p>
            La partie synchrone étant terminée, on va se pencher sur le reste. Ce qu'il nous manque, à cette étape,
            ce sont principalement deux tâches:
          </p>
          <ul :class="unorderedList">
            <li>la mise à jour du statut de notre <code :class="code">webhook_entry</code></li>
            <li>
              le branchement de notre métier (qui n'est pas sans importance puisque sans lui notre réception de webhook
              ne sert pas à grand chose finalement)
            </li>
          </ul>
          <p>
            Heureusement, on va très rapidement et simplement parvenir à nos fins. En effet, il n'y a quasiment qu'à
            enrichir notre listener afin qu'il écoute deux évènements Symfony supplémentaires. Au final, nous nous
            retrouvons avec ce mapping:
          </p>
          <ul :class="statusList">
            <li><code :class="code">WorkerMessageReceivedEvent</code> → "dispatched"</li>
            <li><code :class="code">WorkerMessageHandledEvent</code> → "succeeded"</li>
            <li>
              <code :class="code">WorkerMessageFailedEvent</code> → "failed" (ou "dead" après épuisement des retries)
            </li>
          </ul>
          <ArticleNote>
            C'est très bien tout ça, mais il nous manque le branchement au métier !
          </ArticleNote>
          <p>
            Facile: on met en place un handler qui sera en charge de faire la transition worker / métier.
            Le <code :class="code">WorkerMessageHandledEvent</code> sera ensuite dispatché automatiquement
            une fois que votre code aura été exécuté avec succès. En cas d'échec, ça part dans le retry.
          </p>
          <ArticleNote>
            Et la stratégie de retry justement, on devait en reparler ?
          </ArticleNote>
          <p>
            Simple et efficace: 5 essais, un délai de 1000ms qui double entre chaque tentative, et du jitter pour
            éviter une potentielle saturation des workers.
          </p>
          <p>
            Ah oui, j'oubliais presque: le worker Symfony utilise nativement du
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>pessimistic locking</u></strong>
            (un <code :class="code">SELECT ... FOR UPDATE</code>), aucun risque donc, qu'un même message soit pris en
            charge par plusieurs workers en simultané.
          </p>
          <p>
            Par contre, il reste un risque: si un worker meurt entre
            l'exécution de votre handler et la suppression de la ligne, le message repartira. C'est le fonctionnement
            de l'<strong class="font-medium text-slate-900 dark:text-slate-100"><u>at-least-once</u></strong>: la
            livraison est garantie <u>au moins</u> une fois.
          </p>
          <p>
            En conséquence, et <strong>pour garantir une fiabilité totale, votre handler devra lui aussi
              adopter un comportement <u>idempotent</u>.</strong>
          </p>

          <h3 :class="h3">
            Conclusion
          </h3>
          <p>
            Notre endpoint n'a maintenant plus de raison de renvoyer une 5xx à cause de notre métier ! Seuls des
            problèmes techniques (par exemple, une DB injoignable) en occasionneront, et c'est exactement ce que
            l'on cherchait à faire.
          </p>
          <p>
            Comme dit précédemment, le code est sur le dépôt, et l'instance est en ligne.
            Amusez-vous à POST deux fois le même <code :class="code">external_event_id</code>, vous verrez bien ce
            qui se passe ;)
          </p>
        </div>

        <RelatedProjectCard :project="projects[0]" />

        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Retour
        </a>
      </article>
    </main>

    <SiteFooter />
  </div>
</template>
