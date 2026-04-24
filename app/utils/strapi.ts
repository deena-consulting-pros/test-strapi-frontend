export type StrapiSingle<T> = { data: T | null }

export type StrapiList<T> = {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type StrapiMediaFormat = {
  url: string
  width: number
  height: number
  size: number
  mime: string
}

export type StrapiMediaFormats = {
  thumbnail?: StrapiMediaFormat
  small?: StrapiMediaFormat
  medium?: StrapiMediaFormat
  large?: StrapiMediaFormat
} & Record<string, StrapiMediaFormat | undefined>

export type StrapiMedia = {
  id: number
  url: string
  alternativeText?: string | null
  width?: number | null
  height?: number | null
  mime?: string
  formats?: StrapiMediaFormats | null
}

export type SeoData = {
  metaTitle?: string | null
  metaDescription?: string | null
  shareImage?: StrapiMedia | null
  canonicalUrl?: string | null
  metaRobots?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: StrapiMedia | null
}

export type HeroBlock = {
  __component: 'shared.hero'
  id: number
  eyebrow?: string | null
  heading?: string | null
  headingHighlight?: string | null
  subHeading?: string | null
  backgroundImage?: StrapiMedia | null
  primaryCtaText?: string | null
  primaryCtaLink?: string | null
  secondaryCtaText?: string | null
  secondaryCtaLink?: string | null
  ctatext?: string | null
  ctaLink?: string | null
  stats?: HeroStat[] | null
  visualCaption?: string | null
  visualMetric?: string | null
}

export type HeroStat = {
  id: number
  value: string
  label: string
}

export type ProcessStep = {
  id: number
  step: number
  title: string
  description?: string | null
}

export type HomeData = {
  id: number
  title?: string | null
  slug?: string | null
  SEO?: SeoData | null
  Blocks?: (HeroBlock | { __component: string; id: number })[] | null
  processStep?: ProcessStep[] | null
}

export type ServiceData = {
  id: number
  documentId: string
  title?: string | null
  slug?: string | null
  shortDescription?: string | null
  featuredImage?: StrapiMedia | null
  // New optional Strapi fields — add these to the Service content type
  icon?: string | null          // emoji or short text displayed in the icon box
  accentColor?: string | null   // Tailwind class string e.g. "bg-purple-100 text-purple-600"
  cardType?: 'normal' | 'image' | null  // 'image' renders a full-bleed image card
  order?: number | null         // explicit display order
  isActive?: boolean | null     // false hides the card without deleting it
  linkText?: string | null      // CTA label override (defaults to "View service")
  linkUrl?: string | null       // external link override (defaults to /services/:slug)
}

export type ArticleData = {
  id: number
  documentId: string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  cover?: StrapiMedia | null
  category?: {
    id: number
    name?: string | null
    slug?: string | null
  } | null
}

export type ProjectData = {
  id: number
  documentId: string
  title?: string | null
  slug?: string | null
  shortDescription?: string | null
  featuredImage?: StrapiMedia | null
  category?: {
    id: number
    name?: string | null
    slug?: string | null
  } | null
  isFeatured?: boolean | null
  order?: number | null
  isActive?: boolean | null
}

export type NavbarMenuItem = {
  id: number
  label?: string | null
  url?: string | null
  openInNewTab?: boolean | null
}

export type NavbarData = {
  id: number
  logo?: StrapiMedia | null
  menuItems?: NavbarMenuItem[] | null
}

export type GlobalSocialLink = {
  id: number
  platform?: string | null
  url?: string | null
}

export type TrustedByItem = {
  id: number
  companyName?: string | null
  url?: string | null
  companyLogo?: StrapiMedia | null
}

export type AboutData = {
  id: number
  title?: string | null
  slug?: string | null
  SEO?: SeoData | null
  heroEyebrow?: string | null
  heroTitle?: string | null
  heroHighlightedText?: string | null
  heroDescription?: string | null
  heroPrimaryButtonText?: string | null
  heroPrimaryButtonLink?: string | null
  heroSecondaryButtonText?: string | null
  heroSecondaryButtonLink?: string | null
  heroStats?: HeroStat[] | null
  blocks?: (HeroBlock | { __component: string; id: number })[] | null
}

export type GlobalData = {
  id: number
  siteName?: string | null
  siteDescription?: string | null
  siteUrl?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
  logo?: StrapiMedia | null
  favicon?: StrapiMedia | null
  socialLinks?: GlobalSocialLink[] | null
  trustedBy?: TrustedByItem[] | null
}

export type TestimonialData = {
  id: number
  documentId: string
  name?: string | null
  role?: string | null
  company?: string | null
  quote?: string | null
  rating?: number | null
  avatar?: StrapiMedia | null
}

export const fetchSingle = <T>(baseUrl: string, uid: string, query?: Record<string, string>) =>
  $fetch<StrapiSingle<T>>(`${baseUrl}/api/${uid}`, { query })

export const fetchCollection = <T>(baseUrl: string, uid: string, query?: Record<string, string>) =>
  $fetch<StrapiList<T>>(`${baseUrl}/api/${uid}`, { query })
