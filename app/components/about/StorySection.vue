<script setup lang="ts">
type HighlightItem = {
  icon: string
  accentClass: string
  title: string
  description: string
}

defineProps<{
  title: string
  paragraphs: string[]
  highlights: HighlightItem[]
}>()
</script>

<template>
  <section class="bg-surface-alt py-20 sm:py-24" aria-labelledby="story-heading">
    <div class="mx-auto max-w-7xl px-6">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

        <!-- Text -->
        <div>
          <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Company Story
          </p>
          <h2
            id="story-heading"
            class="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl"
          >
            {{ title }}
          </h2>
          <div class="mt-6 space-y-4">
            <p
              v-for="(paragraph, i) in paragraphs"
              :key="i"
              class="text-sm leading-relaxed text-body sm:text-base"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Stacked highlight cards -->
        <div class="relative">
          <div
            class="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-primary/5 to-secondary/5"
            aria-hidden="true"
          />
          <ul class="relative space-y-4" role="list">
            <li
              v-for="h in highlights"
              :key="h.title"
              class="rounded-3xl border border-line bg-white p-6 shadow-sm"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xl"
                  :class="h.accentClass"
                  aria-hidden="true"
                >
                  {{ h.icon }}
                </div>
                <div>
                  <h3 class="font-bold text-dark">{{ h.title }}</h3>
                  <p class="mt-1 text-sm leading-relaxed text-body">{{ h.description }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>
