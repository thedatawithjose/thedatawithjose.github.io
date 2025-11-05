'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ThemeProvider from '../../../components/ThemeProvider';

export default function MovingAverageBot() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, []);

  return (
    <ThemeProvider>
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

        {/* Hero Section */}
        <motion.div
          className="page-heading header-text bg-gradient-to-r from-green-500 to-teal-500 text-white py-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center">
              <motion.div
                className="mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link href="/portfolio" className="text-white/80 hover:text-white transition-colors">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Portfolio
                </Link>
              </motion.div>
              <motion.h1
                className="text-5xl font-bold mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Moving Average Trading Bot
              </motion.h1>
              <span className="text-xl">Algorithmic Trading • Automated Systems • Crossover Strategy</span>
            </div>
          </div>
        </motion.div>

        {/* Project Content */}
        <div className="project-content py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            
            {/* Performance Metrics */}
            <motion.div
              className="metrics-section mb-12 grid md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="metric-card bg-green-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15.67%</div>
                <div className="text-sm text-gray-600">CAGR</div>
              </div>
              <div className="metric-card bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1.89</div>
                <div className="text-sm text-gray-600">Sharpe Ratio</div>
              </div>
              <div className="metric-card bg-purple-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">-15.23%</div>
                <div className="text-sm text-gray-600">Max Drawdown</div>
              </div>
            </motion.div>

            {/* Status Badge */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
                <i className="fas fa-check-circle mr-2 text-xl"></i>
                Live & Operating Profitably
              </div>
            </motion.div>

            {/* Objective Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-bullseye text-green-500 mr-3"></i>
                Objective
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed">
                  To develop an automated trading bot based on the moving average crossover strategy that can operate autonomously in live markets with minimal human intervention.
                </p>
              </div>
            </motion.section>

            {/* Methodology Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-cogs text-blue-500 mr-3"></i>
                Methodology
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
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
            </motion.section>

            {/* Results Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-chart-line text-purple-500 mr-3"></i>
                Results
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed mb-4">
                  The trading bot has been deployed and is operating profitably in live markets.
                </p>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-lg font-semibold text-green-700">
                      <i className="fas fa-trophy mr-2"></i>
                      Demonstrated effectiveness of moving average strategy in various market conditions
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-lg font-semibold text-blue-700">
                      <i className="fas fa-robot mr-2"></i>
                      24/7 autonomous operation with consistent performance
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="text-lg font-semibold text-purple-700">
                      <i className="fas fa-shield-alt mr-2"></i>
                      Robust fault-tolerance and error handling mechanisms
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Challenges Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-exclamation-triangle text-orange-500 mr-3"></i>
                Challenges
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
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
            </motion.section>

            {/* Technologies Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-code text-blue-500 mr-3"></i>
                Technologies Used
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-3">
                  {['Python', 'Pandas', 'Backtrader', 'REST API', 'Docker'].map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="https://github.com/thedatawithjose/Algorithmic-Trading-Bot-Moving-Average-Crossover-Strategy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <i className="fab fa-github text-2xl mr-3"></i>
                View on GitHub
              </a>
              <Link
                href="/portfolio"
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Portfolio
              </Link>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
