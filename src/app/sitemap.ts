import { MetadataRoute } from 'next'
import { db } from '@/db'
import { products, editorials } from '@/db/schema'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.borokini.com'

    // Fetch all products and stories for dynamic sitemap
    const allProducts = await db.query.products.findMany({
        columns: { slug: true, updatedAt: true }
    })

    const allStories = await db.query.editorials.findMany({
        where: (editorials, { eq }) => eq(editorials.status, 'published'),
        columns: { slug: true, updatedAt: true }
    })

    const productEntries = allProducts.map((p) => ({
        url: `${baseUrl}/product/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    const storyEntries = allStories.map((s) => ({
        url: `${baseUrl}/editorials/${s.slug}`,
        lastModified: s.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/editorials`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }
    ]

    return [...staticRoutes, ...productEntries, ...storyEntries]
}
