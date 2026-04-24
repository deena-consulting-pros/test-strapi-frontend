export default defineEventHandler(async (event) => {
  const { public: { strapiUrl } } = useRuntimeConfig(event)

  const safe = <T>(p: Promise<T>): Promise<T | null> => p.catch(() => null)

  const [about, global] = await Promise.all([
    safe($fetch(`${strapiUrl}/api/about`, {
      query: {
        'populate[SEO][populate]': '*',
        'populate[blocks][populate]': '*',
      },
    })),
    safe($fetch(`${strapiUrl}/api/global`, {
      query: {
        'populate[logo]': '*',
        'populate[socialLinks]': '*',
        'populate[trustedBy][populate]': '*',
      },
    })),
  ])

  if (process.dev) {
    console.log('[page-about] about raw:', JSON.stringify(about, null, 2))
  }

  return { about, global }
})
