<script setup lang="ts">
type CardItem = { icon: string; title: string; description: string }
type ValueItem = { icon: string; title: string; description: string }

defineProps<{
  mission: CardItem
  vision: CardItem
  values: ValueItem[]
}>()
</script>

<template>
  <section class="bg-surface py-20 sm:py-24" aria-labelledby="mvv-heading">
    <div class="mx-auto max-w-7xl px-6">

      <header class="mb-12 max-w-2xl sm:mb-14">
        <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          What Drives Us
        </p>
        <h2 id="mvv-heading" class="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
          Mission, Vision & Values
        </h2>
      </header>

      <!-- Mission + Vision — large cards -->
      <div class="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div class="rounded-3xl border border-line bg-white p-8 shadow-sm">
          <div
            class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl"
            aria-hidden="true"
          >
            {{ mission.icon }}
          </div>
          <h3 class="mb-3 text-xl font-bold text-dark">{{ mission.title }}</h3>
          <p class="text-sm leading-relaxed text-body sm:text-base">{{ mission.description }}</p>
        </div>
        <div class="rounded-3xl border border-line bg-white p-8 shadow-sm">
          <div
            class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-2xl"
            aria-hidden="true"
          >
            {{ vision.icon }}
          </div>
          <h3 class="mb-3 text-xl font-bold text-dark">{{ vision.title }}</h3>
          <p class="text-sm leading-relaxed text-body sm:text-base">{{ vision.description }}</p>
        </div>
      </div>

      <!-- Values — compact card grid -->
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
        <li
          v-for="value in values"
          :key="value.title"
          class="rounded-3xl border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div
            class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-alt text-xl"
            aria-hidden="true"
          >
            {{ value.icon }}
          </div>
          <h3 class="mb-2 font-bold text-dark">{{ value.title }}</h3>
          <p class="text-sm leading-relaxed text-body">{{ value.description }}</p>
        </li>
      </ul>

    </div>
  </section>
</template>
