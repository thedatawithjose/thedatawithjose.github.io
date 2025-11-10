import { motion } from 'framer-motion';

const coreStackSkills = [
  { name: "Python", description: "Production ETL pipelines, async processing, performance optimization" },
  { name: "SQL", description: "Complex analytical queries, window functions, query optimization" },
  { name: "Apache Spark", description: "Structured Streaming, batch processing, cluster tuning" },
  { name: "Apache Kafka", description: "Real-time event streaming, consumer groups, exactly-once semantics" },
  { name: "Apache Airflow", description: "DAG orchestration, custom operators, failure handling" },
  { name: "PostgreSQL", description: "Schema design, indexing strategies, query planning" },
  { name: "Docker", description: "Containerization, multi-stage builds" }
];

const cloudSkills = [
  { name: "AWS", description: "S3, Lambda, RDS, Glue (production deployments)" },
  { name: "Azure", description: "Data Factory, Synapse" },
  { name: "Databricks", description: "Job orchestration, collaborative development" },
  { name: "Snowflake", description: "Data warehousing, cost optimization" }
];

const tradingSkills = [
  "Algorithmic Trading (4 years live experience)",
  "Risk Management & Quantitative Analysis",
  "Financial Data Engineering (tick data, SEC filings)",
  "Time-series processing at scale"
];

export default function SkillsSection() {
  return (
    <section className="skills py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl -z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#005A9C] to-[#00BFA5] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Technical Expertise
        </motion.h2>
        <motion.p
          className="text-center text-lg md:text-xl font-semibold text-gray-700 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Production-tested tools and technologies
        </motion.p>

        <div className="max-w-7xl mx-auto">
          {/* Core Stack - Large Featured Card */}
          <motion.div
            className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-2xl p-10 mb-8 border border-[#005A9C]/10 overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gradient-to-r from-[#005A9C]/20 to-transparent">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl bg-gradient-to-br from-[#005A9C] to-[#0066CC] group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-database text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-2xl bg-gradient-to-r from-[#005A9C] to-[#0066CC] bg-clip-text text-transparent">Core Stack</h3>
                  <p className="text-sm text-gray-600 font-medium">Primary data engineering toolkit</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {coreStackSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group/item flex items-start gap-3 p-4 rounded-xl hover:bg-white/80 hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#005A9C]/10"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#005A9C] to-[#00BFA5] mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                    <div>
                      <div className="font-bold text-gray-900 mb-1 group-hover/item:text-[#005A9C] transition-colors">{skill.name}</div>
                      <div className="text-sm text-gray-600 leading-relaxed">{skill.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cloud & Trading - Smaller Cards Side by Side */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cloud & Infrastructure */}
            <motion.div
              className="relative bg-gradient-to-br from-white to-blue-50/30 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-blue-100 overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#42A5F5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-blue-100">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br from-[#42A5F5] to-[#2196F3] group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-cloud text-xl"></i>
                  </div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-[#42A5F5] to-[#2196F3] bg-clip-text text-transparent">Cloud & Infrastructure</h3>
                </div>
                
                <div className="space-y-4">
                  {cloudSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-white/60 transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#42A5F5] to-[#2196F3] mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                      <div>
                        <div className="font-bold text-gray-900 text-sm mb-0.5 group-hover/item:text-[#42A5F5] transition-colors">{skill.name}</div>
                        <div className="text-xs text-gray-600">{skill.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Trading & Finance */}
            <motion.div
              className="relative bg-gradient-to-br from-white to-teal-50/30 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-teal-100 overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-teal-100">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br from-[#00BFA5] to-[#00897B] group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-chart-line text-xl"></i>
                  </div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-[#00BFA5] to-[#00897B] bg-clip-text text-transparent">Trading & Finance</h3>
                </div>
                
                <div className="space-y-3">
                  {tradingSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="group/item flex items-start gap-3 text-gray-700 text-sm p-3 rounded-lg hover:bg-white/60 transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#00BFA5] to-[#00897B] mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                      <span className="group-hover/item:text-[#00BFA5] transition-colors font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}