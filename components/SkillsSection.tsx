import { motion } from 'framer-motion';

const skillCategories = [
  {
    category: "Core Stack",
    icon: "fas fa-database",
    color: "#005A9C",
    skills: ["Python", "SQL", "Apache Spark", "Apache Kafka", "Apache Airflow", "PostgreSQL", "Docker"]
  },
  {
    category: "Cloud & Infrastructure",
    icon: "fas fa-cloud",
    color: "#42A5F5",
    skills: ["AWS (S3, EC2, Lambda, RDS)", "Azure", "Databricks", "Snowflake"]
  },
  {
    category: "Trading & Finance",
    icon: "fas fa-chart-line",
    color: "#00BFA5",
    skills: ["Algorithmic Trading", "Risk Management", "Quantitative Analysis", "Financial Modeling"]
  }
];

export default function SkillsSection() {
  return (
    <section className="skills py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-20 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Technical Expertise
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: category.color }}
                >
                  <i className={`${category.icon} text-lg`}></i>
                </div>
                <h3 className="font-bold text-lg text-gray-800">{category.category}</h3>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center text-gray-700 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}