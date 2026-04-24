<script setup lang="ts">
import { getMediaUrl, getSrcSet } from '../../composables/useStrapi'
import type { StrapiMedia } from '../../utils/strapi'

type HeroData = {
  eyebrow: string
  heading: string
  headingHighlight: string
  subHeading: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  image?: StrapiMedia | null
}

type StatItem = { value: string; label: string }

const props = defineProps<{
  hero: HeroData
  stats: StatItem[]
}>()
</script>

<template>
  <section class="bg-surface overflow-hidden" aria-labelledby="about-hero-heading">
    <div class="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">

        <!-- Left: headline + CTAs -->
        <div class="space-y-8 lg:col-span-3">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {{ props.hero.eyebrow }}
          </span>

          <h1
            id="about-hero-heading"
            class="text-4xl font-extrabold leading-[1.1] tracking-tight text-dark sm:text-5xl lg:text-[3.5rem]"
          >
            {{ props.hero.heading }}
            <br>
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {{ props.hero.headingHighlight }}
            </span>
          </h1>

          <p class="max-w-xl text-lg leading-relaxed text-body">
            {{ props.hero.subHeading }}
          </p>

          <div class="flex flex-wrap gap-4">
            <a
              :href="props.hero.primaryCtaLink"
              class="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-accent"
            >
              {{ props.hero.primaryCtaText }}
              <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
            <a
              :href="props.hero.secondaryCtaLink"
              class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-dark transition-colors hover:border-primary hover:text-primary"
            >
              {{ props.hero.secondaryCtaText }}
            </a>
          </div>
        </div>

        <!-- Right: heroImage from Strapi OR static stats card fallback -->
        <div class="relative lg:col-span-2">
          <div
            class="absolute -inset-6 -z-0 rounded-[3rem] bg-linear-to-br from-surface-alt via-white to-surface-alt"
            aria-hidden="true"
          />
          <figure class="relative z-10 overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">

            <!-- Strapi heroImage -->
            <img
              v-if="props.hero.image?.url"
              :src="getMediaUrl(props.hero.image.url)"
              :srcset="getSrcSet(props.hero.image) || undefined"
              sizes="(min-width: 1024px) 38rem, 100vw"
              :width="props.hero.image.width || 800"
              :height="props.hero.image.height || 600"
              :alt="props.hero.image.alternativeText || 'About us hero image'"
              fetchpriority="high"
              decoding="async"
              class="aspect-4/3 w-full object-cover"
            >

            <!-- Fallback: static stats card -->
            <template v-else>
              <div class="bg-linear-to-br from-primary/10 to-secondary/10 px-8 pb-6 pt-8">
                <div
                  class="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-2xl shadow-lg shadow-primary/20"
                  aria-hidden="true"
                >
                  🏆
                </div>
                <p class="text-xl font-bold text-dark">Award-winning team</p>
                <p class="mt-1.5 text-sm leading-relaxed text-body">
                  Recognised for exceptional digital craftsmanship since 2016.
                </p>
              </div>
              <ul class="divide-y divide-line" role="list">
                <li
                  v-for="stat in props.stats.slice(0, 3)"
                  :key="stat.value"
                  class="flex items-center justify-between px-8 py-4"
                >
                  <span class="text-sm text-body">{{ stat.label }}</span>
                  <span class="font-display text-xl font-extrabold text-dark">{{ stat.value }}</span>
                </li>
              </ul>
            </template>

          </figure>
        </div>

      </div>
    </div>
  </section>
</template>
