<template>
  <div
    class="flex gap-2.5 rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400"
  >
    <svg
      class="mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 11h1v5" />
    </svg>
    <p><slot /></p>
  </div>
</template>
