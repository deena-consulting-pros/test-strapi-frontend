<script setup lang="ts">
import { computed } from 'vue'
import { getMediaUrl, getSrcSet } from '../../composables/useStrapi'
import type { TestimonialData } from '../../utils/strapi'

const props = defineProps<{
  testimonials?: TestimonialData[] | null
}>()

const items = computed(() => props.testimonials || [])

const initialsFromName = (name?: string | null) => {
  const words = (name || '')
    .split(' ')
    .map((w) => w.trim())
    .filter(Boolean)
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase() || '').join('') || 'NA'
}

// Returns 'full' | 'half' | 'empty' for star position i given a decimal rating.
// e.g. rating=3.8 → i=4 is 'full' (3.8 >= 3.5), i=5 is 'empty'
// e.g. rating=4.2 → i=5 is 'empty' (4.2 < 4.5), i=4 is 'full'
// e.g. rating=3.5 → i=4 is 'half' (3.5 >= 3.5 but < 4)
const starFill = (i: number, rating: number | null | undefined): 'full' | 'half' | 'empty' => {
  const r = rating ?? 0
  if (r >= i) return 'full'
  if (r >= i - 0.5) return 'half'
  return 'empty'
}
</script>

<template>
  <section id="testimonials" class="bg-surface py-20 sm:py-24" aria-labelledby="testimonials-heading">
    <div class="mx-auto max-w-7xl px-6">
      <header class="mb-12 max-w-2xl sm:mb-14">
        <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Client Stories
        </p>
        <h2 id="testimonials-heading" class="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
          What Clients Say
        </h2>
      </header>

      <ul class="grid grid-cols-1 gap-6 md:grid-cols-3" role="list">
        <li v-for="t in items" :key="t.documentId || t.id">
          <blockquote class="flex h-full flex-col gap-5 rounded-3xl border border-line bg-white p-7 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold leading-none text-primary/30" aria-hidden="true">"</span>
              <div
                v-if="t.rating != null"
                class="flex items-center gap-0.5"
                :aria-label="`Rating: ${t.rating} out of 5`"
              >
                <span
                  v-for="i in 5"
                  :key="i"
                  class="relative inline-block h-4 w-4"
                  aria-hidden="true"
                >
                  <!-- base: always muted -->
                  <svg class="h-4 w-4 text-muted" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <!-- overlay: yellow, full or half-clipped -->
                  <svg
                    v-if="starFill(i, t.rating) !== 'empty'"
                    class="absolute inset-0 h-4 w-4 text-yellow-400"
                    :style="starFill(i, t.rating) === 'half' ? { clipPath: 'inset(0 50% 0 0)' } : {}"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
            </div>

            <p v-if="t.quote" class="flex-1 text-sm leading-relaxed text-body">
              {{ t.quote }}
            </p>

            <footer class="flex items-center gap-3 border-t border-line pt-4">
              <img
                v-if="t.avatar?.url"
                :src="getMediaUrl(t.avatar.url)"
                :srcset="getSrcSet(t.avatar) || undefined"
                sizes="44px"
                :width="t.avatar.width || 88"
                :height="t.avatar.height || 88"
                :alt="t.avatar.alternativeText || `${t.name || 'Client'} avatar`"
                loading="lazy"
                decoding="async"
                class="h-11 w-11 rounded-full object-cover"
              >
              <div
                v-else
                class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white"
                aria-hidden="true"
              >
                {{ initialsFromName(t.name) }}
              </div>
              <div>
                <cite class="block not-italic text-sm font-semibold text-dark">{{ t.name || 'Client' }}</cite>
                <span class="text-xs text-muted">
                  {{ [t.role, t.company].filter(Boolean).join(', ') || 'Verified client' }}
                </span>
              </div>
            </footer>
          </blockquote>
        </li>
      </ul>
    </div>
  </section>
</template>
