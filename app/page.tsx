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
      title: "Data Engineer | Open to Full-Time Opportunities",
      subtitle: "10+ years professional experience: Construction PM → Quant Trader → Data Engineer. I've seen bridges fail and trading systems crash. Now I build data infrastructure that survives both. High-availability systems with automatic failover and production-scale processing.",
      mobileSubtitle: "10+ years experience. Infrastructure that survives failure. High-availability with automatic failover.",
      gradient: "from-[#0A192F] via-[#1A3A52] to-[#005A9C]",
      cta: "Apply for Full-Time",
      secondaryCta: "Hire for Project",
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
          { value: "12+ Projects Delivered" },
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
      cta: "Apply for Full-Time",
      secondaryCta: "Hire for Project",
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
      cta: "Apply for Full-Time",
      secondaryCta: "Hire for Project",
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
          <section className="results relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A192F] via-[#0D1F3C] to-[#1A3A52] text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#00BFA5] rounded-full blur-[120px] animate-pulse"></div>
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
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#00BFA5] to-[#42A5F5] bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  Data Engineering Built on Real-World Experience
                </m.h2>
                <m.p
                  className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  My data engineering expertise comes from <span className="text-[#00BFA5] font-semibold">10+ years</span> across high-stakes environments. Each role taught me critical skills I now apply to building production data systems.
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
                    How My Background Strengthens My Data Engineering
                  </h3>
                  <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                    Each career phase developed specific skills that make me a better data engineer today
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
                  </m.div>

                  <m.div
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
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#42A5F5]/20 rounded-full border border-[#42A5F5]/30 mb-3">
                            <div className="w-2 h-2 bg-[#42A5F5] rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-[#42A5F5]">4 YEARS</span>
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
                  </m.div>

                  <m.div
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
              <m.h2
                className="text-4xl font-bold text-center mb-12 text-gray-900"
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
