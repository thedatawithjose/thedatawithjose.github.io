import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for this website.",
  canonical: "/privacy-policy/",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
