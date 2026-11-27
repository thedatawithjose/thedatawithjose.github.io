import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Moving Average Crossover Backtest",
  description: "Historical research project evaluating a moving-average crossover strategy.",
  canonical: "/portfolio/moving-average-bot/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
