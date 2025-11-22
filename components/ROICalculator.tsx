'use client';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ROICalculatorProps {
  className?: string;
}

export default function ROICalculator({ className = '' }: ROICalculatorProps) {
  const [inputs, setInputs] = useState({
    currentDataProcessingCost: 10000,
    dataVolumeGB: 1000,
    engineersTime: 40,
    downtimeHours: 8,
    revenuePerHour: 5000
  });

  const [results, setResults] = useState({
    costSavings: 0,
    timeSavings: 0,
    downtimeReduction: 0,
    totalROI: 0,
    paybackMonths: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Calculate ROI based on inputs
    const costSavings = inputs.currentDataProcessingCost * 0.25; // 25% cost reduction
    const timeSavings = inputs.engineersTime * 0.5 * 100; // 50% time savings * $100/hour
    const downtimeReduction = (inputs.downtimeHours * 0.8) * inputs.revenuePerHour; // 80% downtime reduction
    const totalROI = costSavings + timeSavings + downtimeReduction;
    const paybackMonths = 15000 / (totalROI / 12); // Assuming $15K investment

    setResults({
      costSavings,
      timeSavings,
      downtimeReduction,
      totalROI,
      paybackMonths
    });
  }, [inputs]);

  const handleInputChange = (field: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A192F] to-[#1A3A52] text-white ${className}`}>
      <div className="container mx-auto px-4">
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setIsVisible(true)}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Calculate Your Data Engineering ROI
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            See exactly how much you could save with optimized data infrastructure
          </p>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Input Section */}
          <m.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Your Current Situation</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-200">
                  Monthly Data Processing Costs
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={inputs.currentDataProcessingCost}
                    onChange={(e) => handleInputChange('currentDataProcessingCost', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-200">
                  Data Volume (GB per month)
                </label>
                <input
                  type="number"
                  value={inputs.dataVolumeGB}
                  onChange={(e) => handleInputChange('dataVolumeGB', Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent"
                  placeholder="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-200">
                  Engineer Hours per Month on Data Issues
                </label>
                <input
                  type="number"
                  value={inputs.engineersTime}
                  onChange={(e) => handleInputChange('engineersTime', Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent"
                  placeholder="40"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-200">
                  Downtime Hours per Month
                </label>
                <input
                  type="number"
                  value={inputs.downtimeHours}
                  onChange={(e) => handleInputChange('downtimeHours', Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent"
                  placeholder="8"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-200">
                  Revenue per Hour
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={inputs.revenuePerHour}
                    onChange={(e) => handleInputChange('revenuePerHour', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>
          </m.div>

          {/* Results Section */}
          <m.div
            className="bg-gradient-to-br from-[#00BFA5]/20 to-[#42A5F5]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#00BFA5]/30"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-[#00BFA5]">Your Potential Savings</h3>
            
            <div className="space-y-6">
              <m.div
                className="bg-white/10 rounded-xl p-6 border border-white/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Monthly Cost Savings</span>
                  <i className="fas fa-dollar-sign text-[#00BFA5]"></i>
                </div>
                <div className="text-3xl font-bold text-[#00BFA5]">
                  {formatCurrency(results.costSavings)}
                </div>
                <div className="text-sm text-gray-400">25% infrastructure cost reduction</div>
              </m.div>

              <m.div
                className="bg-white/10 rounded-xl p-6 border border-white/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Time Savings Value</span>
                  <i className="fas fa-clock text-[#42A5F5]"></i>
                </div>
                <div className="text-3xl font-bold text-[#42A5F5]">
                  {formatCurrency(results.timeSavings)}
                </div>
                <div className="text-sm text-gray-400">50% reduction in maintenance time</div>
              </m.div>

              <m.div
                className="bg-white/10 rounded-xl p-6 border border-white/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Downtime Cost Avoided</span>
                  <i className="fas fa-shield-alt text-[#005A9C]"></i>
                </div>
                <div className="text-3xl font-bold text-[#005A9C]">
                  {formatCurrency(results.downtimeReduction)}
                </div>
                <div className="text-sm text-gray-400">80% downtime reduction</div>
              </m.div>

              <m.div
                className="bg-gradient-to-r from-[#00BFA5] to-[#42A5F5] rounded-xl p-6 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.2 }}
              >
                <div className="text-sm font-semibold mb-2">TOTAL ANNUAL ROI</div>
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(results.totalROI * 12)}
                </div>
                <div className="text-sm opacity-90">
                  Payback in {results.paybackMonths.toFixed(1)} months
                </div>
              </m.div>
            </div>

            <m.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 }}
            >
              <a
                href={`mailto:datawithjose@outlook.com?subject=ROI Discussion - Let's Optimize Our Data Infrastructure&body=Hi Jose,%0D%0A%0D%0AI used your ROI calculator and I'm interested in discussing how we can achieve these savings:%0D%0A%0D%0AProjected Annual ROI: ${formatCurrency(results.totalROI * 12)}%0D%0APayback Period: ${results.paybackMonths.toFixed(1)} months%0D%0A%0D%0ACurrent Situation:%0D%0A- Monthly processing costs: $${inputs.currentDataProcessingCost}%0D%0A- Data volume: ${inputs.dataVolumeGB}GB/month%0D%0A- Engineer hours on data issues: ${inputs.engineersTime}h/month%0D%0A- Downtime: ${inputs.downtimeHours}h/month%0D%0A%0D%0AWhen can we schedule a call to discuss implementation?%0D%0A%0D%0ABest regards`}
                className="bg-white text-[#005A9C] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Schedule ROI Discussion
              </a>
            </m.div>
          </m.div>
        </div>

        {/* Disclaimer */}
        <m.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            * Results are estimates based on typical improvements seen in similar projects. 
            Actual results may vary depending on your specific infrastructure and requirements.
          </p>
        </m.div>
      </div>
    </section>
  );
}