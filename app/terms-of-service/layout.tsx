import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Terms of Service",
  description: "Terms of service for quantitative development consulting.",
  canonical: "/terms-of-service/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
