'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StructuredData from '../../components/StructuredData';
import { generateFAQSchema } from '../../lib/structured-data';
import CalendlyBooking from '../../components/CalendlyBooking';
import EnhancedCTAs from '../../components/EnhancedCTAs';

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('professional');

  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, []);

  const services = [
    {
      id: 'data-engineering',
      icon: 'fas fa-cogs',
      title: 'Data Engineering & Pipelines',
      subtitle: 'Scalable data infrastructure and ETL/ELT solutions',
      description: 'Build robust, real-time data pipelines that scale with your business. From data ingestion to transformation and loading, I create automated workflows that ensure data quality and availability.',
      technologies: ['Python', 'SQL', 'Apache Kafka', 'Apache Spark', 'AWS', 'Docker'],
      benefits: [
        'Real-time data processing with low latency',
        'Automated data quality monitoring and alerts',
        'Scalable cloud architecture (AWS/GCP/Azure)', 
        '98% uptime with fault-tolerant design',
        'Cost optimization - reduce data processing costs by 30%'
      ],
      metrics: {
        performance: '5x faster processing',
        reliability: '98% uptime',
        cost: '30% cost reduction'
      },
      startingPrice: '$800'
    },
    {
      id: 'trading-algorithms',
      icon: 'fas fa-chart-line',
      title: 'Trading Algorithm Development',
      subtitle: 'Automated trading systems with risk management',
      description: 'Custom algorithmic trading strategies that execute trades automatically based on market signals. Includes backtesting, risk management, and real-time performance monitoring.',
      technologies: ['Python', 'NumPy', 'Pandas', 'QuantLib', 'Interactive Brokers API', 'TensorFlow'],
      benefits: [
        'Low-latency execution for optimal fills',
        'Risk management with position sizing controls',
        'Backtesting across market cycles',
        'Performance dashboards and alerts',
        'Strategies with consistent performance'
      ],
      metrics: {
        performance: 'Low-latency execution',
        returns: 'Consistent performance',
        accuracy: '60% win rate'
      },
      startingPrice: '$2,500'
    },
    {
      id: 'analytics-bi',
      icon: 'fas fa-chart-bar',
      title: 'Analytics & BI',
      subtitle: 'Machine learning models and business intelligence dashboards',
      description: 'Transform your data into actionable insights with ML models, predictive analytics, and interactive dashboards. Make data-driven decisions with confidence.',
      technologies: ['Python', 'R', 'Power BI', 'Tableau', 'TensorFlow', 'PostgreSQL'],
      benefits: [
        'Predictive models with good accuracy',
        'Interactive dashboards with real-time data',
        'Automated reporting and alert systems',
        'Customer behavior analysis and segmentation',
        'ROI tracking and performance optimization'
      ],
      metrics: {
        accuracy: '70% prediction accuracy',
        insights: '15+ KPIs tracked',
        automation: '80% automated reporting'
      },
      startingPrice: '$1,500'
    },
    {
      id: 'cloud-architecture',
      icon: 'fas fa-cloud',
      title: 'Cloud Data Architecture',
      subtitle: 'Scalable cloud solutions and infrastructure optimization',
      description: 'Design and implement cloud-native data architectures that scale automatically and optimize costs. Migration from on-premise to cloud with zero downtime.',
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Terraform', 'Kubernetes', 'Docker'],
      benefits: [
        'Auto-scaling infrastructure that grows with demand',
        'Multi-region deployment for availability',
        'Infrastructure as Code for consistent deployments',
        'Monitoring and alerting systems',
        'Cost optimization with significant savings'
      ],
      metrics: {
        scalability: 'Auto-scaling to 5x load',
        availability: '98% uptime SLA',
        savings: '25% cost reduction'
      },
      startingPrice: '$2,000'
    }
  ];

  const packages = {
    strategy: {
      name: 'Data Strategy & Roadmap',
      price: 'Starts at $1,500',
      duration: '1-2 weeks',
      description: 'Businesses that have data but no clear path, or those feeling overwhelmed by their current data chaos.',
      subtitle: 'Fixed-Project Price',
      features: [
        'Deep-Dive Discovery Sessions: Analyzing your core business goals and existing technical stack (APIs, DBs, SaaS tools)',
        'Quant-Grade Data Quality Audit: Professional assessment of your primary data sources to identify critical integrity and latency issues',
        'Strategic Architecture Roadmap: Comprehensive PDF blueprint detailing recommended, scalable data architecture (e.g., Snowflake + dbt + Metabase)',
        '3-5 phase project plan, prioritized by business impact',
        'Clear estimates for implementation time and tooling costs'
      ],
      note: 'This package delivers the plan. Implementation is the logical next step.',
      popular: false
    },
    implementation: {
      name: 'MVP Data Pipeline Implementation',
      price: 'Starts at $4,000',
      duration: '4-6 weeks',
      description: 'Businesses that have a clear plan (ideally from our Roadmap) and are ready to build their first high-quality, reliable data foundation.',
      subtitle: 'Project-Based Build Sprint',
      features: [
        'Integration of 2-3 Key Data Sources (e.g., Stripe, Google Analytics, and your production database)',
        'Centralized Cloud Data Warehouse: Professionally configured warehouse (e.g., BigQuery, Snowflake) to act as your new data core',
        'Automated Data Pipeline (ETL/ELT): Production-ready pipeline using tools like dbt, Airflow, or serverless functions',
        'Core Business Metrics Dashboard: BI dashboard (Looker Studio, Metabase, etc.) focused on your top 3-5 critical KPIs',
        'Full Documentation & 30-Day Bugfix Support'
      ],
      note: 'This is where we build your "Single Source of Truth." We move from plan to production.',
      popular: true
    },
    optimization: {
      name: 'Optimization & Support Retainer',
      price: 'Starts at $2,000/month',
      duration: 'Monthly',
      description: 'Businesses with an existing data platform who need expert hands to maintain, optimize, and scale it.',
      subtitle: '3-Month Minimum Engagement',
      features: [
        'Dedicated Block of Expert Hours: Access to me for support, optimization, and new development',
        'Proactive System Monitoring: Active monitoring of pipeline health, data integrity, and update failures',
        'Latency & Cost Optimization: Continuously tune query performance, optimize cloud spend, and reduce data latency',
        'Priority Slack/Email Support: Direct access for questions and rapid problem resolution',
        'Iterative Development: As-needed development of new dashboards, models, or integration of new data sources'
      ],
      note: 'Your data systems are now mission-critical. This retainer provides continuous, proactive management.',
      popular: false
    }
  };

  const testimonials = [
    {
      service: 'Trading Algorithms',
      client: 'Daniel Graham, CEO TheTraderDaddy',
      quote: 'Jose developed a momentum-based trading algorithm that processes multiple crypto pairs with proper risk management. His implementation includes dynamic position sizing using Kelly Criterion, real-time risk monitoring with 3% max drawdown limits, and automated stop-loss mechanisms. The system has maintained consistent performance over 8 months with reasonable risk-adjusted returns. What impressed me most was his integration of social sentiment data from Twitter and Reddit APIs to enhance signal accuracy during volatile market conditions.',
      result: 'Consistent performance, 3% max drawdown, proper risk management'
    },
    {
      service: 'Data Engineering',
      client: 'Paul Reina, Sales Manager',
      quote: 'Jose designed a comprehensive data infrastructure that improved our patient-doctor matching process at GrowMyClinic. He integrated our CRM with call tracking systems, appointment scheduling platforms, and marketing attribution tools into a unified dashboard. Before his solution, we were losing potential patients due to poor follow-up tracking. Now we can see which marketing channels drive the highest-value appointments, track conversion rates by medical specialty, and automate follow-up sequences. Our patient conversion rate improved from 28% to 35%, and we saw a 15% increase in average appointment value. The real-time analytics helped us identify that our cardiology referrals had the highest lifetime value, allowing us to optimize our marketing spend accordingly.',
      result: '28% to 35% conversion rate, 15% higher appointment value, better patient tracking'
    },
    {
      service: 'Analytics & BI',
      client: 'Caterina Abanoni, Data Science Lead',
      quote: 'Jose architected a streamlined MLOps pipeline using Python, PostgreSQL, and MLflow that improved our training platform. He implemented automated feature engineering pipelines that process our 2,500+ student interactions daily, built A/B testing frameworks for our course recommendation system, and created model monitoring with performance tracking. Our model deployment time went from 3 weeks to 3 days, and we achieved 15% improvement in course completion rates. His GDPR-compliant data processing framework was essential for our European students.',
      result: '3 weeks to 3 days deployment, 15% course completion improvement'
    }
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema()} />
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
                <span className="text-green-400">Services</span>
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
                    Data Engineering
                  </span>
                  <span className="block bg-gradient-to-r from-green-400 via-green-300 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mt-2 relative">
                    Services
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
                  Production-ready data systems that solve real business problems
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 inline-block">
                  <p className="text-gray-200 text-sm leading-relaxed italic">
                    "From real-time pipelines to trading algorithms — services built on 10+ years 
                    of experience where downtime means lost capital and reliability isn't optional."
                  </p>
                </div>
              </motion.div>

              {/* Service Categories */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                  <i className="fas fa-stream mr-2"></i>Real-time Pipelines
                </span>
                <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                  <i className="fas fa-chart-line mr-2"></i>Trading Systems
                </span>
                <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                  <i className="fas fa-cloud mr-2"></i>Cloud Architecture
                </span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30">
                  <i className="fas fa-chart-bar mr-2"></i>Analytics & BI
                </span>
              </motion.div>
            </div>

            {/* Enhanced Stats Grid */}
            <motion.div
              className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-green-400 mb-2">20+</div>
                <div className="text-gray-300 text-sm">Projects Delivered</div>
                <div className="text-xs text-gray-400 mt-1">Production Systems</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">98%+</div>
                <div className="text-gray-300 text-sm">Uptime Achieved</div>
                <div className="text-xs text-gray-400 mt-1">High Availability</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-2">5x</div>
                <div className="text-gray-300 text-sm">Performance Boost</div>
                <div className="text-xs text-gray-400 mt-1">Faster Processing</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-orange-400 mb-2">30%</div>
                <div className="text-gray-300 text-sm">Cost Reduction</div>
                <div className="text-xs text-gray-400 mt-1">Optimized Infrastructure</div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="text-center"
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
                  href="#services-details"
                  className="group border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center backdrop-blur-sm flex items-center justify-center"
                >
                  <i className="fas fa-eye mr-2"></i>
                  Explore Services
                  <i className="fas fa-arrow-down ml-2 group-hover:translate-y-1 transition-transform duration-300"></i>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Services Section */}
        <div id="services-details" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Core <span className="text-green-500">Production Services</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Specialized data engineering solutions built from real-world experience in high-stakes environments 
                where reliability, performance, and business impact are critical.
              </p>
              
              {/* Service Benefits */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                  <i className="fas fa-shield-alt mr-2"></i>
                  Production-Tested
                </div>
                <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                  <i className="fas fa-clock mr-2"></i>
                  Real-time Processing
                </div>
                <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                  <i className="fas fa-chart-line mr-2"></i>
                  Measurable ROI
                </div>
                <div className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
                  <i className="fas fa-handshake mr-2"></i>
                  End-to-End Support
                </div>
              </div>
            </motion.div>

            {/* Service Selector */}
            <div className="flex flex-wrap justify-center mb-12 gap-4">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeService === index
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${service.icon} mr-2`}></i>
                  {service.title.split(' &')[0]}
                </motion.button>
              ))}
            </div>

            {/* Active Service Details */}
            <motion.div
              key={activeService}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Service Info */}
                <div className="p-12">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <i className={`${services[activeService].icon} text-2xl text-white`}></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{services[activeService].title}</h3>
                      <p className="text-gray-600">{services[activeService].subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {services[activeService].description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {services[activeService].technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Starting Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <div className="text-3xl font-bold text-green-500">
                        {services[activeService].startingPrice}
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>

                {/* Benefits & Metrics */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-12">
                  <h4 className="text-2xl font-bold mb-6">Key Benefits</h4>
                  <div className="space-y-4 mb-8">
                    {services[activeService].benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <i className="fas fa-check-circle text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                        <span dangerouslySetInnerHTML={{ __html: benefit }}></span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 gap-4">
                    <h4 className="text-xl font-bold mb-4">Proven Results</h4>
                    {Object.entries(services[activeService].metrics).map(([key, value], index) => (
                      <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-green-500">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pricing Packages */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6">Choose Your Package</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Flexible pricing options to match your project scope and budget requirements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {Object.entries(packages).map(([key, pkg], index) => (
                <motion.div
                  key={key}
                  className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 transition-all duration-300 ${
                    pkg.popular 
                      ? 'border-green-500 transform scale-105 shadow-green-500/20' 
                      : 'border-gray-100 hover:border-gray-200 hover:shadow-xl'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -8, scale: pkg.popular ? 1.05 : 1.02 }}
                >
                  {/* Header with gradient background */}
                  <div className={`relative px-8 pb-6 ${
                    pkg.popular ? 'pt-16' : 'pt-8'
                  } ${
                    pkg.popular 
                      ? 'bg-gradient-to-br from-green-500 to-green-600' 
                      : index === 0 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                        : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-white">
                          ⭐ MOST POPULAR
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-3 leading-tight">{pkg.name}</h3>
                      <div className="mb-2">
                        <span className="text-4xl font-black">{pkg.price.split(' ')[0]} {pkg.price.split(' ')[1]}</span>
                        {pkg.price.includes('/month') && (
                          <span className="text-lg opacity-90">/month</span>
                        )}
                      </div>
                      <div className="text-sm opacity-90 font-medium mb-2">{pkg.subtitle}</div>
                      <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <i className="fas fa-clock mr-2 text-sm"></i>
                        <span className="text-sm font-medium">{pkg.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Perfect for:</h4>
                      <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="fas fa-list-check mr-2 text-green-500"></i>
                        Key Deliverables
                      </h4>
                      <ul className="space-y-4">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start group">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-green-200 transition-colors">
                              <i className="fas fa-check text-green-600 text-xs"></i>
                            </div>
                            <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pkg.note && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-8">
                        <div className="flex items-start">
                          <i className="fas fa-info-circle text-blue-500 mr-3 mt-0.5 flex-shrink-0"></i>
                          <p className="text-sm text-blue-800 leading-relaxed italic">{pkg.note}</p>
                        </div>
                      </div>
                    )}

                    <Link
                      href="/contact"
                      className={`block text-center py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                          : index === 0
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                            : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                      }`}
                    >
                      <i className="fas fa-rocket mr-2"></i>
                      Get Started
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Results */}
        <div className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6">Client Success Stories</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Real results from real clients across different industries and use cases.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-8 rounded-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <div className="text-green-400 font-semibold mb-4">{testimonial.service}</div>
                  <blockquote className="text-lg italic mb-6">"{testimonial.quote}"</blockquote>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="font-semibold">{testimonial.client}</div>
                    <div className="text-green-400 text-sm mt-2">{testimonial.result}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6">My Process</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A proven methodology that ensures successful project delivery and client satisfaction.
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-500"></div>

              {[
                {
                  step: '01',
                  title: 'Discovery & Analysis',
                  description: 'Understanding your current data landscape, pain points, and business objectives.',
                  duration: '1-2 weeks'
                },
                {
                  step: '02',
                  title: 'Architecture Design',
                  description: 'Creating the optimal solution architecture with scalability and performance in mind.',
                  duration: '1 week'
                },
                {
                  step: '03',
                  title: 'Development & Testing',
                  description: 'Building robust solutions with comprehensive testing and quality assurance.',
                  duration: '2-8 weeks'
                },
                {
                  step: '04',
                  title: 'Deployment & Support',
                  description: 'Seamless deployment with ongoing monitoring and support to ensure success.',
                  duration: 'Ongoing'
                }
              ].map((phase, index) => (
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
                      <div className="text-green-500 font-bold text-lg mb-2">{phase.step}</div>
                      <h3 className="text-2xl font-bold mb-3">{phase.title}</h3>
                      <p className="text-gray-600 mb-3">{phase.description}</p>
                      <div className="text-sm text-green-500 font-semibold">{phase.duration}</div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-br from-green-500 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Data Infrastructure?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Let's discuss your specific requirements and create a custom solution that drives real business value.
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
                Get Free Consultation
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-500 transition-colors text-lg"
              >
                View My Work
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
                  Ready to Transform Your
                  <span className="block text-green-400 mt-2">Data Infrastructure?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Let's discuss your specific challenges and design a solution that delivers 
                  measurable business impact with production-grade reliability.
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
                  <h3 className="text-xl font-bold mb-3">Free Consultation</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    30-minute call to understand your challenges, discuss solutions, and provide initial recommendations.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <i className="fas fa-calendar mr-2"></i>
                    Schedule Call
                  </Link>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-file-alt text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Project Examples</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    See detailed case studies of similar projects with technical implementations and business outcomes.
                  </p>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    View Portfolio
                  </Link>
                </div>
              </motion.div>

              {/* Service Guarantees */}
              <motion.div
                className="border-t border-white/20 pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-gray-300 mb-6">What you can expect:</p>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-center justify-center">
                    <i className="fas fa-clock text-green-400 mr-2"></i>
                    <span>Response within 24 hours</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-shield-alt text-blue-400 mr-2"></i>
                    <span>Production-ready solutions</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-handshake text-purple-400 mr-2"></i>
                    <span>End-to-end support</span>
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

        {/* Calendly Booking Section */}
        <CalendlyBooking variant="cta" />

        {/* Enhanced CTA */}
        <EnhancedCTAs variant="urgent" />

        <Footer />
      </div>
    </>
  );
}