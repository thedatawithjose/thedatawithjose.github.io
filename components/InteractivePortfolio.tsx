import { m } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Edgar SEC Parser",
    description: "Advanced Financial Document Processing System with 16.51 MB/s peak throughput and 100% error recovery rate.",
    category: "Research & Data",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    tech: ["Python", "SQLAlchemy", "PostgreSQL", "secsgml", "secxbrl"],
    metrics: {
      throughput: "16.51 MB/s",
      recovery: "100%",
      parsers: "3 Engines"
    },
    links: {
      demo: "#",
      github: "https://github.com/josetraderx/edgar-sec-parser",
      case_study: "/portfolio/edgar-sec-parser"
    },
    status: "live"
  },
  {
    id: 2,
    title: "Financial Data Pipeline",
    description: "Production-ready ETL pipeline for financial market data with 98%+ uptime and comprehensive data quality validation.",
    category: "Research & Data",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop",
    tech: ["Python", "Pandas", "PostgreSQL", "TimescaleDB", "Docker"],
    metrics: {
      records: "1M+/day",
      uptime: "98.2%",
      sources: "Multiple"
    },
    links: {
      demo: "#",
      github: "https://github.com/josetraderx/Financial-Data-Pipeline",
      case_study: "/portfolio/financial-data-pipeline"
    },
    status: "live"
  },
  {
    id: 3,
    title: "Mean Reversion OU Bot",
    description: "Automated trading bot using the Ornstein-Uhlenbeck process with walk-forward validation and dynamic risk management.",
    category: "Trading",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    tech: ["Python", "Pandas", "NumPy", "SciPy", "Matplotlib"],
    metrics: {
      validation: "Walk-Forward",
      testing: "Out-of-Sample",
      risk: "Dynamic Sizing"
    },
    links: {
      demo: "#",
      github: "https://github.com/thedatawithjose/Mean_Reversion_OU",
      case_study: "/portfolio/mean-reversion-ou"
    },
    status: "live"
  },
  {
    id: 4,
    title: "Moving Average Bot",
    description: "Algorithmic trading bot with moving average crossover strategy, containerized and operating 24/7 with risk controls.",
    category: "Trading",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop",
    tech: ["Python", "Pandas", "Backtrader", "REST API", "Docker"],
    metrics: {
      operation: "24/7",
      container: "Dockerized",
      status: "Live"
    },
    links: {
      demo: "#",
      github: "https://github.com/thedatawithjose/Algorithmic-Trading-Bot-Moving-Average-Crossover-Strategy",
      case_study: "/portfolio/moving-average-bot"
    },
    status: "live"
  }
];

const categories = ["All", "Trading", "Research & Data", "Infrastructure"];

export default function InteractivePortfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="portfolio py-24 bg-[#050B14]">
      <div className="container mx-auto px-4">
        <m.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-[#00E5A0]">
            Portfolio Showcase
          </h2>
          <p className="text-lg md:text-xl font-semibold text-gray-400 max-w-3xl mx-auto">
            Trading systems and research infrastructure with measurable results — from backtests to live capital
          </p>
        </m.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#00E5A0] text-[#050B14] shadow-lg'
                  : 'bg-[#0D1B30] text-gray-300 hover:bg-[#1E2D45] border border-[#1E2D45]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <m.div 
          className="grid md:grid-cols-2 gap-10"
          layout
        >
          {filteredProjects.map((project, index) => (
            <m.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#0D1B30] border border-[#1E2D45] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -5 }}
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
                <m.div
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
                      className="bg-[#00E5A0] text-[#050B14] px-4 py-2 rounded-lg hover:bg-[#00FFB3] transition-colors"
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
                </m.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-[#0A1526] rounded-lg">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-semibold text-[#00E5A0] font-mono">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <Link 
                    href={project.links.case_study}
                    className="text-[#42A5F5] hover:text-[#00E5A0] font-medium transition-colors"
                  >
                    Read Case Study →
                  </Link>
                  <div className="flex gap-2">
                    <a 
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00E5A0] transition-colors"
                      title="Live Demo"
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Source Code"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* CTA */}
        <m.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/portfolio" 
            className="bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#5AB3F5] text-[#050B14] px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg font-bold"
          >
            View Complete Portfolio
          </Link>
        </m.div>
      </div>
    </section>
  );
}