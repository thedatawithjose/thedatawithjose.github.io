'use client';

import { m } from 'framer-motion';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import { LazyLogosScroll } from '../../components/LazyComponents';
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
        <div className="min-h-screen bg-white text-gray-900">
      {/* Preloader - can be handled globally */}
      <div id="preloader" className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="jumper flex space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
        </div>
      </div>

      <Header />

      {/* Enhanced Hero Section */}
      <m.div
        className="relative bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white py-24 overflow-hidden"
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
                <span className="block bg-gradient-to-r from-green-400 via-green-300 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mt-2 relative">
                  Reliable Together
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
                Ready to discuss your data engineering challenges?
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 inline-block">
                <p className="text-gray-200 text-sm leading-relaxed italic">
                  "Whether it's real-time pipelines, trading systems, or ML in production — 
                  let's talk about building infrastructure that doesn't fail when it matters most."
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
                <div className="text-2xl font-bold text-blue-400 mb-1">3+ Years</div>
                <div className="text-gray-300 text-sm">Data Engineering</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-purple-400 mb-1">98%+</div>
                <div className="text-gray-300 text-sm">System Reliability</div>
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
                href="https://wa.me/584123020280?text=Hi%20Jose,%20I'm%20interested%20in%20discussing%20a%20data%20engineering%12 projects"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
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
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <m.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the communication method that works best for your project timeline and complexity
            </p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <m.div
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-whatsapp text-2xl text-white"></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">WhatsApp</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  For urgent projects or quick questions. Available during business hours (UTC-4)
                </p>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/584123020280?text=Hi%20Jose,%20I'm%20interested%20in%20discussing%20a%20data%20engineering%12 projects"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors group"
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
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500"
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
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Email</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  For detailed project discussions, proposals, and technical specifications
                </p>
                <div className="space-y-3">
                  <a 
                    href="mailto:datawithjose@outlook.com?subject=Data Engineering Project Inquiry&body=Hi Jose,%0D%0A%0D%0AI'm interested in discussing a data engineering project.%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A%0D%0ABest regards"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
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
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500"
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
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Location & Time</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Based in Caracas, Venezuela. Available for remote collaboration worldwide
                </p>
                <div className="space-y-3">
                  <div className="text-purple-600 font-semibold">
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
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Prefer a Different Platform?
              </h3>
              <p className="text-gray-600 mb-6">
                I'm also available on professional networks and can accommodate your preferred communication method
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://linkedin.com/in/joseacostar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/joseacostar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold transition-colors"
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
      <div id="contact-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tell Me About Your <span className="text-green-500">Data Challenge</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Whether you need real-time pipelines, trading systems, or ML in production — 
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
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <i className="fas fa-stream text-green-600 text-xl mb-2"></i>
                <div className="text-sm font-semibold text-green-800">Real-time Pipelines</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <i className="fas fa-chart-line text-blue-600 text-xl mb-2"></i>
                <div className="text-sm font-semibold text-blue-800">Trading Systems</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <i className="fas fa-robot text-purple-600 text-xl mb-2"></i>
                <div className="text-sm font-semibold text-purple-800">ML in Production</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <i className="fas fa-database text-orange-600 text-xl mb-2"></i>
                <div className="text-sm font-semibold text-orange-800">Data Infrastructure</div>
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

      {/* Partners Section */}
      <div className="partners py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <m.h2
            className="text-3xl font-bold text-center mb-8 text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Tools & Platforms
          </m.h2>
          <LazyLogosScroll />
        </div>
      </div>

      <Footer />
      </div>
      </ToastProvider>
    </>
  );
}