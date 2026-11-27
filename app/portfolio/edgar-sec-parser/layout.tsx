import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "EDGAR SEC Parser",
  description: "Financial document parsing project for SEC EDGAR filings.",
  canonical: "/portfolio/edgar-sec-parser/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
