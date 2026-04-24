<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  contactEmail?: string | null
  siteName?: string | null
}>()

const email = computed(() => props.contactEmail || 'hello@example.com')
const brand = computed(() => props.siteName || 'our team')
</script>

<template>
  <section id="contact" class="bg-surface-alt py-20 sm:py-24" aria-labelledby="cta-heading">
    <div class="mx-auto max-w-7xl px-6">
      <div class="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-primary to-secondary px-8 py-14 sm:px-12 lg:py-16">
        <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/8" aria-hidden="true" />
        <div class="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-white/8" aria-hidden="true" />

        <div class="relative z-10 mx-auto max-w-3xl text-center">
          <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
            Ready To Build
          </p>
          <h2 id="cta-heading" class="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Start your next product with {{ brand }}
          </h2>
          <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            Share your goals and timeline. You will get a practical plan and a clear delivery path.
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              :href="`mailto:${email}`"
              class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-surface-alt"
            >
              Start a Conversation
              <svg viewBox="0 0 16 16" fill="none" class="h-4 w-4" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a
              href="#work"
              class="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              See Recent Work
            </a>
          </div>

          <p class="mt-5 text-xs text-white/70">
            Free discovery call · No obligation · Response within 24 hours
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
