import dynamic from 'next/dynamic';

// Lazy load heavy components
export const LazyLogosScroll = dynamic(() => import('../components/LogosScroll'), {
  loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded"></div>
});

export const LazyFooter = dynamic(() => import('../components/Footer'), {
  loading: () => <div className="h-32 bg-gray-800 animate-pulse"></div>
});