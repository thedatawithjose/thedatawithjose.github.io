'use client';

import { motion } from 'framer-motion';
import SocialShareButtons from './SocialShareButtons';
import SocialMetaTags from './SocialMetaTags';

interface BlogPostTemplateProps {
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
  url: string;
}

export default function BlogPostTemplate({
  title,
  excerpt,
  content,
  publishDate,
  readTime,
  category,
  tags,
  image,
  url
}: BlogPostTemplateProps) {
  return (
    <>
      <SocialMetaTags
        title={title}
        description={excerpt}
        image={image}
        url={url}
        publishedTime={publishDate}
        tags={tags}
      />
      
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="bg-[#00BFA5] text-white px-3 py-1 rounded-full font-semibold">
              {category}
            </span>
            <span>{publishDate}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {excerpt}
          </p>
          
          {/* Social Share - Top */}
          <div className="border-t border-b border-gray-200 py-6">
            <SocialShareButtons
              url={url}
              title={title}
              description={excerpt}
            />
          </div>
        </motion.header>

        {/* Featured Image */}
        {image && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          className="prose prose-lg max-w-none mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Social Share - Bottom */}
        <motion.div
          className="border-t border-gray-200 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¿Te gustó este artículo?
            </h3>
            <p className="text-gray-600">
              Compártelo con tu red profesional
            </p>
          </div>
          
          <div className="flex justify-center">
            <SocialShareButtons
              url={url}
              title={title}
              description={excerpt}
            />
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          className="mt-12 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <img
              src="/images/profile-jose.png"
              alt="Jose Acosta"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Jose Acosta
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Data Engineer con experiencia en sistemas de trading y pipelines de datos de alta disponibilidad. 
                Especializado en arquitecturas escalables y optimización de performance.
              </p>
              <div className="flex gap-4 mt-3">
                <a
                  href="https://www.linkedin.com/in/datawithjose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077B5] hover:text-[#005885] transition-colors"
                >
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
                <a
                  href="https://github.com/thedatawithjose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <i className="fab fa-github text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </>
  );
}