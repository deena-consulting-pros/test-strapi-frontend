export default defineEventHandler(async (event) => {
  const { public: { strapiUrl } } = useRuntimeConfig(event)

  const safe = <T>(p: Promise<T>): Promise<T | null> => p.catch(() => null)

  const [navbar, global] = await Promise.all([
    safe($fetch<any>(`${strapiUrl}/api/navbar`, {
      query: { populate: '*' },
    })),
    safe($fetch<any>(`${strapiUrl}/api/global`, {
      query: { populate: '*' },
    })),
  ])

  const navData: Record<string, any> = (navbar as any)?.data ?? {}
  const globalData: Record<string, any> = (global as any)?.data ?? {}

  return {
    logo: navData.logo ?? globalData.logo ?? null,
    siteName: globalData.siteName ?? null,
    menuItems: navData.menuItems ?? [],
  }
})
