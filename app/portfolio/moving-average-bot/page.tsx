'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function MovingAverageBot() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, []);

  return (
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

        {/* Hero Section */}
        <m.div
          className="page-heading header-text bg-gradient-to-r from-[#0D1B30] via-[#0A1526] to-[#071020] text-white py-32 border-b border-[#1E2D45]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center">
              <m.div
                className="mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link href="/portfolio" className="text-white/80 hover:text-white transition-colors">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Portfolio
                </Link>
              </m.div>
              <m.h1
                className="text-5xl font-bold mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Moving Average Trading Bot
              </m.h1>
              <span className="text-xl">Algorithmic Trading • Automated Systems • Crossover Strategy</span>
            </div>
          </div>
        </m.div>

        {/* Project Content */}
        <div className="project-content py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            
            {/* Performance Metrics */}
            <m.div
              className="metrics-section mb-12 grid md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="metric-card bg-[#0A1526] border border-[#1E2D45] p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-[#00E5A0] mb-2 font-mono">24/7</div>
                <div className="text-sm text-gray-400">Autonomous Operation</div>
              </div>
              <div className="metric-card bg-[#0A1526] border border-[#1E2D45] p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-[#42A5F5] mb-2 font-mono">Docker</div>
                <div className="text-sm text-gray-400">Containerized Deployment</div>
              </div>
              <div className="metric-card bg-[#0A1526] border border-[#1E2D45] p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-[#8B5CF6] mb-2 font-mono">Risk</div>
                <div className="text-sm text-gray-400">Controls Built-In</div>
              </div>
            </m.div>

            {/* Status Badge */}
            <m.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0] px-6 py-3 rounded-full font-semibold">
                <i className="fas fa-check-circle mr-2 text-xl"></i>
                Live-Tested & Risk-Controlled
              </div>
            </m.div>

            {/* Objective Section */}
            <m.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-bullseye text-green-500 mr-3"></i>
                Objective
              </h2>
              <div className="bg-[#0D1B30] border border-[#1E2D45] p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed">
                  To develop an automated trading bot based on the moving average crossover strategy that can operate autonomously in live markets with minimal human intervention.
                </p>
              </div>
            </m.section>

            {/* Methodology Section */}
            <m.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-cogs text-blue-500 mr-3"></i>
                Methodology
              </h2>
              <div className="bg-[#0D1B30] border border-[#1E2D45] p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed mb-4">
                  The bot continuously monitors the price of a given asset and executes trades when the short-term moving average crosses the long-term moving average.
                </p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span>Real-time price monitoring with moving average calculations</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span>Automated trade execution on crossover signals</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span>Backtrader library for backtesting and live trading</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span>REST API integration for market data and order management</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span>Docker containerization for consistent deployment</span>
                  </li>
                </ul>
              </div>
            </m.section>

            {/* Results Section */}
            <m.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-chart-line text-purple-500 mr-3"></i>
                Results
              </h2>
              <div className="bg-[#0D1B30] border border-[#1E2D45] p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed mb-4">
                  The trading bot has been deployed and operates autonomously in live markets with risk controls in place.
                </p>
                <div className="space-y-4">
                  <div className="bg-[#00E5A0]/10 p-4 rounded-lg border-l-4 border-[#00E5A0]">
                    <p className="text-lg font-semibold text-[#00E5A0]">
                      <i className="fas fa-trophy mr-2"></i>
                      Crossover logic validated across multiple market regimes
                    </p>
                  </div>
                  <div className="bg-[#42A5F5]/10 p-4 rounded-lg border-l-4 border-[#42A5F5]">
                    <p className="text-lg font-semibold text-[#42A5F5]">
                      <i className="fas fa-robot mr-2"></i>
                      24/7 autonomous operation without manual intervention
                    </p>
                  </div>
                  <div className="bg-[#8B5CF6]/10 p-4 rounded-lg border-l-4 border-[#8B5CF6]">
                    <p className="text-lg font-semibold text-[#8B5CF6]">
                      <i className="fas fa-shield-alt mr-2"></i>
                      Fault-tolerance, graceful API failure handling, and monitoring
                    </p>
                  </div>
                </div>
              </div>
            </m.section>

            {/* Challenges Section */}
            <m.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-exclamation-triangle text-orange-500 mr-3"></i>
                Challenges
              </h2>
              <div className="bg-[#0D1B30] border border-[#1E2D45] p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed mb-4">
                  Key challenges overcome during development and deployment:
                </p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Implementing a reliable and fault-tolerant system for 24/7 operation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Ensuring system stability without manual intervention</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Handling network issues and API connection failures gracefully</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Optimizing parameters for different market regimes</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Implementing proper logging and monitoring for production environment</span>
                  </li>
                </ul>
              </div>
            </m.section>

            {/* Technologies Section */}
            <m.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-code text-blue-500 mr-3"></i>
                Technologies Used
              </h2>
              <div className="bg-[#0D1B30] border border-[#1E2D45] p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-3">
                  {['Python', 'Pandas', 'Backtrader', 'REST API', 'Docker'].map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/5 border border-[#1E2D45] text-gray-300 rounded-full font-medium text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </m.section>

            {/* CTA Buttons */}
            <m.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="https://github.com/thedatawithjose/Algorithmic-Trading-Bot-Moving-Average-Crossover-Strategy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A1526] border border-[#1E2D45] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1E2D45] transition-colors flex items-center justify-center"
              >
                <i className="fab fa-github text-2xl mr-3"></i>
                View on GitHub
              </a>
              <Link
                href="/portfolio"
                className="bg-[#00E5A0] text-[#050B14] px-8 py-4 rounded-lg font-bold hover:bg-[#00FFB3] transition-colors flex items-center justify-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Portfolio
              </Link>
            </m.div>
          </div>
        </div>

        <Footer />
      </div>
  );
}
