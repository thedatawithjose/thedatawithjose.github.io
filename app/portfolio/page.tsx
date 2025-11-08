'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StructuredData from '../../components/StructuredData';
import { generatePortfolioSchema } from '../../lib/structured-data';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Portfolio statistics
  const portfolioStats = {
    totalProjects: '20+',
    linesOfCode: '25K+',
    clientsSatisfied: '12+',
    averageROI: '120%'
  };

  // Enhanced project data with more details
  const projects = [
    {
      id: 1,
      title: 'Mean Reversion OU Trading Bot',
      category: 'trading',
      type: 'Algorithmic Trading',
      description: 'Ornstein-Uhlenbeck process-based mean reversion strategy with machine learning optimization. Features real-time execution, risk management, and performance analytics.',
      detailedDescription: 'This trading system implements the Ornstein-Uhlenbeck stochastic process to identify mean-reverting assets and execute profitable trades. The system includes risk management protocols, real-time market data processing, and automated parameter optimization using machine learning techniques.',
      technologies: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'yfinance', 'Docker', 'Redis'],
      results: {
        cagr: '15%',
        sharpe: '1.8',
        maxDrawdown: '-15%',
        winRate: '67%'
      },
      metrics: {
        'Annual Return': '15%',
        'Sharpe Ratio': '1.8',
        'Max Drawdown': '-15%',
        'Win Rate': '67%',
        'Total Trades': '1,247',
        'Avg Trade Duration': '3 days'
      },
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
      link: '/portfolio/mean-reversion-ou',
      featured: true,
      clientTestimonial: "The trading bot delivered solid performance with good risk management.",
      clientName: "TradeFlow Capital",
      impact: "Delivered consistent trading performance with good risk controls",
      challenges: ['Real-time data processing', 'Risk management optimization', 'Market regime detection'],
      solutions: ['Implemented streaming data pipeline', 'Developed dynamic position sizing', 'Created regime classification model']
    },
    {
      id: 2,
      title: 'Edgar SEC Parser',
      category: 'data-engineering',
      type: 'Data Engineering',
      description: 'High-performance SEC filing extraction system with SGML and XBRL parsing. Processes complex regulatory documents with intelligent content detection.',
      detailedDescription: 'A comprehensive system designed to parse and extract structured data from SEC EDGAR filings. Handles multiple document formats including 10-K, 10-Q, and 8-K forms with robust error handling and data validation.',
      technologies: ['Python', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'Apache Airflow', 'Redis'],
      results: {
        throughput: 'High throughput',
        accuracy: '98%',
        errorRecovery: 'Excellent',
        documentsProcessed: '50K+'
      },
      metrics: {
        'Processing Speed': 'High throughput',
        'Accuracy Rate': '98%',
        'Error Recovery': 'Excellent',
        'Documents Processed': '50K+',
        'Data Points Extracted': '10M+',
        'Uptime': '98%'
      },
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop',
      link: '/portfolio/edgar-sec-parser',
      featured: true,
      clientTestimonial: "This parser significantly improved our regulatory compliance workflow.",
      clientName: "FinData Analytics",
      impact: "Improved compliance processing efficiency",
      challenges: ['Complex document formats', 'Large-scale data processing', 'Error handling'],
      solutions: ['Built adaptive parsing engine', 'Implemented parallel processing', 'Created comprehensive error recovery']
    },
    {
      id: 3,
      title: 'Financial Data Pipeline',
      category: 'data-engineering',
      type: 'Data Engineering',
      description: 'Scalable ETL pipeline for real-time market data ingestion, transformation, and analysis. Handles multiple data sources with automated quality checks.',
      detailedDescription: 'A robust data pipeline architecture that processes real-time market data from multiple sources, performs complex transformations, and delivers clean, analysis-ready data to downstream systems.',
      technologies: ['Python', 'Apache Spark', 'Kafka', 'PostgreSQL', 'TimescaleDB', 'Docker', 'Kubernetes'],
      results: {
        recordsDaily: '100K+',
        uptime: '98%',
        latency: '<500ms',
        dataSources: '8+'
      },
      metrics: {
        'Daily Records': '100K+',
        'System Uptime': '98%',
        'Processing Latency': '<500ms',
        'Data Sources': '8+',
        'Data Quality': '98%',
        'Cost Reduction': '25%'
      },
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop',
      link: '/portfolio/financial-data-pipeline',
      featured: true,
      clientTestimonial: "The pipeline enhanced our data infrastructure capabilities.",
      clientName: "MarketScope Inc",
      impact: "Enabled real-time analytics for investment portfolio",
      challenges: ['Real-time processing', 'Data quality assurance', 'Scalability requirements'],
      solutions: ['Implemented stream processing', 'Built automated QA checks', 'Designed auto-scaling architecture']
    },
    {
      id: 4,
      title: 'Moving Average Trading Bot',
      category: 'trading',
      type: 'Algorithmic Trading',
      description: 'Dual moving average crossover strategy with dynamic position sizing and comprehensive risk management protocols.',
      detailedDescription: 'A trading system that implements dual moving average crossover strategies enhanced with dynamic position sizing, stop-loss management, and market volatility adjustments.',
      technologies: ['Python', 'Pandas', 'Backtrader', 'REST API', 'Docker', 'PostgreSQL'],
      results: {
        cagr: '12%',
        sharpe: '1.5',
        maxDrawdown: '-18%',
        winRate: '62%'
      },
      metrics: {
        'Annual Return': '12%',
        'Sharpe Ratio': '1.5',
        'Max Drawdown': '-18%',
        'Win Rate': '62%',
        'Total Trades': '892',
        'Profit Factor': '1.4'
      },
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop',
      link: '/portfolio/moving-average-bot',
      featured: false,
      clientTestimonial: "Consistent performance with excellent risk-adjusted returns.",
      clientName: "Algo Capital",
      impact: "Generated steady trading returns",
      challenges: ['Market noise filtering', 'Position sizing optimization', 'Risk management'],
      solutions: ['Implemented adaptive filtering', 'Developed dynamic sizing', 'Created comprehensive risk controls']
    },
    {
      id: 5,
      title: 'Risk Management Dashboard',
      category: 'data-science',
      type: 'Data Science',
      description: 'Real-time risk monitoring system with VaR calculations, position tracking, and automated alert mechanisms.',
      detailedDescription: 'A comprehensive risk management platform that provides real-time monitoring of portfolio risk metrics, automated alerts, and analytics for institutional trading operations.',
      technologies: ['Python', 'Vue.js', 'Redis', 'Kubernetes', 'WebSocket', 'D3.js'],
      results: {
        riskMetrics: '15+',
        responseTime: '<100ms',
        alertAccuracy: '90%',
        portfoliosMonitored: '15+'
      },
      metrics: {
        'Risk Metrics': '15+',
        'Response Time': '<100ms',
        'Alert Accuracy': '90%',
        'Portfolios Monitored': '15+',
        'Data Points/Second': '2K+',
        'User Satisfaction': '85%'
      },
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      link: '#',
      featured: false,
      clientTestimonial: "Essential tool for our daily risk management operations.",
      clientName: "RiskPro Holdings",
      impact: "Enhanced risk monitoring and loss prevention",
      challenges: ['Real-time calculations', 'User interface design', 'Alert optimization'],
      solutions: ['Built streaming analytics', 'Created intuitive dashboards', 'Implemented smart alerting']
    },
    {
      id: 6,
      title: 'ML Prediction Engine',
      category: 'data-science',
      type: 'Machine Learning',
      description: 'Machine learning system for market prediction using ensemble methods, feature engineering, and real-time inference.',
      detailedDescription: 'An ML pipeline that combines multiple algorithms including XGBoost, LSTM networks, and Random Forests to predict market movements with feature engineering and real-time deployment capabilities.',
      technologies: ['Python', 'TensorFlow', 'XGBoost', 'Scikit-learn', 'MLflow', 'Kubernetes'],
      results: {
        accuracy: '68%',
        precision: '66%',
        recall: '70%',
        f1Score: '68%'
      },
      metrics: {
        'Prediction Accuracy': '68%',
        'Precision': '66%',
        'Recall': '70%',
        'F1 Score': '68%',
        'Models Deployed': '8+',
        'Training Time': '4 hours'
      },
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
      link: '#',
      featured: false,
      clientTestimonial: "The prediction accuracy met our expectations with solid performance.",
      clientName: "Alpha Strategies",
      impact: "Enhanced trading strategy performance",
      challenges: ['Feature engineering', 'Model deployment', 'Real-time inference'],
      solutions: ['Automated feature pipeline', 'Containerized deployment', 'Built streaming inference']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length, color: 'gray' },
    { id: 'data-engineering', name: 'Data Engineering', count: projects.filter(p => p.category === 'data-engineering').length, color: 'green' },
    { id: 'trading', name: 'Algorithmic Trading', count: projects.filter(p => p.category === 'trading').length, color: 'purple' },
    { id: 'data-science', name: 'Data Science & ML', count: projects.filter(p => p.category === 'data-science').length, color: 'blue' }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  
  // Enhanced filtering with search
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = filter === 'all' || project.category === filter;
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, filter, searchTerm]);

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, []);

  return (
    <>
      <StructuredData data={generatePortfolioSchema()} />
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
          className="relative bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white py-24 overflow-hidden"
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
                <span className="text-green-400">Portfolio</span>
              </div>
            </nav>

            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl relative">
                    Portfolio
                  </span>
                  <span className="block bg-gradient-to-r from-green-400 via-green-300 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mt-2 relative">
                    Showcase
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse opacity-30"></div>
                  </span>
                </h1>
              </motion.div>
              
              <motion.div
                className="mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                  Real-world data engineering and trading systems that solve actual business problems
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 inline-block">
                  <p className="text-gray-200 text-sm leading-relaxed italic">
                    "From high-frequency trading systems to enterprise data pipelines — 
                    each project represents production-grade solutions with measurable impact."
                  </p>
                </div>
              </motion.div>

              {/* Quick Navigation */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                  <i className="fas fa-chart-line mr-2"></i>Trading Systems
                </span>
                <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                  <i className="fas fa-database mr-2"></i>Data Engineering
                </span>
                <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                  <i className="fas fa-robot mr-2"></i>ML Systems
                </span>
              </motion.div>
            </div>

            {/* Enhanced Portfolio Statistics */}
            <motion.div
              className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-green-400 mb-2">{portfolioStats.totalProjects}</div>
                <div className="text-gray-300 text-sm">Projects Completed</div>
                <div className="text-xs text-gray-400 mt-1">Production Systems</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">{portfolioStats.linesOfCode}</div>
                <div className="text-gray-300 text-sm">Lines of Code</div>
                <div className="text-xs text-gray-400 mt-1">Python, SQL, Scala</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-2">{portfolioStats.clientsSatisfied}</div>
                <div className="text-gray-300 text-sm">Clients Satisfied</div>
                <div className="text-xs text-gray-400 mt-1">Global Projects</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-orange-400 mb-2">{portfolioStats.averageROI}</div>
                <div className="text-gray-300 text-sm">Average ROI</div>
                <div className="text-xs text-gray-400 mt-1">Measured Impact</div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
                >
                  <i className="fas fa-comments mr-2"></i>
                  Discuss Your Project
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                </Link>
                <a
                  href="#featured-projects"
                  className="group border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center backdrop-blur-sm flex items-center justify-center"
                >
                  <i className="fas fa-eye mr-2"></i>
                  View Projects
                  <i className="fas fa-arrow-down ml-2 group-hover:translate-y-1 transition-transform duration-300"></i>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Featured Projects Section */}
        <div id="featured-projects" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured <span className="text-green-500">Production Systems</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Real-world implementations that demonstrate expertise in high-stakes environments 
                where reliability, performance, and business impact are non-negotiable.
              </p>
              
              {/* Project Categories */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                  <i className="fas fa-chart-line mr-2"></i>
                  High-Frequency Trading
                </div>
                <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                  <i className="fas fa-stream mr-2"></i>
                  Real-time Data Pipelines
                </div>
                <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                  <i className="fas fa-robot mr-2"></i>
                  ML in Production
                </div>
                <div className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
                  <i className="fas fa-shield-alt mr-2"></i>
                  Risk Management
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.4, 
                    ease: "easeOut",
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      FEATURED
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {project.type}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-green-500">{value}</div>
                          <div className="text-xs text-gray-600">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Client Impact */}
                    <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="text-sm text-green-700 font-semibold mb-1">Impact</div>
                      <div className="text-sm text-green-600">{project.impact}</div>
                    </div>

                    <Link
                      href={project.link}
                      className="block text-center bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      Explore Project →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* All Projects Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6">All Projects</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Browse through my complete portfolio of data engineering, trading, and machine learning solutions.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Search projects, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    aria-label="Search projects"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <i className="fas fa-times" aria-hidden="true"></i>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center mb-12 gap-4" role="group" aria-label="Project category filters">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  role="button"
                  aria-pressed={filter === category.id}
                  aria-label={`Show ${category.name} projects (${category.count} projects)`}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    filter === category.id
                      ? category.color === 'gray' 
                        ? 'bg-gray-600 text-white shadow-lg'
                        : category.color === 'green'
                        ? 'bg-green-500 text-white shadow-lg'
                        : category.color === 'purple'
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    filter === category.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Results Counter */}
            {filteredProjects.length > 0 && (
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredProjects.length} of {projects.length} projects
                  {searchTerm && <span> for "{searchTerm}"</span>}
                </p>
              </div>
            )}

            {/* Projects Grid */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="region"
              aria-label={`${filter === 'all' ? 'All' : categories.find(c => c.id === filter)?.name} projects`}
              layout
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05, 
                    ease: "easeOut",
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }}
                  layout
                >
                  {/* Project Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                        ⭐ FEATURED
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {project.type}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>

                    {/* Key Metrics with better visual hierarchy */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg text-center border border-gray-100 hover:border-blue-200 transition-colors">
                          <div className="text-base font-bold text-blue-600 mb-1">{value}</div>
                          <div className="text-xs text-gray-500 font-medium leading-tight">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies with improved pills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Client Testimonial */}
                    {project.clientTestimonial && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-3 border-blue-500">
                        <div className="text-xs text-blue-600 italic mb-1">
                          "{project.clientTestimonial}"
                        </div>
                        <div className="text-xs text-blue-500 font-semibold">
                          — {project.clientName}
                        </div>
                      </div>
                    )}

                    <Link
                      href={project.link}
                      className="block text-center bg-gray-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-500 transition-colors text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-search text-3xl text-gray-400" aria-hidden="true"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No projects found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? `No projects match "${searchTerm}". Try adjusting your search terms.`
                    : `No projects found in the ${filter} category.`
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold"
                    >
                      Clear Search
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setFilter('all');
                      setSearchTerm('');
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Show All Projects
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Technical Expertise Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Technical Expertise</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Technologies and methodologies that power these innovative solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  category: 'Data Engineering',
                  technologies: ['Python', 'SQL', 'Apache Spark', 'PostgreSQL', 'Docker', 'Kubernetes', 'Airflow'],
                  icon: 'fas fa-database',
                  color: 'green'
                },
                {
                  category: 'Machine Learning',
                  technologies: ['TensorFlow', 'XGBoost', 'Scikit-learn', 'MLflow', 'PyTorch', 'Pandas'],
                  icon: 'fas fa-brain',
                  color: 'blue'
                },
                {
                  category: 'Trading Systems',
                  technologies: ['Backtrader', 'QuantLib', 'NumPy', 'SciPy', 'Redis', 'WebSocket'],
                  icon: 'fas fa-chart-line',
                  color: 'purple'
                },
                {
                  category: 'Cloud & DevOps',
                  technologies: ['AWS', 'Azure', 'Git', 'CI/CD', 'Terraform', 'Monitoring'],
                  icon: 'fas fa-cloud',
                  color: 'orange'
                }
              ].map((expertise, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-16 h-16 bg-${expertise.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${expertise.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{expertise.category}</h3>
                  <div className="space-y-2">
                    {expertise.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {tech}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Impact Metrics */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Measurable Impact</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real results delivered across multiple projects and industries.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { metric: '$120K+', description: 'Revenue Generated', icon: 'fas fa-dollar-sign', color: 'green' },
                { metric: '45%', description: 'Average Cost Reduction', icon: 'fas fa-chart-down', color: 'blue' },
                { metric: '98%', description: 'System Uptime', icon: 'fas fa-shield-alt', color: 'purple' },
                { metric: '120%', description: 'Performance Improvement', icon: 'fas fa-rocket', color: 'orange' }
              ].map((impact, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-16 h-16 bg-${impact.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${impact.icon} text-2xl text-white`}></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{impact.metric}</div>
                  <div className="text-gray-600">{impact.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-20 bg-gradient-to-br from-green-500 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Build Something Amazing?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Let's discuss your project requirements and create data solutions that drive real business value.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                href="/contact"
                className="bg-white text-green-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-500 transition-colors text-lg"
              >
                View Services
              </Link>
            </motion.div>
          </div>
        </div>

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
                  Ready to Build Something
                  <span className="block text-green-400 mt-2">Production-Ready?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Whether you need real-time data pipelines, trading systems, or ML in production — 
                  let's discuss how these approaches can solve your specific challenges.
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
                  <h3 className="text-xl font-bold mb-3">Discuss Your Project</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Have a specific data engineering or trading system challenge? Let's explore how these proven approaches apply to your situation.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <i className="fas fa-arrow-right mr-2"></i>
                    Start Conversation
                  </Link>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-file-alt text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Technical Deep-Dives</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Want to understand the technical details behind these implementations? Read detailed case studies and insights.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <i className="fas fa-book mr-2"></i>
                    Read Articles
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
                <p className="text-gray-300 mb-6">Why work with me:</p>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-center justify-center">
                    <i className="fas fa-shield-alt text-green-400 mr-2"></i>
                    <span>Production-tested reliability</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-chart-line text-blue-400 mr-2"></i>
                    <span>Real trading experience</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-clock text-purple-400 mr-2"></i>
                    <span>Fast response times</span>
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