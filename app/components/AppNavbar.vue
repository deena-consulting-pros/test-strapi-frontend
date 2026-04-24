<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMediaUrl } from '../composables/useStrapi'
import type { StrapiMedia } from '../utils/strapi'

type NavbarMenuItem = {
  id: number
  label?: string | null
  url?: string | null
  openInNewTab?: boolean | null
}

type NavbarResponse = {
  logo: StrapiMedia | null
  siteName: string | null
  menuItems: NavbarMenuItem[]
}

const isOpen = ref(false)
const route = useRoute()

const { data } = await useFetch<NavbarResponse>('/api/navbar')

function isActive(url: string | null | undefined): boolean {
  if (!url) return false
  // Normalise to a pathname: strip origin if absolute, ensure leading slash
  let path = url
  try { path = new URL(url).pathname } catch { /* relative — use as-is */ }
  if (!path.startsWith('/')) path = '/' + path
  path = path.replace(/\/$/, '') || '/'
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(path + '/')
}

const menuItems = computed(() => data.value?.menuItems ?? [])
const siteName = computed(() => data.value?.siteName ?? 'DevStudio')
const logoUrl = computed(() => {
  const raw = data.value?.logo?.url
  return raw ? getMediaUrl(raw) : null
})
const logoAlt = computed(
  () => data.value?.logo?.alternativeText ?? siteName.value
)
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-line">
    <nav
      class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      aria-label="Main navigation"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5 shrink-0"
        :aria-label="`${siteName} – go to homepage`"
      >
        <template v-if="logoUrl">
          <img
            :src="logoUrl"
            :alt="logoAlt"
            class="h-8 w-auto object-contain"
          />
        </template>
        <template v-else>
          <span
            class="w-8 h-8 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg viewBox="0 0 16 16" fill="none" class="w-4 h-4 text-white">
              <path d="M3 5.5L8 2.5L13 5.5V10.5L8 13.5L3 10.5V5.5Z" fill="currentColor" fill-opacity="0.9"/>
              <path d="M8 2.5V13.5M3 5.5L13 10.5M13 5.5L3 10.5" stroke="white" stroke-width="0.75" stroke-opacity="0.4"/>
            </svg>
          </span>
          <span class="font-display font-bold text-dark text-lg tracking-tight">{{ siteName }}</span>
        </template>
      </NuxtLink>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-7" role="list">
        <li v-for="item in menuItems" :key="item.id">
          <a
            :href="item.url ?? '#'"
            :target="item.openInNewTab ? '_blank' : undefined"
            :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
            class="text-sm font-medium transition-colors duration-200"
            :class="isActive(item.url)
              ? 'text-primary border-b-2 border-primary pb-0.5'
              : 'text-body hover:text-primary'"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Desktop CTA -->
      <a
        href="#contact"
        class="hidden md:inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accent transition-colors duration-200 shrink-0"
      >
        Start a Project
        <svg viewBox="0 0 16 16" fill="none" class="w-3.5 h-3.5" aria-hidden="true">
          <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="md:hidden p-2 -mr-2 text-body hover:text-dark transition-colors"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" viewBox="0 0 24 24" fill="none" class="w-5 h-5" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" class="w-5 h-5" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="isOpen"
      id="mobile-menu"
      class="md:hidden border-t border-line bg-white/95 backdrop-blur-xl px-6 pt-4 pb-6"
    >
      <ul class="flex flex-col gap-1" role="list">
        <li v-for="item in menuItems" :key="item.id">
          <a
            :href="item.url ?? '#'"
            :target="item.openInNewTab ? '_blank' : undefined"
            :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
            class="block text-sm font-medium px-3 py-2.5 rounded-lg transition-colors"
            :class="isActive(item.url)
              ? 'text-primary bg-surface-alt font-semibold'
              : 'text-body hover:text-primary hover:bg-surface-alt'"
            @click="isOpen = false"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
      <a
        href="#contact"
        class="mt-4 flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full"
        @click="isOpen = false"
      >
        Start a Project
      </a>
    </div>
  </header>
</template>
