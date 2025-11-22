'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PrimaryButton, GhostButton } from './SimpleEnhancedButton';

interface ProgressiveHeroProps {
  slides: Array<{
    title: string;
    subtitle: string;
    mobileSubtitle?: string;
    tagline?: string;
    techStack?: string;
    gradient: string;
    cta: string;
    secondaryCta?: string;
    details?: {
      description: string;
      features: string[];
      metrics: Array<{
        value: string;
        label: string;
      }>;
    };
  }>;
  currentIndex: number;
  onSlideChange: (index: number) => void;
}

export default function ProgressiveHero({ slides, currentIndex, onSlideChange }: ProgressiveHeroProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const currentSlide = slides[currentIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const detailsVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20
    }
  };

  return (
    <m.div
      className="text-center relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: 0.2,
        delayChildren: 0.1
      }}
    >
      {/* Main Content */}
      <m.h1
        className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight"
        variants={itemVariants}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <m.span
          key={currentIndex}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="inline-block text-[#7FFFD4] drop-shadow-lg"
        >
          {currentSlide.title}
        </m.span>
      </m.h1>

      <m.div
        key={`subtitle-${currentIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <div className="text-sm md:text-lg lg:text-xl leading-relaxed text-gray-100 drop-shadow-md">
          {/* Use mobile subtitle on small screens, regular subtitle on larger screens */}
          <div className="block md:hidden">
            {(currentSlide.mobileSubtitle || currentSlide.subtitle).split('.').map((sentence, index) => {
              if (sentence.trim() === '') return null;

              // Check if sentence contains metrics (numbers with symbols)
              const hasMetrics = /\d+%|\d+ms|\d+TB|\d+GB/.test(sentence);

              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`${index === 0 ? 'mb-2' : 'mt-1'} ${hasMetrics ? 'font-semibold' : ''}`}
                >
                  {hasMetrics ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 inline-block">
                      <span className="text-green-300 font-bold text-sm">
                        {sentence.trim().split(' ').map((word, wordIndex) => {
                          if (/\d+%|\d+ms|\d+TB|\d+GB|<\d+ms/.test(word)) {
                            return (
                              <span key={wordIndex} className="text-green-400 font-bold mx-1">
                                {word}
                              </span>
                            );
                          }
                          return <span key={wordIndex} className="mx-1">{word}</span>;
                        })}
                      </span>
                    </div>
                  ) : (
                    <span className="block text-sm">
                      {sentence.trim().split(' ').map((word, wordIndex) => {
                        // Highlight key terms
                        if (['ex-Quant', 'Trader', 'high-availability', 'reliability', 'real-time', 'infrastructure'].includes(word.replace(/[,.:]/g, ''))) {
                          return (
                            <span key={wordIndex} className="text-white font-semibold mx-1">
                              {word}
                            </span>
                          );
                        }
                        return <span key={wordIndex} className="mx-1">{word}</span>;
                      })}
                      {index < (currentSlide.mobileSubtitle || currentSlide.subtitle).split('.').length - 2 && '.'}
                    </span>
                  )}
                </m.div>
              );
            })}
          </div>
          <div className="hidden md:block">
            {/* Parse and format the subtitle with better typography */}
            {currentSlide.subtitle.split('.').map((sentence, index) => {
              if (sentence.trim() === '') return null;

              // Check if sentence contains metrics (numbers with symbols)
              const hasMetrics = /\d+%|\d+ms|\d+TB|\d+GB/.test(sentence);

              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`${index === 0 ? 'mb-3' : 'mt-2'} ${hasMetrics ? 'font-semibold' : ''}`}
                >
                  {hasMetrics ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 inline-block">
                      <span className="text-green-300 font-bold">
                        {sentence.trim().split(' ').map((word, wordIndex) => {
                          if (/\d+%|\d+ms|\d+TB|\d+GB|<\d+ms/.test(word)) {
                            return (
                              <span key={wordIndex} className="text-green-400 font-bold text-lg mx-1">
                                {word}
                              </span>
                            );
                          }
                          return <span key={wordIndex} className="mx-1">{word}</span>;
                        })}
                      </span>
                    </div>
                  ) : (
                    <span className="block">
                      {sentence.trim().split(' ').map((word, wordIndex) => {
                        // Highlight key terms
                        if (['ex-Quant', 'Trader', 'high-availability', 'reliability', 'real-time', 'infrastructure'].includes(word.replace(/[,.:]/g, ''))) {
                          return (
                            <span key={wordIndex} className="text-white font-semibold mx-1">
                              {word}
                            </span>
                          );
                        }
                        return <span key={wordIndex} className="mx-1">{word}</span>;
                      })}
                      {index < currentSlide.subtitle.split('.').length - 2 && '.'}
                    </span>
                  )}
                </m.div>
              );
            })}
          </div>
        </div>
      </m.div>

      {/* Enhanced Action Buttons */}
      <m.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        variants={itemVariants}
      >
        {/* Primary CTA - More prominent */}
        <m.a
          href="/contact"
          className="group relative px-6 sm:px-8 py-4 min-h-[48px] bg-gradient-to-r from-[#00BFA5] via-[#42A5F5] to-[#005A9C] text-white font-bold text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-[#00BFA5]/25 transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D4B4] via-[#2196F3] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

          <span className="relative z-10 flex items-center">
            <i className="fas fa-comments mr-3 text-xl"></i>
            {currentSlide.cta}
            <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
          </span>
        </m.a>

        {/* Secondary CTA - Enhanced */}
        <m.a
          href="/portfolio"
          className="group px-4 sm:px-6 py-3 min-h-[48px] border-2 border-white/40 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-semibold text-base sm:text-lg rounded-xl transition-all duration-300 hover:border-white/60"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center">
            <i className="fas fa-briefcase mr-2"></i>
            View Portfolio
            <i className="fas fa-external-link-alt ml-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity"></i>
          </span>
        </m.a>
      </m.div>

      {/* Progressive Disclosure Details */}
      <AnimatePresence>
        {showDetails && currentSlide.details && (
          <m.div
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="max-w-4xl mx-auto overflow-hidden"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              {/* Description */}
              <m.p
                className="text-gray-200 text-lg mb-6 leading-relaxed"
                variants={itemVariants}
              >
                {currentSlide.details.description}
              </m.p>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {currentSlide.details.features.map((feature, index) => (
                  <m.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{feature}</span>
                      <m.i
                        className="fas fa-plus text-green-400"
                        animate={{ rotate: expandedFeature === index ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    <AnimatePresence>
                      {expandedFeature === index && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 pt-3 border-t border-white/10"
                        >
                          <p className="text-gray-300 text-sm">
                            Detailed information about {feature.toLowerCase()} and how it benefits your business operations.
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                ))}
              </div>

              {/* Metrics */}
              {currentSlide.details.metrics && (
                <m.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  variants={itemVariants}
                >
                  {currentSlide.details.metrics.map((metric, index) => (
                    <m.div
                      key={index}
                      className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {metric.label}
                      </div>
                    </m.div>
                  ))}
                </m.div>
              )}

              {/* Close Button */}
              <m.button
                onClick={() => setShowDetails(false)}
                className="mt-6 text-white/60 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Show Less</span>
                <i className="fas fa-chevron-up" />
              </m.button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

    </m.div>
  );
}