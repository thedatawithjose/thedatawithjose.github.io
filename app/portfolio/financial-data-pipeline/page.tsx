'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function FinancialDataPipeline() {
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
        <motion.div
          className="page-heading header-text bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-32"
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
                Financial Data Pipeline
              </motion.h1>
              <span className="text-xl">ETL Automation • Data Engineering • Market Data Processing</span>
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
              <div className="metric-card bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">Production-Scale</div>
                <div className="text-sm text-gray-600">Records Processing</div>
              </div>
              <div className="metric-card bg-green-50 p-6 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">High-Availability</div>
                <div className="text-sm text-gray-600">System Reliability</div>
              </div>
              <div className="metric-card bg-purple-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Multiple</div>
                <div className="text-sm text-gray-600">Data Sources</div>
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
                <i className="fas fa-bullseye text-blue-500 mr-3"></i>
                Objective
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed">
                  Build a modular, production-ready ETL pipeline for financial market data that supports extraction, transformation, validation, and storage from multiple sources (crypto, equities, derivatives) with analytics and database integration.
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
                <i className="fas fa-cogs text-green-500 mr-3"></i>
                Methodology
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg leading-relaxed mb-4">
                  The pipeline implements a complete ETL workflow with modular architecture for scalability and maintainability.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <i className="fas fa-database text-blue-500 mr-3 mt-1"></i>
                      <div>
                        <h4 className="font-semibold">Data Extraction</h4>
                        <p className="text-sm text-gray-600">Multiple source integration (Bybit, Binance, Yahoo Finance)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                      <div>
                        <h4 className="font-semibold">Data Validation</h4>
                        <p className="text-sm text-gray-600">Comprehensive OHLCV validation & quality checks</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-filter text-purple-500 mr-3 mt-1"></i>
                      <div>
                        <h4 className="font-semibold">Data Processing</h4>
                        <p className="text-sm text-gray-600">Automated cleaning, outlier detection, missing data handling</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <i className="fas fa-hdd text-orange-500 mr-3 mt-1"></i>
                      <div>
                        <h4 className="font-semibold">Storage Layer</h4>
                        <p className="text-sm text-gray-600">TimescaleDB/PostgreSQL with time-series optimization</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-file-export text-teal-500 mr-3 mt-1"></i>
                      <div>
                        <h4 className="font-semibold">Export Formats</h4>
                        <p className="text-sm text-gray-600">Parquet, CSV, JSON output options</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-chart-bar text-red-500 mr-3 mt-1"></i>
                      <div>
                        <h4 className="font-semibold">Monitoring</h4>
                        <p className="text-sm text-gray-600">Data quality metrics & performance tracking</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-lg font-semibold text-blue-700">
                      <i className="fas fa-tachometer-alt mr-2"></i>
                      Production-scale processing with high-availability architecture
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-lg font-semibold text-green-700">
                      <i className="fas fa-shield-alt mr-2"></i>
                      Automated quality checks with comprehensive validation
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="text-lg font-semibold text-purple-700">
                      <i className="fas fa-code-branch mr-2"></i>
                      Modular architecture supporting multiple data sources
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="text-lg font-semibold text-orange-700">
                      <i className="fas fa-clock mr-2"></i>
                      TimescaleDB optimization for time-series queries
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
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Maintaining estimator robustness during market regime shifts</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Ensuring fault tolerance for continuous 24/7 operation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Handling multiple data sources with different formats and structures</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Implementing comprehensive data quality validation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chevron-right text-orange-500 mr-3 mt-1"></i>
                    <span>Optimizing performance for large-scale data processing</span>
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
                  {['Python', 'Pandas', 'PostgreSQL', 'TimescaleDB', 'Git', 'Docker'].map((tech, index) => (
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

            {/* Key Features Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <i className="fas fa-star text-yellow-500 mr-3"></i>
                Key Features
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-blue-600">
                      <i className="fas fa-check-circle mr-2"></i>
                      Data Quality
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Comprehensive validation & quality scoring</li>
                      <li>• Automated outlier detection (IQR method)</li>
                      <li>• Missing value imputation strategies</li>
                      <li>• OHLCV relationship validation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-green-600">
                      <i className="fas fa-database mr-2"></i>
                      Storage & Processing
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• TimescaleDB for time-series optimization</li>
                      <li>• Chunked processing for large datasets</li>
                      <li>• Multiple export formats (Parquet, CSV, JSON)</li>
                      <li>• Data lineage tracking</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-purple-600">
                      <i className="fas fa-plug mr-2"></i>
                      Integration
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Multiple data providers (Bybit, Yahoo Finance)</li>
                      <li>• REST API integration</li>
                      <li>• Rate limiting & error handling</li>
                      <li>• Extensible provider architecture</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-orange-600">
                      <i className="fas fa-chart-bar mr-2"></i>
                      Monitoring
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Real-time quality metrics</li>
                      <li>• Performance monitoring</li>
                      <li>• Comprehensive logging system</li>
                      <li>• Data quality dashboards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="https://github.com/josetraderx/Financial-Data-Pipeline"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <i className="fab fa-github text-2xl mr-3"></i>
                View on GitHub
              </a>
              <Link
                href="/portfolio"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Portfolio
              </Link>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
  );
}
