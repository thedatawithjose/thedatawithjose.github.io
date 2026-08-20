'use client';

import { m } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Paul Reina",
    position: "Sales Manager | Appointment Setter",
    company: "GrowMyClinic",
    image: "/images/paul.png",
    content: "Jose designed a comprehensive data infrastructure that improved our patient-doctor matching process at GrowMyClinic. He integrated our CRM with call tracking systems, appointment scheduling platforms, and marketing attribution tools into a unified dashboard. Before his solution, we were losing potential patients due to poor follow-up tracking. Now we can see which marketing channels drive the highest-value appointments, track conversion rates by medical specialty, and automate follow-up sequences. Our patient conversion rate improved from 28% to 35%, and we saw a 15% increase in average appointment value. The real-time analytics helped us identify that our cardiology referrals had the highest lifetime value, allowing us to optimize our marketing spend accordingly.",
    rating: 5,
    project: "Healthcare CRM Data Integration with Marketing Attribution",
    results: "28% to 35% conversion rate, 15% higher appointment value, better patient tracking"
  },
  {
    id: 2,
    name: "Roberto Carrillo",
    position: "Quantitative Developer",
    company: "Alpha Strategies Fund",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Jose developed a momentum strategy for us that combines technical indicators with alternative data sources. The system processes social sentiment and options flow data in real-time. His implementation of dynamic position sizing using Kelly Criterion was well thought out. We've seen decent returns with reasonable risk management.",
    rating: 5,
    project: "Multi-Asset Momentum Strategy",
    results: "Decent returns with reasonable risk controls"
  },
  {
    id: 3,
    name: "Daniel Graham",
    position: "CEO",
    company: "TheTraderDaddy",
    image: "/images/daniel.png",
    content: "Jose developed a momentum-based trading algorithm that processes multiple crypto pairs with proper risk management. His implementation includes dynamic position sizing using Kelly Criterion, real-time risk monitoring with 3% max drawdown limits, and automated stop-loss mechanisms. The system has maintained consistent performance over 8 months with reasonable risk-adjusted returns. What impressed me most was his integration of social sentiment data from Twitter and Reddit APIs to enhance signal accuracy during volatile market conditions.",
    rating: 5,
    project: "Multi-Asset Momentum Strategy with Social Sentiment",
    results: "Consistent performance, 3% max drawdown, proper risk management"
  },
  {
    id: 4,
    name: "Caterina Abanoni",
    position: "Data Science Lead",
    company: "Unicorn.Academy",
    image: "/images/channels4_profile.jpg",
    content: "Jose architected a streamlined MLOps pipeline using Python, PostgreSQL, and MLflow that improved our training platform. He implemented automated feature engineering pipelines that process our 2,500+ student interactions daily, built A/B testing frameworks for our course recommendation system, and created model monitoring with performance tracking. Our model deployment time went from 3 weeks to 3 days, and we achieved 15% improvement in course completion rates. His GDPR-compliant data processing framework was essential for our European students.",
    rating: 5,
    project: "Training Platform MLOps with GDPR Compliance",
    results: "3 weeks to 3 days deployment, 15% course completion improvement"
  }
];

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="testimonials py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#0A1526] to-[#050B14]">
      <div className="container mx-auto px-4">
        <m.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#00E5A0]">
            What Clients Really Say
          </h2>
          <p className="text-lg md:text-xl font-semibold text-gray-400 max-w-3xl mx-auto">
            Real feedback from funds, founders, and quant teams who've worked with me
          </p>
        </m.div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-20">
          <m.div
            key={activeTestimonial}
            className="bg-[#0D1B30] border border-[#1E2D45] rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400 text-xl mr-1"></i>
                  ))}
                </div>
                <blockquote className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>
                <div className="bg-[#00E5A0]/10 rounded-lg p-4 mb-6">
                  <div className="text-sm font-semibold text-[#42A5F5] mb-1">Project Results:</div>
                  <div className="text-[#00E5A0] font-bold">{testimonials[activeTestimonial].results}</div>
                </div>
              </div>
              
              {/* Client Info */}
              <div className="text-center md:text-left md:min-w-[250px]">
                <img 
                  src={testimonials[activeTestimonial].image} 
                  alt={testimonials[activeTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto md:mx-0 mb-4 shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[activeTestimonial].name)}&background=005A9C&color=fff&size=80`;
                  }}
                />
                <h4 className="text-xl font-bold text-white mb-1">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-[#42A5F5] font-semibold mb-1">
                  {testimonials[activeTestimonial].position}
                </p>
                <p className="text-gray-400 mb-3">
                  {testimonials[activeTestimonial].company}
                </p>
                <div className="inline-block bg-white/5 px-3 py-1 rounded-full text-sm text-gray-400">
                  {testimonials[activeTestimonial].project}
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center gap-4 mb-20">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setActiveTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === activeTestimonial 
                  ? 'bg-[#00E5A0] w-8' 
                  : 'bg-[#1E2D45] hover:bg-[#2A3D5C]'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-24">
          {testimonials.map((testimonial, index) => (
            <m.div
              key={testimonial.id}
              className={`bg-[#0D1B30] border border-[#1E2D45] rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-300 ${
                index === activeTestimonial 
                  ? 'ring-2 ring-[#00E5A0] shadow-xl scale-105' 
                  : 'hover:shadow-xl hover:scale-102'
              }`}
              onClick={() => setActiveTestimonial(index)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h5 className="font-semibold text-white text-sm">{testimonial.name}</h5>
                  <p className="text-xs text-gray-400">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="flex items-center mt-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-sm mr-1"></i>
                ))}
              </div>
            </m.div>
          ))}
        </div>

        {/* Stats Section */}
        <m.div
          className="mt-20 bg-gradient-to-r from-[#42A5F5] to-[#00E5A0] rounded-2xl p-8 text-[#050B14]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">Systems Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">8</div>
              <div className="text-lg opacity-90">Trading Algorithms Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2TB+</div>
              <div className="text-lg opacity-90">Market Data Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2+ Years</div>
              <div className="text-lg opacity-90">Average Client Relationship</div>
            </div>
          </div>
        </m.div>

        {/* CTA */}
        <m.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#00E5A0]">
            Ready to Build Your Trading System?
          </h3>
          <p className="text-lg md:text-xl font-semibold text-gray-400 mb-6">
            Let's discuss your strategy and build something that survives real money
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#5AB3F5] text-[#050B14] px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg font-bold"
            >
              Let's Talk Systems
            </a>
            <a 
              href="/portfolio" 
              className="border-2 border-[#00E5A0] text-[#00E5A0] hover:bg-[#00E5A0] hover:text-[#050B14] px-8 py-4 rounded-lg transition-all shadow-lg text-lg font-semibold"
            >
              See More Projects
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}