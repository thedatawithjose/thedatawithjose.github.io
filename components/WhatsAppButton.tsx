'use client';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hi Jose! I'm interested in your data engineering services. Could we schedule a call to discuss my project?"
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      // Show button when user has scrolled 70% of the page
      setIsVisible(scrollPercent > 0.7);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <m.div
      className="fixed bottom-4 right-4 z-40"
      initial={{ scale: 0, opacity: 0, y: 100 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 100 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
    >
      <m.a
        href={`https://wa.me/584123020280?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Contact me on WhatsApp"
      >
        {/* WhatsApp Icon - Smaller */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full">
          <i className="fab fa-whatsapp text-lg"></i>
        </div>

        {/* Expandable Text - Only on desktop and only on hover */}
        <m.div
          className="overflow-hidden whitespace-nowrap hidden lg:block"
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: isHovered ? "auto" : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <span className="px-2 py-1 text-xs font-medium">
            WhatsApp
          </span>
        </m.div>

        {/* Very subtle pulse */}
        <m.div
          className="absolute inset-0 bg-green-400 rounded-full -z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.15 }}
        />
      </m.a>
    </m.div>
  );
}