<script setup lang="ts">
import { computed } from 'vue'
import { createError } from 'h3'
import { useHead, useSeoMeta } from '@unhead/vue'
import { getMediaUrl } from '../composables/useStrapi'
import type {
  AboutData,
  GlobalData,
  HeroBlock,
  StrapiSingle,
} from '../utils/strapi'

type PageAboutResponse = {
  about: StrapiSingle<AboutData> | null
  global: StrapiSingle<GlobalData> | null
}

const { data, error } = await useFetch<PageAboutResponse>('/api/page-about')

if (error.value) {
  throw createError({
    statusCode: (error.value as any).statusCode ?? 500,
    statusMessage:
      (error.value as any).statusMessage ||
      error.value.message ||
      'Failed to load about page',
    cause: error.value,
  })
}

const aboutPage = computed(() => data.value?.about?.data || null)
const globalData = computed(() => data.value?.global?.data || null)
const seo = computed(() => aboutPage.value?.SEO || null)
const seoImage = computed(() => seo.value?.ogImage?.url || seo.value?.shareImage?.url || '')

// ─── Hero — Strapi fields with static fallbacks ───────────────────────────────
const hero = computed(() => ({
  eyebrow:          aboutPage.value?.heroEyebrow            || 'Our Story',
  heading:          aboutPage.value?.heroTitle               || 'We build digital products',
  headingHighlight: aboutPage.value?.heroHighlightedText     || 'that move businesses forward.',
  subHeading:       aboutPage.value?.heroDescription         ||
    'We are a boutique web development agency combining deep technical craft with creative strategy — delivering premium digital experiences for ambitious companies.',
  primaryCtaText:   aboutPage.value?.heroPrimaryButtonText   || 'Work With Us',
  primaryCtaLink:   aboutPage.value?.heroPrimaryButtonLink   || '#contact',
  secondaryCtaText: aboutPage.value?.heroSecondaryButtonText || 'See Our Work',
  secondaryCtaLink: aboutPage.value?.heroSecondaryButtonLink || '/#work',
}))

// ─── Static content — replace with Strapi fields as each section is added ────
const story = {
  title: 'From a vision to a proven practice',
  paragraphs: [
    'Founded with a belief that great software lives at the intersection of elegant design and reliable engineering, we started as a small team of full-stack developers tired of watching promising companies ship products that felt unfinished.',
    'Today we work with funded startups, growing SMBs, and enterprise teams that need a trusted delivery partner — one that brings the same energy and accountability you would expect from an in-house team.',
    'Every engagement starts with real discovery. We dig into your goals, your constraints, and your customers before we write a single line of code.',
  ],
  highlights: [
    {
      icon: '🌍',
      accentClass: 'bg-primary/10',
      title: 'Global reach, local focus',
      description: 'Clients across 12 countries trust us to deliver on time and on budget.',
    },
    {
      icon: '⚙️',
      accentClass: 'bg-secondary/10',
      title: 'Engineering excellence',
      description: 'Every engineer on our team has led production systems serving thousands of users.',
    },
    {
      icon: '💬',
      accentClass: 'bg-accent/10',
      title: 'Client-first communication',
      description: 'Weekly updates and async-friendly workflows so you are never left guessing.',
    },
  ],
}

const mvv = {
  mission: {
    icon: '🎯',
    title: 'Our Mission',
    description: 'To ship software that creates measurable value — products that are fast, accessible, and built to last.',
  },
  vision: {
    icon: '🔭',
    title: 'Our Vision',
    description: 'A world where every business, regardless of size, has access to the same quality of digital craftsmanship as the best tech companies.',
  },
  values: [
    { icon: '⚡', title: 'Speed With Intention', description: 'We move fast without cutting corners. Velocity comes from clarity, not shortcuts.' },
    { icon: '🔍', title: 'Relentless Clarity', description: 'Ambiguity kills projects. We name things precisely and document decisions transparently.' },
    { icon: '🤝', title: 'Genuine Partnership', description: 'We treat every project like it belongs to us — because until it ships, it does.' },
    { icon: '📐', title: 'Craft Over Output', description: 'We measure success by the quality of what we ship, not the volume of what we commit.' },
  ],
}

const FALLBACK_STATS = [
  { id: 1, value: '8+',   label: 'Years in business' },
  { id: 2, value: '120+', label: 'Projects delivered' },
  { id: 3, value: '94%',  label: 'Client retention rate' },
  { id: 4, value: '12',   label: 'Countries served' },
]

const aboutHeroBlock = computed(() =>
  (aboutPage.value?.blocks ?? []).find(
    (b): b is HeroBlock => b.__component === 'shared.hero'
  ) ?? null
)

const stats = computed(() =>
  aboutHeroBlock.value?.stats?.length
    ? aboutHeroBlock.value.stats
    : FALLBACK_STATS
)

const whyUs = {
  items: [
    { icon: '🏗️', accentClass: 'bg-primary/10 text-primary',    title: 'Full-Stack Ownership',       description: 'From database schema to pixel-perfect UI — one team owns the whole stack. No handoff gaps.' },
    { icon: '📦', accentClass: 'bg-secondary/10 text-secondary', title: 'Headless CMS Specialists',    description: 'Deep expertise in Strapi, Sanity, and Contentful means your editors get a great experience too.' },
    { icon: '🚀', accentClass: 'bg-accent/10 text-accent',       title: 'Launch-Ready Engineering',   description: 'Performance, SEO, and accessibility are built in from day one — not bolted on after launch.' },
    { icon: '🔄', accentClass: 'bg-primary/15 text-primary',     title: 'Iterative Delivery',          description: 'Weekly check-ins, staged milestones, and a shared board mean no surprises at the end of a sprint.' },
    { icon: '📊', accentClass: 'bg-secondary/15 text-secondary', title: 'Data-Informed Decisions',     description: 'We wire up analytics and error tracking before launch so you can act on real signals, not assumptions.' },
    { icon: '🛡️', accentClass: 'bg-accent/15 text-accent',       title: 'Long-Term Support',           description: 'Our retainer packages keep the same engineers on your product month after month — no re-onboarding.' },
  ],
}

const siteName = globalData.value?.siteName || ''
const siteUrl  = globalData.value?.siteUrl  || ''

useSeoMeta({
  title:            seo.value?.metaTitle       || 'About Us',
  description:      seo.value?.metaDescription || hero.value.subHeading,
  ogTitle:          seo.value?.ogTitle         || seo.value?.metaTitle       || 'About Us',
  ogDescription:    seo.value?.ogDescription   || seo.value?.metaDescription || hero.value.subHeading,
  ogImage:          seoImage.value ? getMediaUrl(seoImage.value) : undefined,
  ogType:           'website',
  twitterCard:      'summary_large_image',
  twitterTitle:     seo.value?.ogTitle         || seo.value?.metaTitle       || 'About Us',
  twitterDescription: seo.value?.ogDescription || seo.value?.metaDescription || hero.value.subHeading,
  twitterImage:     seoImage.value ? getMediaUrl(seoImage.value) : undefined,
  robots:           seo.value?.metaRobots || undefined,
})

useHead({
  link: seo.value?.canonicalUrl
    ? [{ rel: 'canonical', href: seo.value.canonicalUrl }]
    : [],
  script: [
    {
      type: 'application/ld+json',
      key: 'json-ld-about',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name:        seo.value?.metaTitle       || 'About Us',
        description: seo.value?.metaDescription || hero.value.subHeading || undefined,
        url:         siteUrl ? `${siteUrl}/about` : undefined,
        publisher: {
          '@type': 'Organization',
          name: siteName || undefined,
          url:  siteUrl  || undefined,
        },
        mainEntity: {
          '@type': 'Organization',
          name: siteName || undefined,
          url:  siteUrl  || undefined,
        },
      }),
    },
  ],
})
</script>

<template>
  <main>
    <AboutHeroSection :hero="hero" :stats="stats" />
    <AboutStorySection :title="story.title" :paragraphs="story.paragraphs" :highlights="story.highlights" />
    <AboutMvvSection :mission="mvv.mission" :vision="mvv.vision" :values="mvv.values" />
    <AboutStatsSection :stats="stats" />
    <AboutWhyUsSection :items="whyUs.items" />
    <HomeCtaBanner :contact-email="globalData?.contactEmail" :site-name="globalData?.siteName" />
  </main>
</template>
