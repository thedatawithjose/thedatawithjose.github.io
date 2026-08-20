'use client';

import { m } from 'framer-motion';
import Link from 'next/link';

export default function ServicesSection() {
    return (
        <section className="services py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A1526] to-[#050B14]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <m.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#00E5A0] leading-tight py-2">
                        What I Build
                    </h2>
                    <p className="text-lg md:text-xl font-semibold text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Robust algorithmic trading systems — engineered from research to execution. Not just strategies: the full infrastructure that takes an idea from hypothesis to live trading with real capital.
                    </p>
                </m.div>

                {/* Hero Project Card - Mean Reversion OU Trading System */}
                <m.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -8 }}
                >
                    <Link href="/portfolio/mean-reversion-ou">
                        <div className="group relative bg-gradient-to-br from-[#0D1B30] via-[#0A1526] to-[#071020] backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,229,160,0.3)] transition-all duration-500 border-2 border-[#1E2D45] hover:border-[#00E5A0]/40 overflow-hidden cursor-pointer">
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/10 via-[#00E5A0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Floating Orbs Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00E5A0]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#42A5F5]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>

                            {/* Content Grid */}
                            <div className="relative z-10 grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
                                {/* Left Column - Main Info */}
                                <div className="md:col-span-2">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00E5A0]/15 via-[#00C98C]/10 to-[#42A5F5]/15 rounded-full border border-[#00E5A0]/30 mb-5 group-hover:border-[#00E5A0]/50 transition-all duration-300 shadow-sm">
                                                <div className="w-2 h-2 bg-[#00E5A0] rounded-full animate-pulse"></div>
                                                <span className="text-xs font-bold bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] bg-clip-text text-transparent tracking-wide uppercase terminal-badge">Live-Tested | Walk-Forward Validated | Risk-Controlled</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-[#00E5A0] group-hover:to-[#42A5F5] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                                                Mean Reversion OU Trading System
                                            </h3>
                                            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl">
                                                Ornstein-Uhlenbeck mean reversion strategy with ML-driven parameter optimization — taken from research to live trading with real capital. In trading, a strategy is only as good as the system executing it.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Architecture & Impact */}
                                    <div className="mb-8">
                                        <h4 className="text-xl md:text-2xl font-bold text-white mb-5 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-[#00E5A0] to-[#42A5F5] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <i className="fas fa-project-diagram text-[#050B14] text-sm"></i>
                                            </div>
                                            Research → Backtest → Execution
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#00C98C] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                                                    <i className="fas fa-flask text-[#050B14] text-xs"></i>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed"><strong className="text-white">Research pipeline:</strong> Regime classification + OU parameter estimation on validated market data</p>
                                            </div>
                                            <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#00C98C] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                                                    <i className="fas fa-rocket text-[#050B14] text-xs"></i>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed"><strong className="text-white">Backtesting:</strong> Overfit-resistant validation with realistic execution modeling</p>
                                            </div>
                                            <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#00C98C] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                                                    <i className="fas fa-shield-alt text-[#050B14] text-xs"></i>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed"><strong className="text-white">Execution & risk:</strong> Automated trading with position sizing, stop-loss management, and drawdown controls</p>
                                            </div>
                                            <div className="flex items-start group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#00C98C] rounded-lg flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300">
                                                    <i className="fas fa-chart-line text-[#050B14] text-xs"></i>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed"><strong className="text-white">Monitoring:</strong> Performance analytics and risk dashboards watching every position in production</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {['Python', 'NumPy', 'pandas', 'SciPy', 'TimescaleDB', 'Redis', 'Docker'].map((tech, index) => (
                                            <m.span
                                                key={tech}
                                                className="px-4 py-2 bg-gradient-to-r from-[#00E5A0]/10 to-[#42A5F5]/10 hover:from-[#00E5A0]/20 hover:to-[#42A5F5]/20 text-[#00E5A0] rounded-full text-sm font-semibold border border-[#00E5A0]/20 hover:border-[#00E5A0]/40 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default"
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
                                    <div className="relative bg-[#0A1526]/70 backdrop-blur-md rounded-3xl p-8 border-2 border-[#1E2D45]/60 shadow-xl group-hover:shadow-2xl group-hover:border-[#00E5A0]/40 transition-all duration-500 overflow-hidden">
                                        {/* Subtle gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/5 via-transparent to-[#00E5A0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative z-10">
                                            <div className="w-20 h-20 bg-gradient-to-br from-[#00E5A0] via-[#00C98C] to-[#42A5F5] rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-[#00E5A0]/30">
                                                <i className="fas fa-chart-line text-3xl text-[#050B14]"></i>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center group-hover:bg-gradient-to-r group-hover:from-[#00E5A0] group-hover:to-[#42A5F5] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                                                Key Features
                                            </h3>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                                                        <i className="fas fa-check text-[#050B14] text-xs"></i>
                                                    </div>
                                                    <span className="text-sm text-gray-300 leading-relaxed font-medium">Mean reversion on OU process</span>
                                                </div>
                                                <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                                                        <i className="fas fa-check text-[#050B14] text-xs"></i>
                                                    </div>
                                                    <span className="text-sm text-gray-300 leading-relaxed font-medium">ML parameter optimization</span>
                                                </div>
                                                <div className="flex items-start group/feature hover:translate-x-1 transition-transform duration-300">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                                                        <i className="fas fa-check text-[#050B14] text-xs"></i>
                                                    </div>
                                                    <span className="text-sm text-gray-300 leading-relaxed font-medium">Real-time execution & risk management</span>
                                                </div>
                                            </div>

                                            {/* Metrics */}
                                            <div className="mt-8 pt-6 border-t-2 border-[#1E2D45]/50">
                                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-[#00E5A0]/10 to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300">
                                                        <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#00E5A0] to-[#00C98C] bg-clip-text text-transparent mb-2 font-mono">Walk-Forward</div>
                                                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Validation</div>
                                                    </div>
                                                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-[#42A5F5]/10 to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300">
                                                        <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#42A5F5] to-[#2196F3] bg-clip-text text-transparent mb-2 font-mono">Out-of-Sample</div>
                                                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tested</div>
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
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-[#00E5A0] to-[#42A5F5] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-lg">
                                        <i className="fas fa-arrow-right text-[#050B14] text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </m.div>

                {/* Two Medium Cards Side by Side */}
                <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 mb-12 sm:mb-16">
                    {/* Card 1 - Research & Backtesting Infrastructure */}
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                    >
                        <Link href="/portfolio/financial-data-pipeline">
                            <div className="group relative bg-[#0D1B30]/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(66,165,245,0.3)] transition-all duration-500 border-2 border-[#1E2D45] hover:border-[#42A5F5]/40 overflow-hidden cursor-pointer h-full">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/10 via-transparent to-[#00E5A0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Floating Orb */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#42A5F5]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Icon */}
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#42A5F5] via-[#2196F3] to-[#1976D2] rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-[#42A5F5]/40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                                        <i className="fas fa-flask text-3xl text-white"></i>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#42A5F5]/15 to-[#2196F3]/10 rounded-full border border-[#42A5F5]/30 mb-4 group-hover:border-[#42A5F5]/50 transition-all duration-300">
                                        <div className="w-2 h-2 bg-[#42A5F5] rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold bg-gradient-to-r from-[#42A5F5] to-[#2196F3] bg-clip-text text-transparent tracking-wide uppercase terminal-badge">Clean Data → Valid Backtests</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-[#42A5F5] group-hover:to-[#2196F3] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                                        Research & Backtesting Infrastructure
                                    </h3>

                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        Backtests are only as good as the data behind them. I build market data pipelines and validation frameworks that make research trustworthy — and fast enough to iterate on ideas daily.
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-300 font-medium">Python, PostgreSQL, Airflow</span>
                                        </div>
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-300 font-medium">Reproducible research workflows</span>
                                        </div>
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-white text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-300 font-medium">Data quality gates & validation</span>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex items-center justify-end pt-4 border-t-2 border-[#1E2D45]/60">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#42A5F5] to-[#2196F3] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                            <div className="relative w-12 h-12 bg-gradient-to-br from-[#42A5F5] to-[#2196F3] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-md">
                                                <i className="fas fa-arrow-right text-white group-hover:translate-x-1 transition-transform duration-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </m.div>

                    {/* Card 2 - Live Execution & Risk Systems */}
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                    >
                        <Link href="/portfolio/moving-average-bot">
                            <div className="group relative bg-[#0D1B30]/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(0,229,160,0.3)] transition-all duration-500 border-2 border-[#1E2D45] hover:border-[#00E5A0]/40 overflow-hidden cursor-pointer h-full">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5A0]/10 via-transparent to-[#26C6DA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Floating Orb */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#00E5A0]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Icon */}
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#00E5A0] via-[#26C6DA] to-[#00ACC1] rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-[#00E5A0]/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <i className="fas fa-bolt text-3xl text-[#050B14]"></i>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00E5A0]/15 to-[#26C6DA]/10 rounded-full border border-[#00E5A0]/30 mb-4 group-hover:border-[#00E5A0]/50 transition-all duration-300">
                                        <div className="w-2 h-2 bg-[#00E5A0] rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold bg-gradient-to-r from-[#00E5A0] to-[#26C6DA] bg-clip-text text-transparent tracking-wide uppercase terminal-badge">Real-Money Trading Systems</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-[#00E5A0] group-hover:to-[#26C6DA] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight">
                                        Live Execution & Risk Systems
                                    </h3>

                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        Built end-to-end systems powering algorithmic trading with real capital. When your pipeline fails at market open, you lose money every second — that taught me to build systems that stay up.
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-[#050B14] text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-300 font-medium">WebSockets, Kafka, TimescaleDB</span>
                                        </div>
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-[#050B14] text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-300 font-medium">Low-latency market data ingestion</span>
                                        </div>
                                        <div className="flex items-start group/item hover:translate-x-1 transition-transform duration-300">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-lg flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm group-hover/item:shadow-md group-hover/item:scale-110 transition-all duration-300">
                                                <i className="fas fa-check text-[#050B14] text-xs"></i>
                                            </div>
                                            <span className="text-sm text-gray-300 font-medium">Production-tested with real capital</span>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex items-center justify-end pt-4 border-t-2 border-[#1E2D45]/60">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5A0] to-[#26C6DA] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                            <div className="relative w-12 h-12 bg-gradient-to-br from-[#00E5A0] to-[#26C6DA] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-md">
                                                <i className="fas fa-arrow-right text-[#050B14] group-hover:translate-x-1 transition-transform duration-300"></i>
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
                    className="bg-[#0A1526] rounded-2xl p-8 shadow-lg border border-[#1E2D45]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-[#00E5A0] mb-6 text-center">Why Work With Me?</h3>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed text-center font-semibold">
                            I build trading systems where failure has real consequences:
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-[#00E5A0] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <i className="fas fa-shield-alt text-[#050B14]"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2 text-lg">Robustness First</h4>
                                    <p className="text-gray-400 font-medium">Systems designed to survive the market — with failover, quality gates, and monitoring from day one</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-[#42A5F5] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <i className="fas fa-bullseye text-white"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2 text-lg">Research-to-Execution Focus</h4>
                                    <p className="text-gray-400 font-medium">Ideas validated rigorously before a single dollar is at risk — then executed with discipline</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-[#F5B544] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                    <i className="fas fa-dollar-sign text-[#050B14]"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2 text-lg">Validation-First Perspective</h4>
                                    <p className="text-gray-400 font-medium">8 years of active market experience — walk-forward, out-of-sample, and sensitivity testing before anything goes live</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-6 bg-gradient-to-r from-[#00E5A0]/10 to-[#42A5F5]/10 rounded-xl border-l-4 border-[#00E5A0]">
                            <p className="text-gray-200 font-semibold text-lg italic">
                                The difference: an attractive backtest is cheap. I build systems that stay honest when assumptions change — and survive live markets.
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
                            href="/portfolio"
                            className="group bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#5AB3F5] text-[#050B14] px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center"
                        >
                            <i className="fas fa-code mr-2"></i>
                            Explore Trading Systems
                            <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                        </Link>
                        <a
                            href="mailto:datawithjose@outlook.com?subject=Introduction Call&body=Hi Jose, I'd like to schedule an introduction call..."
                            className="group border-2 border-[#00E5A0] text-[#00E5A0] hover:bg-[#00E5A0] hover:text-[#050B14] px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center"
                        >
                            <i className="fas fa-calendar mr-2"></i>
                            Schedule Introduction Call
                        </a>
                    </div>
                    <p className="text-gray-400 mt-4 text-sm">
                        Ready to build trading systems that work when real money is on the line?
                    </p>
                </m.div>
            </div>
        </section>
    );
}
