'use client';

import { m } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CalendlyBookingProps {
  className?: string;
  variant?: 'inline' | 'popup' | 'cta';
  url?: string;
}

export default function CalendlyBooking({ 
  className = '', 
  variant = 'inline',
  url = 'https://calendly.com/datawithjose/consultation' 
}: CalendlyBookingProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const openCalendlyPopup = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url });
    }
  };

  if (variant === 'popup') {
    return (
      <m.button
        onClick={openCalendlyPopup}
        className={`group bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] hover:from-[#00D4B4] hover:to-[#2196F3] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center ${className}`}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        disabled={!isLoaded}
      >
        <i className="fas fa-calendar-alt mr-3"></i>
        Schedule Free Consultation
        <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
      </m.button>
    );
  }

  if (variant === 'cta') {
    return (
      <section className={`py-24 bg-gradient-to-br from-[#0A192F] to-[#1A3A52] text-white ${className}`}>
        <div className="container mx-auto px-4">
          <m.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Book a free 30-minute consultation to discuss your strategy or trading infrastructure
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <m.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <i className="fas fa-comments text-3xl text-[#00BFA5] mb-4"></i>
                <h3 className="font-bold mb-2">Free Consultation</h3>
                <p className="text-sm text-gray-300">30 minutes of expert advice at no cost</p>
              </m.div>
              <m.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <i className="fas fa-lightbulb text-3xl text-[#42A5F5] mb-4"></i>
                <h3 className="font-bold mb-2">Custom Strategy</h3>
                <p className="text-sm text-gray-300">Tailored approach for your specific needs</p>
              </m.div>
              <m.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <i className="fas fa-clock text-3xl text-[#005A9C] mb-4"></i>
                <h3 className="font-bold mb-2">Quick Response</h3>
                <p className="text-sm text-gray-300">Usually responds within 2 hours</p>
              </m.div>
            </div>

            <m.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={openCalendlyPopup}
                disabled={!isLoaded}
                className="group bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] hover:from-[#00D4B4] hover:to-[#2196F3] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center disabled:opacity-50"
              >
                <i className="fas fa-calendar-alt mr-3"></i>
                {isLoaded ? 'Book Free Consultation' : 'Loading Calendar...'}
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>

              <a
                href="mailto:datawithjose@outlook.com?subject=Quick Question About Quantitative Development Services&body=Hi Jose,%0D%0A%0D%0AI have a quick question about your quantitative development services:%0D%0A%0D%0A[Your question here]%0D%0A%0D%0ABest regards"
                className="group border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm flex items-center"
              >
                <i className="fas fa-envelope mr-3"></i>
                Send Quick Email
              </a>
            </m.div>

            {/* What to Expect */}
            <m.div
              className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">What to Expect in Our Call</h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-[#00BFA5] mb-3">We'll Discuss:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#00BFA5] mr-2 mt-1 flex-shrink-0"></i>
                      <span>Your current data challenges and pain points</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#00BFA5] mr-2 mt-1 flex-shrink-0"></i>
                      <span>Technical requirements and constraints</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#00BFA5] mr-2 mt-1 flex-shrink-0"></i>
                      <span>Timeline and budget considerations</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#00BFA5] mr-2 mt-1 flex-shrink-0"></i>
                      <span>Success metrics and expected outcomes</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#42A5F5] mb-3">You'll Get:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <i className="fas fa-gift text-[#42A5F5] mr-2 mt-1 flex-shrink-0"></i>
                      <span>Immediate actionable recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-gift text-[#42A5F5] mr-2 mt-1 flex-shrink-0"></i>
                      <span>High-level architecture suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-gift text-[#42A5F5] mr-2 mt-1 flex-shrink-0"></i>
                      <span>Rough timeline and cost estimates</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-gift text-[#42A5F5] mr-2 mt-1 flex-shrink-0"></i>
                      <span>Next steps and project roadmap</span>
                    </li>
                  </ul>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>
      </section>
    );
  }

  // Inline variant
  return (
    <m.div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="p-6 bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Schedule Your Consultation</h3>
        <p className="text-blue-100">Pick a time that works for you</p>
      </div>
      
      {isLoaded ? (
        <div 
          className="calendly-inline-widget" 
          data-url={url}
          style={{ minWidth: '320px', height: '630px' }}
        ></div>
      ) : (
        <div className="h-96 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#00BFA5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading calendar...</p>
          </div>
        </div>
      )}
    </m.div>
  );
}