import type { MetadataRoute } from 'next';
import { getAllArticleIds } from '../lib/articles';
import { siteConfig } from '../lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/about/', '/portfolio/', '/services/', '/contact/', '/blog/', '/privacy-policy/', '/terms-of-service/', '/portfolio/financial-data-pipeline/', '/portfolio/edgar-sec-parser/', '/portfolio/mean-reversion-ou/', '/portfolio/moving-average-bot/', ...getAllArticleIds().map(({ params }) => `/blog/${params.slug}/`)];
  return paths.map(path => ({ url: new URL(path, siteConfig.url).href }));
}
