'use client';

import { m } from 'framer-motion';
import { SupportingProjectCardProps } from './types';
import { supportingCardHover, supportingEntranceVariants } from './animations';

interface Props extends SupportingProjectCardProps {
  index: number;
}

export default function SupportingProjectCard(props: Props) {
  const { title, subtitle, badge, icon, gradient, primaryMetric, description, features, index } = props;

  const getBadgeColor = (color: string) => {
    const colors = {
      blue: 'bg-[#005A9C]/10 border-[#005A9C]/20 text-[#005A9C]',
      teal: 'bg-[#00BFA5]/10 border-[#00BFA5]/20 text-[#00BFA5]',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <m.div
      className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden cursor-pointer min-h-[500px]"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
      variants={supportingEntranceVariants(index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={supportingCardHover}
      data-testid={`supporting-card-${index}`}
      role="article"
      tabIndex={0}
      aria-label={`${title} - Supporting project`}
    >
      {/* Gradient Background Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${gradient.from}0D, transparent, ${gradient.to}0D)`
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="flex items-start justify-between">
            <div className="relative">
              {/* Icon Container */}
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 -rotate-3 group-hover:-rotate-6"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`
                }}
              >
                <i className={`fas ${icon} text-2xl text-white`}></i>
              </div>
              {/* Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-400 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Badge */}
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getBadgeColor(badge.color)}`}>
                <span className="text-xs font-bold tracking-wide">{badge.text}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h3 
            className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300"
            style={{
              color: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundImage = `linear-gradient(to right, ${gradient.from}, ${gradient.to})`;
              e.currentTarget.style.backgroundClip = 'text';
              e.currentTarget.style.webkitBackgroundClip = 'text';
              e.currentTarget.style.webkitTextFillColor = 'transparent';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundImage = 'none';
              e.currentTarget.style.webkitTextFillColor = 'inherit';
            }}
          >
            {title}
          </h3>
          <p 
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: gradient.from }}
          >
            {subtitle}
          </p>
        </div>

        {/* Primary Metric (if provided) */}
        {primaryMetric && (
          <div className="mb-6">
            <div 
              className="text-3xl font-bold mb-1"
              style={{ color: gradient.from }}
            >
              {primaryMetric.value}
            </div>
            <div className="text-sm text-gray-500">{primaryMetric.label}</div>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed text-base">
          {description}
        </p>

        {/* Features List */}
        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: `${gradient.from}1A` }}
              >
                <i className="fas fa-check text-xs" style={{ color: gradient.from }}></i>
              </div>
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Enhanced Footer */}
        <div className="flex items-center justify-end pt-6 mt-6 border-t border-gray-100">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300"
            style={{ backgroundColor: `${gradient.from}0D` }}
          >
            <i 
              className="fas fa-arrow-right group-hover:translate-x-1 transition-all duration-300"
              style={{ color: gradient.from }}
            ></i>
          </div>
        </div>
      </div>
    </m.div>
  );
}
