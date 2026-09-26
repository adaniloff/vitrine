<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { t } from '../i18n'
import { experiences, tr } from '../experiences'

const INTERVAL = 20000

const open = ref(false)
const paused = ref(false)
const current = ref(0)
let timer: number | undefined

function stop() {
  if (timer !== undefined) window.clearInterval(timer)
  timer = undefined
}

function start() {
  stop()
  if (!open.value || paused.value) return
  timer = window.setInterval(() => {
    current.value = (current.value + 1) % experiences.length
  }, INTERVAL)
}

function goTo(i: number) {
  current.value = i
  start()
}

function step(delta: number) {
  const n = experiences.length
  goTo((current.value + delta + n) % n)
}

let touchX = 0
let touchY = 0
function onTouchStart(e: TouchEvent) {
  touchX = e.changedTouches[0].clientX
  touchY = e.changedTouches[0].clientY
  stop()
}
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchX
  const dy = e.changedTouches[0].clientY - touchY
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
  else start()
}

function toggle() {
  open.value = !open.value
  start()
}

function togglePause() {
  paused.value = !paused.value
  start()
}

onUnmounted(stop)
</script>

<template>
  <div class="flex flex-col gap-6">
    <h2>
      <button
        type="button"
        :aria-expanded="open"
        aria-controls="career-panel"
        class="flex w-full cursor-pointer items-center justify-between gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:focus-visible:outline-slate-100"
        @click="toggle"
      >
        {{ t('career.title') }}
        <svg
          class="h-3.5 w-3.5 shrink-0 transition-transform duration-300"
          :class="open && 'rotate-180'"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M5 7.5 10 12.5 15 7.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </h2>

    <div v-show="open" id="career-panel" class="flex flex-col gap-6">
      <div
        class="flex flex-col gap-4"
        @mouseenter="stop"
        @mouseleave="start"
        @focusin="stop"
        @focusout="start"
      >
        <div
          class="grid touch-pan-y"
          :aria-live="paused ? 'polite' : 'off'"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
          <blockquote
            v-for="(item, i) in experiences"
            :key="i"
            class="col-start-1 row-start-1 flex flex-col gap-2 border-l-2 border-slate-300 pl-4 transition-opacity duration-500 dark:border-slate-700"
            :class="current === i ? 'opacity-100' : 'pointer-events-none opacity-0'"
            :aria-hidden="current !== i"
          >
            <p class="text-slate-900 dark:text-slate-100">
              <span class="font-medium">{{ tr(item.role) }}</span>
              <span v-if="item.company" class="text-slate-500 dark:text-slate-400">
                · {{ item.company }}</span
              >
              <span class="ml-2 font-mono text-xs text-slate-400 dark:text-slate-500">
                {{ tr(item.period) }}
              </span>
            </p>
            <p class="text-base leading-relaxed text-slate-500 dark:text-slate-400">
              {{ tr(item.description) }}
            </p>
          </blockquote>
        </div>

        <div class="flex items-center justify-between gap-4 pl-4">
          <div class="-ml-1 flex" role="group" :aria-label="t('career.experiences')">
            <button
              v-for="(item, i) in experiences"
              :key="i"
              type="button"
              :aria-pressed="current === i"
              :aria-label="tr(item.role) + (item.company ? ' · ' + item.company : '')"
              class="group flex cursor-pointer items-center px-1.5 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100"
              @click="goTo(i)"
            >
              <span
                :class="[
                  'block h-1.5 rounded-full transition-all',
                  current === i
                    ? 'w-6 bg-slate-800 dark:bg-slate-200'
                    : 'w-1.5 bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-700 dark:group-hover:bg-slate-600',
                ]"
              />
            </button>
          </div>

          <button
            type="button"
            :aria-pressed="paused"
            :aria-label="paused ? t('career.play') : t('career.pause')"
            class="flex cursor-pointer items-center p-1.5 text-slate-400 transition hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:text-slate-500 dark:hover:text-slate-300 dark:focus-visible:outline-slate-100"
            @click="togglePause"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path v-if="paused" d="M5 3.5v9l7-4.5-7-4.5Z" />
              <path v-else d="M5 3h2v10H5V3Zm4 0h2v10H9V3Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
