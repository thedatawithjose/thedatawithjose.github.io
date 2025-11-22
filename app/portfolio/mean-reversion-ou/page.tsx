'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function MeanReversionOU() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, []);

  return (
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
        <m.div
          className="page-heading header-text bg-gradient-to-r from-purple-500 to-blue-500 text-white py-32"
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
                Mean Reversion OU Trading Bot
              </m.h1>
              <span className="text-xl">Algorithmic Trading • Quantitative Finance • Automated Systems</span>
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
              <div className="metric-card bg-green-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">17.89%</div>
                <div className="text-sm text-gray-600">CAGR</div>
              </div>
              <div className="metric-card bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2.34</div>
                <div className="text-sm text-gray-600">Sharpe Ratio</div>
              </div>
              <div className="metric-card bg-purple-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">-12.45%</div>
                <div className="text-sm text-gray-600">Max Drawdown</div>
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
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed">
                  Develop an automated trading bot that identifies and exploits mean-reversion opportunities in financial markets using the Ornstein-Uhlenbeck (OU) process.
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
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed mb-4">
                  The bot continuously ingests real-time price data, estimates OU process parameters, and generates trading signals when prices deviate significantly from the modeled mean.
                </p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span>Position sizing adapts to the strength of the signal</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span>All trades are simulated and visualized for performance review</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span>Entire pipeline is containerized for robust, 24/7 operation</span>
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
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed mb-4">
                  The strategy consistently delivered positive results in backtesting, demonstrating robust performance across multiple assets.
                </p>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-lg font-semibold text-green-700">
                    <i className="fas fa-trophy mr-2"></i>
                    Achieved a Sharpe ratio of 2.34, indicating strong risk-adjusted returns
                  </p>
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
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed mb-4">
                  Key challenges encountered during development and deployment:
                </p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Maintaining estimator robustness during market regime shifts</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Ensuring fault tolerance for continuous operation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Balancing execution speed with statistical confidence</span>
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
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap gap-3">
                  {['Python', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'yfinance', 'Docker', 'Jupyter/Binder/Colab'].map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium text-sm"
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
                href="https://github.com/thedatawithjose/Mean_Reversion_OU"
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
            </m.div>
          </div>
        </div>

        <Footer />
      </div>
  );
}
