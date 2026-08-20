'use client';

import { m } from 'framer-motion';
import { useState } from 'react';

interface LeadMagnetProps {
  className?: string;
}

export default function LeadMagnets({ className = '' }: LeadMagnetProps) {
  const [selectedMagnet, setSelectedMagnet] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const leadMagnets = [
    {
      id: 'data-engineering-checklist',
      title: 'Algorithmic Trading System Checklist',
      description: 'Complete 47-point checklist to ensure your trading systems are production-ready before real capital is at risk',
      benefits: [
        'Avoid common system failures',
        'Reduce time from research to execution',
        'Improve system robustness',
        'Save debugging time and losses'
      ],
      icon: 'fas fa-clipboard-check',
      color: 'from-[#00E5A0] to-[#42A5F5]',
      downloadUrl: '/downloads/data-engineering-checklist.pdf',
      fileSize: '2.1 MB PDF'
    },
    {
      id: 'roi-calculator',
      title: 'Trading Infrastructure ROI Calculator',
      description: 'Calculate the exact ROI of your quant infrastructure investments in minutes',
      benefits: [
        'Estimate cost savings potential',
        'Justify infrastructure budget',
        'Compare research vs execution priorities',
        'Support stakeholder presentations'
      ],
      icon: 'fas fa-calculator',
      color: 'from-[#42A5F5] to-[#00E5A0]',
      downloadUrl: '/downloads/data-pipeline-roi-calculator.xlsx',
      fileSize: '1.8 MB Excel'
    },
    {
      id: 'architecture-templates',
      title: 'Trading System Architecture Templates',
      description: '5 proven architecture templates for research, backtesting, and live execution stacks',
      benefits: [
        'Accelerate architecture planning',
        'Proven research-to-execution patterns',
        'Cost-conscious configurations',
        'Implementation guidance included'
      ],
      icon: 'fas fa-sitemap',
      color: 'from-[#00E5A0] to-[#00C98C]',
      downloadUrl: '/downloads/data-stack-templates.zip',
      fileSize: '3.2 MB ZIP'
    }
  ];

  const handleDownload = async (magnetId: string) => {
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // Track lead magnet download
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          magnetId,
          source: 'website'
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Trigger download
        const magnet = leadMagnets.find(m => m.id === magnetId);
        if (magnet) {
          window.open(magnet.downloadUrl, '_blank');
        }
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setEmail('');
          setSelectedMagnet(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center ${className}`}
      >
        <m.div 
          className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <i className="fas fa-download text-white text-2xl"></i>
        </m.div>
        <h3 className="text-2xl font-bold text-green-800 mb-3">Download Started! 📥</h3>
        <p className="text-green-700">Check your downloads folder and email for the resource.</p>
      </m.div>
    );
  }

  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A1526] to-[#050B14] ${className}`}>
      <div className="container mx-auto px-4">
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#00E5A0]">
            Free Quant Development Resources
          </h2>
          <p className="text-lg md:text-xl font-semibold text-gray-400 max-w-3xl mx-auto">
            Get battle-tested tools and templates for building robust algorithmic trading systems
          </p>
        </m.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {leadMagnets.map((magnet, index) => (
            <m.div
              key={magnet.id}
              className="bg-[#0D1B30] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[#1E2D45]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-2 bg-gradient-to-r ${magnet.color}`}></div>
              
              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${magnet.color} rounded-xl flex items-center justify-center mb-6`}>
                  <i className={`${magnet.icon} text-2xl text-[#050B14]`}></i>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {magnet.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {magnet.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {magnet.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <i className="fas fa-check text-[#00E5A0] mr-2 mt-1 flex-shrink-0"></i>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                {selectedMagnet === magnet.id ? (
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 bg-[#0A1526] border border-[#1E2D45] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E5A0] focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(magnet.id)}
                        disabled={!email || isSubmitting}
                        className={`flex-1 bg-gradient-to-r ${magnet.color} text-[#050B14] px-6 py-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 hover:scale-105`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-[#050B14] border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          <>
                            <i className="fas fa-download mr-2"></i>
                            Download Free
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setSelectedMagnet(null)}
                        className="px-4 py-3 border border-[#1E2D45] rounded-lg text-gray-400 hover:bg-white/5"
                      >
                        Cancel
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      {magnet.fileSize} • No spam, unsubscribe anytime
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedMagnet(magnet.id)}
                    className={`w-full bg-gradient-to-r ${magnet.color} text-[#050B14] px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
                  >
                    <i className="fas fa-download mr-2"></i>
                    Get Free Resource
                  </button>
                )}
              </div>
            </m.div>
          ))}
        </div>

        {/* Social Proof */}
        <m.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <i className="fas fa-download text-[#00E5A0] mr-2"></i>
              <span>Popular resources</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-users text-yellow-400 mr-2"></i>
              <span>Used by quant teams</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-[#00E5A0] mr-2"></i>
              <span>No spam guarantee</span>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}