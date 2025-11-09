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

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-6">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white mr-4"
                  style={{ backgroundColor: category.color }}
                >
                  <i className={`${category.icon} text-xl`}></i>
                </div>
                <h3 className="font-bold text-xl text-gray-800">{category.category}</h3>
              </div>
              
              <div className="text-gray-700 leading-relaxed">
                {category.skills.join(" • ")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}