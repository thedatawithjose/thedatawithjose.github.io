import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/seo';
export const metadata = generateMetadata({title:'Trading Strategy Validation Toolkit',description:'Free algorithmic trading research self-assessment. Identify backtesting, data integrity, execution and risk gaps before building your trading system.',canonical:'/tools/strategy-validation/'});
export default function Layout({children}:{children:ReactNode}) {return children;}
