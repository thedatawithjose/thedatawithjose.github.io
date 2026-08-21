import { m } from 'framer-motion';

const coreStackSkills = [
  { name: "Python", description: "Strategy research, backtesting engines, execution systems" },
  { name: "NumPy / pandas", description: "Vectorized time-series analysis and signal processing" },
  { name: "PostgreSQL", description: "Schema design, indexing strategies, query planning" },
  { name: "TimescaleDB", description: "High-throughput tick storage, time-series queries" },
  { name: "Apache Kafka", description: "Real-time market data streaming, exactly-once semantics" },
  { name: "Apache Airflow", description: "Pipeline orchestration, custom operators, failure handling" },
  { name: "Docker", description: "Containerization, reproducible research environments" }
];

const cloudSkills = [
  { name: "Redis", description: "Low-latency caching, signal state, pub/sub" },
  { name: "AWS", description: "S3, Lambda, RDS, production deployments" },
  { name: "Backtrader / VectorBT", description: "Fast strategy prototyping and walk-forward validation" },
  { name: "FastAPI", description: "Research-to-API endpoints, live system services" }
];

const tradingSkills = [
  "Algorithmic Trading (8+ years with real market experience)",
  "Risk Management & Position Sizing",
  "Mean Reversion & Momentum Strategies",
  "Time-series modeling at scale (OU processes, regime detection)"
];

export default function SkillsSection() {
  return (
    <section className="skills py-24 bg-gradient-to-br from-[#050B14] to-[#0A1526] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5A0]/10 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#42A5F5]/10 rounded-full blur-3xl -z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <m.h2
          className="text-4xl font-bold text-center mb-4 text-[#00E5A0]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Technical Expertise
        </m.h2>
        <m.p
          className="text-center text-lg md:text-xl font-semibold text-gray-400 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Production-tested tools and technologies
        </m.p>

        <div className="max-w-7xl mx-auto">
          {/* Core Stack - Large Featured Card */}
          <m.div
            className="relative bg-gradient-to-br from-[#0D1B30] to-[#0A1526]/50 rounded-3xl shadow-2xl p-10 mb-8 border border-[#1E2D45] overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-[#1E2D45]">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl bg-gradient-to-br from-[#42A5F5] to-[#2196F3] group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-database text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-2xl bg-gradient-to-r from-[#42A5F5] to-[#2196F3] bg-clip-text text-transparent">Core Stack</h3>
                  <p className="text-sm text-gray-400 font-medium">Primary quant development toolkit</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {coreStackSkills.map((skill, index) => (
                  <m.div
                    key={index}
                    className="group/item flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#1E2D45]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#42A5F5] to-[#00E5A0] mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                    <div>
                      <div className="font-bold text-white mb-1 group-hover/item:text-[#42A5F5] transition-colors">{skill.name}</div>
                      <div className="text-sm text-gray-400 leading-relaxed">{skill.description}</div>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </m.div>

          {/* Cloud & Trading - Smaller Cards Side by Side */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cloud & Infrastructure */}
            <m.div
              className="relative bg-gradient-to-br from-[#0D1B30] to-[#0A1526]/30 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-[#1E2D45] overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#1E2D45]">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br from-[#42A5F5] to-[#2196F3] group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-cloud text-xl"></i>
                  </div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-[#42A5F5] to-[#2196F3] bg-clip-text text-transparent">Cloud & Infrastructure</h3>
                </div>
                
                <div className="space-y-4">
                  {cloudSkills.map((skill, index) => (
                    <m.div
                      key={index}
                      className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#42A5F5] to-[#2196F3] mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                      <div>
                        <div className="font-bold text-white text-sm mb-0.5 group-hover/item:text-[#42A5F5] transition-colors">{skill.name}</div>
                        <div className="text-xs text-gray-400">{skill.description}</div>
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>
            </m.div>

            {/* Trading & Finance */}
            <m.div
              className="relative bg-gradient-to-br from-[#0D1B30] to-[#071020]/30 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-[#1E2D45] overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5A0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#1E2D45]">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#050B14] shadow-lg bg-gradient-to-br from-[#00E5A0] to-[#00C98C] group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-chart-line text-xl"></i>
                  </div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-[#00E5A0] to-[#00C98C] bg-clip-text text-transparent">Trading & Finance</h3>
                </div>
                
                <div className="space-y-3">
                  {tradingSkills.map((skill, index) => (
                    <m.div
                      key={index}
                      className="group/item flex items-start gap-3 text-gray-300 text-sm p-3 rounded-lg hover:bg-white/5 transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#00E5A0] to-[#00C98C] mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                      <span className="group-hover/item:text-[#00E5A0] transition-colors font-medium">{skill}</span>
                    </m.div>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}