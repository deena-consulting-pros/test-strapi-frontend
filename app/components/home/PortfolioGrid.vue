<script setup lang="ts">
import { computed } from 'vue'
import { getMediaUrl, getSrcSet } from '../../composables/useStrapi'
import type { ArticleData } from '../../utils/strapi'

const props = defineProps<{
  articles?: ArticleData[] | null
}>()

const items = computed(() => props.articles || [])
</script>

<template>
  <section id="work" class="bg-white py-20 sm:py-24" aria-labelledby="work-heading">
    <div class="mx-auto max-w-7xl px-6">
      <header class="mb-12 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-lg">
          <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Featured Work
          </p>
          <h2 id="work-heading" class="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            Latest Articles
          </h2>
          <p class="mt-4 text-sm leading-relaxed text-body sm:text-base">
            Practical builds, technical decisions, and launch outcomes.
          </p>
        </div>
        <NuxtLink
          to="/articles"
          class="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
        >
          View All Articles
          <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5" aria-hidden="true">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </header>

      <ul class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
        <li
          v-for="(article) in items"
          :key="article.documentId || article.id"
        >
          <article class="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all hover:shadow-sm">
            <img
              v-if="article.cover?.url"
              :src="getMediaUrl(article.cover.url)"
              :srcset="getSrcSet(article.cover) || undefined"
              sizes="(min-width: 1024px) 30rem, (min-width: 768px) 50vw, 100vw"
              :width="article.cover.width || 1200"
              :height="article.cover.height || 700"
              :alt="article.cover.alternativeText || `${article.title || 'Article'} cover image`"
              loading="lazy"
              decoding="async"
              class="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            >
            <div class="flex flex-1 flex-col gap-3 p-6 sm:p-7">
              <p
                v-if="article.category?.name"
                class="inline-flex w-fit rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary"
              >
                {{ article.category.name }}
              </p>
              <h3 class="text-xl font-bold leading-tight text-dark">
                {{ article.title || 'Untitled article' }}
              </h3>
              <!-- <p v-if="article.excerpt" class="text-sm leading-relaxed text-body sm:text-[15px]">
                {{ article.excerpt }}
              </p> -->
              <NuxtLink
                v-if="article.slug"
                :to="`/articles/${article.slug}`"
                class="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-primary hover:text-accent"
              >
                Read article
                <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
