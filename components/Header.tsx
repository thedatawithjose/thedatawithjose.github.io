'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper function for navigation link classes
  const getNavLinkClasses = (href: string, isActive: boolean) => {
    return `relative px-4 py-2 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#00E5A0] focus:ring-offset-2 focus:ring-offset-[#050B14] ${
      isActive 
        ? 'text-[#00E5A0] font-semibold' 
        : 'text-gray-300 font-medium hover:text-[#00E5A0]'
    }`;
  };

  // Helper function for mobile navigation link classes
  const getMobileNavLinkClasses = (isActive: boolean) => {
    return `relative text-gray-300 hover:text-[#00E5A0] transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-[#00E5A0]/10 focus:outline-none focus:ring-2 focus:ring-[#00E5A0] focus:ring-offset-2 focus:ring-offset-[#0A1526] ${
      isActive ? 'text-[#00E5A0] bg-[#00E5A0]/10' : ''
    }`;
  };

  // Enhanced keyboard navigation and menu management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMenuOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsMenuOpen(false);
          // Focus back to menu button
          const menuButton = document.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
          if (menuButton) menuButton.focus();
          break;
        
        case 'Tab':
          // Trap focus within mobile menu
          const mobileMenu = document.getElementById('mobile-menu');
          if (mobileMenu) {
            const focusableElements = mobileMenu.querySelectorAll(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
          break;
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav') && !target.closest('button[aria-controls="mobile-menu"]')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
      
      // Focus first menu item when menu opens
      setTimeout(() => {
        const firstMenuItem = document.querySelector('#mobile-menu a') as HTMLElement;
        if (firstMenuItem) firstMenuItem.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Load FontAwesome
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Sub-header */}
      <div className="sub-header bg-[#050B14] py-3 border-b border-[#1E2D45]">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center">
            <ul className="right-icons flex space-x-4 md:space-x-6">
              <li>
                <a 
                  href="https://www.linkedin.com/in/datawithjose" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visit Jose Acosta's LinkedIn profile (opens in new tab)"
                  className="group relative p-2 rounded-lg hover:bg-blue-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A1526]"
                >
                  <i className="fab fa-linkedin text-lg md:text-xl text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300" aria-hidden="true"></i>
                  <div className="absolute inset-0 rounded-lg bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/datawithjose" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visit Jose Acosta's Instagram profile (opens in new tab)"
                  className="group relative p-2 rounded-lg hover:bg-pink-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-[#0A1526]"
                >
                  <i className="fab fa-instagram text-lg md:text-xl text-pink-400 group-hover:text-pink-300 group-hover:scale-110 transition-all duration-300" aria-hidden="true"></i>
                  <div className="absolute inset-0 rounded-lg bg-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/thedatawithjose" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visit Jose Acosta's GitHub profile (opens in new tab)"
                  className="group relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-[#0A1526]"
                >
                  <i className="fab fa-github text-lg md:text-xl text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" aria-hidden="true"></i>
                  <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-[#050B14] shadow-lg border-b border-[#1E2D45] sticky top-0 w-full z-40 transition-all duration-300">
        <nav className="container mx-auto px-4 py-3">
          <div className="relative flex items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="relative -left-4 flex items-center group focus:outline-none focus:ring-2 focus:ring-[#00E5A0] focus:ring-offset-2 focus:ring-offset-[#050B14] rounded-lg"
                aria-label="Jose Acosta Quantitative Developer - Go to homepage"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-12 md:w-28 md:h-14 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <Image 
                      src="/images/New-IMAGE.png"
                      alt="Jose Acosta Quantitative Developer Logo"
                      width={136}
                      height={65}
                      className="w-full h-full object-contain group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>
              </Link>
            </div>

              {/* Desktop Menu */}
              <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              <Link 
                href="/" 
                prefetch={false}
                className={getNavLinkClasses('/', pathname === '/')}
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                <span className="relative z-10">Home</span>
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#00E5A0] transition-all duration-300 ${
                  pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                }`} aria-hidden="true"></span>
              </Link>
              <Link 
                href="/about" 
                prefetch={false}
                className={getNavLinkClasses('/about', pathname === '/about')}
                aria-current={pathname === '/about' ? 'page' : undefined}
              >
                <span className="relative z-10 whitespace-nowrap">About Me</span>
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#00E5A0] transition-all duration-300 ${
                  pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
                }`} aria-hidden="true"></span>
              </Link>
              <Link 
                href="/services" 
                prefetch={false}
                className={getNavLinkClasses('/services', pathname === '/services')}
                aria-current={pathname === '/services' ? 'page' : undefined}
              >
                <span className="relative z-10">Services</span>
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#00E5A0] transition-all duration-300 ${
                  pathname === '/services' ? 'w-full' : 'w-0 group-hover:w-full'
                }`} aria-hidden="true"></span>
              </Link>
              <Link 
                href="/portfolio" 
                prefetch={false}
                className={getNavLinkClasses('/portfolio', pathname === '/portfolio')}
                aria-current={pathname === '/portfolio' ? 'page' : undefined}
              >
                <span className="relative z-10">Portfolio</span>
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#00E5A0] transition-all duration-300 ${
                  pathname === '/portfolio' ? 'w-full' : 'w-0 group-hover:w-full'
                }`} aria-hidden="true"></span>
              </Link>
              <Link 
                href="/blog" 
                prefetch={false}
                className={getNavLinkClasses('/blog', pathname.startsWith('/blog'))}
                aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
              >
                <span className="relative z-10">Blog</span>
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#00E5A0] transition-all duration-300 ${
                  pathname.startsWith('/blog') ? 'w-full' : 'w-0 group-hover:w-full'
                }`} aria-hidden="true"></span>
              </Link>
              </nav>

            {/* CTA Buttons */}
            <div className="ml-auto hidden lg:flex items-center gap-3">
              <a 
                href="/downloads/quant_cv.pdf"
                download
                className="relative bg-transparent text-gray-200 px-5 py-2.5 rounded-xl hover:bg-white/5 hover:shadow-lg transition-all duration-300 font-semibold group overflow-hidden border-2 border-[#00E5A0]/30 hover:border-[#00E5A0]/60"
              >
                <span className="relative z-10 flex items-center">
                  <i className="fas fa-download mr-2 text-sm"></i>
                  Resume
                </span>
              </a>
              <Link 
                href="/contact" 
                className="relative bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] text-[#050B14] px-6 py-2.5 rounded-xl hover:from-[#00FFB3] hover:to-[#5AB3F5] hover:shadow-xl hover:shadow-[#00E5A0]/25 hover:scale-105 transition-all duration-300 font-semibold group overflow-hidden border border-white/20"
              >
                <span className="relative z-10 flex items-center">
                  Let's Talk
                  <i className="fas fa-arrow-right ml-2 text-sm group-hover:translate-x-1 transition-all duration-300"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="ml-auto lg:hidden flex items-center space-x-4">
              <button
                type="button"
                onClick={toggleMenu}
                className="text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00E5A0] focus:ring-offset-2 focus:ring-offset-[#050B14] rounded-lg p-2 hover:bg-white/10 transition-colors duration-200"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen ? "true" : "false"}
                aria-controls="mobile-menu"
                aria-haspopup="true"
              >
                {isMenuOpen ? (
                  <i className="fas fa-times text-2xl" aria-hidden="true"></i>
                ) : (
                  <i className="fas fa-bars text-2xl" aria-hidden="true"></i>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <m.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="lg:hidden mt-4 pb-4 bg-gradient-to-b from-[#0A1526] to-[#050B14] rounded-xl shadow-lg border border-[#1E2D45] mx-2"
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col space-y-2 p-4">
                <Link 
                  href="/" 
                  prefetch={false}
                  className={getMobileNavLinkClasses(pathname === '/')}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === '/' ? 'page' : undefined}
                >
                  <i className="fas fa-home mr-3 text-sm" aria-hidden="true"></i>
                  Home
                </Link>
                <Link 
                  href="/about" 
                  prefetch={false}
                  className={getMobileNavLinkClasses(pathname === '/about')}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === '/about' ? 'page' : undefined}
                >
                  <i className="fas fa-user mr-3 text-sm" aria-hidden="true"></i>
                  <span className="whitespace-nowrap">About Me</span>
                </Link>
                <Link 
                  href="/services" 
                  prefetch={false}
                  className={getMobileNavLinkClasses(pathname === '/services')}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === '/services' ? 'page' : undefined}
                >
                  <i className="fas fa-cogs mr-3 text-sm" aria-hidden="true"></i>
                  Services
                </Link>
                <Link 
                  href="/portfolio" 
                  prefetch={false}
                  className={getMobileNavLinkClasses(pathname === '/portfolio')}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === '/portfolio' ? 'page' : undefined}
                >
                  <i className="fas fa-briefcase mr-3 text-sm" aria-hidden="true"></i>
                  Portfolio
                </Link>
                <Link 
                  href="/blog" 
                  prefetch={false}
                  className={getMobileNavLinkClasses(pathname.startsWith('/blog'))}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
                >
                  <i className="fas fa-newspaper mr-3 text-sm" aria-hidden="true"></i>
                  Blog
                </Link>
                <a 
                  href="/downloads/quant_cv.pdf"
                  download
                  className="bg-transparent text-gray-200 border-2 border-[#00E5A0]/30 px-6 py-3 rounded-lg hover:bg-white/5 hover:shadow-lg transition-all duration-300 font-semibold text-center mt-2 focus:outline-none focus:ring-2 focus:ring-[#00E5A0] focus:ring-offset-2 focus:ring-offset-[#0A1526]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-download mr-2" aria-hidden="true"></i>
                  Download Resume
                </a>
                <Link 
                  href="/contact" 
                  prefetch={false}
                  className="bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] text-[#050B14] px-6 py-3 rounded-lg hover:from-[#00FFB3] hover:to-[#5AB3F5] hover:shadow-lg transition-all duration-300 font-semibold text-center mt-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00E5A0]"
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === '/contact' ? 'page' : undefined}
                >
                  <i className="fas fa-paper-plane mr-2" aria-hidden="true"></i>
                  Contact
                </Link>
              </div>
            </m.div>
          )}
        </nav>
      </header>
    </>
  );
}