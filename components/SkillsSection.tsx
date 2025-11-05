import { motion } from 'framer-motion';

const skills = [
  {
    category: "Data Engineering",
    icon: "fas fa-database",
    color: "#005A9C",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 93 },
      { name: "Apache Spark", level: 90 },
      { name: "Apache Airflow", level: 85 },
      { name: "Docker/Kubernetes", level: 80 }
    ]
  },
  {
    category: "Cloud Platforms",
    icon: "fas fa-cloud",
    color: "#42A5F5",
    skills: [
      { name: "AWS", level: 90 },
      { name: "Azure", level: 85 },
      { name: "Snowflake", level: 88 },
      { name: "Databricks", level: 82 }
    ]
  },
  {
    category: "Trading & Finance",
    icon: "fas fa-chart-line",
    color: "#00BFA5",
    skills: [
      { name: "Algorithmic Trading", level: 92 },
      { name: "Risk Management", level: 88 },
      { name: "Financial Modeling", level: 85 },
      { name: "Quantitative Analysis", level: 90 }
    ]
  },
  {
    category: "Machine Learning",
    icon: "fas fa-brain",
    color: "#FF6B35",
    skills: [
      { name: "Scikit-learn", level: 88 },
      { name: "TensorFlow", level: 82 },
      { name: "Time Series", level: 90 },
      { name: "MLOps", level: 80 }
    ]
  }
];



export default function SkillsSection() {
  return (
    <section className="skills py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Skills Grid */}
        <motion.h2
          className="text-4xl font-bold text-center mb-20 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Technical Expertise
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white mr-4"
                  style={{ backgroundColor: category.color }}
                >
                  <i className={`${category.icon} text-lg`}></i>
                </div>
                <h3 className="font-semibold text-lg text-gray-800">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}