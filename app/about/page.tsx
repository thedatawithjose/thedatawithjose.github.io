'use client';

import { motion } from 'framer-motion';
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
    projects: '15+',
    clients: '8+',
    countries: '4+'
  };

  const achievements = [
    { metric: '98%+', description: 'System uptime achieved in production' },
    { metric: '25%', description: 'Average cost reduction through optimization' },
    { metric: '<500ms', description: 'Average pipeline latency' },
    { metric: '2TB+', description: 'Daily data processing capacity' }
  ];

  const coreValues = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Reliability First',
      description: 'Systems that work when business decisions depend on them. Design for failure, instrument everything.'
    },
    {
      icon: 'fas fa-bullseye',
      title: 'Product-Minded',
      description: 'Pipelines aligned to decisions & KPIs, not just storage. Data contracts that serve business outcomes.'
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Cost-Aware',
      description: 'Right-sizing, optimization, and monitoring by design. Every query and process justified by value.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Business Impact',
      description: 'Technical rigor that creates real leverage. Measurable improvements in speed, cost, and reliability.'
    }
  ];

  const testimonials = [
    {
      quote: "Jose delivered excellent data engineering work on our trading infrastructure. His background in algorithmic trading was valuable for our financial data processing needs.",
      author: "Michael Chen",
      position: "CTO, TraderDaddy",
      image: "/images/testimonials/michael.jpg",
      impact: "Improved research efficiency"
    },
    {
      quote: "Solid data engineering skills and reliable delivery. Jose built key components of our analytics platform with good performance.",
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
      <div className="min-h-screen bg-white text-gray-900">
        {/* Preloader */}
        <div id="preloader" className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="jumper flex space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
          </div>
        </div>

        <Header />

        {/* Enhanced Hero Section */}
        <motion.div
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
              <motion.div
                className="lg:col-span-3"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight relative">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl relative">
                    I'm Jose Acosta
                  </span>
                  <span className="block text-2xl md:text-3xl bg-gradient-to-r from-green-400 via-green-300 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mt-3 font-medium relative">
                    Data Engineer
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse opacity-30"></div>
                  </span>
                </h1>
                <div className="mb-10">
                  <p className="text-xl md:text-2xl text-gray-200 mb-4 leading-relaxed font-medium">
                    Data Engineer
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                    Time-Series & Real-Time Systems | ex-Quant Trader | ex-Construction Project Manager
                  </p>
                  <p className="text-lg md:text-xl text-green-400 leading-relaxed font-semibold mb-2">
                    Building high-availability data systems where reliability isn't optional
                  </p>
                  <p className="text-base md:text-lg text-blue-300 leading-relaxed font-medium mb-6">
                    Open to Full-Time Data Engineering Opportunities
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6 border border-white/20">
                    <p className="text-gray-200 text-sm leading-relaxed italic">
                      "Data quality, latency, and reliability aren't 'tech details'—they're business risk. 
                      When a pipeline fails and decisions can't wait, you learn to build for resilience."
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                      Python • PySpark
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                      dbt • Snowflake
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                      Airflow • AWS
                    </span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30">
                      98%+ uptime
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <a
                    href="mailto:datawithjose@outlook.com?subject=Data Engineering Consultation - Let's Work Together&body=Hi Jose,%0D%0A%0D%0AI'm interested in discussing a data engineering project with you.%0D%0A%0D%0AProject type:%0D%0A☐ Real-time data pipelines%0D%0A☐ ML in production%0D%0A☐ Data infrastructure%0D%0A☐ Trading algorithms%0D%0A☐ Other: _________%0D%0A%0D%0ATimeline: _________%0D%0ABudget range: _________%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards"
                    className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
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
              </motion.div>

              {/* Profile Image */}
              <motion.div
                className="lg:col-span-2 flex justify-center lg:justify-end"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="relative inline-block">
                  <div className="w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-green-500 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:border-green-400 hover:scale-105">
                    <img 
                      src="/images/profile-about.jpg" 
                      alt="Jose Acosta - Data Engineer"
                      width={384}
                      height={384}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating tech elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <i className="fab fa-python text-white text-xl"></i>
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-110"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <i className="fas fa-chart-line text-white text-xl"></i>
                  </motion.div>
                  <motion.div 
                    className="absolute top-1/2 -left-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110"
                    animate={{ x: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <i className="fas fa-database text-white text-sm"></i>
                  </motion.div>
                  <motion.div 
                    className="absolute top-8 -right-8 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-110"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <i className="fas fa-cogs text-white text-sm"></i>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Key Impact Metrics */}
            <motion.div
              className="grid md:grid-cols-4 gap-8 mt-16"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl font-bold text-green-400 mb-2">98%+</div>
                <div className="text-gray-300 text-sm">System Uptime Achieved</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">25%</div>
                <div className="text-gray-300 text-sm">Cost Reduction Achieved</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl font-bold text-purple-400 mb-2">2TB+</div>
                <div className="text-gray-300 text-sm">Daily Data Processing</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl font-bold text-orange-400 mb-2">&lt;500ms</div>
                <div className="text-gray-300 text-sm">Average Pipeline Latency</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

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
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold mb-6">Data Engineer with Real-World Context</h2>
                    <p className="text-lg mb-4 leading-relaxed">
                      I'm a Data Engineer who came up through quantitative trading. For four years I put real capital 
                      behind time-series models—where a bad join or silent failure cost money before you could roll it back. 
                      That experience taught me that every delay, quality issue, or bad assumption in data has a real business cost. 
                      Now I build the high-availability, real-time data systems I wished I'd had.
                    </p>
                    <p className="text-lg mb-4 leading-relaxed">
                      Before that, I spent four years in construction project management, learning to deliver under pressure, 
                      manage constraints, and communicate with clarity across technical and non-technical teams. That background 
                      shaped how I approach systems today: with structure, accountability, and respect for the human side of engineering.
                    </p>
                    <p className="text-lg mb-6 leading-relaxed">
                      <strong>Philosophy:</strong> Data quality, latency, and reliability aren't "tech details"—they're 
                      business risk. When a pipeline fails and decisions can't wait, you learn to build for resilience, 
                      instrument everything, and ship only what you can monitor.
                    </p>
                    
                    {/* How I Build Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border-l-4 border-green-500 mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">How I Build</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <i className="fas fa-bullseye text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Product-minded:</strong> Pipelines aligned to decisions & KPIs, not just storage</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-shield-alt text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Quality & reliability first:</strong> Unit tests + dbt data tests, SLAs/SLIs, lineage tracking</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-dollar-sign text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Cost-aware by design:</strong> Partitioning, pruning, caching, orchestration, right-sizing</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-handshake text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Data contracts:</strong> Work backward from outcomes to schemas, ownership, and alerts—so when something breaks at 2 AM, the right person gets paged, not the entire team</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Recent Work */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Recent Work:</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Real-time ingestion system:</strong> Built WebSocket → cloud warehouse pipeline with alerting and on-call playbooks that reduced data staleness from hours to seconds, enabling same-day decisions</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Document parsing & normalization:</strong> Shipped services that transform semi-structured data into clean schemas, reducing manual data cleanup by 80%</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Streaming/ETL pipelines:</strong> Designed systems that cut research cycles by 40% and made backtesting 5x faster through reliable data infrastructure</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                          <span><strong>Anomaly detection services:</strong> Delivered monitoring that surfaces data quality issues before they impact downstream users or business decisions</span>
                        </li>
                      </ul>
                    </div>

                    {/* Core Tech */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">Core Tech:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Data & Processing:</h4>
                          <div className="flex flex-wrap gap-2">
                            {['Python', 'SQL', 'PySpark'].map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Platforms & Tools:</h4>
                          <div className="flex flex-wrap gap-2">
                            {['Snowflake', 'Databricks', 'dbt'].map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Orchestration & Infra:</h4>
                          <div className="flex flex-wrap gap-2">
                            {['Airflow', 'Docker', 'AWS', 'Kubernetes'].map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Quality & Monitoring:</h4>
                          <div className="flex flex-wrap gap-2">
                            {['MLflow', 'Great Expectations', 'Soda'].map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <strong>Specialties:</strong> Time-Series | Streaming | Real-Time Systems | Data Modeling | ML in Production
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6">Earlier Career</h3>
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-500 mb-8">
                      <h4 className="font-semibold text-gray-800 mb-2">Earlier Career Context</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Before tech, I managed civil-engineering projects—valuations, resource flows, construction metrics. 
                        Different domain, same lesson: <strong>decisions are only as good as the systems and data that support them.</strong>
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-3">
                        This foundation taught me to deliver under constraints, manage stakeholder expectations, and communicate 
                        complex technical concepts to non-technical audiences. It's why I approach data engineering with structure, 
                        accountability, and an understanding that reliability isn't just about uptime—it's about enabling people to 
                        do their jobs with confidence.
                      </p>
                    </div>

                    <h3 className="text-2xl font-bold mb-6">What I'm Looking For</h3>
                    
                    {/* Currently Statement */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-l-4 border-blue-500 mb-6">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        <strong className="text-blue-700">Currently:</strong> I'm seeking full-time Data Engineering opportunities with teams building 
                        mission-critical data systems. I also take on select consulting projects for startups and small businesses 
                        that need hands-on help establishing reliable data infrastructure.
                      </p>
                    </div>
                    
                    {/* Full-Time Opportunities */}
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-500 mb-6">
                      <h4 className="text-xl font-bold text-green-700 mb-3">
                        <i className="fas fa-briefcase mr-2"></i>
                        Full-Time Data Engineering Roles
                      </h4>
                      <p className="text-lg text-gray-700 mb-4">
                        Positions with teams building mission-critical data systems in data-intensive products—where milliseconds matter and "close enough" breaks the business model.
                      </p>
                      <p className="text-gray-700 mb-4">
                        <strong>Domains that interest me:</strong> <strong className="text-green-700">Fintech</strong> (real-time pricing, risk models, trading infrastructure), 
                        <strong className="text-green-700"> E-commerce</strong> (inventory optimization, recommendation engines), 
                        <strong className="text-green-700"> Logistics</strong> (supply-chain analytics), 
                        <strong className="text-green-700"> SaaS</strong> (product analytics, usage-based billing)
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                        <div>
                          <strong>Ideal team environments:</strong>
                          <ul className="mt-1 space-y-1">
                            <li>• High-stakes systems where downtime has immediate business impact</li>
                            <li>• Real-time requirements (streaming, event-driven architectures)</li>
                            <li>• Cost-sensitive projects where optimization affects margins</li>
                            <li>• Culture that treats data infrastructure as a product, not a cost center</li>
                          </ul>
                        </div>
                        <div>
                          <strong>What I bring to both contexts:</strong>
                          <ul className="mt-1 space-y-1">
                            <li>• Reliability-first mindset shaped by years in high-stakes environments</li>
                            <li>• Business impact focus—I translate between engineering and business language</li>
                            <li>• Production-ready systems built for observability and long-term maintenance</li>
                            <li>• Proven ability to deliver under pressure with cross-functional teams</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Consulting & Project Work */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500 mb-6">
                      <h4 className="text-xl font-bold text-purple-700 mb-3">
                        <i className="fas fa-handshake mr-2"></i>
                        Consulting & Project Work
                      </h4>
                      <p className="text-gray-700 mb-3">
                        I also partner with select startups and growing businesses that need production-grade data infrastructure 
                        but aren't ready for a full-time hire. For consulting services and project-based work, 
                        <Link href="/services" className="text-purple-700 font-semibold hover:underline ml-1">
                          view my services page →
                        </Link>
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <p className="text-gray-600 leading-relaxed">
                        Happy to share repos, architectural diagrams, or walk through design decisions and trade-offs. 
                        I believe in building systems and cultures defined by clarity, empathy, and accountability.
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Production Metrics in Detail</h3>
                    <motion.div
                      className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-green-500 mb-1">98%+ System Uptime</div>
                          <div className="text-gray-700 text-sm">Maintained across production pipelines processing 2TB+ daily with real-time and batch workloads, including on-call coverage and incident response</div>
                        </div>
                        <i className="fas fa-chart-line text-xl text-green-500"></i>
                      </div>
                    </motion.div>
                    <motion.div
                      className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-500 mb-1">25% Cost Reduction</div>
                          <div className="text-gray-700 text-sm">Achieved through strategic partitioning, query optimization, compute right-sizing, and orchestration improvements without sacrificing performance</div>
                        </div>
                        <i className="fas fa-dollar-sign text-xl text-blue-500"></i>
                      </div>
                    </motion.div>
                    <motion.div
                      className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500 mb-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-purple-500 mb-1">&lt;500ms Pipeline Latency</div>
                          <div className="text-gray-700 text-sm">Average end-to-end latency for real-time ingestion pipelines, enabling sub-second decision-making for time-sensitive use cases</div>
                        </div>
                        <i className="fas fa-tachometer-alt text-xl text-purple-500"></i>
                      </div>
                    </motion.div>
                    <motion.div
                      className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-orange-500 mb-1">2TB+ Daily Processing</div>
                          <div className="text-gray-700 text-sm">Sustained throughput across batch and streaming workloads with data quality checks, lineage tracking, and automated alerting</div>
                        </div>
                        <i className="fas fa-database text-xl text-orange-500"></i>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Journey Tab */}
              {activeTab === 'journey' && (
                <div>
                  <h2 className="text-4xl font-bold text-center mb-12">My Professional Journey</h2>
                  <div className="relative max-w-4xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-500"></div>

                    {[
                      {
                        period: 'Aug 2024 - Present',
                        title: 'Data Engineering Consultant',
                        company: 'TraderDaddy (NYC)',
                        description: 'Improved research cycle efficiency and backtesting throughput with production-grade Python/SQL frameworks. Built real-time market-data pipeline (WebSocket → Snowflake) and orchestrated Airflow on AWS.',
                        achievements: ['Faster research cycles', 'Enhanced backtesting performance', 'Real-time market data pipeline'],
                        color: 'green'
                      },
                      {
                        period: 'Sep 2022 - Jul 2024',
                        title: 'Data Engineering Consultant',
                        company: 'International Clients',
                        description: 'Built end-to-end data platforms on AWS and Snowflake with dbt for analytics and ML. Developed real-time fraud/risk APIs using FastAPI and Kubernetes.',
                        achievements: ['High test coverage', 'AWS/Snowflake platforms', 'Real-time fraud detection'],
                        color: 'blue'
                      },
                      {
                        period: 'Feb 2019 - Jul 2022',
                        title: 'Head of Trading & Quantitative Data Systems',
                        company: 'Fintech Alca Group',
                        description: 'Improved strategy backtesting throughput by automating portfolio optimization pipelines. Built data platform with ETL/ELT processes from market data sources.',
                        achievements: ['Automated backtesting pipeline', 'Data-driven investment decisions', 'Market data ETL platform'],
                        color: 'purple'
                      },
                      {
                        period: 'May 2014 - Dec 2017',
                        title: 'Senior Construction Project Manager',
                        company: 'Constructora Azurra, SA',
                        description: 'Managed construction projects from planning through execution. Developed systems thinking and risk management approach through load calculations, structural risk assessment, and resource optimization under tight constraints.',
                        achievements: ['Project delivery under constraints', 'Stakeholder communication', 'Resource optimization'],
                        color: 'orange'
                      }
                    ].map((experience, index) => (
                      <motion.div
                        key={index}
                        className={`relative flex items-center mb-12 ${
                          index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                        }`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                      >
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                          <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <div className={`text-${experience.color}-500 font-bold text-sm mb-2`}>{experience.period}</div>
                            <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                            <div className="text-gray-600 font-semibold mb-3">{experience.company}</div>
                            <p className="text-gray-700 mb-4">{experience.description}</p>
                            <div className="space-y-1">
                              {experience.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex items-center text-sm">
                                  <i className={`fas fa-check text-${experience.color}-500 mr-2`}></i>
                                  <span>{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Timeline Dot */}
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-${experience.color}-500 rounded-full border-4 border-white shadow-lg`}></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Values Tab */}
              {activeTab === 'values' && (
                <div>
                  <h2 className="text-4xl font-bold text-center mb-12">Core Values & Philosophy</h2>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {coreValues.map((value, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-8 rounded-2xl shadow-lg text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -10 }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className={`${value.icon} text-2xl text-white`}></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Philosophy Statement */}
                  <motion.div
                    className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-bold text-center mb-6">My Philosophy</h3>
                    <blockquote className="text-lg italic text-center text-gray-700 leading-relaxed">
                      "Data engineering is not just about moving data from point A to point B. It's about creating 
                      systems that empower businesses to make better decisions, faster. Every pipeline should tell 
                      a story, every algorithm should solve a real problem, and every solution should be built 
                      with the end user in mind. That's what drives me every day."
                    </blockquote>
                    <div className="text-center mt-4">
                      <span className="text-green-500 font-semibold">— Jose Acosta</span>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div>
                  <h2 className="text-4xl font-bold text-center mb-12">Recognition & Impact</h2>
                  
                  {/* Achievement Categories */}
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-rocket text-3xl text-white"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-4">Performance Impact</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-green-500">40%</div>
                          <div className="text-sm text-gray-600">Research Cycle Improvement</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-500">5x</div>
                          <div className="text-sm text-gray-600">Throughput Enhancement</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-shield-alt text-3xl text-white"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-4">Reliability</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-blue-500">98%</div>
                          <div className="text-sm text-gray-600">System Uptime</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-500">85%</div>
                          <div className="text-sm text-gray-600">Test Coverage</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-globe text-3xl text-white"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-4">Global Reach</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-purple-500">{metrics.countries}</div>
                          <div className="text-sm text-gray-600">Countries Served</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-500">{metrics.clients}</div>
                          <div className="text-sm text-gray-600">Satisfied Clients</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Client Testimonials */}
                  <div>
                    <h3 className="text-2xl font-bold text-center mb-8">What Clients Say</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={index}
                          className="bg-white p-6 rounded-2xl shadow-lg"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                          <div className="mb-4">
                            <div className="text-green-500 font-semibold text-sm mb-2">{testimonial.impact}</div>
                            <blockquote className="text-gray-700 italic mb-4">"{testimonial.quote}"</blockquote>
                          </div>
                          <div className="border-t pt-4">
                            <div className="font-semibold">{testimonial.author}</div>
                            <div className="text-sm text-gray-600">{testimonial.position}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Skills and Certifications Section */}
        <CertificationsSection />

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
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
              </motion.div>

              {/* Action Options */}
              <motion.div
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
                    Discuss your specific data engineering challenges and explore how my experience can help solve them.
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
                    See detailed information about my data engineering services and how they can transform your business.
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    View Services
                  </Link>
                </div>
              </motion.div>

              {/* Key Differentiators */}
              <motion.div
                className="border-t border-white/20 pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-gray-300 mb-6">What makes me different:</p>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-center justify-center">
                    <i className="fas fa-chart-line text-green-400 mr-2"></i>
                    <span>3+ years data engineering experience</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-shield-alt text-blue-400 mr-2"></i>
                    <span>Production-tested reliability</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-handshake text-purple-400 mr-2"></i>
                    <span>Business impact focus</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-gray-300 mb-4 text-sm">Connect with me:</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/joseacostar"
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
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}