'use client';

import { m } from 'framer-motion';
import Link from 'next/link';

export default function AboutSection() {
    return (
        <section className="about py-12 sm:py-16 md:py-20 lg:py-24 bg-[#050B14]">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <m.div
                        initial={{ x: -50 }}
                        whileInView={{ x: 0 }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#00E5A0]">About Me</h2>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-300">
                            Quantitative Developer with 8 years of active market experience — focused on turning trading logic into systematic, validated, and executable systems, from research to live execution.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-300">
                            I spent four years in construction project management learning how systems fail under pressure. Then came the markets: from building a fintech group's trading data infrastructure from the ground up, to productizing my own algorithms and automating client strategies across futures, FX, crypto, and equities.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-300">
                            The pattern is clear: I've always worked where reliability isn't optional and every decision is backed by data. Construction taught me to design for failure modes. Trading taught me that validation is non-negotiable — a strategy is not robust simply because it produces an attractive backtest.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-300">
                            I specialize in quantitative research, backtesting workflows, and automated execution — testing strategies out-of-sample, with walk-forward validation, sensitivity analysis, realistic costs, and risk controls built in.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8 font-semibold text-[#00E5A0]">
                            Open to full-time Quantitative Developer roles and select consulting engagements — with prop firms, systematic trading teams, and trading technology companies.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="group bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#2196F3] text-[#050B14] px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                            >
                                <i className="fas fa-briefcase mr-2"></i>
                                Let's Work Together
                                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                            </Link>
                            <Link
                                href="/portfolio"
                                className="group border-2 border-[#00E5A0] text-[#00E5A0] hover:bg-[#00E5A0] hover:text-[#050B14] px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                            >
                                <i className="fas fa-chart-line mr-2"></i>
                                View Trading Systems
                            </Link>
                        </div>
                    </m.div>
                    <m.div
                        initial={{ x: 50 }}
                        whileInView={{ x: 0 }}
                    >
                        <div className="relative rounded-lg overflow-hidden border-4 border-[#00E5A0] shadow-2xl hover:shadow-[#00E5A0]/20 transition-all duration-300 hover:border-[#42A5F5]">
                            <img
                                src="/images/profile-jose.png"
                                alt="Jose Acosta - Quantitative Developer"
                                width={400}
                                height={400}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle overlay gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/40 to-transparent pointer-events-none"></div>
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
