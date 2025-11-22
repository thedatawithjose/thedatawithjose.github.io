'use client';

import { m } from 'framer-motion';
import Link from 'next/link';

export default function ServicesSection() {
    return (
        <section className="services py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <m.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#0097A7] leading-tight py-2">
                        What I Build
                    </h2>
                    <p className="text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Data infrastructure engineered for real-world conditions—not just the happy path. I specialize in building systems that handle failures gracefully, recover automatically, and provide the observability needed to debug issues when they inevitably occur.
                    </p>
                </m.div>

                {/* Hero Project Card - Trading Data Infrastructure */}
                <m.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -8 }}
                >
                    <Link href="/portfolio/edgar-sec-parser">
                        <div className="group relative bg-gradient-to-br from-white via-blue-50/40 to-green-50/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,191,165,0.3)] transition-all duration-500 border-2 border-white/60 hover:border-[#00BFA5]/30 overflow-hidden cursor-pointer">
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/10 via-[#00BFA5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Floating Orbs Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00BFA5]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#005A9C]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>

                            {/* Content Grid */}
                            <div className="relative z-10 grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
                                {/* Left Column - Main Info */}
                                <div className="md:col-span-2">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#42A5F5]/15 via-[#2196F3]/10 to-[#1976D2]/15 rounded-full border border-[#42A5F5]/30 mb-5 group-hover:border-[#42A5F5]/50 transition-all duration-300 shadow-sm">
                                                <div className="w-2 h-2 bg-[#42A5F5] rounded-full animate-pulse"></div>
                                                <span className="text-xs font-bold bg-gradient-to-r from-[#42A5F5] to-[#2196F3] bg-clip-text text-transparent tracking-wide uppercase">16.5 MB/s Peak Throughput | Production-Grade</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-[#42A5F5] group-hover:to-[#2196F3] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                                                SEC Financial Data Platform
                                            </h3>
                                            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl">
                                                Production-grade parser processing SEC filings with automatic recovery when parsing fails mid-document. In financial data, partial results are worse than no results—built with fault-tolerant design and data quality validation.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Architecture & Impact */}
                                    <div className="mb-8">
                                        <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#005A9C] to-[#00BFA5] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <i className="fas fa-project-diagram text-white text-sm"></i>
                                            </div>
                                            Architecture & Impact
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                                                    <i className="fas fa-bolt text-white text-xs"></i>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed"><strong className="text-gray-900">Multi-engine parsing:</strong> 3 parsing engines (SGML, XBRL, HTML) with automatic fallback for maximum coverage</p>
                                            </div>
                                            <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                                                    <i className="fas fa-rocket text-white text-xs"></i>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed"><strong className="text-gray-900">High throughput:</strong> 16.5 MB/s peak processing speed with parallel document handling</p>
                                            </div>
                                            <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                                                    <i className="fas fa-shield-alt text-white text-xs"></i>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed"><strong className="text-gray-900">Fault-tolerant parsing:</strong> Automatic recovery from mid-document failures with comprehensive error handling</p>
                                            </div>
                                            <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                                                    <i className="fas fa-check-circle text-white text-xs"></i>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed"><strong className="text-gray-900">Data quality validation:</strong> Built-in validation ensuring financial data accuracy and completeness</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {['Python', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Apache Airflow', 'Redis'].map((tech, index) => (
                                            <m.span
                                                key={tech}
                                                className="px-4 py-2 bg-gradient-to-r from-[#005A9C]/10 to-[#00BFA5]/10 hover:from-[#005A9C]/20 hover:to-[#00BFA5]/20 text-[#005A9C] rounded-full text-sm font-semibold border border-[#005A9C]/20 hover:border-[#00BFA5]/40 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                            >
                                                {tech}
                                            </m.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column - Key Features */}
                                <div className="md:col-span-1">
                                    <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 border-2 border-white/60 shadow-xl group-hover:shadow-2xl group-hover:border-[#00BFA5]/30 transition-all duration-500 overflow-hidden">
                                        {/* Subtle gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/5 via-transparent to-[#00BFA5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative z-10">
                                            <div className="w-20 h-20 bg-gradient-to-br from-[#42A5F5] via-[#2196F3] to-[#1976D2] rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-[#42A5F5]/30">
                                                <i className="fas fa-file-invoice-dollar text-3xl text-white"></i>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center group-hover:bg-gradient-to-r group-hover:from-[#42A5F5] group-hover:to-[#2196F3] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                                                Key Features
                                            </h3>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                                                        <i className="fas fa-check text-white text-xs"></i>
                                                    </div>
                                                    <span className="text-sm text-gray-700 leading-relaxed font-medium">Python, PostgreSQL, 3 parsing engines</span>
                                                </div>
                                                <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                                                        <i className="fas fa-check text-white text-xs"></i>
                                                    </div>
                                                    <span className="text-sm text-gray-700 leading-relaxed font-medium">Fault-tolerant parsing with auto-recovery</span>
                                                </div>
                                                <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                                                        <i className="fas fa-check text-white text-xs"></i>
                                                    </div>
                                                    <span className="text-sm text-gray-700 leading-relaxed font-medium">Data quality validation & monitoring</span>
                                                </div>
                                            </div>

                                            {/* Metrics */}
                                            <div className="mt-8 pt-6 border-t-2 border-gray-200/50">
                                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-[#005A9C]/10 to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300">
                                                        <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#005A9C] to-[#0077CC] bg-clip-text text-transparent mb-2">16.5</div>
                                                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">MB/s Speed</div>
                                                    </div>
                                                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-[#00BFA5]/10 to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300">
                                                        <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#00BFA5] to-[#26C6DA] bg-clip-text text-transparent mb-2">Prod</div>
                                                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Grade</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow indicator with glow effect */}
                            <div className="absolute bottom-8 right-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#005A9C] to-[#00BFA5] rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-[#005A9C] to-[#00BFA5] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-lg">
                                        <i className="fas fa-arrow-right text-white text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </m.div>

                {/* Two Medium Cards Side by Side */}
                <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 mb-12 sm:mb-16">
                    {/* Card 1 - Data Architecture Principles */}
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                    >
                        <Link href="/services">
                            <div className="group relative bg-white/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(0,90,156,0.3)] transition-all duration-500 border-2 border-white/60 hover:border-[#005A9C]/30 overflow-hidden cursor-pointer h-full">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/10 via-transparent to-[#0066CC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Floating Orb */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#005A9C]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Icon */}
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#005A9C] via-[#0066CC] to-[#1976D2] rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-[#005A9C]/40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                                        <i className="fas fa-drafting-compass text-3xl text-white"></i>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#005A9C]/15 to-[#0066CC]/10 rounded-full border border-[#005A9C]/30 mb-4 group-hover:border-[#005A9C]/50 transition-all duration-300">
                                        <div className="w-2 h-2 bg-[#005A9C] rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold bg-gradient-to-r from-[#005A9C] to-[#0066CC] bg-clip-text text-transparent tracking-wide uppercase">From Construction to Cloud</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-[#005A9C] group-hover:to-[#0066CC] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                                        Data Architecture Principles
                                    </h3>

                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        Four years managing construction projects taught me: bad architecture is expensive to fix later. I design data systems the same way—thinking about failure modes, maintenance costs, and what happens at 3x scale.
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#005A9C] to-[#0066CC] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">Modern stack (dbt, Snowflake)</span>
                                        </div>
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#005A9C] to-[#0066CC] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">Cost-optimization strategies</span>
                                        </div>
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#005A9C] to-[#0066CC] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">Reliability by design</span>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex items-center justify-end pt-4 border-t-2 border-gray-100">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#005A9C] to-[#0066CC] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                            <div className="relative w-12 h-12 bg-gradient-to-br from-[#005A9C] to-[#0066CC] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-md">
                                                <i className="fas fa-arrow-right text-white group-hover:translate-x-1 transition-transform duration-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </m.div>

                    {/* Card 2 - Trading Data Infrastructure */}
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                    >
                        <Link href="/portfolio/mean-reversion-ou">
                            <div className="group relative bg-white/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(0,191,165,0.3)] transition-all duration-500 border-2 border-white/60 hover:border-[#00BFA5]/30 overflow-hidden cursor-pointer h-full">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5]/10 via-transparent to-[#26C6DA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Floating Orb */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#00BFA5]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Icon */}
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#00BFA5] via-[#26C6DA] to-[#00ACC1] rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-[#00BFA5]/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <i className="fas fa-chart-line text-3xl text-white"></i>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00BFA5]/15 to-[#26C6DA]/10 rounded-full border border-[#00BFA5]/30 mb-4 group-hover:border-[#00BFA5]/50 transition-all duration-300">
                                        <div className="w-2 h-2 bg-[#00BFA5] rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold bg-gradient-to-r from-[#00BFA5] to-[#26C6DA] bg-clip-text text-transparent tracking-wide uppercase">Real-Money Trading Systems</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-[#00BFA5] group-hover:to-[#26C6DA] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                                        Trading Data Infrastructure
                                    </h3>

                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        Built end-to-end data platform powering algorithmic trading with real capital. When your pipeline fails at market open, you lose money every second—taught me to build systems that stay up.
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">WebSocket, Kafka, TimeScaleDB</span>
                                        </div>
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">Low-latency data ingestion</span>
                                        </div>
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">Production-tested with real capital</span>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex items-center justify-end pt-4 border-t-2 border-gray-100">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA5] to-[#26C6DA] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                            <div className="relative w-12 h-12 bg-gradient-to-br from-[#00BFA5] to-[#26C6DA] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-md">
                                                <i className="fas fa-arrow-right text-white group-hover:translate-x-1 transition-transform duration-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </m.div>
                </div>

                {/* Value Proposition */}
                <m.div
                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-[#0097A7] mb-6 text-center">Why Work With Me?</h3>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center font-semibold">
                            I build data systems where failure has consequences:
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-[#42A5F5] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <i className="fas fa-shield-alt text-white"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Reliability First</h4>
                                    <p className="text-gray-600 font-medium">Systems that recover automatically, not manually</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-[#00BFA5] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <i className="fas fa-bullseye text-white"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Business-Aligned</h4>
                                    <p className="text-gray-600 font-medium">Data quality tied to actual business impact</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-[#005A9C] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <i className="fas fa-dollar-sign text-white"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2 text-lg">Cost-Conscious</h4>
                                    <p className="text-gray-600 font-medium">Right-sizing and optimization from day one</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-l-4 border-[#00BFA5]">
                            <p className="text-gray-800 font-semibold text-lg italic">
                                The difference: I've lost real money to bad pipelines. Now I build so you don't have to.
                            </p>
                        </div>
                    </div>
                </m.div>
                <m.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/services"
                            className="group bg-gradient-to-r from-[#005A9C] to-[#00BFA5] hover:from-[#0066CC] hover:to-[#00D4B4] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
                        >
                            <i className="fas fa-database mr-2"></i>
                            Explore Data Solutions
                            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                        </Link>
                        <a
                            href="mailto:datawithjose@outlook.com?subject=Introduction Call&body=Hi Jose, I'd like to schedule an introduction call..."
                            className="group border-2 border-[#005A9C] text-[#005A9C] hover:bg-[#005A9C] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center"
                        >
                            <i className="fas fa-calendar mr-2"></i>
                            Schedule Introduction Call
                        </a>
                    </div>
                    <p className="text-gray-600 mt-4 text-sm">
                        Ready to build data systems that work when business decisions depend on them?
                    </p>
                </m.div>
            </div>
        </section>
    );
}
