'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CertificationsSection from '../../components/CertificationsSection';
import StructuredData from '../../components/StructuredData';
import { generatePersonSchema } from '../../lib/structured-data';

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');

  // Personal metrics and achievements
  const metrics = {
    experience: '10+',
    projects: '12+',
    clients: '8+',
    countries: '4+'
  };

  const achievements = [
    { metric: 'High-Availability', description: 'Fault-tolerant systems in production' },
    { metric: 'Cost-Optimized', description: 'Infrastructure through strategic optimization' },
    { metric: 'Low-Latency', description: 'Real-time pipeline processing' },
    { metric: 'Production-Scale', description: 'Data processing capacity' }
  ];

  const coreValues = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Reliability First',
      description: 'Systems that work when capital is at stake. Design for failure, instrument everything, monitor 24/7.'
    },
    {
      icon: 'fas fa-bullseye',
      title: 'Validation-First',
      description: 'Out-of-sample testing, walk-forward analysis, and sensitivity testing. A backtest is a hypothesis, not a promise.'
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Risk-Aware',
      description: 'Position sizing, drawdown controls, and execution safeguards built into the system, not bolted on.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Capital Protection',
      description: 'Technical rigor that creates real leverage. Robustness measured by the losses a system prevents.'
    }
  ];

  const testimonials = [
    {
      quote: "Jose delivered excellent engineering work on our trading infrastructure. His background in algorithmic trading was valuable for our systematic execution needs.",
      author: "Michael Chen",
      position: "CTO, TraderDaddy",
      image: "/images/testimonials/michael.jpg",
      impact: "Improved research efficiency"
    },
    {
      quote: "Solid engineering skills and reliable delivery. Jose built key components of our research platform with strong, well-tested performance.",
      author: "Sarah Williams",
      position: "Head of Data, FinTech Startup",
      image: "/images/testimonials/sarah.jpg",
      impact: "Enhanced data throughput"
    },
    {
      quote: "Professional and skilled developer. Jose delivered our AWS data pipeline on time with good documentation and testing.",
      author: "Carlos Rodriguez",
      position: "Data Director, E-commerce",
      image: "/images/testimonials/carlos.jpg",
      impact: "Reliable data pipeline"
    }
  ];

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, []);
  return (
    <>
      <StructuredData data={generatePersonSchema()} />
      <div className="min-h-screen bg-[#050B14] text-[#E6EDF3]">
        {/* Preloader */}
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
          className="relative bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white pt-16 pb-24 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <Link href="/" className="hover:text-green-400 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-green-400">About Me</span>
              </div>
            </nav>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <m.div
                className="lg:col-span-3"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight relative">
                  <span className="text-white drop-shadow-2xl relative">
                    I'm Jose Acosta, Quantitative Developer
                  </span>
                </h1>
                <div className="mb-10">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                    Developing Robust Algorithmic Trading Systems | From Research to Execution
                  </p>
                  <p className="text-lg md:text-xl text-green-400 leading-relaxed font-semibold mb-2">
                    Turning trading logic into systematic, validated, and executable systems
                  </p>
                  <p className="text-base md:text-lg text-blue-300 leading-relaxed font-medium mb-2">
                    Open to Full-Time Quant Roles & Select Consulting Engagements
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                    📍 Based in Caracas, Venezuela | Available for remote work worldwide
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6 border border-white/20">
                    <p className="text-gray-200 text-sm leading-relaxed italic">
                      "A strategy is not considered robust simply because it produces an attractive backtest.
                      The goal is straightforward: build trading systems that can be researched rigorously,
                      tested honestly, and engineered to operate in the real world."
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                      Python
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                      C# (NinjaScript) • Pine Script
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                      PostgreSQL • TimescaleDB
                    </span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30">
                      Futures • FX • Crypto • Equities
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <a
                    href="mailto:datawithjose@outlook.com?subject=Quantitative Development - Let's Work Together&body=Hi Jose,%0D%0A%0D%0AI'm interested in discussing a quantitative development project with you.%0D%0A%0D%0AProject type:%0D%0A☐ Strategy research & validation%0D%0A☐ Backtesting infrastructure%0D%0A☐ Automated execution systems%0D%0A☐ Risk management%0D%0A☐ Other: _________%0D%0A%0D%0ATimeline: _________%0D%0ABudget range: _________%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards"
                    className="group bg-gradient-to-r from-[#00E5A0] to-[#00C98C] hover:from-[#00FFB3] hover:to-[#00E5A0] text-[#050B14] px-8 py-4 rounded-xl font-bold transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Let's Work Together
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </a>
                  <Link
                    href="/portfolio"
                    className="group border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center backdrop-blur-sm flex items-center justify-center"
                  >
                    <i className="fas fa-briefcase mr-2"></i>
                    View My Work
                    <i className="fas fa-external-link-alt ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
                  </Link>
                </div>
              </m.div>

              {/* Profile Image */}
              <m.div
                className="lg:col-span-2 flex justify-center lg:justify-end"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="relative inline-block">
                  <div className="w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-green-500 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:border-green-400 hover:scale-105">
                    <img
                      src="/images/profile-about.jpg"
                      alt="Jose Acosta - Quantitative Developer"
                      width={384}
                      height={384}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating tech elements */}
                  <m.div
                    className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <i className="fab fa-python text-white text-xl"></i>
                  </m.div>
                  <m.div
                    className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-110"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <i className="fas fa-chart-line text-white text-xl"></i>
                  </m.div>
                  <m.div
                    className="absolute top-1/2 -left-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110"
                    animate={{ x: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <i className="fas fa-database text-white text-sm"></i>
                  </m.div>
                  <m.div
                    className="absolute top-8 -right-8 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-110"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <i className="fas fa-cogs text-white text-sm"></i>
                  </m.div>
                </div>
              </m.div>
            </div>

            {/* Key Impact Metrics */}
            <m.div
              className="grid md:grid-cols-4 gap-8 mt-16"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <m.div
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl font-bold text-green-400 mb-2">High-Availability</div>
                <div className="text-gray-300 text-sm">Fault-Tolerant Systems</div>
              </m.div>
              <m.div
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl font-bold text-blue-400 mb-2">Cost-Optimized</div>
                <div className="text-gray-300 text-sm">Infrastructure Design</div>
              </m.div>
              <m.div
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl font-bold text-purple-400 mb-2">Production-Scale</div>
                <div className="text-gray-300 text-sm">Data Processing</div>
              </m.div>
              <m.div
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl font-bold text-orange-400 mb-2">Low-Latency</div>
                <div className="text-gray-300 text-sm">Real-Time Processing</div>
              </m.div>
            </m.div>
          </div>
        </m.div>

        {/* Interactive Content Tabs */}
        <div className="py-24">
          <div className="container mx-auto px-4">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-16 gap-6">
              {[
                { id: 'overview', label: 'Overview', icon: 'fas fa-user' },
                { id: 'journey', label: 'My Journey', icon: 'fas fa-road' },
                { id: 'values', label: 'Core Values', icon: 'fas fa-heart' },
                { id: 'achievements', label: 'Achievements', icon: 'fas fa-trophy' }
              ].map((tab) => (
                <m.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === tab.id
                      ? 'bg-[#00E5A0] text-[#050B14] shadow-lg'
                      : 'bg-[#0D1B30] text-gray-300 hover:bg-[#1E2D45] shadow-md border border-[#1E2D45]'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </m.button>
              ))}
            </div>

            {/* Tab Content */}
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold mb-6 text-white">Quantitative Developer with Real-World Context</h2>
                    <p className="text-lg mb-4 leading-relaxed text-gray-300">
                      I'm a Quantitative Developer with 8 years of active market experience, focused on turning trading logic
                      into systematic, validated, and executable systems — from research to live execution.
                      I work at the intersection of trading and software engineering: translating market ideas into explicit rules,
                      developing research and backtesting workflows, and engineering the execution layer that operates them live.
                    </p>
                    <p className="text-lg mb-4 leading-relaxed text-gray-300">
                      My approach is deliberately practical: a strategy is not considered robust simply because it produces an
                      attractive backtest. I focus on how performance behaves when the assumptions change — out-of-sample testing,
                      walk-forward validation, sensitivity analysis, realistic transaction costs, slippage, and execution constraints.
                    </p>
                    <p className="text-lg mb-6 leading-relaxed text-gray-300">
                      <strong>Philosophy:</strong> The goal is straightforward — build trading systems that can be researched
                      rigorously, tested honestly, and engineered to operate in the real world.
                    </p>

                    {/* How I Build Section */}
                    <div className="bg-gradient-to-br from-[#0A1526] to-[#0D1B30] p-6 rounded-xl border-l-4 border-[#00E5A0] mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-white">How I Build</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <i className="fas fa-bullseye text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Validation-first:</strong> Out-of-sample testing, walk-forward analysis, and sensitivity testing before anything goes live</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-shield-alt text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Realistic assumptions:</strong> Transaction costs, slippage, and execution constraints modeled from day one</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-dollar-sign text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Risk by design:</strong> Position sizing, drawdown controls, and execution safeguards built into the system</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-cogs text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Engineering discipline:</strong> High-availability, observability, and failure conditions — not bolted on, designed in</span>
                        </li>
                      </ul>
                    </div>

                    {/* Recent Work */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Recent Work:</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>End-to-end algorithm productization:</strong> API data ingestion → signal generation → automated execution with dynamic risk management</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Resilient market data pipelines:</strong> Low-latency ingestion from multiple broker APIs (e.g., Binance, Tradovate) with strict data integrity and real-time alerting</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Custom bot solutions:</strong> Automated client strategies in Python, C# (NinjaScript), and Pine Script — containerized for high availability</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Systematic trading education:</strong> Training programs translating quantitative concepts (e.g., SARIMA) and technical analysis into actionable algorithmic strategies</span>
                        </li>
                      </ul>
                    </div>

                    {/* Core Tech */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Core Tech:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2">Data & Processing:</h4>
                          <div className="flex flex-wrap gap-2">
                            {['Python', 'NumPy', 'pandas'].map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-blue-500/15 text-blue-300 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2">Platforms & Tools:</h4>
                          <div className="flex flex-wrap gap-2">
                            {['PostgreSQL', 'TimescaleDB', 'Docker'].map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-green-500/15 text-green-300 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2">Strategy & Scripting:</h4>
                          <div className="flex flex-wrap gap-2">
                            {['C# (NinjaScript)', 'Pine Script', 'Backtrader'].map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-purple-500/15 text-purple-300 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2">Infra & Delivery:</h4>
                          <div className="flex flex-wrap gap-2">
                            {['WebSockets', 'REST APIs', 'Airflow'].map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-orange-500/15 text-orange-300 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 bg-[#0A1526] p-3 rounded-lg">
                        <strong>Specialties:</strong> Systematic Strategy Development | Backtesting & Validation | Automated Execution | Risk Management
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6 text-white">Earlier Career</h3>
                    <div className="bg-gradient-to-br from-[#0A1526] to-[#0D1B30] p-6 rounded-xl border-l-4 border-[#42A5F5] mb-8">
                      <h4 className="font-semibold text-white mb-2">Earlier Career Context</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Before the markets, I managed civil-engineering projects—valuations, resource flows, construction metrics.
                        Different domain, same lesson: <strong>decisions are only as good as the systems and data that support them.</strong>
                      </p>
                      <p className="text-gray-300 leading-relaxed mt-3">
                        That foundation taught me to deliver under constraints, plan for failure modes, and communicate complex
                        technical concepts to non-technical audiences. It's why I approach quant development with structure,
                        accountability, and an understanding that robustness isn't just about uptime—it's about protecting capital
                        with confidence.
                      </p>
                    </div>

                    <h3 className="text-2xl font-bold mb-6 text-white">What I'm Looking For</h3>

                    {/* Currently Statement */}
                    <div className="bg-gradient-to-r from-[#0A1526] to-[#0D1B30] p-6 rounded-xl border-l-4 border-[#42A5F5] mb-6">
                      <p className="text-lg text-gray-300 leading-relaxed">
                        <strong className="text-[#42A5F5]">Currently:</strong> I'm seeking full-time Quantitative Developer roles with
                        proprietary trading firms, systematic trading teams, algorithmic trading groups, and trading technology companies.
                        I also take on select consulting projects where practical market knowledge and software engineering can create value.
                      </p>
                    </div>

                    {/* Full-Time Opportunities */}
                    <div className="bg-gradient-to-br from-[#0A1526] to-[#0D1B30] p-6 rounded-xl border-l-4 border-[#00E5A0] mb-6">
                      <h4 className="text-xl font-bold text-[#00E5A0] mb-3">
                        <i className="fas fa-briefcase mr-2"></i>
                        Full-Time Quantitative Developer Roles
                      </h4>
                      <p className="text-lg text-gray-300 mb-4">
                        Positions where practical market knowledge and software engineering meet — teams that treat
                        robustness as a requirement, not a feature request.
                      </p>
                      <p className="text-gray-300 mb-4">
                        <strong>Environments that interest me:</strong> <strong className="text-[#00E5A0]">Prop trading firms</strong>,
                        <strong className="text-[#00E5A0]"> systematic trading teams</strong>,
                        <strong className="text-[#00E5A0]"> algorithmic trading groups</strong>,
                        <strong className="text-[#00E5A0]"> trading technology companies</strong>
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm text-gray-400">
                        <div>
                          <strong className="text-gray-300">Ideal team environments:</strong>
                          <ul className="mt-1 space-y-1">
                            <li>• High-stakes systems where downtime has immediate capital impact</li>
                            <li>• Real-time requirements (streaming, event-driven architectures)</li>
                            <li>• Markets: futures, FX, crypto, and equities</li>
                            <li>• Culture that treats trading infrastructure as a product, not a cost center</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-gray-300">What I bring:</strong>
                          <ul className="mt-1 space-y-1">
                            <li>• Validation-first mindset — out-of-sample, walk-forward, sensitivity testing</li>
                            <li>• Business impact focus — I translate between trading and engineering language</li>
                            <li>• Production-grade systems built for observability and long-term maintenance</li>
                            <li>• Proven ability to deliver under pressure with cross-functional teams</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Consulting & Project Work */}
                    <div className="bg-gradient-to-br from-[#0A1526] to-[#0D1B30] p-6 rounded-xl border-l-4 border-[#8B5CF6] mb-6">
                      <h4 className="text-xl font-bold text-purple-400 mb-3">
                        <i className="fas fa-handshake mr-2"></i>
                        Consulting & Project Work
                      </h4>
                      <p className="text-gray-300 mb-3">
                        I also partner with traders and teams that need systematic trading infrastructure
                        but aren't ready for a full-time hire. For consulting services and project-based work,
                        <Link href="/services" className="text-purple-400 font-semibold hover:underline ml-1">
                          view my services page →
                        </Link>
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#0A1526] p-6 rounded-xl border border-[#1E2D45]">
                      <p className="text-gray-400 leading-relaxed">
                        Happy to share repos, architectural diagrams, or walk through design decisions and trade-offs.
                        I believe in building systems and cultures defined by clarity, rigor, and accountability.
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-white">Production Metrics in Detail</h3>
                    <m.div
                      className="bg-[#0D1B30] p-4 rounded-lg shadow-md border-l-4 border-[#00E5A0] mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-green-500 mb-1">High-Availability Systems</div>
                          <div className="text-gray-400 text-sm">Built fault-tolerant production pipelines with automatic failover, processing production-scale data with real-time and batch workloads, including on-call coverage and incident response</div>
                        </div>
                        <i className="fas fa-chart-line text-xl text-green-500"></i>
                      </div>
                    </m.div>
                    <m.div
                      className="bg-[#0D1B30] p-4 rounded-lg shadow-md border-l-4 border-[#42A5F5] mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-500 mb-1">Cost-Optimized Infrastructure</div>
                          <div className="text-gray-400 text-sm">Achieved through strategic partitioning, query optimization, compute right-sizing, and orchestration improvements without sacrificing performance</div>
                        </div>
                        <i className="fas fa-dollar-sign text-xl text-blue-500"></i>
                      </div>
                    </m.div>
                    <m.div
                      className="bg-[#0D1B30] p-4 rounded-lg shadow-md border-l-4 border-purple-500 mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-purple-500 mb-1">Low-Latency Processing</div>
                          <div className="text-gray-400 text-sm">Optimized end-to-end latency for real-time ingestion pipelines, enabling rapid decision-making for time-sensitive use cases</div>
                        </div>
                        <i className="fas fa-tachometer-alt text-xl text-purple-500"></i>
                      </div>
                    </m.div>
                    <m.div
                      className="bg-[#0D1B30] p-4 rounded-lg shadow-md border-l-4 border-orange-500"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-orange-500 mb-1">Production-Scale Processing</div>
                          <div className="text-gray-400 text-sm">Sustained throughput across batch and streaming workloads with data quality checks, lineage tracking, and automated alerting</div>
                        </div>
                        <i className="fas fa-database text-xl text-orange-500"></i>
                      </div>
                    </m.div>
                  </div>
                </div>
              )}

              {/* Journey Tab */}
              {activeTab === 'journey' && (
                <div>
                  <h2 className="text-4xl font-bold text-center mb-12 text-white">My Professional Journey</h2>
                  <div className="relative max-w-4xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#1E2D45]"></div>

                    {[
                      {
                        period: 'Apr 2019 - Present',
                        title: 'Quant Developer & Algorithmic Trading Educator',
                        company: 'DataWithJose · Self-employed · Remote',
                        description: 'Productized and commercialized proprietary trading algorithms, managing the end-to-end lifecycle from API data ingestion and signal generation to automated execution and dynamic risk management. Built custom bot solutions for private clients and directed systematic trading training programs.',
                        achievements: ['End-to-end algorithm lifecycle', 'Custom bots: Python, C#, Pine Script', 'Containerized high-availability systems', 'Systematic trading education programs'],
                        color: 'green'
                      },
                      {
                        period: 'Aug 2024 - Dec 2025',
                        title: 'Quant Developer & Trading Infrastructure Consultant',
                        company: 'TraderDaddy · Remote',
                        description: 'Architected resilient, low-latency pipelines to ingest and stabilize high-volatility market data from multiple broker APIs (e.g., Binance, Tradovate). Developed automated execution frameworks with error-handling, payload validation, and real-time alerting to prevent silent failures.',
                        achievements: ['Low-latency multi-broker ingestion', 'Strict data integrity controls', 'Error-handling & validation layers', 'Manual → automated transitions'],
                        color: 'blue'
                      },
                      {
                        period: 'Feb 2018 - Nov 2022',
                        title: 'Head of Trading & Quantitative Data Systems',
                        company: 'Fintech Alca Group, SA · Caracas, VE',
                        description: "Architected the firm's data infrastructure from the ground up, migrating legacy workflows into a governed warehouse with real-time WebSocket ingestion. Engineered high-availability decision-support systems on PostgreSQL and TimescaleDB for compliance-sensitive operations.",
                        achievements: ['Real-time WebSocket ingestion', 'Governed warehouse migration', 'PostgreSQL + TimescaleDB systems', 'Compliance-grade auditability'],
                        color: 'purple'
                      },
                      {
                        period: 'May 2014 - Dec 2017',
                        title: 'Senior Construction Project Manager',
                        company: 'Constructora Azurra, SA',
                        description: 'Managed construction projects from planning through execution. Developed systems thinking and risk management through load calculations, structural risk assessment, and resource optimization under tight constraints.',
                        achievements: ['Project delivery under constraints', 'Stakeholder communication', 'Resource optimization'],
                        color: 'orange'
                      }
                    ].map((experience, index) => (
                      <m.div
                        key={index}
                        className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                          }`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                      >
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                          <div className="bg-[#0D1B30] border border-[#1E2D45] p-6 rounded-2xl shadow-lg">
                            <div className="text-[#00E5A0] font-bold text-sm mb-2">{experience.period}</div>
                            <h3 className="text-xl font-bold mb-2 text-white">{experience.title}</h3>
                            <div className="text-gray-400 font-semibold mb-3">{experience.company}</div>
                            <p className="text-gray-300 mb-4">{experience.description}</p>
                            <div className="space-y-1">
                              {experience.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex items-center text-sm text-gray-400">
                                  <i className="fas fa-check text-[#00E5A0] mr-2"></i>
                                  <span>{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Timeline Dot */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#00E5A0] rounded-full border-4 border-[#050B14] shadow-lg"></div>
                      </m.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Values Tab */}
              {activeTab === 'values' && (
                <div>
                  <h2 className="text-4xl font-bold text-center mb-12 text-white">Core Values & Philosophy</h2>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {coreValues.map((value, index) => (
                      <m.div
                        key={index}
                        className="bg-[#0D1B30] border border-[#1E2D45] p-8 rounded-2xl shadow-lg text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -10 }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-[#00E5A0] to-[#42A5F5] rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className={`${value.icon} text-2xl text-[#050B14]`}></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{value.description}</p>
                      </m.div>
                    ))}
                  </div>

                  {/* Philosophy Statement */}
                  <m.div
                    className="bg-gradient-to-br from-[#0A1526] to-[#0D1B30] p-8 rounded-2xl border border-[#1E2D45]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-bold text-center mb-6 text-white">My Philosophy</h3>
                    <blockquote className="text-lg italic text-center text-gray-300 leading-relaxed">
                      "Quantitative development is not just about writing strategies. It's about building systems
                      that can be researched rigorously, tested honestly, and engineered to operate in the real world.
                      Every backtest should be treated as a hypothesis, every assumption should be questioned, and
                      every system should protect capital first. That's what drives me every day."
                    </blockquote>
                    <div className="text-center mt-4">
                      <span className="text-[#00E5A0] font-semibold">— Jose Acosta</span>
                    </div>
                  </m.div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div>
                  <h2 className="text-4xl font-bold text-center mb-12 text-white">Recognition & Impact</h2>

                  {/* Achievement Categories */}
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <m.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-rocket text-3xl text-white"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white">Validation & Robustness</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-lg font-bold text-[#00E5A0]">Walk-Forward</div>
                          <div className="text-sm text-gray-400">Out-of-Sample Testing</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#00E5A0]">Sensitivity</div>
                          <div className="text-sm text-gray-400">Analysis Under Changing Assumptions</div>
                        </div>
                      </div>
                    </m.div>

                    <m.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-shield-alt text-3xl text-white"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white">Reliability</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-lg font-bold text-[#42A5F5]">High-Availability</div>
                          <div className="text-sm text-gray-400">Fault-Tolerant Design</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#42A5F5]">Observability</div>
                          <div className="text-sm text-gray-400">Real-Time Alerting & Monitoring</div>
                        </div>
                      </div>
                    </m.div>

                    <m.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-globe text-3xl text-white"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white">Global Reach</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-purple-500">{metrics.countries}</div>
                          <div className="text-sm text-gray-400">Countries Served</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-500">{metrics.clients}</div>
                          <div className="text-sm text-gray-400">Satisfied Clients</div>
                        </div>
                      </div>
                    </m.div>
                  </div>

                  {/* Client Testimonials */}
                  <div>
                    <h3 className="text-2xl font-bold text-center mb-8 text-white">What Clients Say</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      {testimonials.map((testimonial, index) => (
                        <m.div
                          key={index}
                          className="bg-[#0D1B30] border border-[#1E2D45] p-6 rounded-2xl shadow-lg"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                          <div className="mb-4">
                            <div className="text-[#00E5A0] font-semibold text-sm mb-2">{testimonial.impact}</div>
                            <blockquote className="text-gray-300 italic mb-4">"{testimonial.quote}"</blockquote>
                          </div>
                          <div className="border-t border-[#1E2D45] pt-4">
                            <div className="font-semibold text-white">{testimonial.author}</div>
                            <div className="text-sm text-gray-400">{testimonial.position}</div>
                          </div>
                        </m.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </m.div>
          </div>
        </div>

        {/* Skills and Certifications Section */}
        <CertificationsSection />

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Work
                  <span className="block text-green-400 mt-2">Together?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Let's discuss your data challenges and create solutions that drive real business value
                  with production-grade reliability.
                </p>
              </m.div>

              {/* Action Options */}
              <m.div
                className="grid md:grid-cols-2 gap-8 mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-comments text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Start a Conversation</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Discuss your strategy or trading infrastructure challenges and explore how a validation-first approach can help solve them.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <i className="fas fa-arrow-right mr-2"></i>
                    Get In Touch
                  </Link>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-cogs text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Explore Services</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    See detailed information about my quantitative development services and how they apply to your operation.
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    View Services
                  </Link>
                </div>
              </m.div>

              {/* Key Differentiators */}
              <m.div
                className="border-t border-white/20 pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-gray-300 mb-6">What makes me different:</p>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-center justify-center">
                    <i className="fas fa-chart-line text-green-400 mr-2"></i>
                    <span>8+ years active market experience</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-shield-alt text-blue-400 mr-2"></i>
                    <span>Validation-first methodology</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-handshake text-purple-400 mr-2"></i>
                    <span>Capital protection focus</span>
                  </div>
                </div>
              </m.div>

              {/* Social Links */}
              <m.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-gray-300 mb-4 text-sm">Connect with me:</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/datawithjose"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow on LinkedIn"
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                  <a
                    href="https://github.com/thedatawithjose"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View GitHub Profile"
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <i className="fab fa-github text-xl"></i>
                  </a>
                  <a
                    href="https://instagram.com/datawithjose"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow on Instagram"
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}