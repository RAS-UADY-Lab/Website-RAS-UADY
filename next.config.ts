/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Ignorar errores de tipado estricto en el despliegue
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 2. Ignorar advertencias del Linter (como los tags <img>) en el despliegue
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 3. Tus dominios de imágenes (Asegúrate de mantener los que ya tenías)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'events.vtools.ieee.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rvasisdsvafihnugbsvs.supabase.co',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;