import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Real-Time Trading Dashboard",
    description: "Live cryptocurrency trading dashboard with real-time price feeds, technical indicators, and algorithmic trading signals.",
    category: "Trading",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center",
    tech: ["Python", "React", "WebSockets", "AWS", "Redis"],
    metrics: {
      performance: "Low latency",
      uptime: "98%",
      volume: "High daily volume"
    },
    links: {
      demo: "https://trading-demo.datawithjose.com",
      github: "https://github.com/thedatawithjose/trading-dashboard",
      case_study: "/case-studies/trading-dashboard"
    },
    status: "live"
  },
  {
    id: 2,
    title: "ML-Powered ETL Pipeline",
    description: "Scalable data pipeline with automated data quality checks and anomaly detection.",
    category: "Data Engineering",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    tech: ["Apache Spark", "Airflow", "Docker", "Kubernetes", "MLflow"],
    metrics: {
      throughput: "High throughput",
      accuracy: "98%",
      cost_reduction: "30%"
    },
    links: {
      demo: "https://pipeline-demo.datawithjose.com",
      github: "https://github.com/thedatawithjose/ml-etl-pipeline",
      case_study: "/case-studies/ml-etl"
    },
    status: "live"
  },
  {
    id: 3,
    title: "Predictive Analytics Platform",
    description: "End-to-end ML platform for customer behavior prediction with automated model training and deployment.",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
    tech: ["TensorFlow", "FastAPI", "PostgreSQL", "Grafana", "Terraform"],
    metrics: {
      accuracy: "70%",
      predictions: "High volume",
      roi: "120%"
    },
    links: {
      demo: "https://ml-platform.datawithjose.com",
      github: "https://github.com/thedatawithjose/predictive-analytics",
      case_study: "/case-studies/predictive-analytics"
    },
    status: "development"
  },
  {
    id: 4,
    title: "Crypto Market Analysis Bot",
    description: "Automated cryptocurrency market analysis with sentiment analysis, social media monitoring, and price predictions.",
    category: "Trading",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop&crop=center",
    tech: ["Python", "NLTK", "Twitter API", "Binance API", "MongoDB"],
    metrics: {
      signals: "Daily signals",
      accuracy: "65%",
      profit: "Positive returns"
    },
    links: {
      demo: "https://crypto-bot.datawithjose.com",
      github: "https://github.com/thedatawithjose/crypto-analysis-bot",
      case_study: "/case-studies/crypto-bot"
    },
    status: "live"
  }
];

const categories = ["All", "Trading", "Data Engineering", "Machine Learning"];

export default function InteractivePortfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="portfolio py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Portfolio Showcase</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world solutions delivering measurable impact through data engineering and algorithmic trading
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#00BFA5] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-10"
          layout
        >
          {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -5 }}
                onClick={() => window.location.href = project.links.case_study}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'live' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {project.status === 'live' ? 'LIVE' : 'IN DEV'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-black/50 text-white rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                
                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex gap-4">
                    <a 
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#00BFA5] text-white px-4 py-2 rounded-lg hover:bg-[#00D4B4] transition-colors"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Live Demo
                    </a>
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <i className="fab fa-github mr-2"></i>
                      Code
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-semibold text-[#00BFA5]">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <span className="text-[#005A9C] group-hover:text-[#00BFA5] font-medium">
                    Read Case Study →
                  </span>
                  <div className="flex gap-2">
                    <a 
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00BFA5] transition-colors z-10"
                      title="Live Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-800 transition-colors z-10"
                      title="Source Code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/portfolio" 
            className="bg-[#005A9C] hover:bg-[#003D7A] text-white px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            View Complete Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}