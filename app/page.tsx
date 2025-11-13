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
      subtitle: "10+ years professional experience: Construction PM → Quant Trader → Data Engineer. I've seen bridges fail and trading systems crash. Now I build data infrastructure that survives both. High-availability systems with automatic failover and production-scale processing.",
      mobileSubtitle: "10+ years experience. Infrastructure that survives failure. High-availability with automatic failover.",
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
          { value: "Cost-Optimized", label: "Architecture" }
        ]
      }
    },
    {
      title: "Real-Money Data Experience",
      subtitle: "Four years putting real capital behind time-series models. When bad data means lost money, you build systems that don't fail. Period. Low-latency execution, automated monitoring.",
      mobileSubtitle: "Four years trading with real capital. Systems that don't fail. Low-latency execution.",
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
          { value: "Low-Latency", label: "Processing" },
          { value: "Real-time", label: "Data Streams" },
          { value: "17.89%", label: "CAGR Achieved" }
        ]
      }
    },
    {
      title: "Engineering-Grade Data Solutions",
      subtitle: "Construction projects fail when you ignore load calculations. Trading systems fail when you ignore latency. Data pipelines fail when you ignore data quality. I don't ignore any of it. Production-scale processing, validated data quality, battle-tested.",
      mobileSubtitle: "Data pipelines that don't fail. Production-scale processing, validated quality, battle-tested.",
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
          { value: "Production", label: "Scale Processing" },
          { value: "8+", label: "Data Sources" },
          { value: "Validated", label: "Data Quality" },
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
          className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-20"
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#0097A7] leading-tight py-2">
              What I Build
            </h2>
            <p className="text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Data infrastructure engineered for real-world conditions—not just the happy path. I specialize in building systems that handle failures gracefully, recover automatically, and provide the observability needed to debug issues when they inevitably occur.
            </p>
          </motion.div>

          {/* Hero Project Card - Trading Data Infrastructure */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
          >
            <Link href="/portfolio#trading-bot">
              <div className="group relative bg-gradient-to-br from-white via-blue-50/40 to-green-50/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,191,165,0.3)] transition-all duration-500 border-2 border-white/60 hover:border-[#00BFA5]/30 overflow-hidden cursor-pointer">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/10 via-[#00BFA5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Floating Orbs Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00BFA5]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#005A9C]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                
                {/* Content Grid */}
                <div className="relative z-10 grid md:grid-cols-3 gap-8">
                  {/* Left Column - Main Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#005A9C]/15 via-[#0077CC]/10 to-[#00BFA5]/15 rounded-full border border-[#005A9C]/30 mb-5 group-hover:border-[#00BFA5]/50 transition-all duration-300 shadow-sm">
                          <div className="w-2 h-2 bg-[#00BFA5] rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold bg-gradient-to-r from-[#005A9C] to-[#00BFA5] bg-clip-text text-transparent tracking-wide uppercase">Real-Time Systems | 4 Years Production</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-[#005A9C] group-hover:to-[#00BFA5] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                          Trading Data Infrastructure
                        </h3>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl">
                          Built end-to-end data platform powering algorithmic trading with real capital. When your pipeline fails at market open, you lose money every second—taught me to build systems that stay up.
                        </p>
                      </div>
                    </div>

                    {/* Architecture & Impact */}
                    <div className="mb-8">
                      <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#005A9C] to-[#00BFA5] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <i className="fas fa-project-diagram text-white text-sm"></i>
                        </div>
                        Architecture & Impact
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                            <i className="fas fa-bolt text-white text-xs"></i>
                          </div>
                          <p className="text-gray-700 leading-relaxed"><strong className="text-gray-900">Real-time ingestion:</strong> WebSocket → Kafka → TimescaleDB (sub-second latency for tick data)</p>
                        </div>
                        <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                            <i className="fas fa-rocket text-white text-xs"></i>
                          </div>
                          <p className="text-gray-700 leading-relaxed"><strong className="text-gray-900">Backtesting infrastructure:</strong> 5x throughput improvement (weeks → hours through parallelization)</p>
                        </div>
                        <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                            <i className="fas fa-shield-alt text-white text-xs"></i>
                          </div>
                          <p className="text-gray-700 leading-relaxed"><strong className="text-gray-900">Fault-tolerant design:</strong> Automatic failover, health checks, retry logic with dead letter queues</p>
                        </div>
                        <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                            <i className="fas fa-chart-line text-white text-xs"></i>
                          </div>
                          <p className="text-gray-700 leading-relaxed"><strong className="text-gray-900">Production results:</strong> 17.89% CAGR, 2.34 Sharpe ratio over 4 years</p>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {['Python', 'SQL', 'Kafka', 'TimescaleDB', 'PostgreSQL', 'Airflow'].map((tech, index) => (
                        <motion.span 
                          key={tech} 
                          className="px-4 py-2 bg-gradient-to-r from-[#005A9C]/10 to-[#00BFA5]/10 hover:from-[#005A9C]/20 hover:to-[#00BFA5]/20 text-[#005A9C] rounded-full text-sm font-semibold border border-[#005A9C]/20 hover:border-[#00BFA5]/40 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Key Features */}
                  <div className="md:col-span-1">
                    <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 border-2 border-white/60 shadow-xl group-hover:shadow-2xl group-hover:border-[#00BFA5]/30 transition-all duration-500 overflow-hidden">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/5 via-transparent to-[#00BFA5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#005A9C] via-[#0077CC] to-[#00BFA5] rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-[#00BFA5]/30">
                          <i className="fas fa-chart-line text-3xl text-white"></i>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center group-hover:bg-gradient-to-r group-hover:from-[#005A9C] group-hover:to-[#00BFA5] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                          Key Features
                        </h3>
                        
                        <div className="space-y-4 mb-8">
                          <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                              <i className="fas fa-check text-white text-xs"></i>
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed font-medium">High-frequency data processing & anomaly detection</span>
                          </div>
                          <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                              <i className="fas fa-check text-white text-xs"></i>
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed font-medium">Comprehensive monitoring, SLA-aware alerting</span>
                          </div>
                          <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                              <i className="fas fa-check text-white text-xs"></i>
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed font-medium">Production-tested with real capital</span>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="mt-8 pt-6 border-t-2 border-gray-200/50">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-gradient-to-br from-[#005A9C]/10 to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300">
                              <div className="text-4xl font-bold bg-gradient-to-r from-[#005A9C] to-[#0077CC] bg-clip-text text-transparent mb-1">17.89%</div>
                              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">CAGR</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-br from-[#00BFA5]/10 to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300">
                              <div className="text-4xl font-bold bg-gradient-to-r from-[#00BFA5] to-[#26C6DA] bg-clip-text text-transparent mb-1">2.34</div>
                              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Sharpe Ratio</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow indicator with glow effect */}
                <div className="absolute bottom-8 right-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#005A9C] to-[#00BFA5] rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-[#005A9C] to-[#00BFA5] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-lg">
                      <i className="fas fa-arrow-right text-white text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Two Medium Cards Side by Side */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {/* Card 1 - SEC Financial Data Platform */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/portfolio#sec-parser">
                <div className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(66,165,245,0.3)] transition-all duration-500 border-2 border-white/60 hover:border-[#42A5F5]/30 overflow-hidden cursor-pointer h-full">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/10 via-transparent to-[#2196F3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating Orb */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#42A5F5]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#42A5F5] via-[#2196F3] to-[#1976D2] rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-[#42A5F5]/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <i className="fas fa-file-invoice-dollar text-3xl text-white"></i>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#42A5F5]/15 to-[#2196F3]/10 rounded-full border border-[#42A5F5]/30 mb-4 group-hover:border-[#42A5F5]/50 transition-all duration-300">
                      <div className="w-2 h-2 bg-[#42A5F5] rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold bg-gradient-to-r from-[#42A5F5] to-[#2196F3] bg-clip-text text-transparent tracking-wide uppercase">16.5 MB/s Peak Throughput</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-[#42A5F5] group-hover:to-[#2196F3] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                      SEC Financial Data Platform
                    </h3>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Production-grade parser processing SEC filings with automatic recovery when parsing fails mid-document. In financial data, partial results are worse than no results.
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Python, PostgreSQL, 3 engines</span>
                      </div>
                      <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Fault-tolerant parsing</span>
                      </div>
                      <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Data quality validation</span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex items-center justify-end pt-4 border-t-2 border-gray-100">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#42A5F5] to-[#2196F3] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-md">
                          <i className="fas fa-arrow-right text-white group-hover:translate-x-1 transition-transform duration-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card 2 - Data Architecture Principles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/services#data-architecture">
                <div className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(0,90,156,0.3)] transition-all duration-500 border-2 border-white/60 hover:border-[#005A9C]/30 overflow-hidden cursor-pointer h-full">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/10 via-transparent to-[#0066CC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating Orb */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#005A9C]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#005A9C] via-[#0066CC] to-[#1976D2] rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-[#005A9C]/40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                      <i className="fas fa-drafting-compass text-3xl text-white"></i>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#005A9C]/15 to-[#0066CC]/10 rounded-full border border-[#005A9C]/30 mb-4 group-hover:border-[#005A9C]/50 transition-all duration-300">
                      <div className="w-2 h-2 bg-[#005A9C] rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold bg-gradient-to-r from-[#005A9C] to-[#0066CC] bg-clip-text text-transparent tracking-wide uppercase">From Construction to Cloud</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-[#005A9C] group-hover:to-[#0066CC] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                      Data Architecture Principles
                    </h3>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Four years managing construction projects taught me: bad architecture is expensive to fix later. I design data systems the same way—thinking about failure modes, maintenance costs, and what happens at 3x scale.
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#005A9C] to-[#0066CC] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Modern stack (dbt, Snowflake)</span>
                      </div>
                      <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#005A9C] to-[#0066CC] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Cost-optimization strategies</span>
                      </div>
                      <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#005A9C] to-[#0066CC] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Reliability by design</span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex items-center justify-end pt-4 border-t-2 border-gray-100">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#005A9C] to-[#0066CC] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-[#005A9C] to-[#0066CC] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-md">
                          <i className="fas fa-arrow-right text-white group-hover:translate-x-1 transition-transform duration-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Value Proposition */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-[#0097A7] mb-6 text-center">Why Work With Me?</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center font-semibold">
                I build data systems where failure has consequences:
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#42A5F5] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className="fas fa-shield-alt text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Reliability First</h4>
                    <p className="text-gray-600 font-medium">Systems that recover automatically, not manually</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#00BFA5] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className="fas fa-bullseye text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Business-Aligned</h4>
                    <p className="text-gray-600 font-medium">Data quality tied to actual business impact</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#005A9C] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className="fas fa-dollar-sign text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Cost-Conscious</h4>
                    <p className="text-gray-600 font-medium">Right-sizing and optimization from day one</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-l-4 border-[#00BFA5]">
                <p className="text-gray-800 font-semibold text-lg italic">
                  The difference: I've lost real money to bad pipelines. Now I build so you don't have to.
                </p>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#0097A7]">About Me</h2>
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
      <section className="results relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A192F] via-[#0D1F3C] to-[#1A3A52] text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#00BFA5] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#42A5F5] rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#00BFA5] to-[#42A5F5] bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              Data Engineering Built on Real-World Experience
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              My data engineering expertise comes from <span className="text-[#00BFA5] font-semibold">10+ years</span> across high-stakes environments. Each role taught me critical skills I now apply to building production data systems.
            </motion.p>
          </motion.div>

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative inline-block">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              
              <div className="relative bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] text-white px-8 py-5 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-lg md:text-xl font-bold mb-2 flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  Currently Seeking Full-Time Data Engineering Roles
                </div>
                <div className="text-sm md:text-base opacity-95 text-center">
                  Interested in fintech, e-commerce, logistics, or SaaS companies with real-time data challenges
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Case Studies Preview */}
          <div className="mt-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                How My Background Strengthens My Data Engineering
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Each career phase developed specific skills that make me a better data engineer today
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
              <motion.div
                className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border-2 border-white/10 hover:border-[#42A5F5]/50 transition-all duration-500 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/10 via-transparent to-[#005A9C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating orb */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#42A5F5]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#42A5F5]/20 rounded-full border border-[#42A5F5]/30 mb-3">
                        <div className="w-2 h-2 bg-[#42A5F5] rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-[#42A5F5]">4 YEARS</span>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-[#42A5F5] transition-colors duration-300">
                        Construction PM
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <i className="fas fa-arrow-right text-[#42A5F5] text-sm"></i>
                        <span className="text-base md:text-lg font-semibold text-gray-300">Data Architecture</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-[#42A5F5] to-[#005A9C] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 flex-shrink-0">
                      <i className="fas fa-hard-hat text-xl text-white"></i>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Managing construction projects taught me to design for failure modes and scale. I now apply this to data architecture: planning for 3x growth, calculating resource constraints, and building systems that don't collapse under load.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                      <span className="text-sm text-gray-300"><strong className="text-white">Data Engineering Skill:</strong> Scalable architecture design</span>
                    </div>
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                      <span className="text-sm text-gray-300"><strong className="text-white">Data Engineering Skill:</strong> Capacity planning & cost optimization</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border-2 border-white/10 hover:border-[#00BFA5]/50 transition-all duration-500 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/10 via-transparent to-[#00BFA5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating orb */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00BFA5]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#005A9C]/20 rounded-full border border-[#005A9C]/30 mb-3">
                        <div className="w-2 h-2 bg-[#005A9C] rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-[#005A9C]">4 YEARS</span>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-[#00BFA5] transition-colors duration-300">
                        Quant Trading
                      </h4>
                      <div className="flex items-center gap-2 mt-2 mb-3">
                        <i className="fas fa-arrow-right text-[#00BFA5] text-sm"></i>
                        <span className="text-base md:text-lg font-semibold text-gray-300">Real-Time Pipelines</span>
                      </div>
                      <div className="flex gap-3 items-center flex-wrap">
                        <div className="text-xl font-bold text-[#00BFA5]">17.89% CAGR</div>
                        <div className="text-base text-gray-400">2.34 Sharpe</div>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-[#005A9C] to-[#00BFA5] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 flex-shrink-0">
                      <i className="fas fa-chart-line text-xl text-white"></i>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Built algorithmic trading systems where bad data meant real money lost. This taught me to build data pipelines with obsessive data quality checks, sub-second latency requirements, and automatic failover.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                      <span className="text-sm text-gray-300"><strong className="text-white">Data Engineering Skill:</strong> Real-time streaming pipelines</span>
                    </div>
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                      <span className="text-sm text-gray-300"><strong className="text-white">Data Engineering Skill:</strong> Data quality validation & monitoring</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border-2 border-white/10 hover:border-[#00BFA5]/50 transition-all duration-500 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5]/10 via-transparent to-[#42A5F5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating orb */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00BFA5]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00BFA5]/20 rounded-full border border-[#00BFA5]/30 mb-3">
                        <div className="w-2 h-2 bg-[#00BFA5] rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-[#00BFA5]">3 YEARS • CURRENT</span>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-[#00BFA5] transition-colors duration-300">
                        Data Engineering in Production
                      </h4>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00BFA5] to-[#42A5F5] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                      <i className="fas fa-database text-xl text-white"></i>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Currently building production data systems: SEC financial parser (16.5 MB/s throughput), ETL pipelines, data quality frameworks. Combining construction discipline with trading urgency to deliver reliable data infrastructure.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                      <span className="text-sm text-gray-300"><strong className="text-white">Core Skills:</strong> Python, SQL, Kafka, Airflow, dbt</span>
                    </div>
                    <div className="flex items-start gap-3 group/item">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                      <span className="text-sm text-gray-300"><strong className="text-white">Specialization:</strong> Fault-tolerant ETL & data quality</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Enhanced CTA for case studies */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="max-w-3xl mx-auto mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  <strong className="text-white text-2xl">Bottom line:</strong> <span className="text-[#00BFA5] font-semibold">10+ years</span> of experience building systems where failure isn't an option. Now applying that to data engineering.
                </p>
              </div>
              
              <Link 
                href="/portfolio" 
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] hover:from-[#00D4B4] hover:to-[#5AB9FF] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,191,165,0.5)] hover:scale-105"
              >
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i className="fas fa-folder-open relative z-10"></i>
                <span className="relative z-10">See Detailed Data Engineering Projects</span>
                <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-2 transition-transform duration-300"></i>
              </Link>
            </motion.div>
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
