//src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rasuady.com'
  const ahora = new Date()

  return [
    { url: baseUrl, lastModified: ahora, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/CABR`, lastModified: ahora, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/nosotros`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/actividades`, lastModified: ahora, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/proyectos`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/membresia`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contacto`, lastModified: ahora, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/enlaces`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/nodum`, lastModified: ahora, changeFrequency: 'monthly', priority: 0.6 },
  ]
}