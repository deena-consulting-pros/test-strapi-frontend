<script setup lang="ts">
type StatItem = { value: string; label: string }

defineProps<{
  stats: StatItem[]
}>()
</script>

<template>
  <section class="bg-surface-alt py-16 sm:py-20" aria-label="Company statistics">
    <div class="mx-auto max-w-7xl px-6">
      <div class="rounded-3xl border border-line bg-white px-8 py-12 shadow-sm sm:px-12">
        <ul
          class="grid grid-cols-2 divide-x divide-y divide-line lg:grid-cols-4 lg:divide-y-0"
          role="list"
        >
          <li
            v-for="stat in stats"
            :key="stat.value"
            class="px-6 py-8 text-center first:pl-0 last:pr-0 lg:px-10"
          >
            <p class="font-display text-4xl font-extrabold text-dark sm:text-5xl">
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {{ stat.value }}
              </span>
            </p>
            <p class="mt-2 text-sm font-medium text-muted">{{ stat.label }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
