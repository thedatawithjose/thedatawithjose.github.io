'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FooterContactForm from './FooterContactForm';
import CookieSettings from './CookieSettings';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0A192F] text-white py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* 2026 Background Effects */}
      <div className="absolute inset-0">
        {/* Glassmorphism Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Organic Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00BFA5]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#42A5F5]/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] hero-noise-pattern"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Enhanced Company Section */}
          <motion.div 
            className="footer-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h4 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-[#00BFA5] via-[#42A5F5] to-[#8B5CF6] bg-clip-text text-transparent">
                Your Data Solutions Partner
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Data Engineer focused on building robust data pipelines, scalable architectures, and automated workflows. Enabling teams to make smarter, data-driven decisions through reliable systems and practical engineering skills.
              </p>
            </div>
            
            {/* Modern Social Icons */}
            <div className="flex space-x-4">
              <motion.a 
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
              </motion.a>
              
              <motion.a 
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
              </motion.a>
              
              <motion.a 
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
              </motion.a>
            </div>
          </motion.div>
          {/* Enhanced Useful Links */}
          <motion.div 
            className="footer-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] bg-clip-text text-transparent">
              Useful Links
            </h4>
            <ul className="menu-list space-y-3">
              <li>
                <Link href="/portfolio" className="group flex items-center text-gray-300 hover:text-[#00BFA5] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00BFA5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Portfolio</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="group flex items-center text-gray-300 hover:text-[#00BFA5] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00BFA5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Me</span>
                </Link>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/datawithjose" target="_blank" rel="noopener noreferrer" className="group flex items-center text-gray-300 hover:text-[#00BFA5] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00BFA5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/thedatawithjose" target="_blank" rel="noopener noreferrer" className="group flex items-center text-gray-300 hover:text-[#00BFA5] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00BFA5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">GitHub</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center text-gray-300 hover:text-[#00BFA5] transition-all duration-300">
                  <div className="w-1.5 h-1.5 bg-[#00BFA5] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                </Link>
              </li>
            </ul>
          </motion.div>
          {/* Enhanced Additional Pages */}
          <motion.div 
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
                <div className="flex items-center text-gray-500">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-3 opacity-50"></div>
                  <span className="italic text-sm">Terms of Service (Coming Soon)</span>
                </div>
              </li>
            </ul>
          </motion.div>
          {/* Enhanced Contact Section */}
          <motion.div 
            className="footer-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#8B5CF6] to-[#00BFA5] bg-clip-text text-transparent text-center">
              Contact
            </h4>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00BFA5]/20 to-[#42A5F5]/20 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-1">
                <FooterContactForm />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced Copyright Section */}
        <motion.div 
          className="relative mt-16 pt-8"
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
              <div className="hidden md:block w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                Made with ❤️ in 2026
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-gray-400 text-sm">
                Design & Development by
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] bg-clip-text text-transparent font-semibold">
                  Jose Acosta
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}