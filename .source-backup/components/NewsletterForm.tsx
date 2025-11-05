'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center shadow-xl ${className}`}
      >
        <motion.div 
          className="flex items-center justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <motion.i 
              className="fas fa-check text-white text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 600 }}
            ></motion.i>
          </div>
        </motion.div>
        <motion.h3 
          className="text-2xl font-bold text-green-800 mb-3 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome aboard! 🚀
        </motion.h3>
        <motion.p 
          className="text-green-700 font-medium text-lg leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          You'll receive valuable data engineering insights weekly.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br from-[#0A192F] to-[#1A3A52] rounded-lg p-10 text-white ${className}`}
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-white via-gray-100 to-[#00BFA5] bg-clip-text text-transparent leading-tight">
            Stay Ahead in Data Engineering
          </h3>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 font-medium leading-relaxed max-w-2xl mx-auto">
            Get weekly insights, case studies, and industry trends delivered to your inbox
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] flex items-center justify-center mr-3">
              <i className="fas fa-chart-line text-white text-xs"></i>
            </div>
            <span className="text-gray-200 font-medium">Industry Insights</span>
          </div>
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#42A5F5] to-[#2196F3] flex items-center justify-center mr-3">
              <i className="fas fa-code text-white text-xs"></i>
            </div>
            <span className="text-gray-200 font-medium">Technical Tips</span>
          </div>
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#005A9C] to-[#00BFA5] flex items-center justify-center mr-3">
              <i className="fas fa-briefcase text-white text-xs"></i>
            </div>
            <span className="text-gray-200 font-medium">Case Studies</span>
          </div>
        </motion.div>
      </div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter your email address"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 min-h-[48px] rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent focus:bg-white/15 transition-all duration-300 text-base sm:text-lg font-medium shadow-lg"
              disabled={isSubmitting}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00BFA5]/10 to-[#42A5F5]/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting || !email}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] text-white font-bold rounded-xl hover:from-[#00D4B4] hover:to-[#2196F3] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] sm:min-w-[140px] shadow-lg hover:shadow-xl text-base sm:text-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isSubmitting ? (
              <div className="flex items-center relative z-10">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                <span className="font-semibold">Joining...</span>
              </div>
            ) : (
              <div className="flex items-center relative z-10">
                <span className="font-semibold">Subscribe</span>
                <motion.i 
                  className="fas fa-arrow-right ml-3"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                ></motion.i>
              </div>
            )}
          </motion.button>
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 backdrop-blur-sm"
          >
            <p className="text-red-300 text-sm flex items-center font-medium">
              <i className="fas fa-exclamation-triangle mr-2 text-red-400"></i>
              {error}
            </p>
          </motion.div>
        )}
      </motion.form>

      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-gray-400 font-medium flex items-center justify-center gap-2">
          <i className="fas fa-shield-alt text-[#00BFA5]"></i>
          <span>No spam, unsubscribe at any time.</span>
          <span className="text-gray-500">•</span>
          <a href="/privacy" className="text-[#00BFA5] hover:text-[#00D4B4] transition-colors duration-200 font-semibold hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}