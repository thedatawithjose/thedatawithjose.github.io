'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: "Robustness Lessons from a Trading Desk: Why Validation Beats Hope",
    excerpt: "A strategy is not robust simply because it produces an attractive backtest. What systematic trading teaches us about testing honestly and engineering for the real world.",
    category: "Trading",
    readTime: "12 min read",
    publishDate: "Dec 4, 2024",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop&crop=center",
    tags: ["Trading", "Validation", "Real-time", "Robustness", "Methodology"],
    featured: true,
    url: "/blog/quantification-data-engineering"
  },
  {
    id: 2,
    title: "AI-Assisted Research Pipelines: From Idea to Backtest Faster",
    excerpt: "How AI and LLMs are changing quant research workflows, from automated signal documentation to intelligent data quality monitoring.",
    category: "Research & Data",
    readTime: "14 min read",
    publishDate: "Nov 10, 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
    tags: ["AI", "LLM", "Research", "Automation", "Backtesting"],
    featured: true,
    url: "/blog/ai-powered-data-engineering"
  },
  {
    id: 3,
    title: "The Future of Systematic Trading: Predictions and Trends for 2026",
    excerpt: "Exploring emerging trends in systematic trading including real-time ML, edge execution, and the evolving role of quant developers in an AI-first world.",
    category: "Research & Data", 
    readTime: "11 min read",
    publishDate: "Jul 20, 2025",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop&crop=center",
    tags: ["Future Trends", "Real-time ML", "Edge Computing", "Career Development"],
    featured: false,
    url: "/blog/future-data-engineering-trends"
  },
  {
    id: 4,
    title: "Building Real-Time Trading Systems with Python and WebSockets",
    excerpt: "A deep dive into architecting low-latency trading systems that can process hundreds of market updates per second with consistent performance.",
    category: "Trading",
    readTime: "12 min read",
    publishDate: "Mar 15, 2024",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop&crop=center",
    tags: ["Python", "WebSockets", "Trading", "Low Latency"],
    featured: false,
    url: "/blog/real-time-trading-systems"
  },
  {
    id: 5,
    title: "Market Data Pipelines: Engineering for Speed and Integrity",
    excerpt: "How we redesigned market data ingestion using Python, TimescaleDB, and Docker to achieve significant performance gains with strict data integrity.",
    category: "Research & Data",
    readTime: "8 min read",
    publishDate: "Feb 20, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
    tags: ["Apache Spark", "Kubernetes", "ETL", "Performance"],
    featured: false,
    url: "/blog/data-pipeline-optimization"
  },
  {
    id: 6,
    title: "Machine Learning in Production: Lessons from High-Volume Predictions",
    excerpt: "Best practices for deploying, monitoring, and scaling ML models in production environments with real-world examples.",
    category: "Machine Learning",
    readTime: "15 min read",
    publishDate: "Jan 15, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
    tags: ["MLOps", "Production", "Monitoring", "Scaling"],
    featured: false,
    url: "/blog/machine-learning-production"
  },
  {
    id: 7,
    title: "Cryptocurrency Trading Algorithms: A Technical Analysis",
    excerpt: "Exploring quantitative trading strategies for crypto markets, including momentum, mean reversion, and arbitrage opportunities.",
    category: "Trading",
    readTime: "10 min read",
    publishDate: "Dec 10, 2023",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop&crop=center",
    tags: ["Cryptocurrency", "Algorithms", "Quantitative", "Technical Analysis"],
    featured: false,
    url: "/blog/crypto-trading-algorithms"
  },
  {
    id: 8,
    title: "Building Scalable APIs with FastAPI and PostgreSQL",
    excerpt: "Complete guide to building high-performance APIs that can handle thousands of requests with proper database optimization.",
    category: "Backend Development",
    readTime: "11 min read",
    publishDate: "Nov 5, 2023",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=center",
    tags: ["FastAPI", "PostgreSQL", "API Design", "Performance"],
    featured: false,
    url: "/blog/scalable-apis"
  },
  {
    id: 9,
    title: "AWS Cost Optimization: Reducing Cloud Bills Effectively",
    excerpt: "Practical strategies for optimizing AWS costs including right-sizing, reserved instances, and serverless architectures.",
    category: "Cloud",
    readTime: "9 min read",
    publishDate: "Oct 30, 2023",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&crop=center",
    tags: ["AWS", "Cost Optimization", "Cloud", "FinOps"],
    featured: false,
    url: "/blog/aws-cost-optimization"
  }
];

const categories = ["All", "Trading", "Research & Data", "Machine Learning", "Backend Development", "Cloud"];

export default function TechnicalBlog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section className="technical-blog py-24 bg-[#0A1526]">
      <div className="container mx-auto px-4">
        <m.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-[#00E5A0]">
            Technical Articles & Insights
          </h2>
          <p className="text-lg md:text-xl font-semibold text-gray-400 max-w-3xl mx-auto">
            Deep dives into algorithmic trading, backtesting, and building systems that survive real money
          </p>
        </m.div>

        {/* Featured Articles */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-12 text-white">Featured Articles</h3>
          <div className="grid md:grid-cols-2 gap-10">
            {featuredPosts.map((post, index) => (
              <Link href={post.url} key={post.id} className="block">
                <m.article
                  className="group bg-[#0D1B30] border border-[#1E2D45] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    style={{ objectPosition: 'center 30%' }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop&crop=center";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-[#00E5A0] text-[#050B14] rounded-full">
                      FEATURED
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-black/50 text-white rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{post.publishDate}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#42A5F5] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center">
                    <span className="inline-flex items-center text-[#42A5F5] group-hover:text-[#00E5A0] font-medium group-hover:translate-x-1 transition-all">
                      Read Full Article
                      <i className="fas fa-arrow-right ml-2 text-sm"></i>
                    </span>
                  </div>
                </div>
              </m.article>
              </Link>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#00E5A0] text-[#050B14] shadow-lg'
                  : 'bg-[#0D1B30] text-gray-300 hover:bg-[#1E2D45] border border-[#1E2D45]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Regular Articles Grid */}
        <m.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {regularPosts.map((post, index) => (
            <Link href={post.url} key={post.id} className="block">
              <m.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-[#0D1B30] border border-[#1E2D45] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ y: -3 }}
              >
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: 'center 30%' }}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop&crop=center";
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-semibold bg-black/50 text-white rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span>{post.publishDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#42A5F5] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 text-gray-400 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center">
                  <span className="inline-flex items-center text-[#42A5F5] group-hover:text-[#00E5A0] font-medium text-sm">
                    Read More
                    <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </span>
                </div>
              </div>
            </m.article>
            </Link>
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
            href="/blog" 
            className="bg-gradient-to-r from-[#00E5A0] to-[#42A5F5] hover:from-[#00FFB3] hover:to-[#5AB3F5] text-[#050B14] px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg font-bold"
          >
            View All Articles
          </Link>
        </m.div>
      </div>
    </section>
  );
}