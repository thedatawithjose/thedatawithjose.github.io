import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Quantitative Development Portfolio",
  description: "Explore trading systems, financial data pipelines and quantitative development projects.",
  canonical: "/portfolio/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
