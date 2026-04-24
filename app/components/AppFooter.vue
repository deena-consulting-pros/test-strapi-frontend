<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData } from 'nuxt/app'
import { fetchSingle } from '../utils/strapi'
import { getMediaUrl, getSrcSet, useStrapiUrl } from '../composables/useStrapi'
import type { GlobalData } from '../utils/strapi'

const strapiUrl = useStrapiUrl()

const { data: globalRes } = await useAsyncData('global-footer', () =>
  fetchSingle<GlobalData>(strapiUrl, 'global', {
    populate: '*',
  })
)

const globalData = computed(() => globalRes.value?.data || null)

const siteName = computed(() => globalData.value?.siteName || 'DevStudio')
const siteDescription = computed(
  () => globalData.value?.siteDescription || 'We design and build high-performance digital products.'
)
const contactEmail = computed(() => globalData.value?.contactEmail || 'hello@example.com')
const socialLinks = computed(() => globalData.value?.socialLinks || [])

const toExternalUrl = (url?: string | null) => {
  if (!url) return '#'
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
    return url
  }
  return `https://${url}`
}
</script>

<template>
  <footer class="bg-dark text-white" aria-label="Site footer">
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16">
      <div class="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-5">
        <div class="space-y-4 lg:col-span-2">
          <div class="flex items-center gap-3">
            <img
              v-if="globalData?.logo?.url"
              :src="getMediaUrl(globalData.logo.url)"
              :srcset="getSrcSet(globalData.logo) || undefined"
              sizes="160px"
              :width="globalData.logo.width || 220"
              :height="globalData.logo.height || 60"
              :alt="globalData.logo.alternativeText || `${siteName} logo`"
              class="h-8 w-auto object-contain"
              loading="lazy"
              decoding="async"
            >
            <span v-else class="font-display text-lg font-bold tracking-tight">{{ siteName }}</span>
          </div>

          <p class="max-w-sm text-sm leading-relaxed text-white/60">
            {{ siteDescription }}
          </p>

          <a
            :href="`mailto:${contactEmail}`"
            class="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            {{ contactEmail }}
            <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5" aria-hidden="true">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <div class="space-y-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Services</h3>
          <ul class="space-y-2.5" role="list">
            <li><a href="#services" class="text-sm text-white/60 transition-colors hover:text-white">Web Development</a></li>
            <li><a href="#services" class="text-sm text-white/60 transition-colors hover:text-white">UI/UX Design</a></li>
            <li><a href="#services" class="text-sm text-white/60 transition-colors hover:text-white">Technical Support</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Company</h3>
          <ul class="space-y-2.5" role="list">
            <li><a href="#work" class="text-sm text-white/60 transition-colors hover:text-white">Work</a></li>
            <li><a href="#process" class="text-sm text-white/60 transition-colors hover:text-white">Process</a></li>
            <li><a href="#contact" class="text-sm text-white/60 transition-colors hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">Connect</h3>
          <ul v-if="socialLinks.length" class="space-y-2.5" role="list">
            <li v-for="link in socialLinks" :key="link.id">
              <a
                :href="toExternalUrl(link.url)"
                class="text-sm text-white/60 transition-colors hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.platform || 'Social' }}
              </a>
            </li>
          </ul>
          <ul v-else class="space-y-2.5" role="list">
            <li><a href="#" class="text-sm text-white/60 transition-colors hover:text-white">LinkedIn</a></li>
            <li><a href="#" class="text-sm text-white/60 transition-colors hover:text-white">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
        <p class="text-xs text-white/35">
          © {{ new Date().getFullYear() }} {{ siteName }}. All rights reserved.
        </p>
        <div class="flex items-center gap-5">
          <a href="#" class="text-xs text-white/35 transition-colors hover:text-white/70">Privacy Policy</a>
          <a href="#" class="text-xs text-white/35 transition-colors hover:text-white/70">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
