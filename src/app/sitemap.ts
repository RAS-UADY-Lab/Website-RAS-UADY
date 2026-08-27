import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rasuady.com/'

  return [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/nosotros`, lastModified: new Date() },
    { url: `${baseUrl}/actividades`, lastModified: new Date() },
    { url: `${baseUrl}/proyectos`, lastModified: new Date() },
    { url: `${baseUrl}/membresia`, lastModified: new Date() },
    { url: `${baseUrl}/contacto`, lastModified: new Date() },
    { url: `${baseUrl}/enlaces`, lastModified: new Date() },
    { url: `${baseUrl}/nodum`, lastModified: new Date() }
  ]
}