<script setup lang="ts">
import { computed } from 'vue'
import { getMediaUrl, getSrcSet } from '../../composables/useStrapi'
import type { TrustedByItem } from '../../utils/strapi'

const props = defineProps<{
  trustedBy?: TrustedByItem[] | null
}>()

const items = computed(() => props.trustedBy || [])
const fallbackNames = ['TechCorp', 'ShopWave', 'NovaBuild', 'GridLab', 'PixelHub', 'StackForge']
</script>

<template>
  <section class="border-y border-line bg-white py-14 sm:py-16" aria-label="Trusted by companies">
    <div class="mx-auto max-w-7xl px-6">
      <p class="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted sm:mb-10">
        Trusted by ambitious teams
      </p>

      <ul v-if="items.length" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" role="list">
        <li v-for="company in items" :key="company.id">
          <a
            :href="company.url || undefined"
            :class="[
              'flex h-16 items-center justify-center rounded-2xl border border-line bg-surface-alt px-4 text-center transition-colors',
              company.url ? 'hover:border-primary/40 hover:bg-white' : '',
            ]"
            :target="company.url ? '_blank' : undefined"
            :rel="company.url ? 'noopener noreferrer' : undefined"
          >
            <img
              v-if="company.companyLogo?.url"
              :src="getMediaUrl(company.companyLogo.url)"
              :srcset="getSrcSet(company.companyLogo) || undefined"
              sizes="120px"
              :width="company.companyLogo.width || 140"
              :height="company.companyLogo.height || 48"
              :alt="company.companyLogo.alternativeText || company.companyName || 'Company logo'"
              loading="lazy"
              decoding="async"
              class="max-h-8 w-auto object-contain opacity-80 grayscale"
            >
            <span v-else class="text-sm font-semibold tracking-tight text-body/70">
              {{ company.companyName || 'Company' }}
            </span>
          </a>
        </li>
      </ul>

      <ul v-else class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6" role="list">
        <li v-for="company in fallbackNames" :key="company">
          <span class="font-display text-xl font-semibold tracking-tight text-muted/50">
            {{ company }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
