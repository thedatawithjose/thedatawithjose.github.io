import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Quantitative Development Services",
  description: "Explore quantitative development, backtesting and automated trading system services.",
  canonical: "/services/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
