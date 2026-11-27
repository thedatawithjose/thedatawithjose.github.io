import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Contact",
  description: "Contact Jose Acosta about quantitative development and trading system projects.",
  canonical: "/contact/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
