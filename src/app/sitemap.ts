import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ras-uady.ras-fiuady.workers.dev/' /* Sustituir por dominio final */

  return [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/nosotros`, lastModified: new Date() },
    { url: `${baseUrl}/actividades`, lastModified: new Date() },
    { url: `${baseUrl}/proyectos`, lastModified: new Date() },
    { url: `${baseUrl}/membresia`, lastModified: new Date() },
    { url: `${baseUrl}/contacto`, lastModified: new Date() }
  ]
}