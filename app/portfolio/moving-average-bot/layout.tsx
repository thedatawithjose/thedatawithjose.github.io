import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Moving Average Trading Bot",
  description: "Automated moving-average trading strategy project.",
  canonical: "/portfolio/moving-average-bot/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
