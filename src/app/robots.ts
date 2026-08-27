import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], /* Protege el panel y las rutas de backend de Google */
    },
    sitemap: 'https://rasuady.com/sitemap.xml',
  }
}