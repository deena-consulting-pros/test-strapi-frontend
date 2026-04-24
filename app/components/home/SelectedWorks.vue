<script setup lang="ts">
import { computed } from 'vue'
import { getMediaUrl, getSrcSet } from '../../composables/useStrapi'
import type { ProjectData } from '../../utils/strapi'

const props = defineProps<{
  projects?: ProjectData[] | null
}>()

const items = computed(() => {
  const list = (props.projects || []).filter(p => p.isActive !== false)
  const sorted = list.some(p => p.order != null)
    ? [...list].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    : list
  return sorted.slice(0, 3)
})
</script>

<template>
  <section id="selected-works" class="bg-surface py-14 sm:py-20" aria-labelledby="works-heading">
    <div class="mx-auto max-w-7xl px-6">

      <!-- Header row -->
      <header class="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-lg">
          <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Our Work
          </p>
          <h2 id="works-heading" class="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            Selected Works
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-body sm:text-base">
            A handful of projects we are proud to have shipped.
          </p>
        </div>
        <NuxtLink
          to="/projects"
          class="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
        >
          View All Projects
          <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5" aria-hidden="true">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </header>

      <!-- Cards grid -->
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        <li v-for="project in items" :key="project.documentId || project.id">
          <component
            :is="project.slug ? 'NuxtLink' : 'article'"
            :to="project.slug ? `/projects/${project.slug}` : undefined"
            class="group block"
          >
            <!-- Portrait image -->
            <div class="aspect-4/5 overflow-hidden rounded-2xl bg-surface-alt">
              <img
                v-if="project.featuredImage?.url"
                :src="getMediaUrl(project.featuredImage.url)"
                :srcset="getSrcSet(project.featuredImage) || undefined"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                :width="project.featuredImage.width || 600"
                :height="project.featuredImage.height || 750"
                :alt="project.featuredImage.alternativeText || project.title || 'Project'"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
              <div
                v-else
                class="h-full w-full bg-linear-to-br from-primary/15 to-secondary/25"
              />
            </div>

            <!-- Meta below image -->
            <div class="mt-4 flex flex-col gap-2">
              <div v-if="project.category?.name" class="flex flex-wrap gap-2">
                <span class="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                  {{ project.category.name }}
                </span>
              </div>
              <h3 class="text-base font-bold leading-snug text-dark transition-colors group-hover:text-primary sm:text-lg">
                {{ project.title || 'Untitled' }}
              </h3>
            </div>
          </component>
        </li>
      </ul>

    </div>
  </section>
</template>
