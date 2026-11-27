import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Mean Reversion — Ornstein-Uhlenbeck",
  description: "Quantitative mean-reversion strategy project.",
  canonical: "/portfolio/mean-reversion-ou/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
