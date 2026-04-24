export default defineEventHandler(async (event) => {
  const { public: { strapiUrl } } = useRuntimeConfig(event)

  const safe = <T>(p: Promise<T>): Promise<T | null> => p.catch(() => null)

  const [home, services, articles, global, testimonials, projects] = await Promise.all([
    safe($fetch(`${strapiUrl}/api/home`, {
      query: {
        'populate[SEO][populate]': '*',
        'populate[Blocks][populate]': '*',
        'populate[processStep]': '*',
      },
    })),
    safe($fetch(`${strapiUrl}/api/services`, {
      query: {
        'populate[featuredImage]': 'true',
        'sort[0]': 'createdAt:asc',
      },
    })),
    safe($fetch(`${strapiUrl}/api/articles`, {
      query: {
        'populate[cover]': 'true',
        'populate[category]': 'true',
        'sort[0]': 'publishedAt:desc',
        'pagination[pageSize]': '4',
      },
    })),
    safe($fetch(`${strapiUrl}/api/global`, {
      query: {
        'populate[trustedBy][populate]': '*',
        'populate[logo]': '*',
        'populate[socialLinks]': '*',
      },
    })),
    safe($fetch(`${strapiUrl}/api/testimonials`, {
      query: {
        'populate[avatar]': 'true',
        'sort[0]': 'publishedAt:asc',
        'pagination[pageSize]': '3',
      },
    })),
    safe($fetch(`${strapiUrl}/api/projects`, {
      query: {
        'populate[featuredImage]': 'true',
        'populate[category]': 'true',
        'sort[0]': 'createdAt:asc',
        'pagination[pageSize]': '6',
      },
    })),
  ])

  if (!home) {
    throw createError({ statusCode: 502, statusMessage: 'Failed to load home content from CMS' })
  }

  return { home, services, articles, global, testimonials, projects }
})
