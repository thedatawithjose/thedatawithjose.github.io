'use client';

import { m } from 'framer-motion';
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
      id: 'strategy-development',
      icon: 'fas fa-lightbulb',
      title: 'Systematic Strategy Development',
      subtitle: 'From trading idea to explicit, testable rules',
      description: 'Turning discretionary trading logic and research hypotheses into explicit, testable rules and automated strategies. Every idea gets formalized so it can be validated — not just discussed.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Pine Script', 'NinjaScript'],
      benefits: [
        'Ideas translated into explicit, testable rule sets',
        'Parameter spaces defined for systematic exploration',
        'Strategy documentation for reproducibility',
        'Hypothesis-first framing to avoid curve-fitting',
        'Cross-market applicability: futures, FX, crypto, equities'
      ],
      metrics: {
        validation: 'Out-of-sample tested',
        robustness: 'Walk-forward validated',
        clarity: 'Explicit rules'
      }
    },
    {
      id: 'research-backtesting',
      icon: 'fas fa-flask',
      title: 'Quantitative Research & Backtesting',
      subtitle: 'Honest evaluation before real capital',
      description: 'Research workflows that evaluate strategy behavior under realistic market and execution assumptions — testing strategies against data they were not developed on.',
      technologies: ['Python', 'Backtrader', 'Statsmodels', 'TimescaleDB', 'Docker'],
      benefits: [
        'Out-of-sample and walk-forward validation',
        'Sensitivity analysis under changing assumptions',
        'Realistic transaction costs and slippage modeling',
        'Execution constraints included from day one',
        'Reproducible research environment for your team'
      ],
      metrics: {
        validation: 'Walk-forward',
        testing: 'Out-of-sample',
        realism: 'Costs modeled'
      }
    },
    {
      id: 'automated-execution',
      icon: 'fas fa-bolt',
      title: 'Automated Execution Systems',
      subtitle: 'From validated logic to reliable live execution',
      description: 'Trading systems designed to translate validated strategy logic into reliable live execution — resilient, low-latency, and engineered to prevent silent failures.',
      technologies: ['Python', 'WebSockets', 'REST APIs', 'Redis', 'Docker'],
      benefits: [
        'Robust error handling and payload validation layers',
        'Real-time alerting to prevent silent failures',
        'Containerized, high-availability deployments',
        'Broker API integration (e.g., Binance, Tradovate)',
        'Observability and operational best practices'
      ],
      metrics: {
        availability: 'High-availability',
        latency: 'Low-latency',
        monitoring: '24/7 alerting'
      }
    },
    {
      id: 'risk-management',
      icon: 'fas fa-shield-alt',
      title: 'Risk & Capital Protection',
      subtitle: 'Risk controls built in, not bolted on',
      description: 'Position sizing, drawdown controls, execution safeguards, and failure conditions integrated directly into the system — because robustness is engineering, not a feature.',
      technologies: ['Python', 'NumPy', 'Pandas', 'PostgreSQL', 'TimescaleDB'],
      benefits: [
        'Dynamic position sizing (e.g., signal-strength, Kelly-based)',
        'Drawdown limits and stop-loss automation',
        'Execution safeguards and kill-switch conditions',
        'Real-time risk dashboards and alerts',
        'Failure conditions defined and tested before go-live'
      ],
      metrics: {
        protection: 'Capital-first',
        controls: 'Built-in safeguards',
        monitoring: 'Real-time risk'
      }
    }
  ];

  const packages: PackagesCollection = {
    strategy: {
      name: 'Strategy Research Sprint',
      price: 'Custom Quote',
      duration: '2-3 weeks',
      description: 'For traders with an idea that needs rigorous validation before anything gets built. Turns your hypothesis into an honest verdict: worth building, or not.',
      subtitle: 'Validate Before You Build',
      features: [
        'Discovery sessions to formalize your trading logic into explicit rules',
        'Research pipeline with clean, validated market data',
        'Backtesting with realistic costs, slippage, and execution constraints',
        'Out-of-sample and walk-forward validation report',
        'Sensitivity analysis: how performance changes when assumptions do',
        'Written verdict with next-step recommendations'
      ],
      note: 'The cheapest insurance you can buy: a rigorous no before you commit capital to a build.',
      popular: false,
      guarantees: [
        'Honest results - even when they say "don't build it"',
        'Clear documentation of every assumption',
        'Fixed scope, agreed before we start'
      ],
      paymentOptions: [
        'Milestone-based billing',
        'Weekly progress demos',
        'IP transfer on completion'
      ],
      notIncluded: [
        'Broker or exchange fees',
        'Market data feed subscriptions',
        'Live deployment (separate engagement)'
      ]
    },
    implementation: {
      name: 'Backtest-to-Execution Build',
      price: 'Custom Quote',
      duration: '4-6 weeks',
      description: 'For teams with a validated strategy ready to become a system. The full pipeline from research and backtesting through automated execution.',
      subtitle: 'Build & Deploy',
      features: [
        'Production backtesting infrastructure for your strategy',
        'Automated execution system with broker API integration',
        'Error handling, payload validation, and real-time alerting',
        'Risk controls: position sizing, drawdown limits, safeguards',
        'Containerized deployment for high availability',
        'Complete documentation and 2 weeks post-launch support'
      ],
      note: 'Most popular option. Takes a validated strategy and engineers it into a system that survives live markets.',
      popular: true,
      guarantees: [
        '30-Day Bug-Fix Guarantee',
        'Code quality assurance',
        'Fixed scope - no surprises'
      ],
      paymentOptions: [
        'Milestone-based billing',
        'Weekly progress demos',
        'IP transfer on completion'
      ],
      notIncluded: [
        'Broker or exchange fees',
        'Market data feed subscriptions',
        'Ongoing maintenance beyond support window'
      ],
      addOns: [
        { name: 'Additional Asset Class', price: 'Quote', description: 'Extend the system to trade another market' },
        { name: 'Monitoring Dashboards', price: 'Quote', description: 'Real-time performance and risk dashboards' },
        { name: 'Knowledge Transfer', price: 'Quote', description: '2-hour hands-on session explaining the system' }
      ]
    },
    complete: {
      name: 'Complete Trading System',
      price: 'Custom Quote',
      duration: '8-12 weeks',
      description: 'End-to-end engagement: research, validation, execution, and risk — the entire journey from trading idea to live system.',
      subtitle: 'Research → Execution',
      features: [
        'Systematic strategy development from your trading logic',
        'Research & backtesting workflow with walk-forward validation',
        'Automated execution system with broker integration',
        'Integrated risk management and capital protection controls',
        'Monitoring, alerting, and observability from day one',
        '3 weeks of post-launch support and tuning',
        'Hands-on walkthrough session (1.5 hours)',
        'Email/Slack support with 24-hour response time'
      ],
      note: 'Comprehensive engagement. From hypothesis to live trading with risk controls — the complete research-to-execution lifecycle.',
      popular: false,
      savings: 'Best Value',
      guarantees: [
        '3-Week Bug-Fix Guarantee',
        'Priority Support Included',
        'Fixed scope - no surprises'
      ],
      paymentOptions: [
        'Milestone-based billing',
        'Weekly progress demos',
        'IP transfer on completion'
      ],
      notIncluded: [
        'Broker or exchange fees',
        'Market data feed subscriptions',
        'Ongoing maintenance beyond support window'
      ],
      addOns: [
        { name: 'Performance Audit', price: 'Quote', description: 'Deep-dive optimization: latency, cost, and robustness analysis' },
        { name: 'Additional Walkthrough', price: 'Quote', description: 'Extra 2-hour session for knowledge transfer' }
      ]
    }
  };

  const testimonials = [
    {
      service: 'Trading Infrastructure',
      client: 'Daniel Graham, CEO TheTraderDaddy',
      quote: 'Jose built our real-time market data pipeline processing WebSocket feeds from multiple exchanges. The system maintains high availability with low-latency ingestion while handling millions of daily updates. His integration of market data, social sentiment, and on-chain metrics into a unified platform powers our entire research infrastructure.',
      result: 'High availability, low-latency ingestion, millions of daily updates'
    },
    {
      service: 'Automated Execution',
      client: 'Paul Reina, Sales Manager at GrowMyClinic',
      quote: 'Jose integrated our CRM, call tracking, and scheduling systems into a unified analytics dashboard. The real-time visibility into marketing attribution and conversion funnels helped us identify high-value referral sources and optimize our spend. Patient conversion improved from 28% to 35%, with a 15% increase in average appointment value.',
      result: '25% conversion improvement, 15% higher revenue per patient'
    },
    {
      service: 'ML Systems',
      client: 'Caterina Abanoni, Data Science Lead',
      quote: 'Jose architected our MLOps pipeline with automated feature engineering processing 2,500+ daily student interactions. The A/B testing framework and model monitoring reduced deployment time from 3 weeks to 3 days, while improving course completion rates by 15%. His GDPR-compliant framework was critical for our European expansion.',
      result: '85% faster deployment, 15% better course completion'
    }
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema()} />
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

        {/* Open to Full-Time & Consulting Disclaimer */}
        <m.div
          className="relative bg-gradient-to-br from-[#0A1526] via-[#0D1B30] to-[#0A1526] border-l-4 border-[#00E5A0] py-10 overflow-hidden"
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
                <div className="w-16 h-16 bg-gradient-to-br from-[#00E5A0] to-[#42A5F5] rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-briefcase text-2xl text-[#050B14]"></i>
                </div>
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 bg-[#00E5A0]/10 rounded-full border border-[#00E5A0]/20 mb-3">
                  <div className="w-2 h-2 bg-[#00E5A0] rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-semibold text-[#00E5A0] tracking-wide uppercase">Available Now</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Open to Full-Time & Consulting Opportunities
                </h3>
                <p className="text-gray-300 mb-3 leading-relaxed">
                  I'm seeking full-time Quantitative Developer roles with prop trading firms, systematic trading teams,
                  and trading technology companies. I also take on select consulting engagements where practical market
                  knowledge and software engineering can create value.
                </p>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                  These engagements below are for project-based consulting work. For full-time roles, contract-to-hire opportunities,
                  or to discuss how I can contribute to your team long-term, let's connect.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://calendly.com/datawithjose/consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#5AB3F5] text-[#050B14] px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <i className="fas fa-calendar-check mr-2"></i>
                    Schedule Free Call
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </a>
                  <a 
                    href="mailto:datawithjose@outlook.com?subject=Full-Time Opportunity&body=Hi Jose, I'd like to discuss a full-time Quantitative Developer opportunity..."
                    className="group inline-flex items-center justify-center border-2 border-[#1E2D45] text-gray-300 hover:bg-white/5 hover:text-[#00E5A0] px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Email Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </m.div>

        {/* Enhanced Hero Section */}
        <m.div
          className="relative bg-gradient-to-br from-[#050B14] via-[#0A1526] to-[#0D1B30] text-white py-24 overflow-hidden"
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
              <m.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl relative">
                    Quantitative Development
                  </span>
                  <span className="block bg-gradient-to-r from-[#00E5A0] via-[#00C98C] to-[#42A5F5] bg-clip-text text-transparent drop-shadow-2xl mt-2 relative">
                    Services
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse opacity-30"></div>
                  </span>
                </h1>
              </m.div>
              
              <m.div
                className="mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                  Robust algorithmic trading systems — engineered from research to execution
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 inline-block">
                  <p className="text-gray-200 text-sm leading-relaxed italic">
                    "Quantitative Developer with 8 years of active market experience. A strategy is not considered
                    robust simply because it produces an attractive backtest — systems are researched rigorously,
                    tested honestly, and engineered to operate in the real world."
                  </p>
                </div>
              </m.div>

              {/* Service Categories */}
              <m.div
                className="flex flex-wrap justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                  <i className="fas fa-lightbulb mr-2"></i>Strategy Development
                </span>
                <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                  <i className="fas fa-flask mr-2"></i>Research & Backtesting
                </span>
                <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                  <i className="fas fa-bolt mr-2"></i>Automated Execution
                </span>
                <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30">
                  <i className="fas fa-shield-alt mr-2"></i>Risk & Capital Protection
                </span>
              </m.div>
            </div>

            {/* Enhanced Stats Grid */}
            <m.div
              className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-green-400 mb-2">8+</div>
                <div className="text-gray-300 text-sm">Years Market Experience</div>
                <div className="text-xs text-gray-400 mt-1">Futures · FX · Crypto · Equities</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">12+</div>
                <div className="text-gray-300 text-sm">Projects Delivered</div>
                <div className="text-xs text-gray-400 mt-1">Production Systems</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-2">Walk-Forward</div>
                <div className="text-gray-300 text-sm">Validation Standard</div>
                <div className="text-xs text-gray-400 mt-1">Out-of-Sample Tested</div>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
                <div className="text-gray-300 text-sm">System Operation</div>
                <div className="text-xs text-gray-400 mt-1">Monitoring & Alerting</div>
              </div>
            </m.div>

            {/* CTA Section */}
            <m.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group bg-gradient-to-r from-[#00E5A0] to-[#00C98C] hover:from-[#00FFB3] hover:to-[#00E5A0] text-[#050B14] px-8 py-4 rounded-xl font-bold transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
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
            </m.div>
          </div>
        </m.div>

        {/* Enhanced Services Section */}
        <div id="services-details" className="py-20 bg-[#0A1526]">
          <div className="container mx-auto px-4">
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#00E5A0] mb-4">
                Technical Capabilities
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                Quantitative development solutions built around one principle: validation before capital.
                Review the capabilities below, then explore engagement options.
              </p>
              
              {/* Service Benefits */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-4 py-2 bg-[#00E5A0]/15 text-[#00E5A0] rounded-lg text-sm font-medium border border-[#00E5A0]/30">
                  <i className="fas fa-shield-alt mr-2"></i>
                  Validation-First
                </div>
                <div className="px-4 py-2 bg-blue-500/15 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30">
                  <i className="fas fa-clock mr-2"></i>
                  Low-Latency Execution
                </div>
                <div className="px-4 py-2 bg-purple-500/15 text-purple-300 rounded-lg text-sm font-medium border border-purple-500/30">
                  <i className="fas fa-chart-line mr-2"></i>
                  Robustness by Design
                </div>
                <div className="px-4 py-2 bg-orange-500/15 text-orange-300 rounded-lg text-sm font-medium border border-orange-500/30">
                  <i className="fas fa-handshake mr-2"></i>
                  End-to-End Support
                </div>
              </div>
            </m.div>

            {/* Service Selector */}
            <div className="flex flex-wrap justify-center mb-12 gap-4">
              {services.map((service, index) => (
                <m.button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeService === index
                      ? 'bg-[#00E5A0] text-[#050B14] shadow-lg'
                      : 'bg-[#0D1B30] text-gray-300 hover:bg-[#1E2D45] border border-[#1E2D45]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${service.icon} mr-2`}></i>
                  {service.title.split(' &')[0]}
                </m.button>
              ))}
            </div>

            {/* Active Service Details */}
            <m.div
              key={activeService}
              className="bg-[#0D1B30] border border-[#1E2D45] rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Service Info */}
                <div className="p-12">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00E5A0] to-[#42A5F5] rounded-full flex items-center justify-center mr-4">
                      <i className={`${services[activeService].icon} text-2xl text-[#050B14]`}></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{services[activeService].title}</h3>
                      <p className="text-gray-400">{services[activeService].subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {services[activeService].description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-white">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {services[activeService].technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/5 border border-[#1E2D45] text-gray-300 rounded-full text-sm font-medium"
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
                      className="block text-center bg-[#00E5A0] text-[#050B14] px-8 py-3 rounded-lg font-bold hover:bg-[#00FFB3] transition-colors"
                    >
                      View Engagement Options
                    </Link>
                  </div>
                </div>

                {/* Benefits & Metrics */}
                <div className="bg-gradient-to-br from-[#0A1526] to-[#071020] p-12">
                  <h4 className="text-2xl font-bold mb-6 text-white">Key Benefits</h4>
                  <div className="space-y-4 mb-8">
                    {services[activeService].benefits.map((benefit, index) => (
                      <m.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <i className="fas fa-check-circle text-[#00E5A0] mr-3 mt-1 flex-shrink-0"></i>
                        <span dangerouslySetInnerHTML={{ __html: benefit }}></span>
                      </m.div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 gap-4">
                    <h4 className="text-xl font-bold mb-4 text-white">Standards Applied</h4>
                    {Object.entries(services[activeService].metrics).map(([key, value], index) => (
                      <div key={key} className="bg-[#0D1B30] border border-[#1E2D45] p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-[#00E5A0] font-mono">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>

        {/* Pricing Packages */}
        <div id="pricing" className="pt-24 pb-12 bg-[#050B14]">
          <div className="container mx-auto px-4">
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-[#00E5A0]">Engagement Options</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                From validating a single idea to a complete research-to-execution system.
                Every engagement starts with a free strategy call — quotes are scoped to your project.
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {Object.entries(packages).map(([key, pkg], index) => (
                <m.div
                  key={key}
                  className={`relative bg-[#0D1B30] rounded-3xl shadow-2xl overflow-hidden border-2 transition-all duration-300 ${
                    pkg.popular 
                      ? 'border-[#00E5A0] transform scale-105 shadow-[#00E5A0]/20' 
                      : 'border-[#1E2D45] hover:border-[#00E5A0]/40 hover:shadow-xl'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -4, scale: pkg.popular ? 1.02 : 1.01 }}
                >
                  {/* Header with gradient background */}
                  <div className={`relative px-8 pb-6 ${
                    pkg.popular || ('savings' in pkg && pkg.savings) ? 'pt-16' : 'pt-8'
                  } ${
                    pkg.popular 
                      ? 'bg-gradient-to-br from-[#00C98C] to-[#00E5A0]' 
                      : index === 0 
                        ? 'bg-gradient-to-br from-[#42A5F5] to-[#2196F3]'
                        : 'bg-gradient-to-br from-[#8B5CF6] to-[#6D4FD8]'
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
                        <div className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border-2 border-white whitespace-nowrap">
                          ⭐ {pkg.savings}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center text-[#050B14]">
                      <h3 className="text-2xl font-bold mb-3 leading-tight">{pkg.name}</h3>
                      <div className="mb-2">
                        <span className="text-4xl font-black">{pkg.price}</span>
                      </div>
                      <div className="text-sm opacity-90 font-semibold mb-2">{pkg.subtitle}</div>
                      <div className="inline-flex items-center bg-black/10 backdrop-blur-sm rounded-full px-3 py-1">
                        <i className="fas fa-clock mr-2 text-sm"></i>
                        <span className="text-sm font-semibold">{pkg.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Ideal for:</h4>
                      <p className="text-gray-400 leading-relaxed">{pkg.description}</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <i className="fas fa-list-check mr-2 text-[#00E5A0]"></i>
                        Key Deliverables
                      </h4>
                      <ul className="space-y-4">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start group">
                            <div className="flex-shrink-0 w-6 h-6 bg-[#00E5A0]/15 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#00E5A0]/25 transition-colors">
                              <i className="fas fa-check text-[#00E5A0] text-xs"></i>
                            </div>
                            <span className="text-gray-300 leading-relaxed text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pkg.note && (
                      <div className="bg-gradient-to-r from-[#42A5F5]/10 to-[#8B5CF6]/10 border border-[#1E2D45] rounded-xl p-4 mb-6">
                        <div className="flex items-start">
                          <i className="fas fa-info-circle text-[#42A5F5] mr-3 mt-0.5 flex-shrink-0"></i>
                          <p className="text-sm text-gray-300 leading-relaxed italic">{pkg.note}</p>
                        </div>
                      </div>
                    )}

                    {pkg.paymentOptions && (
                      <div className="bg-gradient-to-r from-[#0A1526] to-[#0D1B30] border border-[#1E2D45] rounded-xl p-4 mb-4">
                        <h5 className="text-sm font-bold text-gray-200 mb-3 flex items-center">
                          <i className="fas fa-credit-card mr-2"></i>
                          Engagement Terms
                        </h5>
                        <ul className="space-y-2">
                          {pkg.paymentOptions.map((option, idx) => (
                            <li key={idx} className="flex items-start text-xs text-gray-400">
                              <i className="fas fa-check-circle mr-2 mt-0.5 flex-shrink-0 text-[#00E5A0]"></i>
                              <span>{option}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.notIncluded && (
                      <div className="bg-gradient-to-r from-[#F5B544]/10 to-[#FF8E53]/10 border border-[#1E2D45] rounded-xl p-4 mb-4">
                        <h5 className="text-sm font-bold text-[#F5B544] mb-3 flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i>
                          Not Included
                        </h5>
                        <ul className="space-y-2">
                          {pkg.notIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start text-xs text-gray-400">
                              <i className="fas fa-times-circle mr-2 mt-0.5 flex-shrink-0 text-[#F5B544]"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.addOns && pkg.addOns.length > 0 && (
                      <div className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#00E5A0]/10 border border-[#1E2D45] rounded-xl p-4 mb-4">
                        <h5 className="text-sm font-bold text-[#8B5CF6] mb-3 flex items-center">
                          <i className="fas fa-plus-circle mr-2"></i>
                          Available Add-Ons
                        </h5>
                        <ul className="space-y-3">
                          {pkg.addOns.map((addon, idx) => (
                            <li key={idx} className="text-xs text-gray-400">
                              <div className="flex items-start justify-between mb-1">
                                <span className="font-semibold text-gray-200">{addon.name}</span>
                                <span className="font-bold text-[#00E5A0]">{addon.price}</span>
                              </div>
                              <p className="text-gray-400 leading-relaxed">{addon.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.guarantees && (
                      <div className="bg-gradient-to-r from-[#00E5A0]/10 to-[#00C98C]/10 border border-[#1E2D45] rounded-xl p-4 mb-8">
                        <h5 className="text-sm font-bold text-[#00E5A0] mb-3 flex items-center">
                          <i className="fas fa-shield-check mr-2"></i>
                          Guarantees
                        </h5>
                        <ul className="space-y-2">
                          {pkg.guarantees.map((guarantee, idx) => (
                            <li key={idx} className="flex items-start text-xs text-gray-300">
                              <i className="fas fa-check-circle mr-2 mt-0.5 flex-shrink-0 text-[#00E5A0]"></i>
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
                          ? 'bg-gradient-to-r from-[#00E5A0] to-[#00C98C] text-[#050B14] hover:from-[#00FFB3] hover:to-[#00E5A0]'
                          : index === 0
                            ? 'bg-gradient-to-r from-[#42A5F5] to-[#2196F3] text-[#050B14] hover:from-[#5AB3F5] hover:to-[#42A5F5]'
                            : 'bg-gradient-to-r from-[#8B5CF6] to-[#6D4FD8] text-[#050B14] hover:from-[#9B7CF6] hover:to-[#8B5CF6]'
                      }`}
                    >
                      <i className="fas fa-calendar-check mr-2"></i>
                      Schedule Free Consultation
                    </Link>
                  </div>
                </m.div>
              ))}
            </div>

            {/* Comparison Table */}
            <m.div
              className="mt-20 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-center mb-12 text-white">Compare Engagements</h3>

              <div className="bg-[#0D1B30] rounded-2xl shadow-xl overflow-hidden border border-[#1E2D45]">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#0A1526]">
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-200">Capability</th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#42A5F5]">Research Sprint<br/><span className="text-xs font-normal text-gray-500">2-3 weeks</span></th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#00E5A0]">Backtest-to-Execution<br/><span className="text-xs font-normal text-gray-500">4-6 weeks</span></th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-[#8B5CF6]">Complete System<br/><span className="text-xs font-normal text-gray-500">8-12 weeks</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E2D45]">
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Strategy formalization</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#42A5F5] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#00E5A0] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#8B5CF6] text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Backtesting with realistic costs</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#42A5F5] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#00E5A0] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#8B5CF6] text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Walk-forward & out-of-sample validation</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#42A5F5] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#00E5A0] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#8B5CF6] text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Automated execution system</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-600"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#00E5A0] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#8B5CF6] text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Broker API integration</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-600"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#00E5A0] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#8B5CF6] text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Risk & capital protection controls</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-600"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#00E5A0] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#8B5CF6] text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Monitoring & alerting</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-600"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#00E5A0] text-lg"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#8B5CF6] text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Hands-on walkthrough</td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-600"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-minus text-gray-600"></i></td>
                        <td className="px-6 py-4 text-center"><i className="fas fa-check text-[#8B5CF6] text-lg"></i></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">Post-launch support</td>
                        <td className="px-6 py-4 text-center text-xs text-gray-500">—</td>
                        <td className="px-6 py-4 text-center text-xs text-gray-400">2 weeks</td>
                        <td className="px-6 py-4 text-center text-xs text-[#8B5CF6] font-semibold">3 weeks + priority</td>
                      </tr>
                      <tr className="bg-[#0A1526] font-semibold">
                        <td className="px-6 py-4 text-sm text-gray-200">Investment</td>
                        <td className="px-6 py-4 text-center text-sm text-[#42A5F5]">Custom Quote</td>
                        <td className="px-6 py-4 text-center text-sm text-[#00E5A0]">Custom Quote</td>
                        <td className="px-6 py-4 text-center text-sm text-[#8B5CF6]">Custom Quote</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-400 mb-4">Not sure which engagement fits your idea?</p>
                <a
                  href="https://calendly.com/datawithjose/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-[#00E5A0] to-[#00C98C] hover:from-[#00FFB3] hover:to-[#00E5A0] text-[#050B14] px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Schedule Free Consultation
                  <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                </a>
              </div>
            </m.div>
          </div>
        </div>

        {/* How It Works Process */}
        <div className="py-20 bg-gradient-to-br from-[#0A1526] to-[#050B14]">
          <div className="container mx-auto px-4">
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00E5A0]">How It Works</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Simple, transparent process from first contact to system delivery
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <m.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="bg-[#0D1B30] rounded-2xl p-8 shadow-lg border-2 border-[#1E2D45] hover:border-[#42A5F5]/40 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">Free 30-Min Call</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#42A5F5] mr-2 mt-1"></i>
                      <span>Discuss your strategy or trading idea</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#42A5F5] mr-2 mt-1"></i>
                      <span>Assess research and infrastructure needs</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-blue-500 mr-2 mt-1"></i>
                      <span>No commitment required</span>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <i className="fas fa-arrow-right text-3xl text-[#1E2D45]"></i>
                </div>
              </m.div>

              {/* Step 2 */}
              <m.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="bg-[#0D1B30] rounded-2xl p-8 shadow-lg border-2 border-[#1E2D45] hover:border-[#00E5A0]/40 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">Custom Proposal</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#00E5A0] mr-2 mt-1"></i>
                      <span>Delivered within 48 hours</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#00E5A0] mr-2 mt-1"></i>
                      <span>Clear scope, timeline, and validation plan</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#00E5A0] mr-2 mt-1"></i>
                      <span>Fixed scope, no surprises</span>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <i className="fas fa-arrow-right text-3xl text-[#1E2D45]"></i>
                </div>
              </m.div>

              {/* Step 3 */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="bg-[#0D1B30] rounded-2xl p-8 shadow-lg border-2 border-[#1E2D45] hover:border-[#8B5CF6]/40 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">Project Kickoff</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#8B5CF6] mr-2 mt-1"></i>
                      <span>Start within 2 weeks</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#8B5CF6] mr-2 mt-1"></i>
                      <span>Weekly progress demos</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#8B5CF6] mr-2 mt-1"></i>
                      <span>Direct communication channel</span>
                    </li>
                  </ul>
                </div>
              </m.div>
            </div>

            <m.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#5AB3F5] text-[#050B14] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <i className="fas fa-calendar-check mr-2"></i>
                Start With Free Consultation
              </Link>
            </m.div>
          </div>
        </div>

        {/* Client Results */}
        <div className="py-20 bg-[#0A1526] text-white">
          <div className="container mx-auto px-4">
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-[#00E5A0]">Client Success Stories</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Real feedback from teams I've worked with.
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <m.div
                  key={index}
                  className="bg-[#0D1B30] border border-[#1E2D45] p-8 rounded-2xl"
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
                </m.div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <m.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-[#00E5A0]">My Process</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A structured methodology — from research to execution.
              </p>
            </m.div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#1E2D45]"></div>

              {[
                {
                  step: '01',
                  title: 'Research & Formalization',
                  description: 'Turning your trading logic into explicit, testable rules — before a line of system code is written.',
                  duration: '1-2 weeks'
                },
                {
                  step: '02',
                  title: 'Backtesting & Validation',
                  description: 'Walk-forward, out-of-sample, and sensitivity testing with realistic costs and execution constraints.',
                  duration: '1-3 weeks'
                },
                {
                  step: '03',
                  title: 'Execution Engineering',
                  description: 'Building the execution layer: broker integration, error handling, alerting, and risk controls.',
                  duration: '2-6 weeks'
                },
                {
                  step: '04',
                  title: 'Deployment & Monitoring',
                  description: 'Containerized deployment with observability, alerting, and ongoing support.',
                  duration: 'Ongoing'
                }
              ].map((phase, index) => (
                <m.div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-[#0D1B30] border border-[#1E2D45] p-6 rounded-2xl shadow-lg">
                      <div className="text-[#00E5A0] font-bold text-lg mb-2 font-mono">{phase.step}</div>
                      <h3 className="text-2xl font-bold mb-3 text-white">{phase.title}</h3>
                      <p className="text-gray-400 mb-3">{phase.description}</p>
                      <div className="text-sm text-[#00E5A0] font-semibold">{phase.duration}</div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#00E5A0] rounded-full border-4 border-[#050B14] shadow-lg"></div>
                </m.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-br from-[#0D1B30] to-[#071020] text-white border-t border-[#1E2D45]">
          <div className="container mx-auto px-4 text-center">
            <m.h2
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Build Your Trading System?
            </m.h2>
            <m.p
              className="text-xl mb-8 max-w-2xl mx-auto text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Let's discuss your strategy — researched rigorously, tested honestly, and engineered for the real world.
            </m.p>
            <m.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <a
                href="mailto:datawithjose@outlook.com?subject=Service Inquiry&body=Hi Jose,%0D%0A%0D%0AI'm interested in your quantitative development services.%0D%0A%0D%0AService interested in:%0D%0A☐ Strategy research & validation%0D%0A☐ Backtesting infrastructure%0D%0A☐ Automated execution%0D%0A☐ Risk management%0D%0A%0D%0AProject details:%0D%0A%0D%0ABest regards"
                className="bg-[#00E5A0] text-[#050B14] px-8 py-4 rounded-lg font-bold hover:bg-[#00FFB3] transition-colors text-lg inline-flex items-center justify-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                Email Me Directly
              </a>
              <Link
                href="/portfolio"
                className="border-2 border-[#1E2D45] text-gray-200 px-8 py-4 rounded-lg font-semibold hover:bg-white/5 hover:text-[#00E5A0] transition-colors text-lg inline-flex items-center justify-center"
              >
                <i className="fas fa-briefcase mr-2"></i>
                View My Work
              </Link>
            </m.div>
          </div>
        </div>

        {/* Service Guarantees Section */}
        <section className="py-20 bg-gradient-to-br from-[#050B14] via-[#0A1526] to-[#0D1B30] text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <m.div
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
                    <span>Validation-first methodology</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="fas fa-handshake text-purple-400 mr-2"></i>
                    <span>End-to-end support</span>
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

        {/* Calendly Booking Section */}
        <CalendlyBooking variant="cta" />

        {/* Enhanced CTA */}
        <EnhancedCTAs variant="urgent" />

        <Footer />
      </div>
    </>
  );
}