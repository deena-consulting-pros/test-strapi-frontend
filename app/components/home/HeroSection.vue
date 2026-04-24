<script setup lang="ts">
import { computed } from 'vue'
import { getMediaUrl, getSrcSet } from '../../composables/useStrapi'
import type { HeroBlock } from '../../utils/strapi'

const props = defineProps<{
  hero?: HeroBlock | null
}>()

const eyebrow = computed(() => props.hero?.eyebrow || 'Premium Web Development Agency')
const rawHeading = computed(() => props.hero?.heading || 'Home')
const explicitHighlight = computed(() => props.hero?.headingHighlight?.trim() || '')

const parsedHeading = computed(() => {
  if (explicitHighlight.value) {
    return { main: rawHeading.value, highlight: explicitHighlight.value }
  }

  const lines = rawHeading.value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length > 1) {
    return { main: lines[0], highlight: lines.slice(1).join(' ') }
  }

  const words = rawHeading.value.trim().split(/\s+/).filter(Boolean)
  if (words.length >= 4) {
    return {
      main: words.slice(0, -2).join(' '),
      highlight: words.slice(-2).join(' '),
    }
  }

  return { main: rawHeading.value, highlight: '' }
})

const heading = computed(() => parsedHeading.value.main || 'Home')
const headingHighlight = computed(() => parsedHeading.value.highlight)
const subHeading = computed(() => props.hero?.subHeading || '')
const heroMedia = computed(() => props.hero?.backgroundImage || null)
const heroAlt = computed(
  () => heroMedia.value?.alternativeText || `${heading.value} hero visual`
)
const heroWidth = computed(() => heroMedia.value?.width || 1536)
const heroHeight = computed(() => heroMedia.value?.height || 1024)

const primaryCtaText = computed(() => props.hero?.primaryCtaText || props.hero?.ctatext || 'Start a Project')
const primaryCtaLink = computed(() => props.hero?.primaryCtaLink || props.hero?.ctaLink || '#contact')
const secondaryCtaText = computed(() => props.hero?.secondaryCtaText || 'View Our Work')
const secondaryCtaLink = computed(() => props.hero?.secondaryCtaLink || '#work')
const stats = computed(() => props.hero?.stats || [])
const visualMeta = computed(() => props.hero?.visualMetric || props.hero?.visualCaption || '')
</script>

<template>
  <section class="bg-surface overflow-hidden" aria-labelledby="home-hero-heading">
    <div class="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
        <div class="space-y-8 lg:col-span-3">
          <span
            v-if="eyebrow"
            class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {{ eyebrow }}
          </span>

          <h1 id="home-hero-heading" class="text-4xl font-extrabold leading-[1.1] tracking-tight text-dark sm:text-5xl lg:text-[3.5rem]">
            {{ heading }}
            <br v-if="headingHighlight">
            <span
              v-if="headingHighlight"
              class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              {{ headingHighlight }}
            </span>
          </h1>

          <p v-if="subHeading" class="max-w-xl text-lg leading-relaxed text-body">
            {{ subHeading }}
          </p>

          <div class="flex flex-wrap gap-4">
            <a
              :href="primaryCtaLink"
              class="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-accent"
            >
              {{ primaryCtaText }}
              <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a
              :href="secondaryCtaLink"
              class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-dark transition-colors hover:border-primary hover:text-primary"
            >
              {{ secondaryCtaText }}
            </a>
          </div>

          <ul v-if="stats.length" class="flex flex-wrap gap-6 border-t border-line pt-4" role="list">
            <li v-for="stat in stats" :key="stat.id || `${stat.value}-${stat.label}`">
              <p class="font-display text-3xl font-extrabold text-dark">{{ stat.value }}</p>
              <p class="mt-0.5 text-sm text-muted">{{ stat.label }}</p>
            </li>
          </ul>
        </div>

        <div class="relative lg:col-span-2">
          <div class="absolute -inset-6 -z-0 rounded-[3rem] bg-gradient-to-br from-surface-alt via-white to-surface-alt" />

          <figure class="relative z-10 overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
            <img
              v-if="heroMedia?.url"
              :src="getMediaUrl(heroMedia.url)"
              :srcset="getSrcSet(heroMedia) || undefined"
              sizes="(min-width: 1024px) 38rem, 100vw"
              :width="heroWidth"
              :height="heroHeight"
              :alt="heroAlt"
              fetchpriority="high"
              decoding="async"
              class="aspect-[4/3] w-full object-cover"
            >
            <div
              v-else
              class="aspect-[4/3] w-full bg-gradient-to-br from-primary/15 to-secondary/15"
              aria-hidden="true"
            />

            <figcaption v-if="visualMeta" class="border-t border-line px-5 py-3 text-sm text-body">
              {{ visualMeta }}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
