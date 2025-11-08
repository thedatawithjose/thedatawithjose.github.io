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

// Type definitions for service packages
interface AddOn {
  name: string;
  price: string;
  description: string;
}

interface ServicePackage {
  name: string;
  price: string;
  duration: string;
  description: string;
  subtitle: string;
  features: string[];
  note: string;
  popular: boolean;
  guarantees: string[];
  paymentOptions: string[];
  notIncluded: string[];
  savings?: string;
  addOns?: AddOn[];
}

type PackagesCollection = {
  strategy: ServicePackage;
  implementation: ServicePackage;
  complete: ServicePackage;
};

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
      description: 'Robust, production-grade data pipelines designed for scale. From ingestion through transformation to loading, automated workflows maintain consistent data quality and high availability.',
      technologies: ['Python', 'SQL', 'Apache Kafka', 'Apache Spark', 'AWS', 'Docker'],
      benefits: [
        'Real-time data processing with sub-500ms latency',
        'Automated data quality monitoring with intelligent alerts',
        'Cloud-agnostic architecture supporting AWS, GCP, and Azure', 
        'Fault-tolerant design achieving 98%+ uptime',
        'Cost optimization strategies reducing processing costs by 30%+'
      ],
      metrics: {
        performance: '5x faster processing',
        reliability: '98%+ uptime',
        cost: '30% cost reduction'
      }
    },
    {
      id: 'ml-production',
      icon: 'fas fa-robot',
      title: 'ML in Production',
      subtitle: 'Production-ready machine learning systems',
      description: 'Production-ready MLOps pipelines for deploying and maintaining machine learning models. Automated monitoring, versioning, and retraining workflows maintain consistent model performance.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'MLflow', 'Kubernetes', 'Docker'],
      benefits: [
        'Automated model training, validation, and deployment pipelines',
        'Continuous performance monitoring with drift detection',
        'A/B testing frameworks for data-driven model comparison',
        'Scalable feature engineering and preprocessing pipelines',
        'Complete model versioning with one-click rollback capabilities'
      ],
      metrics: {
        deployment: 'Model-to-production in 3 days',
        monitoring: 'Real-time performance tracking',
        reliability: '98%+ model uptime'
      }
    },
    {
      id: 'analytics-bi',
      icon: 'fas fa-chart-bar',
      title: 'Analytics & BI',
      subtitle: 'Advanced analytics and business intelligence solutions',
      description: 'Transform raw data into strategic insights through predictive analytics, machine learning models, and interactive dashboards. Enable data-driven decision-making across your organization.',
      technologies: ['Python', 'R', 'Power BI', 'Tableau', 'TensorFlow', 'PostgreSQL'],
      benefits: [
        'Predictive models achieving 75%+ accuracy on business metrics',
        'Interactive dashboards with real-time data synchronization',
        'Automated reporting systems with intelligent threshold alerts',
        'Advanced customer segmentation and behavior analysis',
        'Comprehensive ROI tracking with attribution modeling'
      ],
      metrics: {
        accuracy: '75%+ prediction accuracy',
        insights: '15+ KPIs tracked',
        automation: '80% reporting automated'
      }
    },
    {
      id: 'cloud-architecture',
      icon: 'fas fa-cloud',
      title: 'Cloud Data Architecture',
      subtitle: 'Scalable cloud infrastructure and optimization',
      description: 'Cloud-native data architectures designed for automatic scaling and cost efficiency. Carefully planned migration from on-premise to cloud minimizing downtime and business disruption.',
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Terraform', 'Kubernetes', 'Docker'],
      benefits: [
        'Auto-scaling infrastructure adapting to demand fluctuations',
        'Multi-region deployment for high availability',
        'Infrastructure as Code enabling consistent, auditable deployments',
        'Comprehensive observability with monitoring and alerting',
        'FinOps strategies reducing cloud expenditure by 25%+'
      ],
      metrics: {
        scalability: 'Auto-scales to 5x load',
        availability: '98%+ uptime',
        savings: '25%+ cost reduction'
      }
    }
  ];

  const packages: PackagesCollection = {
    strategy: {
      name: 'Data Strategy Assessment',
      price: '$1,000',
      duration: '1-2 weeks',
      description: 'Ideal for businesses with data assets but lacking a clear strategic direction or cohesive data architecture.',
      subtitle: 'Strategy & Planning',
      features: [
        'In-depth discovery sessions analyzing business objectives and existing technical infrastructure',
        'Professional data quality audit identifying integrity issues and optimization opportunities',
        'Comprehensive architecture roadmap delivered as detailed PDF blueprint',
        'Phased implementation plan (3-5 phases) prioritized by business impact',
        'Detailed cost estimates and timeline projections for implementation'
      ],
      note: 'Strategic planning phase. Implementation services available separately.',
      popular: false,
      guarantees: [
        '100% Money-Back if Not Satisfied',
        'Delivered Within Timeline or Free Revisions',
        'No Hidden Fees - Fixed Price'
      ],
      paymentOptions: [
        'Pay in Full: Save 5% ($950)',
        '50% Upfront / 50% on Delivery'
      ],
      notIncluded: [
        'Implementation or development work',
        'Cloud infrastructure costs',
        'Ongoing support beyond delivery'
      ]
    },
    implementation: {
      name: 'MVP Data Pipeline',
      price: '$2,800',
      duration: '3-4 weeks',
      description: 'For businesses with defined requirements ready to build their first production-grade, automated data infrastructure.',
      subtitle: 'Build & Deploy',
      features: [
        'Integration of 2-3 primary data sources with automated sync',
        'Professional cloud data warehouse configuration (BigQuery/Snowflake)',
        'Production-ready ETL/ELT pipeline using industry-standard tools (dbt, Airflow)',
        'Custom business intelligence dashboard tracking your top 5 critical KPIs',
        'Complete technical documentation and 2 weeks post-launch support'
      ],
      note: 'Most popular option. Delivers a centralized, production-ready data platform. Strategy phase sold separately.',
      popular: true,
      guarantees: [
        '30-Day Bug-Fix Guarantee',
        'Code Quality Assurance',
        'No Hidden Fees - Fixed Price'
      ],
      paymentOptions: [
        'Pay in Full: Save 5% ($2,660)',
        '50% Upfront / 50% on Delivery'
      ],
      notIncluded: [
        'Cloud infrastructure costs (AWS/GCP/Azure)',
        'Third-party software licenses',
        'Ongoing maintenance beyond 2 weeks'
      ],
      addOns: [
        { name: 'Additional Data Source', price: '$500', description: 'Integrate one more data source beyond the included 2-3' },
        { name: 'Extra Dashboard', price: '$800', description: 'Additional custom dashboard with 5+ KPIs' },
        { name: 'Documentation Workshop', price: '$400', description: '2-hour hands-on session explaining the system' }
      ]
    },
    complete: {
      name: 'Complete Data Solution',
      price: '$4,500',
      duration: '6-8 weeks',
      description: 'Comprehensive end-to-end solution covering strategy, implementation, and ongoing optimization with dedicated support.',
      subtitle: 'All-Inclusive Package',
      features: [
        'Complete strategy & architecture assessment (valued at $1,000)',
        'Full MVP pipeline implementation (valued at $2,800)',
        'Advanced data quality monitoring with automated alerts',
        'Performance tuning and cloud cost optimization',
        '3 weeks of post-launch support & proactive maintenance',
        'Hands-on walkthrough session (1.5 hours)',
        'Email/Slack support with 24-hour response time (business hours)'
      ],
      note: 'Comprehensive package. Complete solution from strategic planning through production deployment. Individual components valued at $5,100 - save $600.',
      popular: false,
      savings: 'Best Value',
      guarantees: [
        '3-Week Bug-Fix Guarantee',
        'Priority Support Included',
        'No Hidden Fees - Fixed Price'
      ],
      paymentOptions: [
        'Pay in Full: Save 5% ($4,275)',
        '50% Upfront / 50% on Delivery'
      ],
      notIncluded: [
        'Cloud infrastructure costs (AWS/GCP/Azure)',
        'Third-party software licenses',
        'Ongoing maintenance beyond 30 days'
      ],
      addOns: [
        { name: 'Performance Audit', price: '$1,200', description: 'Deep-dive optimization: latency, cost, and throughput analysis' },
        { name: 'Additional Walkthrough', price: '$400', description: 'Extra 2-hour session for knowledge transfer' }
      ]
    }
  };

  const testimonials = [
    {
      service: 'Data Engineering',
      client: 'Daniel Graham, CEO TheTraderDaddy',
      quote: 'Jose built our real-time market data pipeline processing WebSocket feeds from multiple exchanges into Snowflake. The system maintains 98%+ uptime with sub-500ms latency while handling millions of daily updates. His integration of market data, social sentiment, and on-chain metrics into a unified platform powers our entire research infrastructure.',
      result: '98%+ uptime, <500ms latency, millions of daily updates'
    },
    {
      service: 'Data Engineering',
      client: 'Paul Reina, Sales Manager at GrowMyClinic',
      quote: 'Jose integrated our CRM, call tracking, and scheduling systems into a unified analytics dashboard. The real-time visibility into marketing attribution and conversion funnels helped us identify high-value referral sources and optimize our spend. Patient conversion improved from 28% to 35%, with a 15% increase in average appointment value.',
      result: '25% conversion improvement, 15% higher revenue per patient'
    },
    {
      service: 'Analytics & BI',
      client: 'Caterina Abanoni, Data Science Lead',
      quote: 'Jose architected our MLOps pipeline with automated feature engineering processing 2,500+ daily student interactions. The A/B testing framework and model monitoring reduced deployment time from 3 weeks to 3 days, while improving course completion rates by 15%. His GDPR-compliant framework was critical for our European expansion.',
      result: '85% faster deployment, 15% better course completion'
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

        {/* Open to Full-Time & Consulting Disclaimer */}
        <motion.div
          className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-l-4 border-blue-600 py-10 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Modern background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600 to-transparent transform -skew-x-12"></div>
          </div>
          
          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="flex flex-col md:flex-row items-start md:space-x-6 space-y-4 md:space-y-0">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-briefcase text-2xl text-white"></i>
                </div>
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20 mb-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-semibold text-blue-800 tracking-wide uppercase">Available Now</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Open to Full-Time & Consulting Opportunities
                </h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  I'm actively seeking full-time Data Engineering positions with teams building mission-critical systems. 
                  I also take on select consulting projects for startups and growing businesses that need production-grade data infrastructure.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  These packages below are for project-based consulting engagements. For full-time roles, contract-to-hire opportunities, 
                  or to discuss how I can contribute to your team long-term, let's connect.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://calendly.com/datawithjose/consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <i className="fas fa-calendar-check mr-2"></i>
                    Schedule Free Call
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </a>
                  <a 
                    href="mailto:datawithjose@outlook.com?subject=Full-Time Opportunity&body=Hi Jose, I'd like to discuss a full-time Data Engineering opportunity..."
                    className="group inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Email Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
                  Production-grade data infrastructure that delivers measurable business impact
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 inline-block">
                  <p className="text-gray-200 text-sm leading-relaxed italic">
                    "Data Engineer with unique background: 3+ years building production data infrastructure, 
                    backed by 4 years as Quantitative Trader working with high-frequency data systems. 
                    Specialized in reliable, performance-critical pipelines where uptime and latency matter."
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
                  <i className="fas fa-calendar-check mr-2"></i>
                  Book Free 30-Min Strategy Call
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
                Technical <span className="text-green-500">Capabilities</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Specialized data engineering solutions proven in production environments where reliability, 
                performance, and measurable ROI are non-negotiable. Review technical capabilities below, 
                then explore engagement packages.
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

                  {/* CTA Button */}
                  <div className="mt-6">
                    <Link
                      href="#pricing"
                      className="block text-center bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      View Pricing Options
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
        <div id="pricing" className="pt-24 pb-12 bg-white">
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
                  whileHover={{ y: -4, scale: pkg.popular ? 1.02 : 1.01 }}
                >
                  {/* Header with gradient background */}
                  <div className={`relative px-8 pb-6 ${
                    pkg.popular || pkg.savings ? 'pt-16' : 'pt-8'
                  } ${
                    pkg.popular 
                      ? 'bg-gradient-to-br from-green-500 to-green-600' 
                      : index === 0 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                        : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border-2 border-white whitespace-nowrap">
                          ⭐ MOST POPULAR
                        </div>
                      </div>
                    )}
                    
                    {pkg.savings && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border-2 border-white whitespace-nowrap">
                          <span className="text-green-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">⭐ {pkg.savings}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-3 leading-tight">{pkg.name}</h3>
                      <div className="mb-2">
                        <span className="text-4xl font-black">{pkg.price}</span>
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Ideal for:</h4>
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
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <div className="flex items-start">
                          <i className="fas fa-info-circle text-blue-500 mr-3 mt-0.5 flex-shrink-0"></i>
                          <p className="text-sm text-blue-800 leading-relaxed italic">{pkg.note}</p>
                        </div>
                      </div>
                    )}

                    {pkg.paymentOptions && (
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 mb-4">
                        <h5 className="text-sm font-bold text-blue-800 mb-3 flex items-center">
                          <i className="fas fa-credit-card mr-2"></i>
                          Payment Options
                        </h5>
                        <ul className="space-y-2">
                          {pkg.paymentOptions.map((option, idx) => (
                            <li key={idx} className="flex items-start text-xs text-blue-700">
                              <i className="fas fa-check-circle mr-2 mt-0.5 flex-shrink-0"></i>
                              <span>{option}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.notIncluded && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-4">
                        <h5 className="text-sm font-bold text-yellow-800 mb-3 flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i>
                          Not Included
                        </h5>
                        <ul className="space-y-2">
                          {pkg.notIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start text-xs text-yellow-700">
                              <i className="fas fa-times-circle mr-2 mt-0.5 flex-shrink-0"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.addOns && pkg.addOns.length > 0 && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-4">
                        <h5 className="text-sm font-bold text-purple-800 mb-3 flex items-center">
                          <i className="fas fa-plus-circle mr-2"></i>
                          Available Add-Ons
                        </h5>
                        <ul className="space-y-3">
                          {pkg.addOns.map((addon, idx) => (
                            <li key={idx} className="text-xs text-purple-700">
                              <div className="flex items-start justify-between mb-1">
                                <span className="font-semibold">{addon.name}</span>
                                <span className="font-bold text-purple-900">{addon.price}</span>
                              </div>
                              <p className="text-purple-600 leading-relaxed">{addon.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.guarantees && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-8">
                        <h5 className="text-sm font-bold text-green-800 mb-3 flex items-center">
                          <i className="fas fa-shield-check mr-2"></i>
                          Guarantees
                        </h5>
                        <ul className="space-y-2">
                          {pkg.guarantees.map((guarantee, idx) => (
                            <li key={idx} className="flex items-start text-xs text-green-700">
                              <i className="fas fa-check-circle mr-2 mt-0.5 flex-shrink-0"></i>
                              <span>{guarantee}</span>
                            </li>
                          ))}
                        </ul>
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
                      <i className="fas fa-calendar-check mr-2"></i>
                      Schedule Free Consultation
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Table */}
            <motion.div
              className="mt-20 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-center mb-12">Compare Packages</h3>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Feature</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-blue-600">Strategy<br/><span className="text-xs font-normal text-gray-600">$1,000</span></th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-green-600">MVP Pipeline<br/><span className="text-xs font-normal text-gray-600">$2,800</span></th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-purple-600">Complete<br/><span className="text-xs font-normal text-gray-600">$4,500</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">Discovery & Analysis</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-blue-500 text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-purple-500 text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">Architecture Roadmap</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-blue-500 text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-purple-500 text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">Data Pipeline Implementation</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-green-500 text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-purple-500 text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">Cloud Warehouse Setup</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-green-500 text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-purple-500 text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">BI Dashboard (5 KPIs)</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-green-500 text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-purple-500 text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">Data Quality Monitoring</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-purple-500 text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">Performance Optimization</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-purple-500 text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">Hands-on Walkthrough</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-purple-500 text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-700">Priority Support (30 days)</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-300"></i></td>
                        <td className="px-6 py-4 text-center text-xs text-gray-600">Standard</td>
                        <td className="px-6 py-4 text-center text-xs text-purple-600 font-semibold">Priority</td>
                      </tr>
                      <tr className="bg-gray-50 font-semibold">
                        <td className="px-6 py-4 text-sm text-gray-900">Timeline</td>
                        <td className="px-6 py-4 text-center text-sm text-blue-600">1-2 weeks</td>
                        <td className="px-6 py-4 text-center text-sm text-green-600">3-4 weeks</td>
                        <td className="px-6 py-4 text-center text-sm text-purple-600">6-8 weeks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Not sure which package is right for you?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <i className="fas fa-comments mr-2"></i>
                  Schedule Free Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* How It Works Process */}
        <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple, transparent process from first contact to project delivery
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Free 30-Min Call</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start">
                      <i className="fas fa-check text-blue-500 mr-2 mt-1"></i>
                      <span>Discuss your needs and challenges</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-blue-500 mr-2 mt-1"></i>
                      <span>Assess technical requirements</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-blue-500 mr-2 mt-1"></i>
                      <span>No commitment required</span>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <i className="fas fa-arrow-right text-3xl text-blue-300"></i>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Custom Proposal</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Delivered within 48 hours</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Clear scope and timeline</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Fixed pricing, no surprises</span>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <i className="fas fa-arrow-right text-3xl text-green-300"></i>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Project Kickoff</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start">
                      <i className="fas fa-check text-purple-500 mr-2 mt-1"></i>
                      <span>Start within 2 weeks</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-purple-500 mr-2 mt-1"></i>
                      <span>Regular progress updates</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-purple-500 mr-2 mt-1"></i>
                      <span>Direct communication channel</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <i className="fas fa-calendar-check mr-2"></i>
                Start With Free Consultation
              </Link>
            </motion.div>
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
                A structured methodology for successful project delivery and client satisfaction.
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
                  description: 'Careful deployment with ongoing monitoring and support for optimal results.',
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
                    <span>Same-day response (business hours)</span>
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