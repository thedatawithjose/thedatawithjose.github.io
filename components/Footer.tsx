'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import FooterContactForm from './FooterContactForm';
import CookieSettings from './CookieSettings';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#050B14] via-[#0A1526] to-[#0D1B30] text-white py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Glassmorphism Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Organic Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00E5A0]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#42A5F5]/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] hero-noise-pattern"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Enhanced Company Section */}
          <m.div 
            className="footer-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h4 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-[#00E5A0] via-[#42A5F5] to-[#8B5CF6] bg-clip-text text-transparent">
                Your Quant Development Partner
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Quantitative Developer building robust algorithmic trading systems — from research to execution. Backtesting infrastructure, live trading systems, and risk management backed by real-market experience.
              </p>
            </div>
            
            {/* Modern Social Icons */}
            <div className="flex space-x-4">
              <m.a 
                href="https://www.linkedin.com/in/datawithjose/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="group relative w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center hover:border-[#0077B5]/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0077B5]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i className="fab fa-linkedin text-xl text-gray-300 group-hover:text-[#0077B5] transition-colors duration-300 relative z-10"></i>
              </m.a>
              
              <m.a 
                href="https://github.com/thedatawithjose" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                className="group relative w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center hover:border-gray-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i className="fab fa-github text-xl text-gray-300 group-hover:text-gray-100 transition-colors duration-300 relative z-10"></i>
              </m.a>
              
              <m.a 
                href="https://www.instagram.com/datawithjose/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="group relative w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center hover:border-pink-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i className="fab fa-instagram text-xl text-gray-300 group-hover:text-pink-400 transition-colors duration-300 relative z-10"></i>
              </m.a>
            </div>
          </m.div>
          {/* Enhanced Useful Links */}
          <m.div 
            className="footer-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] bg-clip-text text-transparent">
              Useful Links
            </h4>
            <ul className="menu-list space-y-3">
              <li>
                <Link href="/portfolio" className="group flex items-center text-gray-300 hover:text-[#00E5A0] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00E5A0] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Portfolio</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="group flex items-center text-gray-300 hover:text-[#00E5A0] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00E5A0] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Me</span>
                </Link>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/datawithjose" target="_blank" rel="noopener noreferrer" className="group flex items-center text-gray-300 hover:text-[#00E5A0] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00E5A0] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/thedatawithjose" target="_blank" rel="noopener noreferrer" className="group flex items-center text-gray-300 hover:text-[#00E5A0] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00E5A0] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">GitHub</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center text-gray-300 hover:text-[#00E5A0] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00E5A0] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                </Link>
              </li>
            </ul>
          </m.div>
          {/* Enhanced Additional Pages */}
          <m.div 
            className="footer-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#42A5F5] to-[#8B5CF6] bg-clip-text text-transparent">
              Additional Pages
            </h4>
            <ul className="menu-list space-y-3">
              <li>
                <Link href="/trading-strategies" className="group flex items-center text-gray-300 hover:text-[#42A5F5] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#42A5F5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Trading Strategies</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="group flex items-center text-gray-300 hover:text-[#42A5F5] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#42A5F5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <div className="group flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#42A5F5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CookieSettings />
                </div>
              </li>
              <li>
                <Link href="/terms-of-service" className="group flex items-center text-gray-300 hover:text-[#42A5F5] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#42A5F5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </m.div>
          {/* Enhanced Contact Section */}
          <m.div 
            className="footer-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#00E5A0] bg-clip-text text-transparent text-center">
              Contact
            </h4>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5A0]/20 to-[#42A5F5]/20 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-1">
                <FooterContactForm />
              </div>
            </div>
          </m.div>
        </div>
        
        {/* Ready to Connect CTA Section */}
        <m.div 
          className="relative mt-16 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#00E5A0] via-[#42A5F5] to-[#8B5CF6] bg-clip-text text-transparent">
              Ready to Connect?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              For full-time Quantitative Developer opportunities or consulting engagements, let's discuss building robust algorithmic trading systems — from research to execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#5AB3F5] text-[#050B14] px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <i className="fas fa-calendar-check mr-2"></i>
                Schedule Call
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                <i className="fas fa-briefcase mr-2"></i>
                View Services
              </Link>
            </div>
          </div>
        </m.div>
        
        {/* Enhanced Copyright Section */}
        <m.div 
          className="relative mt-8 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Glassmorphism Divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Jose Acosta. All rights reserved.
              </div>

            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-gray-400 text-sm">
                Design & Development by
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] bg-clip-text text-transparent font-semibold">
                  Jose Acosta
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </footer>
  );
}