'use client';

import { m } from 'framer-motion';
import Link from 'next/link';

export default function AboutSection() {
    return (
        <section className="about py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <m.div
                        initial={{ x: -50 }}
                        whileInView={{ x: 0 }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#0097A7]">About Me</h2>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8">
                            Data Engineer with a non-traditional path that makes me better at the job.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8">
                            I spent four years in construction project management learning how systems fail under pressure. Four years as a quantitative trader where bad data meant real money lost. Now three years building production data infrastructure where those lessons matter every day.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8">
                            The pattern is clear: I've always worked where reliability isn't optional and data drives decisions. Construction taught me to design for failure modes. Trading taught me that data quality is non-negotiable. Data engineering is where both disciplines converge.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8">
                            I specialize in high-availability systems, real-time pipelines, and cost-conscious architecture—because I've seen what happens when any of those fail.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8 font-semibold text-[#005A9C]">
                            Currently seeking full-time Data Engineering roles where complex data challenges need someone who thinks like an engineer, plans like a project manager, and measures impact like a trader.
                        </p>
                        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-600">
                            I also take on select consulting engagements helping startups build data foundations that won't collapse at scale.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="group bg-gradient-to-r from-[#42A5F5] to-[#005A9C] hover:from-[#2196F3] hover:to-[#0066CC] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                            >
                                <i className="fas fa-briefcase mr-2"></i>
                                Available for Full-Time
                                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                            </Link>
                            <Link
                                href="/services"
                                className="group border-2 border-[#42A5F5] text-[#42A5F5] hover:bg-[#42A5F5] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                            >
                                <i className="fas fa-handshake mr-2"></i>
                                Consulting Services
                            </Link>
                        </div>
                    </m.div>
                    <m.div
                        initial={{ x: 50 }}
                        whileInView={{ x: 0 }}
                    >
                        <div className="relative rounded-lg overflow-hidden border-4 border-[#005A9C] shadow-2xl hover:shadow-[#00BFA5]/20 transition-all duration-300 hover:border-[#42A5F5]">
                            <img
                                src="/images/profile-jose.png"
                                alt="Data Engineer Profile"
                                width={400}
                                height={400}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle overlay gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/10 to-transparent pointer-events-none"></div>
                        </div>
                    </m.div>
                </div>
            </div>
        </section>
    );
}
