
'use client';

import { getSortedArticlesData, Article } from '@/lib/articles';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect, useRef, useCallback } from 'react';

// Metadata moved to layout or parent component since this is now a client component

export default function Blog() {
  const allArticles: Article[] = getSortedArticlesData();
  
  // Pull-to-refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  
  // Swipe navigation state
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const articlesPerPage = 6;
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const articlesGridRef = useRef<HTMLDivElement>(null);
  
  // Get current articles for pagination
  const getCurrentArticles = () => {
    const start = currentPage * articlesPerPage;
    const end = start + articlesPerPage;
    return allArticles.slice(start, end);
  };

  // Pull-to-refresh handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling || window.scrollY > 0) return;
    
    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance * 0.5, 100)); // Max 100px pull
    }
  }, [isPulling, startY]);

  const handleTouchEnd = useCallback(() => {
    if (pullDistance > 60) {
      // Trigger refresh
      setIsRefreshing(true);
      
      // Simulate refresh (in real app, you'd fetch new data)
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        setIsPulling(false);
        
        // Show success message
        const message = document.createElement('div');
        message.textContent = '✨ Blog refreshed!';
        message.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg z-50 animate-bounce';
        document.body.appendChild(message);
        setTimeout(() => document.body.removeChild(message), 2000);
      }, 1500);
    } else {
      // Reset pull
      setPullDistance(0);
      setIsPulling(false);
    }
  }, [pullDistance]);

  // Swipe navigation handlers
  const handleSwipeStart = useCallback((e: TouchEvent) => {
    if (isTransitioning) return;
    setStartY(e.touches[0].clientX);
  }, [isTransitioning]);

  const handleSwipeMove = useCallback((e: TouchEvent) => {
    // Prevent default to avoid scrolling issues
    if (Math.abs(e.touches[0].clientX - startY) > 50) {
      e.preventDefault();
    }
  }, [startY]);

  const handleSwipeEnd = useCallback((e: TouchEvent) => {
    if (isTransitioning) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startY - endX;
    const threshold = 100;

    if (Math.abs(diffX) > threshold) {
      setIsTransitioning(true);
      
      if (diffX > 0 && currentPage < totalPages - 1) {
        // Swipe left - next page
        setCurrentPage(prev => prev + 1);
      } else if (diffX < 0 && currentPage > 0) {
        // Swipe right - previous page
        setCurrentPage(prev => prev - 1);
      }
      
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [startY, currentPage, totalPages, isTransitioning]);

  // Setup touch event listeners
  useEffect(() => {
    const container = containerRef.current;
    const articlesGrid = articlesGridRef.current;
    
    if (container) {
      // Pull-to-refresh events
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }
    
    if (articlesGrid) {
      // Swipe navigation events
      articlesGrid.addEventListener('touchstart', handleSwipeStart);
      articlesGrid.addEventListener('touchmove', handleSwipeMove, { passive: false });
      articlesGrid.addEventListener('touchend', handleSwipeEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      if (articlesGrid) {
        articlesGrid.removeEventListener('touchstart', handleSwipeStart);
        articlesGrid.removeEventListener('touchmove', handleSwipeMove);
        articlesGrid.removeEventListener('touchend', handleSwipeEnd);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleSwipeStart, handleSwipeMove, handleSwipeEnd]);

  // Add metadata to head
  useEffect(() => {
    document.title = 'Technical Blog | Jose Acosta - Data Engineer';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Insights on data engineering, algorithmic trading, and high-performance systems by Jose Acosta.');
    }
  }, []);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Jose Acosta Technical Blog",
    "description": "Insights on data engineering, algorithmic trading, and high-performance systems",
    "url": "https://joseacosta.dev/blog",
    "author": {
      "@type": "Person",
      "name": "Jose Acosta",
      "url": "https://joseacosta.dev"
    },
    "blogPost": allArticles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "datePublished": article.date,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "url": `https://joseacosta.dev/blog/${article.id}`
    }))
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Pull-to-Refresh Indicator */}
      {(isPulling || isRefreshing) && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white transition-all duration-300"
          style={{ 
            height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
            transform: `translateY(${isRefreshing ? 0 : -60 + pullDistance}px)`
          }}
        >
          <div className="flex items-center space-x-2">
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="text-sm font-medium">Refreshing...</span>
              </>
            ) : (
              <>
                <i className={`fas fa-arrow-down transition-transform duration-200 ${pullDistance > 60 ? 'rotate-180' : ''}`}></i>
                <span className="text-sm font-medium">
                  {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
                </span>
              </>
            )}
          </div>
        </div>
      )}
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white py-16 md:py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-400/15 to-blue-400/15 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-md animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full blur-lg animate-pulse"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full bg-grid-pattern"></div>
          </div>
          
          {/* Diagonal shine effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-200 md:text-gray-300">
              <Link href="/" className="hover:text-[#00BFA5] transition-colors tactile-feedback mobile-focus px-2 py-1 rounded">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#00BFA5]">Blog</span>
            </div>
          </nav>

          <div className="relative mb-8">
            {/* Floating badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">Latest Technical Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight relative">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl relative inline-block transform hover:scale-105 transition-transform duration-300">
                Technical Articles &
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 blur-xl opacity-50"></div>
              </span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl mt-2 relative inline-block transform hover:scale-105 transition-transform duration-300">
                Real-World Insights
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse opacity-40"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 blur-xl opacity-60"></div>
              </span>
            </h1>
          </div>
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed max-w-4xl mx-auto">
              Deep dives into data engineering, algorithmic trading, and production ML systems.
            </p>
            <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 inline-block relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-2 left-4 text-4xl text-green-400/30 font-serif">"</div>
              <div className="absolute bottom-2 right-4 text-4xl text-green-400/30 font-serif">"</div>
              
              <p className="text-gray-200 leading-relaxed italic relative z-10 max-w-2xl">
                Learn from real-world implementations, production challenges, and lessons learned 
                from <span className="text-green-400 font-semibold">6+ years</span> of putting capital behind time-series models.
              </p>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-blue-400/5 to-purple-400/5 rounded-2xl"></div>
            </div>
          </div>
          
          {/* Blog Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="group text-center p-6 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden tactile-feedback mobile-touch-feedback cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-3xl font-black text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">{allArticles.length}+</div>
                <div className="text-gray-300 font-medium">Technical Articles</div>
                <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="group text-center p-6 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden tactile-feedback mobile-touch-feedback cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-3xl font-black text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">6+</div>
                <div className="text-gray-300 font-medium">Years Experience</div>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="group text-center p-6 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden tactile-feedback mobile-touch-feedback cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-3xl font-black text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">Real</div>
                <div className="text-gray-300 font-medium">Production Systems</div>
                <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <span className="group px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 rounded-full text-sm md:text-sm font-semibold border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 backdrop-blur-sm relative overflow-hidden min-h-[44px] flex items-center badge-tactile mobile-touch-feedback cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                <i className="fas fa-stream mr-2 group-hover:animate-pulse"></i>Real-time Pipelines
              </span>
            </span>
            <span className="group px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-full text-sm md:text-sm font-semibold border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm relative overflow-hidden min-h-[44px] flex items-center badge-tactile mobile-touch-feedback cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                <i className="fas fa-chart-line mr-2 group-hover:animate-pulse"></i>Trading Systems
              </span>
            </span>
            <span className="group px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 rounded-full text-sm md:text-sm font-semibold border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 backdrop-blur-sm relative overflow-hidden min-h-[44px] flex items-center badge-tactile mobile-touch-feedback cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                <i className="fas fa-robot mr-2 group-hover:animate-pulse"></i>ML in Production
              </span>
            </span>
            <span className="group px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300 rounded-full text-sm md:text-sm font-semibold border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 backdrop-blur-sm relative overflow-hidden min-h-[44px] flex items-center badge-tactile mobile-touch-feedback cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                <i className="fas fa-database mr-2 group-hover:animate-pulse"></i>Data Architecture
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Swipe Navigation Indicator */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mb-8 space-x-4">
              <button
                onClick={() => currentPage > 0 && setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 0}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all button-tactile"
                aria-label="Previous page"
              >
                <i className="fas fa-chevron-left text-gray-600"></i>
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentPage 
                        ? 'bg-[#00BFA5] scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => currentPage < totalPages - 1 && setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all button-tactile"
                aria-label="Next page"
              >
                <i className="fas fa-chevron-right text-gray-600"></i>
              </button>
            </div>
          )}
          
          {/* Swipe Instructions for Mobile */}
          <div className="md:hidden text-center mb-6">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <i className="fas fa-hand-paper mr-2"></i>
              Swipe left/right to navigate articles
            </p>
          </div>
          
          <div 
            ref={articlesGridRef}
            className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300 ${
              isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {getCurrentArticles().map(({ id, date, title, excerpt, image, author }) => (
              <Link href={`/blog/${id}`} key={id} className="group">
                <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-gray-100 card-tactile ripple-effect mobile-focus">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={image}
                      alt={`Cover image for ${title}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-700 md:text-gray-500 mb-3">
                      <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>•</span>
                      <span>{author}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#005A9C] transition-colors duration-300 mb-3 line-clamp-2">
                      {title}
                    </h2>
                    
                    <p className="text-gray-800 md:text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#00BFA5] group-hover:text-[#005A9C] transition-colors">
                        Read Article
                      </span>
                      <i className="fas fa-arrow-right text-[#00BFA5] group-hover:text-[#005A9C] group-hover:translate-x-1 transition-all"></i>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Enhanced Newsletter & Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Discuss These Topics?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you have questions about implementation details or want to explore how these concepts 
              apply to your specific use case — let's connect.
            </p>

            {/* Action Options */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Discuss Your Project</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Have a specific data engineering challenge? Let's talk about how these approaches might apply to your situation.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors button-tactile ripple-effect mobile-focus"
                >
                  <i className="fas fa-arrow-right mr-2"></i>
                  Start Conversation
                </Link>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-bell text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Get notified when I publish new deep-dives into production systems and real-world implementations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
                  <input 
                    id="newsletter-email"
                    type="email" 
                    placeholder="your@email.com"
                    aria-label="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-600"
                  />
                  <button 
                    type="button"
                    aria-label="Subscribe to newsletter"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 button-tactile ripple-effect mobile-focus"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-white/20 pt-8">
              <p className="text-gray-300 mb-4">Follow for more insights:</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://linkedin.com/in/joseacostar"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow on LinkedIn"
                  aria-label="Follow Jose Acosta on LinkedIn"
                  className="w-12 h-12 md:w-12 md:h-12 min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 icon-tactile ripple-effect mobile-focus"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="https://github.com/thedatawithjose"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View GitHub Profile"
                  aria-label="View Jose Acosta's GitHub Profile"
                  className="w-12 h-12 md:w-12 md:h-12 min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600 icon-tactile ripple-effect mobile-focus"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a
                  href="https://instagram.com/datawithjose"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow on Instagram"
                  aria-label="Follow Jose Acosta on Instagram"
                  className="w-12 h-12 md:w-12 md:h-12 min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-600 icon-tactile ripple-effect mobile-focus"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
