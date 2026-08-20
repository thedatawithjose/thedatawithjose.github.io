import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jose Acosta - Quantitative Developer',
    short_name: 'Jose Acosta',
    description: 'Quantitative Developer building robust algorithmic trading systems — from research to execution.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050B14',
    theme_color: '#050B14',
    orientation: 'portrait-primary',
    categories: ['business', 'productivity', 'portfolio'],
    lang: 'en-US',
    icons: [
      {
        src: '/images/logo_v2.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
    ],
    screenshots: [
      {
        src: '/images/portfolio-screenshot.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Portfolio Homepage',
      },
    ],
  }
}