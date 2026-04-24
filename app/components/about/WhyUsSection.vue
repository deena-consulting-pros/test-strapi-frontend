<script setup lang="ts">
type WhyUsItem = {
  icon: string
  accentClass: string
  title: string
  description: string
}

defineProps<{
  items: WhyUsItem[]
}>()
</script>

<template>
  <section class="bg-surface py-20 sm:py-24" aria-labelledby="why-heading">
    <div class="mx-auto max-w-7xl px-6">

      <header class="mb-12 max-w-2xl sm:mb-16">
        <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Why Us
        </p>
        <h2 id="why-heading" class="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
          The agency difference
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-body sm:text-base">
          We are not a one-size-fits-all shop. Here is what sets us apart from typical agencies.
        </p>
      </header>

      <ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
        <li
          v-for="item in items"
          :key="item.title"
          class="flex flex-col gap-4 rounded-3xl border border-line bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
        >
          <div
            class="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-xl"
            :class="item.accentClass"
            aria-hidden="true"
          >
            {{ item.icon }}
          </div>
          <div>
            <h3 class="mb-2 text-base font-bold text-dark sm:text-lg">{{ item.title }}</h3>
            <p class="text-sm leading-relaxed text-body">{{ item.description }}</p>
          </div>
        </li>
      </ul>

    </div>
  </section>
</template>
