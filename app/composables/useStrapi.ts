import { useRuntimeConfig } from 'nuxt/app'
import type { StrapiMedia } from '../utils/strapi'

export const useStrapiUrl = () => {
  const config = useRuntimeConfig()
  return config.public.strapiUrl as string
}

export const getMediaUrl = (url?: string | null): string => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${useStrapiUrl()}${url}`
}

export const getSrcSet = (media?: StrapiMedia | null): string => {
  if (!media) return ''

  const entries = new Map<number, string>()

  if (media.width && media.url) {
    entries.set(media.width, `${getMediaUrl(media.url)} ${media.width}w`)
  }

  if (media.formats) {
    for (const format of Object.values(media.formats)) {
      if (format?.width && format.url) {
        entries.set(format.width, `${getMediaUrl(format.url)} ${format.width}w`)
      }
    }
  }

  return [...entries.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, value]) => value)
    .join(', ')
}
