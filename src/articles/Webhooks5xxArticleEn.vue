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
    <SiteNav page-locale="en" sibling-href="/fr/articles/webhooks-5xx/" />

    <main>
      <article class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-24">
        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Back
        </a>

        <Header date="2026-09-10" reading-time="~10 min read" locale="en"
          title="Why my webhooks no longer return 5xx" />

        <ArticleNote>
          This content has been translated from French to English with the help of Claude.
        </ArticleNote>

        <div class="flex flex-col gap-5 text-base leading-relaxed text-slate-600 text-justify dark:text-slate-300">
          <p>
            Tuesday, 3pm - you're about to ship a small deployment.
          </p>
          <p>
            Everything looks fine, great; but two hours later, an issue shows up!
          </p>
          <p>
            Your endpoint
            <code :class="code">/bank/card/webhook</code>
            throws, under certain conditions, an exception! Because of one of the
            new business rules!
          </p>
          <p>
            Not only is that annoying, but the snowball effect is instant:
          </p>
          <ul :class="unorderedList">
            <li>
              a pile-up of errors (and yes... the client/sender - of the endpoint/of the webhook - retries, with
              delay, on every 500)
            </li>
            <li>
              a partially completed process - cards get generated
              on the client/sender side, then on yours, but the processing doesn't
              make it to the end of the chain and your end users never receive them...
              in the end you'll have to write a custom repair dev
              JUST for the data... not to mention support!
            </li>
            <li>clients/senders who stop contacting you for a while (circuit-breaker open)</li>
          </ul>
          <p>
            ... In short, you're in for a bad week, and you'll almost certainly
            be unable to perfectly fix some of the operations that already ran.
          </p>
          <p>
            You've probably already run into this case, and whatever the
            cause of your error (typo, timeout on a third party,
            cache issue, missing dependency...), the fix to put in place
            will be the same.
          </p>
          <p>
            The core problem is this: <strong>your endpoint does a business ack,
              it should do a technical ack</strong>.
          </p>
          <p>
            And to fix it, we can lean on several patterns!
          </p>

          <ArticleNote>
            Note that for the rest of this article, I'll keep referring
            to my demo project "Webhook Ledger".
            A repository with the code is also available, including a
            README.md that walks through some of the approaches and technical choices.
          </ArticleNote>
          <RelatedProjectCard :project="projects[0]" />

          <h3 :class="h3">
            Introduction: setting up the webhook consumption endpoint
          </h3>
          <p>
            The goal of our ledger is to automate and secure the reception of webhooks, and to list them.
            The plan I put in place is the following (with the technical topics covered in each phase in
            parentheses):
          </p>
          <ol :class="orderedList">
            <li>
              reception and validation -
              (<strong class="font-medium text-slate-900 dark:text-slate-100">idempotency</strong>)
            </li>
            <li>
              persistence, dispatch & response -
              (<strong class="font-medium text-slate-900 dark:text-slate-100">atomicity</strong>,
              <strong class="font-medium text-slate-900 dark:text-slate-100">dual-write</strong>,
              <strong class="font-medium text-slate-900 dark:text-slate-100">transactional outbox</strong>)
            </li>
            <li>
              asynchronous processing -
              (<strong class="font-medium text-slate-900 dark:text-slate-100">at-least-once</strong>,
              <strong class="font-medium text-slate-900 dark:text-slate-100">pessimistic locking</strong>)
            </li>
          </ol>

          <h4 :class="h4">
            Reception & validation
          </h4>
          <p>
            The message is received via a controller route (Symfony).
            The whole question is figuring out what it's responsible for, and what it absolutely
            must not do.
          </p>
          <ArticleNote>
            I'll take the chance to stress that our webhook is exposed to <u>clients</u>.
            In this project it's Stripe and Github, but it could just as well be internal services
            in a distributed architecture. Our stack / infra can be unreliable at any given moment,
            just like theirs. So it's important to <u>guard</u> against
            repeated identical calls, whether caused by a retry (following a 5xx on our end) or a failure
            on the client side (you never know).
          </ArticleNote>
          <p>
            The note above establishes that we need
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotent</u></strong> behavior:
            having a third party make changes to our system can always go wrong.

            Also, <strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotency</u></strong>
            protects against duplicate side effects. On our
            demo project this doesn't matter much, but in prod, <u>it would mean multiplying
              business executions</u> <i>(e.g. several emails sent for the same event to the same user)</i>. In
            short, better to avoid it.
          </p>
          <p>
            To do that, we need to determine what defines the uniqueness of a webhook. Stripe, Github
            and the likes always provide an event id, which we're going to rely on (plus one
            other attribute ... but let's not get ahead of ourselves!).
          </p>
          <ArticleNote>
            From now on, whenever I talk about a webhook event, I'll use the term
            <code :class="code">"webhook_entry"</code>, which is the table name I chose.
          </ArticleNote>
          <p>
            Then, since the call is made by a third party, we need to make sure of two things: that the
            sender is indeed the right one, and that the payload is interpretable on our side (the
            event id I just mentioned).
          </p>
          <p>
            Here's a quick outline of what our controller should do:
          </p>
          <ol :class="orderedList">
            <li>check the signature's validity (via <code :class="code">hash_equals</code>)</li>
            <li>
              (IF -> invalid signature) we record it (via a dedicated service class) but don't publish it, and
              respond with a 401
            </li>
            <li>(ELSE) validate the format</li>
            <li>(IF -> invalid format) we respond with a 422</li>
            <li>we record & dispatch it (via a dedicated class)</li>
            <li>we respond with a 202</li>
          </ol>
          <ArticleNote>
            I decided to record a <code :class="code">webhook_entry</code> even with an invalid signature,
            thinking it could be useful data. It's not mandatory, this is still a demo project and this kind
            of decision should be made based on your business needs.
          </ArticleNote>

          <h4 :class="h4">
            Persistence, dispatch & response
          </h4>
          <p>
            This section might run a bit long, so buckle up. Now that our controller
            exists, and that we've decided to go with
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotency</u></strong>, we need to
            build a system that
            guarantees it.
          </p>
          <p>
            Earlier, I mentioned defining what makes our <code :class="code">webhook_entry</code>
            unique. To materialize that uniqueness, I decided to set up a SQL constraint via
            the Doctrine attribute <code :class="code">#[ORM\UniqueConstraint]</code>.
          </p>
          <p>
            That constraint is enforced by the combination of <code :class="code">external_event_id</code> +
            <code :class="code">source</code>. In my repository, when creating a
            <code :class="code">webhook_entry</code>, I catch any
            <code :class="code">UniqueConstraintViolationException</code> to wrap it in a custom
            exception, which I re-throw. That way I can guarantee
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotency</u></strong> via a final
            catch in the controller, while
            <u>avoiding a direct coupling to Doctrine</u>.
          </p>
          <p>
            I have my uniqueness, my persistence, my
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>idempotency</u></strong> ... I can
            now move on to the asynchronous
            behavior of my app, namely: processing the business logic tied to the webhook - finally!
          </p>
          <p>
            Unfortunately, it's not that simple... we're about to tackle a new problem: the
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Dual-Write</u></strong> problem!
          </p>
          <ArticleNote>
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Dual-write</u></strong>, put simply,
            is a case that arises when you need consistency
            between two data-management systems. Here, on one side there's the database, and on the other
            your AMQP transport... and nothing guarantees that, if your data is properly saved, your
            message won't be lost! <br /><br />
            If that happened, you'd lose the business processing tied to that data. <u>A concrete example</u>:
            a bank card gets issued and saved to the database, but the email is never sent to the customer!
          </ArticleNote>
          <p>
            <u>What this means in our case:</u>
            Even though our <code :class="code">webhook_entry</code> is now saved to the database, there's
            still a risk that the business processing after the save never runs.
          </p>
          <p>
            And to solve that problem, we're going to use the
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Transactional Outbox</u></strong>
            - a pattern well suited to our situation.
          </p>
          <ArticleNote>
            The basic idea of the
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Transactional Outbox</u></strong>
            pattern is to write both our data and the intent to publish it to the database,
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>atomically</u></strong> (same
            transaction).
            Then, a relay is responsible for publishing the message. This way you can never end up
            with saved data whose processing never fires, nor the reverse.
          </ArticleNote>
          <p>
            To make this pattern operational, we need to make sure our database
            inserts are <strong class="font-medium text-slate-900 dark:text-slate-100"><u>atomic</u></strong>.
          </p>
          <p>
            Symfony's messenger component lets you, when using Doctrine, store pending
            messages in a <code :class="code">messenger_messages</code> table. And you can use
            Doctrine itself as the <code :class="code">dsn</code>! So rather than building a full
            outbox table with its own relay, I use the messenger mechanism directly :).
          </p>
          <figure class="flex flex-col items-center gap-2">
            <img src="./../assets/articles_images/webhooks-5xx/messenger_config.png"
              alt="Excerpt of Symfony Messenger configuration" width="967" height="441" loading="lazy"
              class="max-w-full rounded border border-slate-200 dark:border-slate-800" />
            <figcaption class="text-center text-sm text-slate-400 dark:text-slate-500">
              Symfony Messenger package configuration
            </figcaption>
          </figure>
          <ArticleNote>
            A few things worth noting here: the async dsn value, auto_setup, the retry_strategy ... we just
            covered the dsn.
            <br />
            <code :class="code">auto_setup=0</code> avoids creating the table on the first dispatch (the
            package's default behavior). Now, in MySQL, <strong>any DDL statement triggers an implicit
              commit</strong>! On that first dispatch we'd end up with two transactions, and lose
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>atomicity</u></strong>. The risk
            isn't huge, but might as well avoid it: so we need to make sure a migration creating the table gets
            generated.
            <br />
            Finally, the retry strategy lets us replay on failure, always useful, especially on
            distributed systems. More on that a bit further in this article.
          </ArticleNote>
          <p>
            We then hook a listener onto those events so it updates the status of our
            <code :class="code">webhook_entry</code> to reflect that it was properly dispatched.
          </p>
          <ul :class="statusList">
            <li><code :class="code">WorkerMessageReceivedEvent</code> → "dispatched"</li>
          </ul>
          <p>
            The last step is to make sure the records are saved within an
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>atomic</u></strong> transaction.
          </p>
          <figure class="flex flex-col items-center gap-2">
            <img src="./../assets/articles_images/webhooks-5xx/transaction_wrap.png"
              alt="Pseudo-code of a transactional wrap with Doctrine" width="967" height="441" loading="lazy"
              class="max-w-full rounded border border-slate-200 dark:border-slate-800" />
            <figcaption class="text-center text-sm text-slate-400 dark:text-slate-500">
              Pseudo-code of a transactional wrap with Doctrine (simplified version)
            </figcaption>
          </figure>
          <ArticleNote>
            Careful, this works because here we're going through the <strong>same DBAL connection</strong> as
            for our insert. If you use two different connections, you'll end up with two transactions
            and it won't work anymore; and the
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>dual-write</u></strong> problem will
            resurface.
          </ArticleNote>
          <p>
            And there we go! By using Doctrine as the dsn, and our listener that hooks into these
            3 Symfony events, we get the start of a very simple
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>Transactional Outbox</u></strong>
            to set up! Just a few more wires and it'll be fully functional!
          </p>
          <p>
            From there, everything else is handled asynchronously (deferred) since it's taken care of by
            Symfony's workers. Once the wrap is done, the transaction is COMMIT (or ROLLBACK on error) and our
            controller regains control to pick the response to return: 202, 401 or 422.
          </p>

          <h4 :class="h4">
            Asynchronous processing
          </h4>
          <p>
            The synchronous part is done, so let's look at the rest. What's missing at this stage
            is mainly two tasks:
          </p>
          <ul :class="unorderedList">
            <li>updating the status of our <code :class="code">webhook_entry</code></li>
            <li>
              wiring in our business logic (which matters quite a bit, since without it our webhook
              reception isn't really useful in the end)
            </li>
          </ul>
          <p>
            Luckily, we'll get there quickly and easily. In fact, we basically just need to
            enrich our listener so it listens for two additional Symfony events. In the end, we end up
            with this mapping:
          </p>
          <ul :class="statusList">
            <li><code :class="code">WorkerMessageReceivedEvent</code> → "dispatched"</li>
            <li><code :class="code">WorkerMessageHandledEvent</code> → "succeeded"</li>
            <li>
              <code :class="code">WorkerMessageFailedEvent</code> → "failed" (or "dead" once retries are exhausted)
            </li>
          </ul>
          <ArticleNote>
            Great, but we're still missing the wiring to the business logic!
          </ArticleNote>
          <p>
            Easy: we set up a handler in charge of the worker / business logic handoff.
            The <code :class="code">WorkerMessageHandledEvent</code> will then be dispatched automatically
            once your code has run successfully. On failure, it goes into retry.
          </p>
          <ArticleNote>
            And speaking of the retry strategy, weren't we going to come back to it?
          </ArticleNote>
          <p>
            Simple and effective: 5 attempts, a 1000ms delay that doubles between each try, and jitter to
            avoid potentially saturating the workers.
          </p>
          <p>
            Oh, and almost forgot: the Symfony worker natively uses
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>pessimistic locking</u></strong>
            (a <code :class="code">SELECT ... FOR UPDATE</code>), so there's no risk of the same message being
            picked up by several workers at once.
          </p>
          <p>
            There is, however, one remaining risk: if a worker dies between
            running your handler and deleting the row, the message will go out again. That's how
            <strong class="font-medium text-slate-900 dark:text-slate-100"><u>at-least-once</u></strong> works:
            delivery is guaranteed <u>at least</u> once.
          </p>
          <p>
            As a result, and <strong>to guarantee full reliability, your handler will also need to
              be <u>idempotent</u>.</strong>
          </p>

          <h3 :class="h3">
            Conclusion
          </h3>
          <p>
            Our endpoint now has no reason left to return a 5xx because of our business logic! Only
            technical issues (an unreachable DB, for instance) will trigger one, and that's exactly what
            we were aiming for.
          </p>
          <p>
            As mentioned earlier, the code is on the repository, and the instance is live.
            Have fun POSTing the same <code :class="code">external_event_id</code> twice, and see what
            happens ;)
          </p>
        </div>

        <RelatedProjectCard :project="projects[0]" />

        <a href="/"
          class="text-sm text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100">
          ← Back
        </a>
      </article>
    </main>

    <SiteFooter />
  </div>
</template>
