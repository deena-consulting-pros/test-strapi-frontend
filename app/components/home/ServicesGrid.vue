<script setup lang="ts">
import { computed } from 'vue'
import { getMediaUrl, getSrcSet } from '../../composables/useStrapi'
import type { ServiceData } from '../../utils/strapi'

const props = defineProps<{
  services?: ServiceData[] | null
}>()

const items = computed(() => {
  const list = (props.services || []).filter(s => s.isActive !== false)
  return list.some(s => s.order != null)
    ? [...list].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    : list
})

const iconPalette = [
  'bg-primary/10 text-primary',
  'bg-secondary/10 text-secondary',
  'bg-accent/10 text-accent',
  'bg-primary/15 text-primary',
  'bg-secondary/15 text-secondary',
  'bg-accent/15 text-accent',
]

const isImageCard = (service: ServiceData, index: number) =>
  (service.cardType ?? (index === 4 ? 'image' : 'normal')) === 'image'

const iconBoxClass = (service: ServiceData, index: number) =>
  service.accentColor || iconPalette[index % iconPalette.length]

function gridSpan(service: ServiceData, index: number): string {
  // Wide image card spans both tablet columns and 6/12 on desktop
  if (isImageCard(service, index)) return 'md:col-span-2 lg:col-span-6'
  // Row 1: three equal cards
  if (index < 3) return 'lg:col-span-4'
  // Row 2 flanking cards
  return 'lg:col-span-3'
}
</script>

<template>
  <section id="services" class="bg-surface py-14 sm:py-20" aria-labelledby="services-heading">
    <div class="mx-auto max-w-7xl px-6">
      <header class="mb-12 max-w-2xl sm:mb-16">
        <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          What We Do
        </p>
        <h2 id="services-heading" class="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
          Precision Services
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-body sm:text-base">
          Focused service tracks designed to launch faster and scale cleaner.
        </p>
      </header>

      <ul class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12" role="list">
        <li
          v-for="(service, index) in items"
          :key="service.documentId || service.id"
          :class="gridSpan(service, index)"
        >
          <!-- Full-bleed image card -->
          <article
            v-if="isImageCard(service, index)"
            class="relative h-56 overflow-hidden rounded-3xl"
            :aria-label="service.title || 'Service image'"
          >
            <img
              v-if="service.featuredImage?.url"
              :src="getMediaUrl(service.featuredImage.url)"
              :srcset="getSrcSet(service.featuredImage) || undefined"
              sizes="(min-width: 1024px) 40rem, (min-width: 640px) 50vw, 100vw"
              :width="service.featuredImage.width || 800"
              :height="service.featuredImage.height || 500"
              :alt="service.featuredImage.alternativeText || service.title || 'Service'"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            >
            <div
              v-else
              class="h-full w-full bg-linear-to-br from-primary/20 to-secondary/30"
            />
          </article>

          <!-- Normal service card -->
          <article
            v-else
            class="flex h-full flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl"
              :class="iconBoxClass(service, index)"
            >
              <span v-if="service.icon" aria-hidden="true">{{ service.icon }}</span>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="h-5 w-5"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>

            <div class="flex flex-1 flex-col gap-2">
              <h3 class="text-base font-bold leading-snug text-dark sm:text-lg">
                {{ service.title || 'Untitled' }}
              </h3>
              <p v-if="service.shortDescription" class="flex-1 text-sm leading-relaxed text-body">
                {{ service.shortDescription }}
              </p>
            </div>

            <!-- <NuxtLink
              v-if="service.slug || service.linkUrl"
              :to="service.linkUrl || `/services/${service.slug}`"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              {{ service.linkText || 'View service' }}
              <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink> -->
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
