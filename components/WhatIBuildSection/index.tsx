'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import SectionHeader from './SectionHeader';
import HeroProjectCard from './HeroProjectCard';
import SupportingProjectCard from './SupportingProjectCard';
import { heroProject, supportingProjects } from '../../lib/data/projects';

export default function WhatIBuildSection() {
  return (
    <section
      className="services py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50"
      data-section="what-i-build"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-16">
          {/* Hero Project Card */}
          <HeroProjectCard {...heroProject} />

          {/* Supporting Project Cards */}
          {supportingProjects.map((project, index) => (
            <SupportingProjectCard
              key={project.id}
              {...project}
              index={index}
            />
          ))}
        </div>

        {/* Value Proposition */}
        <m.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose My Data Engineering?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                <strong>12+ years of professional experience across high-stakes environments:</strong> Four years managing construction projects taught me to plan for failure modes and deliver under constraints. Four years as quantitative trader taught me that data quality isn't optional—it's survival. Now, three years as Data Engineer, I build infrastructure combining both disciplines—engineered for reliability, tested under pressure.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#42A5F5] mb-1">High-Availability</div>
                  <div className="text-sm text-gray-600">Fault-Tolerant Systems</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#00BFA5] mb-1">Production-Scale</div>
                  <div className="text-sm text-gray-600">Data Processing</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#42A5F5] rounded-full flex items-center justify-center mr-4 mt-1">
                  <i className="fas fa-shield-alt text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Reliability First</h4>
                  <p className="text-gray-600 text-sm">Systems designed for failure, instrumented for monitoring</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#00BFA5] rounded-full flex items-center justify-center mr-4 mt-1">
                  <i className="fas fa-bullseye text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Business-Aligned</h4>
                  <p className="text-gray-600 text-sm">Pipelines aligned to decisions & KPIs, not just storage</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#005A9C] rounded-full flex items-center justify-center mr-4 mt-1">
                  <i className="fas fa-dollar-sign text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Cost-Conscious</h4>
                  <p className="text-gray-600 text-sm">Right-sizing and optimization built into every solution</p>
                </div>
              </div>
            </div>
          </div>
        </m.div>

        {/* CTA Section */}
        <m.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/services"
              className="group bg-gradient-to-r from-[#005A9C] to-[#00BFA5] hover:from-[#0066CC] hover:to-[#00D4B4] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
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
