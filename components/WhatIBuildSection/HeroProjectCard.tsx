'use client';

import { m } from 'framer-motion';
import { HeroProjectCardProps } from './types';
import { heroCardHover, heroEntranceVariants, gradientOverlayVariants } from './animations';

export default function HeroProjectCard(props: HeroProjectCardProps) {
  const { title, subtitle, badge, icon, gradient, description, architecture, techStack, features } = props;

  const getBadgeColor = (color: string) => {
    const colors = {
      blue: 'bg-[#42A5F5]/10 border-[#42A5F5]/20 text-[#42A5F5]',
      teal: 'bg-[#00BFA5]/10 border-[#00BFA5]/20 text-[#00BFA5]',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <m.div
      className="group relative bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden cursor-pointer col-span-1 lg:col-span-2 min-h-[400px] md:min-h-[500px]"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
      variants={heroEntranceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={heroCardHover}
      data-testid="hero-project-card"
      role="article"
      tabIndex={0}
      aria-label={`${title} - Hero project showcasing data engineering infrastructure`}
    >
      {/* Gradient Background Effect */}
      <m.div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${gradient.from}0D, transparent, ${gradient.to}0D)`
        }}
        variants={gradientOverlayVariants}
        initial="initial"
        whileHover="hover"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative">
            {/* Icon Container with 3D effect */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 rotate-2 group-hover:rotate-3"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`
              }}
            >
              <i className={`fas ${icon} text-xl text-white`}></i>
            </div>
            {/* Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Badge */}
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getBadgeColor(badge.color)}`}>
              <span className="text-xs font-bold tracking-wide">{badge.text}</span>
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-[#005A9C] group-hover:to-[#00BFA5] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
          >
            {title}
          </h3>
          <p
            className="text-xs font-semibold tracking-wide uppercase"
            style={{ color: gradient.from }}
          >
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
          {description}
        </p>

        {/* Architecture Section */}
        <div className="mb-6">
          <h4 className="text-base font-bold text-gray-800 mb-3">Architecture & Impact:</h4>
          <ul className="space-y-2">
            {architecture.map((item, index) => (
              <li key={index} className="flex items-start text-gray-700 text-sm">
                <span className="text-[#00BFA5] mr-2 mt-0.5">▸</span>
                <div>
                  <span className="font-semibold">{item.component}:</span>{' '}
                  <span className="text-gray-600">{item.details}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-[#005A9C]/10 hover:to-[#00BFA5]/10 text-gray-700 hover:text-gray-900 rounded-lg text-xs font-medium transition-all duration-300 border border-gray-200 hover:border-[#005A9C]/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-xs md:text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center mr-2"
                style={{ backgroundColor: `${gradient.from}1A` }}
              >
                <i className="fas fa-check text-[10px]" style={{ color: gradient.from }}></i>
              </div>
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
}
