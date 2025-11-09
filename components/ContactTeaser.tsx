'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ContactTeaserProps {
  className?: string;
}

export default function ContactTeaser({ className = '' }: ContactTeaserProps) {
  const contactMethods = [
    {
      icon: 'fas fa-calendar-check',
      label: 'Schedule Call',
      description: 'Free 30-min consultation',
      href: 'mailto:datawithjose@outlook.com?subject=Schedule Consultation&body=Hi Jose,%0D%0A%0D%0AI\'d like to schedule a consultation to discuss:%0D%0A%0D%0A- %0D%0A- %0D%0A%0D%0APreferred times:%0D%0A- %0D%0A- %0D%0A%0D%0ABest regards',
      color: 'from-[#00BFA5] to-[#42A5F5]'
    },
    {
      icon: 'fas fa-briefcase',
      label: 'View Portfolio',
      description: 'See my work',
      href: '/portfolio',
      color: 'from-[#42A5F5] to-[#005A9C]'
    },
    {
      icon: 'fab fa-linkedin',
      label: 'Connect on LinkedIn',
      description: 'Professional network',
      href: 'https://www.linkedin.com/in/datawithjose/',
      color: 'from-[#005A9C] to-[#00BFA5]'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help you build scalable data systems that drive real business value.
            </p>
            
            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 mb-10">
              <div className="flex items-center">
                <i className="fas fa-clock mr-2 text-[#00BFA5]"></i>
                <span>Usually responds within 24 hours</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-shield-alt mr-2 text-[#42A5F5]"></i>
                <span>Free initial consultation</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-star mr-2 text-[#005A9C]"></i>
                <span>10+ years experience</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#00BFA5]/30">
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${method.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#005A9C] transition-colors">
                      {method.label}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {method.description}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Alternative CTA - Simplified */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
          >
            <p className="text-gray-600 mb-4">
              Want to learn more about my services?
            </p>
            <div className="flex justify-center">
              <Link
                href="/services"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] hover:from-[#00D4B4] hover:to-[#2196F3] text-white font-medium rounded-lg transition-all duration-300"
              >
                <i className="fas fa-cogs mr-2"></i>
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}