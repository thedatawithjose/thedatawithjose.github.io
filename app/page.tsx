'use client';

import { m } from 'framer-motion';
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

const ServicesSection = dynamic(() => import('../components/ServicesSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse"></div>
});

const AboutSection = dynamic(() => import('../components/AboutSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse"></div>
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const heroSlides = [
    {
      title: "Quantitative Developer",
      subtitle: "8 years of active market experience, focused on turning trading logic into systematic, validated, and executable systems — from research to live execution.",
      mobileSubtitle: "8 years of market experience. Trading systems from research to live execution.",
      gradient: "from-[#050B14] via-[#0A1526] to-[#0D1B30]",
      cta: "Let's Talk",
      secondaryCta: "View Portfolio",
      details: {
        description: "I work at the intersection of trading and software engineering: translating market ideas into explicit rules, building research and backtesting workflows, and engineering the execution layer that operates them live. A strategy is not robust simply because it produces an attractive backtest.",
        features: [
          "Systematic Strategy Development",
          "Quantitative Research & Backtesting",
          "Automated Execution Systems",
          "Risk & Capital Protection"
        ],
        metrics: [
          { value: "8+", label: "Years Market Experience" },
          { value: "4", label: "Asset Classes" },
          { value: "7+", label: "Years Building Systems" },
          { value: "End-to-End", label: "Research → Live" }
        ]
      }
    },
    {
      title: "From Research to Execution",
      subtitle: "A strategy is only as good as the system that executes it. I build research workflows and execution layers that survive when assumptions change — realistic costs, slippage, and constraints included.",
      mobileSubtitle: "Research workflows + execution layers that survive when assumptions change.",
      gradient: "from-[#0D1B30] via-[#0A1526] to-[#050B14]",
      cta: "Hire Me",
      secondaryCta: "Explore Systems",
      details: {
        description: "A strategy is not robust simply because it produces an attractive backtest. I focus on how performance behaves when assumptions change: out-of-sample testing, walk-forward validation, sensitivity analysis, realistic transaction costs, and execution constraints.",
        features: [
          "Out-of-Sample Testing",
          "Walk-Forward Validation",
          "Sensitivity Analysis",
          "Realistic Execution Modeling"
        ],
        metrics: [
          { value: "OOS", label: "Out-of-Sample Tested" },
          { value: "Walk-Forward", label: "Validation" },
          { value: "Realistic", label: "Costs & Slippage Modeled" },
          { value: "24/7", label: "System Monitoring" }
        ]
      }
    },
    {
      title: "Systems That Survive Real Markets",
      subtitle: "Robustness isn't a backtest metric — it's engineering. Position sizing, drawdown controls, execution safeguards, and failure conditions built directly into the system.",
      mobileSubtitle: "Position sizing, drawdown controls, and failure conditions built into the system.",
      gradient: "from-[#050B14] via-[#0D1B30] to-[#0A1526]",
      cta: "Hire Me",
      secondaryCta: "View Portfolio",
      details: {
        description: "Available for full-time Quantitative Developer roles and select consulting engagements. I work with prop trading firms, systematic trading teams, and trading technology companies — across futures, FX, crypto, and equities.",
        features: [
          "Position Sizing",
          "Drawdown Controls",
          "Execution Safeguards",
          "Failure Conditions & Monitoring"
        ],
        metrics: [
          { value: "Futures", label: "FX · Crypto · Equities" },
          { value: "High-Avail", label: "Design Standard" },
          { value: "Strict", label: "Data Integrity" },
          { value: "Prod", label: "Grade Systems" }
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
        <div className="min-h-screen bg-[#050B14] text-[#E6EDF3]">
          <Header />

          {/* Hero Section with Video Background */}
          <m.section
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

            {/* Simplified overlay - Mejorado para mejor contraste WCAG AA */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />

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
            <m.div
              className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <m.div
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
              </m.div>
            </m.div>
          </m.section>

          {/* Services Preview */}
          <ServicesSection />

          {/* About Preview */}
          <AboutSection />

          {/* Results & Impact Section */}
          <section className="results relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#050B14] via-[#0A1526] to-[#0D1B30] text-white overflow-hidden bg-quant-grid">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#00E5A0] rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#42A5F5] rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <m.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <m.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#00E5A0] to-[#42A5F5] bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  Quantitative Development Built on Real-Money Experience
                </m.h2>
                <m.p
                  className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  My quant development expertise comes from <span className="text-[#00E5A0] font-semibold">8+ years of active market experience</span> and a track record across high-stakes environments. Each role taught me critical skills I now apply to building robust algorithmic trading systems.
                </m.p>
              </m.div>

              <m.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="relative inline-block">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] rounded-2xl blur-xl opacity-50 animate-pulse"></div>

                  <div className="relative bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] text-[#050B14] px-8 py-5 rounded-2xl shadow-2xl border border-white/20">
                    <div className="text-lg md:text-xl font-bold mb-2 flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-[#050B14] rounded-full animate-pulse"></div>
                      Available for Full-Time Quant Roles & Select Consulting Engagements
                    </div>
                    <div className="text-sm md:text-base opacity-95 text-center font-medium">
                      Interested in prop firms, systematic trading teams, and trading technology companies
                    </div>
                  </div>
                </div>
              </m.div>

              {/* Case Studies Preview */}
              <div className="mt-12">
                <m.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    How My Background Strengthens My Quant Development
                  </h3>
                  <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                    Each career phase developed specific skills that make my trading systems more robust
                  </p>
                </m.div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                  <m.div
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
                            <span className="text-xs font-bold text-[#42A5F5]">2014–2017</span>
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
                        Managing construction projects taught me to design for failure modes and scale. I now apply this to trading infrastructure: planning for 3x load, calculating resource constraints, and building systems that don't collapse under volatility.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 group/item">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                            <i className="fas fa-check text-[#050B14] text-xs"></i>
                          </div>
                          <span className="text-sm text-gray-300"><strong className="text-white">Quant Development Skill:</strong> Robust system architecture</span>
                        </div>
                        <div className="flex items-start gap-3 group/item">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                            <i className="fas fa-check text-[#050B14] text-xs"></i>
                          </div>
                          <span className="text-sm text-gray-300"><strong className="text-white">Quant Development Skill:</strong> Capacity planning & cost optimization</span>
                        </div>
                      </div>
                    </div>
                  </m.div>

                  <m.div
                    className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border-2 border-white/10 hover:border-[#00E5A0]/50 transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -8, scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/10 via-transparent to-[#00E5A0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating orb */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00E5A0]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#42A5F5]/20 rounded-full border border-[#42A5F5]/30 mb-3">
                            <div className="w-2 h-2 bg-[#42A5F5] rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-[#42A5F5]">2018–2022</span>
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-[#00E5A0] transition-colors duration-300">
                            Head of Trading & Quant Data Systems
                          </h4>
                          <div className="flex items-center gap-2 mt-2 mb-3">
                            <i className="fas fa-arrow-right text-[#00E5A0] text-sm"></i>
                            <span className="text-base md:text-lg font-semibold text-gray-300">Fintech Alca Group</span>
                          </div>
                          <div className="flex gap-3 items-center flex-wrap">
                            <div className="text-base font-semibold text-[#00E5A0]">8+ Years</div>
                            <div className="text-base text-gray-400">Market Experience</div>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-[#005A9C] to-[#00E5A0] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 flex-shrink-0">
                          <i className="fas fa-chart-line text-xl text-white"></i>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Built and governed the firm's data infrastructure from scratch: real-time WebSocket ingestion, performance-critical pipelines with full auditability, and high-availability decision-support systems on PostgreSQL and TimescaleDB — for futures, FX, crypto, and equities.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 group/item">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                            <i className="fas fa-check text-[#050B14] text-xs"></i>
                          </div>
                          <span className="text-sm text-gray-300"><strong className="text-white">Quant Development Skill:</strong> Real-time market data infrastructure</span>
                        </div>
                        <div className="flex items-start gap-3 group/item">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                            <i className="fas fa-check text-[#050B14] text-xs"></i>
                          </div>
                          <span className="text-sm text-gray-300"><strong className="text-white">Quant Development Skill:</strong> Risk management & capital allocation</span>
                        </div>
                      </div>
                    </div>
                  </m.div>

                  <m.div
                    className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border-2 border-white/10 hover:border-[#00E5A0]/50 transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -8, scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00E5A0]/10 via-transparent to-[#42A5F5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating orb */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00E5A0]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00E5A0]/20 rounded-full border border-[#00E5A0]/30 mb-3">
                            <div className="w-2 h-2 bg-[#00E5A0] rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-[#00E5A0]">7+ YEARS • CURRENT</span>
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-white leading-tight group-hover:text-[#00E5A0] transition-colors duration-300">
                            Quant Developer & Educator
                          </h4>
                          <div className="flex items-center gap-2 mt-2 mb-3">
                            <i className="fas fa-arrow-right text-[#00E5A0] text-sm"></i>
                            <span className="text-base md:text-lg font-semibold text-gray-300">DataWithJose · Self-employed</span>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-[#00E5A0] to-[#42A5F5] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                          <i className="fas fa-code text-xl text-white"></i>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Productized proprietary trading algorithms end-to-end: API data ingestion → signal generation → automated execution with dynamic risk management. Custom bot solutions for private clients across futures, FX, crypto, and equities — engineered for high availability and observability.
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 group/item">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                            <i className="fas fa-check text-[#050B14] text-xs"></i>
                          </div>
                          <span className="text-sm text-gray-300"><strong className="text-white">Core Skills:</strong> Python, C# (NinjaScript), Pine Script, Docker</span>
                        </div>
                        <div className="flex items-start gap-3 group/item">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                            <i className="fas fa-check text-[#050B14] text-xs"></i>
                          </div>
                          <span className="text-sm text-gray-300"><strong className="text-white">Specialization:</strong> Validation-first research → live execution</span>
                        </div>
                      </div>
                    </div>
                  </m.div>
                </div>

                {/* Enhanced CTA for case studies */}
                <m.div
                  className="text-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="max-w-3xl mx-auto mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                      <strong className="text-white text-2xl">Bottom line:</strong> <span className="text-[#00E5A0] font-semibold">8+ years</span> of market experience building systems where failure isn't an option — from research to execution.
                    </p>
                  </div>

                  <Link
                    href="/portfolio"
                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#5AB9FF] text-[#050B14] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,229,160,0.5)] hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <i className="fas fa-folder-open relative z-10"></i>
                    <span className="relative z-10">Explore Trading Systems & Research Infrastructure</span>
                    <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-2 transition-transform duration-300"></i>
                  </Link>
                </m.div>
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
          <section className="newsletter py-24 bg-[#050B14]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <NewsletterForm />
              </div>
            </div>
          </section>

          {/* Tech Stack Carousel */}
          <section className="tech-stack py-24 bg-[#0A1526]">
            <div className="container mx-auto px-4">
              <m.h2
                className="text-4xl font-bold text-center mb-12 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                Technologies I Work With
              </m.h2>
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
