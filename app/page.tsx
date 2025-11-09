'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LazyLogosScroll } from '../components/LazyComponents';
import OptimizedVideoBackground from '../components/OptimizedVideoBackground';

import dynamic from 'next/dynamic';

// Lazy load all heavy sections with intersection observer
const LazyLoadedSections = dynamic(() => import('../components/LazyLoadedSections'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>,
});
import StructuredData from '../components/StructuredData';
import { generateReviewSchema } from '../lib/structured-data';
import ProgressiveHero from '../components/ProgressiveHero';
import { ToastProvider } from '../components/ToastNotification';


import { useScrollTracking, useJourneyTracking } from '../hooks/useAnalyticsTracking';

import NewsletterForm from '../components/NewsletterForm';
import ContactTeaser from '../components/ContactTeaser';
import LeadMagnets from '../components/LeadMagnets';
import ROICalculator from '../components/ROICalculator';
import EnhancedCTAs from '../components/EnhancedCTAs';

export default function Home() {
  // Analytics tracking
  useScrollTracking('homepage');
  useJourneyTracking();

  useEffect(() => {
    // Ocultar preloader después de que todo esté cargado
    const hidePreloader = () => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 300);
      }
    };

    // Esperar a que todo esté listo
    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
      return () => window.removeEventListener('load', hidePreloader);
    }
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const heroSlides = [
    {
      title: "Data Engineer | Open to Full-Time Opportunities",
      subtitle: "10+ years professional experience: Construction PM → Quant Trader → Data Engineer. I've seen bridges fail and trading systems crash. Now I build data infrastructure that survives both. 98%+ uptime, <500ms latency, 2TB+ daily processing.",
      mobileSubtitle: "10+ years experience. Infrastructure that survives failure. 98%+ uptime, <500ms latency.",
      gradient: "from-[#0A192F] via-[#1A3A52] to-[#005A9C]",
      cta: "Available for Full-Time",
      secondaryCta: "View Consulting Services",
      details: {
        description: "Most data engineers haven't managed projects where failure means lawsuits, or traded with real capital where downtime costs thousands per minute. I have. That's the difference.",
        features: [
          "Infrastructure Risk Assessment",
          "Load Testing & Capacity Planning",
          "Failure-Resistant Architecture",
          "Mission-Critical Reliability"
        ],
        metrics: [
          { value: "3 Years", label: "DE Experience" },
          { value: "10+", label: "Projects Delivered" },
          { value: "Real-time", label: "Data Processing" },
          { value: "25%", label: "Cost Reduction" }
        ]
      }
    },
    {
      title: "Real-Money Data Experience",
      subtitle: "Four years putting real capital behind time-series models. When bad data means lost money, you build systems that don't fail. Period. <500ms execution, automated monitoring.",
      mobileSubtitle: "Four years trading with real capital. Systems that don't fail. <500ms execution.",
      gradient: "from-[#1A1A1A] via-[#0A192F] to-[#1A3A52]",
      cta: "Available for Full-Time",
      secondaryCta: "View Services",
      details: {
        description: "Four years of quantitative trading where every millisecond mattered and every data point had to be right. I build data systems with the same obsession for accuracy and speed that kept me profitable in live markets. No excuses, no downtime.",
        features: [
          "Real-time Market Data Processing",
          "Risk Management Systems",
          "High-Frequency Data Validation",
          "Automated Production Monitoring"
        ],
        metrics: [
          { value: "4", label: "Years Trading" },
          { value: "<500ms", label: "Execution Speed" },
          { value: "Real-time", label: "Data Processing" },
          { value: "17.89%", label: "CAGR Achieved" }
        ]
      }
    },
    {
      title: "Engineering-Grade Data Solutions",
      subtitle: "Construction projects fail when you ignore load calculations. Trading systems fail when you ignore latency. Data pipelines fail when you ignore data quality. I don't ignore any of it. 100K+ records/day, 98% quality, battle-tested.",
      mobileSubtitle: "Data pipelines that don't fail. 100K+ records/day, 98% quality, battle-tested.",
      gradient: "from-[#0A192F] via-[#005A9C] to-[#003D7A]",
      cta: "Available for Full-Time",
      secondaryCta: "View Services",
      details: {
        description: "Construction taught me: bad architecture is expensive to fix later. Trading taught me: systems that can't handle volatility don't survive. Data engineering taught me: most teams learn these lessons the hard way. You don't have to.",
        features: [
          "Production-Ready ML Systems",
          "Professional Data Quality Standards",
          "Scalable Architecture Design",
          "Business-Critical Reliability"
        ],
        metrics: [
          { value: "100K+", label: "Records/Day" },
          { value: "8+", label: "Data Sources" },
          { value: "98%", label: "Data Quality" },
          { value: "Hours→Minutes", label: "Analysis Time" }
        ]
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
        setIsAnimating(false);
      }, 500);
    }, 6000); // Aumentado de 4s a 6s para mejor legibilidad

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StructuredData data={generateReviewSchema()} />
      <ToastProvider>
        <div className="min-h-screen bg-white text-gray-900">
      {/* Preloader - Con transición suave */}
      <div id="preloader" className="fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-300">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#00BFA5] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#00BFA5] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-[#00BFA5] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>

      <Header />

      {/* Hero Section with Video Background */}
      <motion.section
        className="hero relative text-white overflow-hidden h-screen flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Optimized Video Background - Solo carga en desktop con buena conexión */}
        <OptimizedVideoBackground 
          videoSrc="/videos/data-flow.mp4"
          gradient={heroSlides[currentIndex].gradient}
          slideIndex={currentIndex}
        />
        
        {/* Simplified overlay - Solo 1 capa para mejor performance */}
        <div className="absolute inset-0 bg-black/15 md:bg-black/10 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ProgressiveHero 
            slides={heroSlides}
            currentIndex={currentIndex}
            onSlideChange={(index) => {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsAnimating(false);
              }, 500);
            }}
          />
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center text-white/80 hover:text-white transition-colors cursor-pointer bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm mb-1 font-medium whitespace-nowrap">Scroll to explore</span>
            <i className="fas fa-chevron-down text-sm" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Services Preview */}
      <section className="services py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#005A9C] to-[#00BFA5] bg-clip-text text-transparent leading-tight py-2">
              What I Build
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Data infrastructure engineered for real-world conditions—not just the happy path. I specialize in building systems that handle failures gracefully, recover automatically, and provide the observability needed to debug issues when they inevitably occur.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-16">
            {/* 2026 Modern Service Card 1 */}
            <Link href="/services#real-time-pipelines">
            <motion.div
              className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03, y: -8, rotateY: 2 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {/* Simplified Background Effect - Solo 1 capa */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/5 via-transparent to-[#2196F3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Modern Icon Container */}
              <div className="relative mb-8">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#42A5F5] via-[#2196F3] to-[#1976D2] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[#42A5F5]/25 group-hover:scale-110 transition-all duration-300 rotate-3 group-hover:rotate-6">
                      <i className="fas fa-stream text-2xl text-white"></i>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-3 py-1 bg-[#42A5F5]/10 rounded-full border border-[#42A5F5]/20">
                      <span className="text-xs font-bold text-[#42A5F5] tracking-wide">98%+ Uptime</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#42A5F5] transition-colors duration-300">Real-Time Pipelines</h3>
                  <p className="text-sm font-semibold text-[#42A5F5] tracking-wide uppercase">High-Availability Systems</p>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-base">
                  Trading experience taught me: when your pipeline goes down at market open, you lose money every second. 
                  I build systems that stay up—98%+ uptime, automatic recovery, monitored obsessively.
                </p>
                
                {/* Modern Feature List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#42A5F5]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#42A5F5] text-xs"></i>
                    </div>
                    <span className="font-medium">Streaming & batch processing</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#42A5F5]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#42A5F5] text-xs"></i>
                    </div>
                    <span className="font-medium">Fault-tolerant architecture</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#42A5F5]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#42A5F5] text-xs"></i>
                    </div>
                    <span className="font-medium">Cost optimization built-in</span>
                  </div>
                </div>
                
                {/* Enhanced Footer */}
                <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-[#42A5F5]/5 rounded-full flex items-center justify-center group-hover:bg-[#42A5F5] group-hover:scale-110 transition-all duration-300">
                    <i className="fas fa-arrow-right text-[#42A5F5] group-hover:text-white group-hover:translate-x-1 transition-all duration-300"></i>
                  </div>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* 2026 Modern Service Card 2 */}
            <Link href="/services#time-series-analytics">
            <motion.div
              className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03, y: -8, rotateY: -2 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Simplified Background Effect - Solo 1 capa */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5]/5 via-transparent to-[#00D4B4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Modern Icon Container */}
              <div className="relative mb-8">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#00BFA5] via-[#00D4B4] to-[#26C6DA] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[#00BFA5]/25 group-hover:scale-110 transition-all duration-300 -rotate-3 group-hover:-rotate-6">
                      <i className="fas fa-chart-line text-2xl text-white"></i>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-400 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-3 py-1 bg-[#00BFA5]/10 rounded-full border border-[#00BFA5]/20">
                      <span className="text-xs font-bold text-[#00BFA5] tracking-wide">&lt;500ms Latency</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#00BFA5] transition-colors duration-300">Time-Series Analytics</h3>
                  <p className="text-sm font-semibold text-[#00BFA5] tracking-wide uppercase">Financial & IoT Data</p>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-base">
                  Built trading bots that processed tick data in real-time for four years. When milliseconds matter and 
                  bad data costs money, you learn to handle time-series right—or you don't survive.
                </p>
                
                {/* Modern Feature List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#00BFA5]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#00BFA5] text-xs"></i>
                    </div>
                    <span className="font-medium">High-frequency data processing</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#00BFA5]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#00BFA5] text-xs"></i>
                    </div>
                    <span className="font-medium">Anomaly detection systems</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#00BFA5]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#00BFA5] text-xs"></i>
                    </div>
                    <span className="font-medium">Predictive analytics models</span>
                  </div>
                </div>
                
                {/* Enhanced Footer */}
                <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-[#00BFA5]/5 rounded-full flex items-center justify-center group-hover:bg-[#00BFA5] group-hover:scale-110 transition-all duration-300">
                    <i className="fas fa-arrow-right text-[#00BFA5] group-hover:text-white group-hover:translate-x-1 transition-all duration-300"></i>
                  </div>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* 2026 Modern Service Card 3 */}
            <Link href="/services#data-architecture">
            <motion.div
              className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03, y: -8, rotateY: 2 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Simplified Background Effect - Solo 1 capa */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/5 via-transparent to-[#0066CC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Modern Icon Container */}
              <div className="relative mb-8">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#005A9C] via-[#0066CC] to-[#1976D2] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[#005A9C]/25 group-hover:scale-110 transition-all duration-300 rotate-2 group-hover:rotate-3">
                      <i className="fas fa-cogs text-2xl text-white"></i>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-400 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-3 py-1 bg-[#005A9C]/10 rounded-full border border-[#005A9C]/20">
                      <span className="text-xs font-bold text-[#005A9C] tracking-wide">25% Cost Savings</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#005A9C] transition-colors duration-300">Data Architecture</h3>
                  <p className="text-sm font-semibold text-[#005A9C] tracking-wide uppercase">Cloud-Native Solutions</p>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-base">
                  Engineering discipline from construction: bad architecture is expensive to fix later. I design data systems 
                  the same way—thinking about failure modes, maintenance costs, and what happens at 3x scale.
                </p>
                
                {/* Modern Feature List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#005A9C]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#005A9C] text-xs"></i>
                    </div>
                    <span className="font-medium">Modern data stack (dbt, Snowflake)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#005A9C]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#005A9C] text-xs"></i>
                    </div>
                    <span className="font-medium">Data quality frameworks</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className="w-5 h-5 bg-[#005A9C]/10 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-check text-[#005A9C] text-xs"></i>
                    </div>
                    <span className="font-medium">Cost optimization strategies</span>
                  </div>
                </div>
                
                {/* Enhanced Footer */}
                <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-[#005A9C]/5 rounded-full flex items-center justify-center group-hover:bg-[#005A9C] group-hover:scale-110 transition-all duration-300">
                    <i className="fas fa-arrow-right text-[#005A9C] group-hover:text-white group-hover:translate-x-1 transition-all duration-300"></i>
                  </div>
                </div>
              </div>
            </motion.div>
            </Link>
          </div>

          {/* Value Proposition */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose My Data Engineering?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  <strong>10+ years of professional experience across high-stakes environments:</strong> Four years managing construction projects taught me to plan for failure modes and deliver under constraints. Four years as quantitative trader taught me that data quality isn't optional—it's survival. Now, three years as Data Engineer, I build infrastructure combining both disciplines—engineered for reliability, tested under pressure.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#42A5F5] mb-1">98%+</div>
                    <div className="text-sm text-gray-600">System Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#00BFA5] mb-1">2TB+</div>
                    <div className="text-sm text-gray-600">Daily Processing</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#42A5F5] rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-shield-alt text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Reliability First</h4>
                    <p className="text-gray-600 text-sm">Systems designed for failure, instrumented for monitoring</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#00BFA5] rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-bullseye text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Business-Aligned</h4>
                    <p className="text-gray-600 text-sm">Pipelines aligned to decisions & KPIs, not just storage</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#005A9C] rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-dollar-sign text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Cost-Conscious</h4>
                    <p className="text-gray-600 text-sm">Right-sizing and optimization built into every solution</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/services" 
                className="group bg-gradient-to-r from-[#005A9C] to-[#00BFA5] hover:from-[#0066CC] hover:to-[#00D4B4] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
              >
                <i className="fas fa-database mr-2"></i>
                Explore Data Solutions
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </Link>
              <a 
                href="mailto:datawithjose@outlook.com?subject=Introduction Call&body=Hi Jose, I'd like to schedule an introduction call..."
                className="group border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center"
              >
                <i className="fas fa-calendar mr-2"></i>
                Schedule Introduction Call
              </a>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              Ready to build data systems that work when business decisions depend on them?
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">About Me</h2>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                Data Engineer with a non-traditional path that makes me better at the job.
              </p>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                I spent four years in construction project management learning how systems fail under pressure. Four years as a quantitative trader where bad data meant real money lost. Now three years building production data infrastructure where those lessons matter every day.
              </p>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                The pattern is clear: I've always worked where reliability isn't optional and data drives decisions. Construction taught me to design for failure modes. Trading taught me that data quality is non-negotiable. Data engineering is where both disciplines converge.
              </p>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                I specialize in high-availability systems, real-time pipelines, and cost-conscious architecture—because I've seen what happens when any of those fail.
              </p>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 font-semibold text-[#005A9C]">
                Currently seeking full-time Data Engineering roles where complex data challenges need someone who thinks like an engineer, plans like a project manager, and measures impact like a trader.
              </p>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-600">
                I also take on select consulting engagements helping startups build data foundations that won't collapse at scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="group bg-gradient-to-r from-[#42A5F5] to-[#005A9C] hover:from-[#2196F3] hover:to-[#0066CC] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <i className="fas fa-briefcase mr-2"></i>
                  Available for Full-Time
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                </Link>
                <Link 
                  href="/services"
                  className="group border-2 border-[#42A5F5] text-[#42A5F5] hover:bg-[#42A5F5] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-handshake mr-2"></i>
                  Consulting Services
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50 }}
              whileInView={{ x: 0 }}
            >
              <div className="relative rounded-lg overflow-hidden border-4 border-[#005A9C] shadow-2xl hover:shadow-[#00BFA5]/20 transition-all duration-300 hover:border-[#42A5F5]">
                <img 
                  src="/images/profile-jose.png" 
                  alt="Data Engineer Profile"
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/10 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results & Impact Section */}
      <section className="results py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A192F] to-[#1A3A52] text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Proven Results Across Real-World Projects
          </motion.h2>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] text-white px-8 py-4 rounded-xl shadow-lg">
              <p className="text-lg font-bold mb-2">
                <i className="fas fa-search mr-2"></i>
                Currently Seeking Full-Time Data Engineering Roles
              </p>
              <p className="text-sm opacity-90">
                Interested in fintech, e-commerce, logistics, or SaaS companies with real-time data challenges
              </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-[#00BFA5] to-[#42A5F5] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-2xl text-white"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#00BFA5] mb-2">16.5 MB/s</h3>
              <p className="text-gray-300">SEC Parser Peak Throughput</p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-[#42A5F5] to-[#005A9C] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-hard-hat text-2xl text-white"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#42A5F5] mb-2">4 Years</h3>
              <p className="text-gray-300">Construction Project Management</p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-[#005A9C] to-[#00BFA5] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-2xl text-white"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#005A9C] mb-2">17.89%</h3>
              <p className="text-gray-300">Trading Bot CAGR</p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-[#00BFA5] to-[#005A9C] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-2xl text-white"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#00BFA5] mb-2">&lt;500ms</h3>
              <p className="text-gray-300">Pipeline Latency Target</p>
            </motion.div>
          </div>
          
          {/* Case Studies Preview */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">What I've Built</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-xl font-semibold mb-3 text-[#64B5F6]">Construction Project Foundations</h4>
                <p className="text-gray-300 mb-4">Four years managing construction projects taught me to think in systems: load calculations, failure modes, resource constraints. When a bridge design fails, people get hurt. That mindset shapes how I architect data systems today.</p>
                <div className="flex items-center text-sm text-gray-400">
                  <i className="fas fa-hard-hat mr-2"></i>
                  <span>Risk assessment • Constraint management • System thinking</span>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-xl font-semibold mb-3 text-[#42A5F5]">Trading Bot Under Fire</h4>
                <p className="text-gray-300 mb-4">Algorithmic trading system using Ornstein-Uhlenbeck process that delivered 17.89% CAGR with 2.34 Sharpe ratio. Four years of trading taught me: systems that can't handle market volatility don't survive.</p>
                <div className="flex items-center text-sm text-gray-400">
                  <i className="fas fa-chart-line mr-2"></i>
                  <span>Real capital • Live trading • Proven returns</span>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-xl font-semibold mb-3 text-[#26C6DA]">SEC Financial Parser</h4>
                <p className="text-gray-300 mb-4">Production-grade parser processing SEC filings at 16.51 MB/s peak throughput. Automatic recovery when parsing fails mid-document—because in financial data, partial results are worse than no results.</p>
                <div className="flex items-center text-sm text-gray-400">
                  <i className="fas fa-code mr-2"></i>
                  <span>Python • PostgreSQL • 3 parsing engines</span>
                </div>
              </motion.div>
            </div>
            
            {/* Enhanced CTA for case studies */}
            <div className="text-center">
              <Link 
                href="/portfolio" 
                className="group inline-flex items-center bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <i className="fas fa-folder-open mr-2"></i>
                See Full Case Studies
                <i className="fas fa-external-link-alt ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lazy loaded sections */}
      <LazyLoadedSections />

      {/* Lead Magnets Section */}
      <LeadMagnets />

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Enhanced CTAs */}
      <EnhancedCTAs variant="primary" />

      {/* Newsletter Section */}
      <section className="newsletter py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Tech Stack Carousel */}
      <section className="tech-stack py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Technologies I Work With
          </motion.h2>
          <LazyLogosScroll />
        </div>
      </section>

      {/* Contact Teaser */}
      <ContactTeaser />

      <Footer />
      


          </div>
        </ToastProvider>
    </>
  );
}
