import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Financial Data Pipeline",
  description: "Financial data pipeline project.",
  canonical: "/portfolio/financial-data-pipeline/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
