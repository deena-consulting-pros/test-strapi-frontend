<script setup lang="ts">
import { computed } from 'vue'
import type { ProcessStep } from '../../utils/strapi'

const props = defineProps<{
  steps?: ProcessStep[] | null
}>()

const orderedSteps = computed(() =>
  [...(props.steps || [])].sort((a, b) => (a.step || 0) - (b.step || 0))
)
</script>

<template>
  <section id="process" class="bg-surface-alt py-20 sm:py-24" aria-labelledby="process-heading">
    <div class="mx-auto max-w-7xl px-6">
      <header class="mb-12 max-w-2xl sm:mb-14">
        <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          How We Work
        </p>
        <h2 id="process-heading" class="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
          Process
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-body sm:text-base">
          Clear milestones, weekly momentum, and transparent delivery.
        </p>
      </header>

      <div class="relative">
        <div
          class="absolute left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] top-6 hidden h-px bg-line lg:block"
          aria-hidden="true"
        />

        <ol class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <li
            v-for="step in orderedSteps"
            :key="step.id"
            class="relative rounded-3xl border border-line bg-white p-6 text-center"
          >
            <div
              class="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-base font-extrabold text-white shadow-md shadow-primary/20"
            >
              {{ String(step.step).padStart(2, '0') }}
            </div>
            <h3 class="mb-2 text-lg font-bold text-dark">
              {{ step.title }}
            </h3>
            <p v-if="step.description" class="text-sm leading-relaxed text-body">
              {{ step.description }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
