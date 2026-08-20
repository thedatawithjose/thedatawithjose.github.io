'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function EdgarSecParser() {
  return (
    <div className="min-h-screen bg-[#050B14] text-[#E6EDF3]">
        <Header />

        {/* Hero Section */}
        <m.div
          className="page-heading header-text bg-gradient-to-r from-blue-600 to-purple-600 text-white py-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <Link 
              href="/portfolio" 
              className="inline-block mb-6 text-white hover:text-gray-200 transition-colors"
            >
              ← Back to Portfolio
            </Link>
            <div className="max-w-4xl">
              <m.div
                className="inline-block px-4 py-2 bg-white/20 rounded-full mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm font-semibold">Research & Data</span>
              </m.div>
              <m.h1
                className="text-5xl font-bold mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Edgar SEC Parser
              </m.h1>
              <m.p
                className="text-xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Advanced Financial Document Processing System
              </m.p>
              
              {/* Metrics */}
              <m.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">16.5 MB/s</div>
                  <div className="text-sm">Peak Throughput</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm">Error Recovery Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">3 Engines</div>
                  <div className="text-sm">Parser Coverage</div>
                </div>
              </m.div>
            </div>
          </div>
        </m.div>

        {/* Content Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Objective */}
              <m.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-4">Project Objective</h2>
                <p className="text-lg leading-relaxed">
                  Edgar is a production-ready SEC filing extraction and parsing system that intelligently processes 
                  regulatory documents using advanced parser integration. Built with specialized SEC parsing libraries 
                  (<code className="bg-gray-200 px-2 py-1 rounded">secsgml</code> v0.3.1 and{' '}
                  <code className="bg-gray-200 px-2 py-1 rounded">secxbrl</code> v0.5.0), Edgar provides 
                  robust, scalable financial document processing capabilities for extracting structured metadata and 
                  financial facts from complex regulatory filings.
                </p>
              </m.section>

              {/* Architecture */}
              <m.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">System Architecture</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-code text-3xl text-blue-500 mr-3"></i>
                      <h3 className="text-xl font-semibold">Core Extraction</h3>
                    </div>
                    <p>Integrated SEC parsers with processing engine, database models, and content extractors</p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-layer-group text-3xl text-purple-500 mr-3"></i>
                      <h3 className="text-xl font-semibold">Hybrid Parsing</h3>
                    </div>
                    <p>Seamless combination of SGML, XBRL, and legacy system parsers with intelligent fallback</p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-database text-3xl text-green-500 mr-3"></i>
                      <h3 className="text-xl font-semibold">Data Storage</h3>
                    </div>
                    <p>PostgreSQL with SQLAlchemy ORM for structured metadata and financial facts persistence</p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-search text-3xl text-orange-500 mr-3"></i>
                      <h3 className="text-xl font-semibold">Discovery System</h3>
                    </div>
                    <p>SEC feed discovery for automated filing identification and retrieval</p>
                  </div>
                </div>
              </m.section>

              {/* Key Features */}
              <m.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <i className="fas fa-rocket text-blue-600 mr-2"></i>
                      High-Performance Processing
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li>• Peak throughput of 16.5 MB/s with intelligent content detection</li>
                      <li>• Realistic performance of 1.77 MB/s with actual SEC documents</li>
                      <li>• Memory-efficient parsing for large-scale document processing</li>
                      <li>• Optimized database operations with batch inserts</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <i className="fas fa-shield-alt text-purple-600 mr-2"></i>
                      Production-Ready Reliability
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li>• 100% error case handling with graceful fallback mechanisms</li>
                      <li>• Comprehensive testing with unit and integration test suites</li>
                      <li>• Performance validation and benchmarking tools included</li>
                      <li>• Production-ready deployment with Docker support</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <i className="fas fa-file-alt text-green-600 mr-2"></i>
                      Multi-Format Support
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li>• Native SGML processing for legacy SEC filings</li>
                      <li>• Advanced XBRL parsing for modern financial statements</li>
                      <li>• Integrated parser for seamless format switching</li>
                      <li>• Automatic document type detection and optimal parser selection</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <i className="fas fa-cogs text-orange-600 mr-2"></i>
                      Advanced Data Extraction
                    </h3>
                    <ul className="space-y-2 ml-6">
                      <li>• Structured metadata extraction from filing headers</li>
                      <li>• Financial facts extraction with context preservation</li>
                      <li>• Document relationship tracking and hierarchy analysis</li>
                      <li>• Customizable extraction rules and patterns</li>
                    </ul>
                  </div>
                </div>
              </m.section>

              {/* Performance Metrics */}
              <m.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">Performance Results</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Processing Speed</h3>
                    <p className="text-3xl font-bold mb-2">16.5 MB/s</p>
                    <p className="text-sm opacity-90">Peak document throughput achieved</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Error Recovery</h3>
                    <p className="text-3xl font-bold mb-2">100%</p>
                    <p className="text-sm opacity-90">Successful malformed document handling</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Parser Coverage</h3>
                    <p className="text-3xl font-bold mb-2">3 Engines</p>
                    <p className="text-sm opacity-90">SGML, XBRL, and integrated parsing</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Database Integration</h3>
                    <p className="text-3xl font-bold mb-2">Complete</p>
                    <p className="text-sm opacity-90">Full metadata and facts storage</p>
                  </div>
                </div>
              </m.section>

              {/* Technical Challenges */}
              <m.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">Technical Challenges</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold mb-1">Multi-Format Document Parsing</h3>
                    <p className="text-gray-300">
                      Implemented hybrid parser architecture to handle SGML, XBRL, and legacy formats seamlessly 
                      with intelligent format detection and automatic parser selection.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h3 className="font-semibold mb-1">Error Handling at Scale</h3>
                    <p className="text-gray-300">
                      Designed comprehensive error recovery system with graceful fallbacks to handle malformed 
                      documents, missing metadata, and parser failures without data loss.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="font-semibold mb-1">Performance Optimization</h3>
                    <p className="text-gray-300">
                      Achieved 16.5 MB/s peak throughput through memory-efficient parsing, batch database operations, 
                      and optimized content detection algorithms.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4 py-2">
                    <h3 className="font-semibold mb-1">Database Schema Design</h3>
                    <p className="text-gray-300">
                      Created flexible schema to store diverse filing metadata, financial facts, and document 
                      relationships while maintaining query performance and data integrity.
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <h3 className="font-semibold mb-1">Production Deployment</h3>
                    <p className="text-gray-300">
                      Built production-ready infrastructure with Docker containerization, comprehensive testing, 
                      and deployment automation for reliable operation at scale.
                    </p>
                  </div>
                </div>
              </m.section>

              {/* Technologies */}
              <m.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                    Python 3.11+
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                    SQLAlchemy 2.0+
                  </span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                    PostgreSQL 13+
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
                    Docker
                  </span>
                  <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-semibold">
                    secsgml v0.3.1
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
                    secxbrl v0.5.0
                  </span>
                  <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-semibold">
                    pytest
                  </span>
                </div>
              </m.section>

              {/* CTA Section */}
              <m.section
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
                  <h2 className="text-3xl font-bold mb-4">View the Source Code</h2>
                  <p className="text-lg mb-6">
                    Explore the complete implementation with comprehensive documentation and test suites
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://github.com/josetraderx/edgar-sec-parser"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0A1526] border border-[#1E2D45] text-[#42A5F5] px-8 py-3 rounded-lg font-semibold hover:bg-[#1E2D45] transition-colors inline-flex items-center justify-center"
                    >
                      <i className="fab fa-github mr-2"></i>
                      View on GitHub
                    </a>
                    <Link
                      href="/portfolio"
                      className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors inline-flex items-center justify-center"
                    >
                      ← Back to Portfolio
                    </Link>
                  </div>
                </div>
              </m.section>

            </div>
          </div>
        </div>

        <Footer />
      </div>
  );
}
