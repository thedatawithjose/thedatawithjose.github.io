'use client';

import { m } from 'framer-motion';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import StructuredData from '../../components/StructuredData';
import { generateFAQSchema } from '../../lib/structured-data';
import { ToastProvider } from '../../components/ToastNotification';

export default function Contact() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, []);
  return (
    <>
      <StructuredData data={generateFAQSchema()} />
      <ToastProvider>
        <div className="min-h-screen bg-[#050B14] text-[#E6EDF3]">
      {/* Preloader - can be handled globally */}
      <div id="preloader" className="fixed inset-0 bg-[#050B14] z-50 flex items-center justify-center">
        <div className="jumper flex space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
        </div>
      </div>

      <Header />

      {/* Enhanced Hero Section */}
      <m.div
        className="relative bg-gradient-to-br from-[#050B14] via-[#0A1526] to-[#0D1B30] text-white py-24 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <m.div
              className="mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight relative">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl relative">
                  Let's Build Something
                </span>
                <span className="block bg-gradient-to-r from-[#00E5A0] via-[#00C98C] to-[#42A5F5] bg-clip-text text-transparent drop-shadow-2xl mt-2 relative">
                  Robust Together
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse opacity-30"></div>
                </span>
              </h1>
            </m.div>
            
            <m.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-xl md:text-2xl text-gray-200 mb-4 leading-relaxed">
                Ready to discuss your strategy or trading infrastructure?
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 inline-block">
                <p className="text-gray-200 text-sm leading-relaxed italic">
                  "Whether it's strategy validation, backtesting, automated execution, or risk management —
                  let's talk about building systems that survive the real world."
                </p>
              </div>
            </m.div>

            {/* Quick Stats */}
            <m.div
              className="grid md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-green-400 mb-1">&lt; 24hrs</div>
                <div className="text-gray-300 text-sm">Response Time</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-blue-400 mb-1">8+ Years</div>
                <div className="text-gray-300 text-sm">Market Experience</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-purple-400 mb-1">Walk-Forward</div>
                <div className="text-gray-300 text-sm">Validation Standard</div>
              </div>
            </m.div>

            {/* CTA Buttons */}
            <m.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href="https://wa.me/584123020280?text=Hi%20Jose,%20I'm%20interested%20in%20discussing%20a%20quantitative%20development%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#00E5A0] to-[#00C98C] hover:from-[#00FFB3] hover:to-[#00E5A0] text-[#050B14] px-8 py-4 rounded-xl font-bold transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                Quick WhatsApp Chat
                <i className="fas fa-external-link-alt ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
              </a>
              <a
                href="#contact-form"
                className="group border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center backdrop-blur-sm flex items-center justify-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                Send Detailed Message
                <i className="fas fa-arrow-down ml-2 text-sm group-hover:translate-y-1 transition-transform duration-300"></i>
              </a>
            </m.div>
          </div>
        </div>
      </m.div>

      {/* Enhanced Contact Information */}
      <div className="py-20 bg-[#0A1526]">
        <div className="container mx-auto px-4">
          <m.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Multiple Ways to Connect
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the communication method that works best for your project timeline and complexity
            </p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <m.div
              className="group relative p-8 bg-[#0D1B30] border border-[#1E2D45] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#00E5A0]"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00E5A0] to-[#00C98C] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-whatsapp text-2xl text-[#050B14]"></i>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">WhatsApp</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  For urgent projects or quick questions. Available during business hours (UTC-4)
                </p>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/584123020280?text=Hi%20Jose,%20I'm%20interested%20in%20discussing%20a%20quantitative%20development%20project"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-[#00E5A0] hover:text-[#00FFB3] font-semibold transition-colors group"
                  >
                    <span>+58 412 3020280</span>
                    <i className="fas fa-external-link-alt ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
                  </a>
                  <div className="text-sm text-gray-500">
                    <i className="fas fa-clock mr-1"></i>
                    Response: Usually within 2-4 hours
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              className="group relative p-8 bg-[#0D1B30] border border-[#1E2D45] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#42A5F5]"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-envelope text-2xl text-white"></i>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Email</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  For detailed project discussions, proposals, and technical specifications
                </p>
                <div className="space-y-3">
                  <a 
                    href="mailto:datawithjose@outlook.com?subject=Quantitative Development Project Inquiry&body=Hi Jose,%0D%0A%0D%0AI'm interested in discussing a quantitative development project.%0D%0A%0D%0AProject type:%0D%0A☐ Strategy research & validation%0D%0A☐ Backtesting infrastructure%0D%0A☐ Automated execution%0D%0A☐ Risk management%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A%0D%0ABest regards"
                    className="inline-flex items-center text-[#42A5F5] hover:text-[#5AB3F5] font-semibold transition-colors group"
                  >
                    <span>datawithjose@outlook.com</span>
                    <i className="fas fa-arrow-right ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
                  </a>
                  <div className="text-sm text-gray-500">
                    <i className="fas fa-clock mr-1"></i>
                    Response: Within 24 hours
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              className="group relative p-8 bg-[#0D1B30] border border-[#1E2D45] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#8B5CF6]"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-map-marker-alt text-2xl text-white"></i>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Location & Time</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Based in Caracas, Venezuela. Available for remote collaboration worldwide
                </p>
                <div className="space-y-3">
                  <div className="text-[#8B5CF6] font-semibold">
                    UTC-4 (Venezuela Time)
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div><i className="fas fa-business-time mr-1"></i>Mon-Fri: 9AM-6PM</div>
                    <div><i className="fas fa-globe mr-1"></i>Remote projects worldwide</div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>

          {/* Additional Contact Options */}
          <m.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-[#0D1B30] border border-[#1E2D45] rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Prefer a Different Platform?
              </h3>
              <p className="text-gray-400 mb-6">
                I'm also available on professional networks and can accommodate your preferred communication method
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/datawithjose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#42A5F5] hover:bg-[#5AB3F5] text-[#050B14] rounded-lg font-bold transition-colors"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/thedatawithjose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#0A1526] border border-[#1E2D45] hover:bg-[#1E2D45] text-white rounded-lg font-semibold transition-colors"
                >
                  <i className="fab fa-github mr-2"></i>
                  GitHub
                </a>
              </div>
            </div>
          </m.div>
        </div>
      </div>

      {/* Enhanced Contact Form Section */}
      <div id="contact-form" className="py-20 bg-[#050B14]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Tell Me About Your <span className="text-[#00E5A0]">Trading Challenge</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Whether you need strategy validation, backtesting, automated execution, or risk management —
                share your project details and I'll get back to you with insights and next steps.
              </p>
            </m.div>
            
            {/* Project Types */}
            <m.div
              className="grid md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="p-4 bg-[#00E5A0]/10 rounded-lg border border-[#00E5A0]/30">
                <i className="fas fa-lightbulb text-[#00E5A0] text-xl mb-2"></i>
                <div className="text-sm font-semibold text-[#00E5A0]">Strategy Validation</div>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <i className="fas fa-flask text-[#42A5F5] text-xl mb-2"></i>
                <div className="text-sm font-semibold text-[#42A5F5]">Backtesting</div>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <i className="fas fa-bolt text-[#8B5CF6] text-xl mb-2"></i>
                <div className="text-sm font-semibold text-[#8B5CF6]">Automated Execution</div>
              </div>
              <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
                <i className="fas fa-shield-alt text-[#F5B544] text-xl mb-2"></i>
                <div className="text-sm font-semibold text-[#F5B544]">Risk Management</div>
              </div>
            </m.div>
          </div>
          
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <ContactForm />
          </m.div>
        </div>
      </div>

      <Footer />
      </div>
      </ToastProvider>
    </>
  );
}