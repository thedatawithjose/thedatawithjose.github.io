import dynamic from 'next/dynamic';

// Lazy load heavy components with loading states
export const LazySkillsSection = dynamic(() => import('./SkillsSection'), {
  loading: () => (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

export const LazyInteractivePortfolio = dynamic(() => import('./InteractivePortfolio'), {
  loading: () => (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

export const LazyTechnicalBlog = dynamic(() => import('./TechnicalBlog'), {
  loading: () => (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

export const LazyTestimonialsSection = dynamic(() => import('./TestimonialsSection'), {
  loading: () => (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

// Optimized video background with intersection observer
export const LazyOptimizedVideoBackground = dynamic(() => import('./OptimizedVideoBackground'), {
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C]">
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  ),
  ssr: false,
});

// Performance optimized logos scroll
export const LazyLogosScrollOptimized = dynamic(() => import('./LazyComponents').then(mod => ({ default: mod.LazyLogosScroll })), {
  loading: () => (
    <div className="py-8">
      <div className="animate-pulse flex space-x-8 justify-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-16 h-16 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  ),
  ssr: false,
});