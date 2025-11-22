'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface EnhancedCTAsProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'urgent';
}

export default function EnhancedCTAs({ className = '', variant = 'primary' }: EnhancedCTAsProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  // Countdown for urgency (next month end)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = nextMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const ctaVariants = {
    primary: {
      title: "Ready to Build Reliable Data Systems?",
      subtitle: "Let's discuss your specific needs and create a custom solution",
      urgency: null,
      mainCTA: {
        text: "Start Your Project",
        href: "mailto:datawithjose@outlook.com?subject=Data Engineering Project Discussion&body=Hi Jose,%0D%0A%0D%0AI'm interested in discussing a data engineering project.%0D%0A%0D%0AProject type:%0D%0A☐ Real-time data pipelines%0D%0A☐ ML in production%0D%0A☐ Data infrastructure optimization%0D%0A☐ Trading algorithms%0D%0A☐ Other: _________%0D%0A%0D%0ATimeline: _________%0D%0ABudget range: _________%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards",
        icon: "fas fa-rocket",
        color: "from-[#00BFA5] to-[#42A5F5]"
      },
      secondaryCTA: {
        text: "View Case Studies",
        href: "/portfolio",
        icon: "fas fa-folder-open"
      }
    },
    secondary: {
      title: "Questions About Your Data Infrastructure?",
      subtitle: "Get expert advice on your specific challenges - no commitment required",
      urgency: null,
      mainCTA: {
        text: "Free 30-Min Consultation",
        href: "mailto:datawithjose@outlook.com?subject=Free Consultation Request&body=Hi Jose,%0D%0A%0D%0AI'd like to schedule a free 30-minute consultation to discuss:%0D%0A%0D%0ACurrent challenges:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0AWhat I'm hoping to achieve:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0APreferred time slots:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards",
        icon: "fas fa-comments",
        color: "from-[#005A9C] to-[#00BFA5]"
      },
      secondaryCTA: {
        text: "Download Resources",
        href: "#lead-magnets",
        icon: "fas fa-download"
      }
    },
    urgent: {
      title: "Limited Availability This Month",
      subtitle: "Only 2 project slots remaining for December 2024 - secure yours now",
      urgency: {
        text: "Booking deadline:",
        timeLeft: timeLeft
      },
      mainCTA: {
        text: "Reserve Your Slot Now",
        href: "mailto:datawithjose@outlook.com?subject=URGENT: Reserve December Project Slot&body=Hi Jose,%0D%0A%0D%0AI want to reserve one of the remaining December project slots.%0D%0A%0D%0AProject urgency: HIGH%0D%0A%0D%0AProject type:%0D%0A☐ Real-time data pipelines%0D%0A☐ ML in production%0D%0A☐ Data infrastructure optimization%0D%0A☐ Trading algorithms%0D%0A☐ Other: _________%0D%0A%0D%0ADesired start date: _________%0D%0ABudget: _________%0D%0A%0D%0AProject overview:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0APlease confirm availability ASAP.%0D%0A%0D%0ABest regards",
        icon: "fas fa-bolt",
        color: "from-[#FF6B35] to-[#FF8E53]"
      },
      secondaryCTA: {
        text: "Join Waitlist",
        href: "mailto:datawithjose@outlook.com?subject=January 2025 Waitlist&body=Hi Jose,%0D%0A%0D%0APlease add me to the January 2025 waitlist.%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards",
        icon: "fas fa-clock"
      }
    }
  };

  const currentVariant = ctaVariants[variant];

  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A192F] via-[#1A3A52] to-[#005A9C] text-white relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <m.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Urgency Timer */}
          {currentVariant.urgency && (
            <m.div
              className="inline-flex items-center bg-[#FF6B35]/20 border border-[#FF6B35]/30 rounded-full px-6 py-3 mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <i className="fas fa-clock text-[#FF6B35] mr-3"></i>
              <span className="text-sm font-semibold mr-4">{currentVariant.urgency.text}</span>
              <div className="flex items-center space-x-4 text-[#FF6B35] font-bold">
                <div className="text-center">
                  <div className="text-lg">{timeLeft.days}</div>
                  <div className="text-xs">DAYS</div>
                </div>
                <div className="text-center">
                  <div className="text-lg">{timeLeft.hours}</div>
                  <div className="text-xs">HRS</div>
                </div>
                <div className="text-center">
                  <div className="text-lg">{timeLeft.minutes}</div>
                  <div className="text-xs">MIN</div>
                </div>
              </div>
            </m.div>
          )}

          <m.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentVariant.title}
          </m.h2>

          <m.p
            className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {currentVariant.subtitle}
          </m.p>

          {/* Value Props */}
          <m.div
            className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <i className="fas fa-tachometer-alt text-3xl text-[#00BFA5] mb-4"></i>
              <h3 className="font-bold mb-2">Efficient Delivery</h3>
              <p className="text-sm text-gray-300">Most projects completed in 6-10 weeks</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <i className="fas fa-shield-alt text-3xl text-[#42A5F5] mb-4"></i>
              <h3 className="font-bold mb-2">Quality Focus</h3>
              <p className="text-sm text-gray-300">High uptime and reliable systems</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <i className="fas fa-handshake text-3xl text-[#005A9C] mb-4"></i>
              <h3 className="font-bold mb-2">Ongoing Support</h3>
              <p className="text-sm text-gray-300">Post-launch support and documentation</p>
            </div>
          </m.div>

          {/* CTAs */}
          <m.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <m.a
              href={currentVariant.mainCTA.href}
              className={`group bg-gradient-to-r ${currentVariant.mainCTA.color} text-white px-6 sm:px-8 py-4 min-h-[48px] rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`${currentVariant.mainCTA.icon} mr-3`}></i>
              {currentVariant.mainCTA.text}
              <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
            </m.a>

            <m.a
              href={currentVariant.secondaryCTA.href}
              className="group border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-6 sm:px-8 py-4 min-h-[48px] rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`${currentVariant.secondaryCTA.icon} mr-3`}></i>
              {currentVariant.secondaryCTA.text}
            </m.a>
          </m.div>

          {/* Social Proof */}
          <m.div
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center">
              <i className="fas fa-users text-[#00BFA5] mr-2"></i>
              <span>8+ satisfied clients</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-handshake text-yellow-400 mr-2"></i>
              <span>Professional service</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock text-[#42A5F5] mr-2"></i>
              <span>Usually responds within 4 hours</span>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}