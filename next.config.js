/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para GitHub Pages con dominio personalizado
  output: 'export', // Habilitar export estático
  trailingSlash: true,
  
  // Image optimization settings
  images: {
    unoptimized: true, // Requerido para export estático
    qualities: [75, 95],
  },
};

module.exports = nextConfig;
