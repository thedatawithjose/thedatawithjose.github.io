/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para GitHub Pages con dominio personalizado
  // output: 'export', // Comentado temporalmente para desarrollo local
  trailingSlash: true,
  // basePath y assetPrefix removidos porque usamos dominio personalizado
  // que sirve desde la raíz
  
  // Image optimization settings
  images: {
    unoptimized: true, // Requerido para export estático
    qualities: [75, 95], // Calidades permitidas para optimización
  },
};

module.exports = nextConfig;
