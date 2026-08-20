import { Metadata } from 'next';
import { generateMetadata } from '../../lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "About Jose Acosta - Quantitative Developer",
  description: "Learn about Jose Acosta, a Quantitative Developer with 8 years of active market experience building algorithmic trading systems — from research to execution. Systematic strategy development, backtesting workflows, and automated execution across futures, FX, crypto, and equities.",
  keywords: [
    "Jose Acosta",
    "Quantitative Developer Experience",
    "Algorithmic Trading Systems",
    "Backtesting & Validation",
    "Systematic Strategy Development",
    "Automated Execution Systems",
    "Trading Risk Management",
    "Python Quant Developer",
    "About Quantitative Developer"
  ],
  canonical: "/about"
});

export { default } from './page';
