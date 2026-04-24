<script setup lang="ts">
import { computed } from 'vue'
import { createError } from 'h3'
import { useHead, useSeoMeta } from '@unhead/vue'
import { getMediaUrl } from '../composables/useStrapi'
import type {
  ArticleData,
  GlobalData,
  HeroBlock,
  HomeData,
  ProjectData,
  ServiceData,
  StrapiList,
  StrapiSingle,
  TestimonialData,
} from '../utils/strapi'

type PageHomeResponse = {
  home: StrapiSingle<HomeData>
  services: StrapiList<ServiceData>
  articles: StrapiList<ArticleData>
  global: StrapiSingle<GlobalData>
  testimonials: StrapiList<TestimonialData>
  projects: StrapiList<ProjectData>
}

const { data, error } = await useFetch<PageHomeResponse>('/api/page-home')

if (error.value) {
  throw createError({
    statusCode: (error.value as any).statusCode ?? 500,
    statusMessage:
      (error.value as any).statusMessage ||
      error.value.message ||
      'Failed to load home page',
    cause: error.value,
  })
}

const page = computed(() => data.value?.home?.data || null)
const seo = computed(() => page.value?.SEO || null)
const heroBlock = computed(() =>
  page.value?.Blocks?.find((block): block is HeroBlock => block.__component === 'shared.hero') || null
)
const processSteps = computed(() => page.value?.processStep || [])
const services = computed(() => data.value?.services?.data || [])
const articles = computed(() => data.value?.articles?.data || [])
const globalData = computed(() => data.value?.global?.data || null)
const trustedBy = computed(() => globalData.value?.trustedBy || [])
const testimonials = computed(() => data.value?.testimonials?.data || [])
const projects = computed(() => data.value?.projects?.data || [])
const seoImage = computed(() => seo.value?.ogImage?.url || seo.value?.shareImage?.url || '')

useSeoMeta({
  title: seo.value?.metaTitle || page.value?.title || 'Home',
  description: seo.value?.metaDescription || undefined,
  ogTitle: seo.value?.ogTitle || seo.value?.metaTitle || undefined,
  ogDescription: seo.value?.ogDescription || seo.value?.metaDescription || undefined,
  ogImage: seoImage.value ? getMediaUrl(seoImage.value) : undefined,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: seo.value?.ogTitle || seo.value?.metaTitle || undefined,
  twitterDescription: seo.value?.ogDescription || seo.value?.metaDescription || undefined,
  twitterImage: seoImage.value ? getMediaUrl(seoImage.value) : undefined,
  robots: seo.value?.metaRobots || undefined,
})

const orgName = globalData.value?.siteName || seo.value?.metaTitle || page.value?.title || ''
const orgUrl  = globalData.value?.siteUrl  || ''

const sameAsLinks = (globalData.value?.socialLinks as Array<{ url?: string | null }> ?? [])
  .map(l => l.url)
  .filter((u): u is string => typeof u === 'string' && u.length > 0)

useHead({
  link: seo.value?.canonicalUrl
    ? [{ rel: 'canonical', href: seo.value.canonicalUrl }]
    : [],
  script: [
    {
      type: 'application/ld+json',
      key: 'json-ld-org',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: orgName || undefined,
            url:  orgUrl  || undefined,
            logo: globalData.value?.logo?.url
              ? { '@type': 'ImageObject', url: getMediaUrl(globalData.value.logo.url) }
              : undefined,
            description: globalData.value?.siteDescription || undefined,
            email:       globalData.value?.contactEmail    || undefined,
            sameAs: sameAsLinks.length ? sameAsLinks : undefined,
          },
          {
            '@type': 'WebSite',
            name: orgName || undefined,
            url:  orgUrl  || undefined,
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <main>
    <HomeHeroSection :hero="heroBlock" />
    <HomeCompaniesStrip :trusted-by="trustedBy" />
    <HomeServicesGrid v-if="services.length" :services="services" />
    <HomeProcessTimeline v-if="processSteps.length" :steps="processSteps" />
    <HomeSelectedWorks v-if="projects.length" :projects="projects" />
    <HomePortfolioGrid v-if="articles.length" :articles="articles" />
    <HomeTestimonialsSection v-if="testimonials.length" :testimonials="testimonials" />
    <HomeCtaBanner :contact-email="globalData?.contactEmail" :site-name="globalData?.siteName" />
  </main>
</template>
