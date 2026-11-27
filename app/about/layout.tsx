import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "About Jose Acosta",
  description: "Learn about Jose Acosta's quantitative development and algorithmic trading experience.",
  canonical: "/about/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
