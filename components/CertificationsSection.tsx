    'use client';

import { m } from 'framer-motion';
import { useState } from 'react';

// Institution branding with real logos from CDNs and fallback icons
const institutionBranding = {
  ibm: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ibm.svg',
    color: 'from-blue-600 to-blue-800',
    icon: 'fas fa-server',
    bgColor: 'bg-white',
    textColor: 'text-blue-700'
  },
  umich: {
    logoUrl: '/images/michigan.PNG',
    color: 'from-yellow-400 to-blue-600',
    icon: 'fas fa-university',
    bgColor: 'bg-white',
    textColor: 'text-blue-700'
  },
  coursera: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/coursera.svg',
    color: 'from-blue-500 to-indigo-600',
    icon: 'fas fa-graduation-cap',
    bgColor: 'bg-white',
    textColor: 'text-blue-700'
  },
  codigo: {
    logoUrl: '/images/codigo facilito.PNG',
    color: 'from-green-500 to-emerald-600',
    icon: 'fas fa-code',
    bgColor: 'bg-white',
    textColor: 'text-green-700'
  },
  consulting: {
    logoUrl: null, // Custom consulting logo - will use fallback
    color: 'from-purple-500 to-violet-600',
    icon: 'fas fa-handshake',
    bgColor: 'bg-white',
    textColor: 'text-purple-700'
  },
  kaplan: {
    logoUrl: '/images/kaplan.PNG',
    color: 'from-red-500 to-rose-600',
    icon: 'fas fa-language',
    bgColor: 'bg-white',
    textColor: 'text-red-700'
  },
  google: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg',
    color: 'from-red-500 via-yellow-400 via-green-500 to-blue-500',
    icon: 'fab fa-google',
    bgColor: 'bg-white',
    textColor: 'text-gray-700'
  },
  microsoft: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg',
    color: 'from-blue-500 to-cyan-500',
    icon: 'fab fa-microsoft',
    bgColor: 'bg-white',
    textColor: 'text-blue-700'
  },
  aws: {
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonaws.svg',
    color: 'from-orange-400 to-amber-500',
    icon: 'fab fa-aws',
    bgColor: 'bg-white',
    textColor: 'text-orange-700'
  }
};

const certifications = [
  { 
    name: "IBM Data Engineering Professional Certificate", 
    organization: "IBM", 
    date: "May 2025", 
    status: "IN_PROGRESS",
    badge: "ibm", 
    verified: true,
    credentialUrl: "https://www.coursera.org/professional-certificates/ibm-data-engineer",
    skills: ["Apache Kafka", "Apache Spark", "ETL Pipelines", "Cloud Computing", "SQL", "Python", "NoSQL", "Docker", "Kubernetes"],
    description: "Comprehensive professional certificate covering data engineering fundamentals, ETL processes, and cloud-based data solutions.",
    level: "Professional Certificate",
    duration: "11 months",
    provider: "Coursera"
  },
  { 
    name: "Inferential Statistical Analysis with Python", 
    organization: "University of Michigan", 
    date: "Nov 2024", 
    credentialId: "R7LPZ5VW13NJ",
    badge: "umich", 
    verified: true,
    credentialUrl: "https://www.coursera.org/learn/inferential-statistical-analysis-python",
    skills: ["Python", "Statistical Analysis", "Hypothesis Testing", "Confidence Intervals", "Statistical Inference"],
    description: "Statistical analysis techniques using Python for data-driven decision making.",
    level: "Specialization Course",
    provider: "Coursera"
  },
  { 
    name: "Understanding and Visualizing Data with Python", 
    organization: "University of Michigan", 
    date: "Nov 2024", 
    credentialId: "OHX0446VDLS8",
    badge: "umich", 
    verified: true,
    credentialUrl: "https://www.coursera.org/learn/understanding-visualization-data",
    skills: ["Data Visualization", "Python", "Pandas", "Matplotlib", "Seaborn", "Statistical Analysis"],
    description: "Comprehensive course on data analysis and visualization techniques using Python libraries.",
    level: "Specialization Course", 
    provider: "Coursera"
  },
  { 
    name: "Data Science Orientation", 
    organization: "Coursera", 
    date: "May 2025", 
    badge: "coursera", 
    verified: true,
    credentialUrl: "https://www.coursera.org/learn/data-science-course",
    skills: ["Data Science Fundamentals", "Career Development"],
    description: "Introduction to data science career paths and industry overview.",
    level: "Course",
    provider: "Coursera"
  },
  { 
    name: "Python Profesional", 
    organization: "Código Facilito", 
    date: "Jun 2023", 
    badge: "codigo", 
    verified: true,
    credentialUrl: "#",
    description: "Curso profesional de Python para el uso en la ciencia de datos",
    skills: ["Python Programming", "Algorithms", "Data Structures", "Object-Oriented Programming"],
    level: "Professional Course",
    provider: "Código Facilito"
  },
  { 
    name: "What is Data Science?", 
    organization: "IBM", 
    credentialId: "8O4B21RURLGO",
    badge: "ibm", 
    verified: true,
    credentialUrl: "https://www.coursera.org/learn/what-is-datascience",
    skills: ["Data Science Fundamentals", "Industry Overview"],
    description: "Introduction to data science methodologies and applications across industries.",
    level: "Course",
    provider: "Coursera"
  },
  { 
    name: "Consultor Internacional Certificado", 
    organization: "Espabílate Consulting Group", 
    badge: "consulting", 
    verified: true,
    credentialUrl: "#",
    skills: ["International Consulting", "Business Strategy", "Project Management"],
    description: "Certification in international consulting practices and methodologies.",
    level: "Professional Certification",
    provider: "Espabílate Consulting Group"
  },
  { 
    name: "Inglés Avanzado", 
    organization: "Kaplan UK", 
    badge: "kaplan", 
    verified: true,
    credentialUrl: "#",
    skills: ["English Proficiency", "Business Communication", "Technical Writing"],
    description: "English proficiency certification for professional environments.",
    level: "Language Certification",
    provider: "Kaplan International"
  }
];

// Category filters
const categories = [
  { id: 'all', name: 'All Certifications', icon: 'fas fa-certificate' },
  { id: 'data-engineering', name: 'Data Engineering', icon: 'fas fa-database' },
  { id: 'data-science', name: 'Data Science', icon: 'fas fa-chart-line' },
  { id: 'programming', name: 'Programming', icon: 'fas fa-code' },
  { id: 'business', name: 'Business', icon: 'fas fa-briefcase' },
  { id: 'language', name: 'Languages', icon: 'fas fa-globe' }
];

const getCertificationCategory = (cert: any) => {
  const name = cert.name.toLowerCase();
  const skills = cert.skills?.join(' ').toLowerCase() || '';
  
  if (name.includes('engineering') || skills.includes('kafka') || skills.includes('etl')) {
    return 'data-engineering';
  }
  if (name.includes('data science') || name.includes('statistical') || skills.includes('statistical')) {
    return 'data-science';
  }
  if (name.includes('python') || skills.includes('python') || skills.includes('programming')) {
    return 'programming';
  }
  if (name.includes('consulting') || name.includes('business')) {
    return 'business';
  }
  if (name.includes('inglés') || name.includes('english')) {
    return 'language';
  }
  return 'data-science';
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-green-100 text-green-800 border-green-200';
  }
};

const getStatusText = (status?: string) => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'COMPLETED':
      return 'Completed';
    default:
      return 'Completed';
  }
};

const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'professional certificate':
      return 'bg-purple-100 text-purple-800';
    case 'specialization course':
      return 'bg-blue-100 text-blue-800';
    case 'professional certification':
      return 'bg-indigo-100 text-indigo-800';
    case 'language certification':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());

  const handleLogoError = (badge: string) => {
    setLogoErrors(prev => new Set(prev).add(badge));
  };

  const getInstitutionIcon = (badge: string, organization: string) => {
    const branding = institutionBranding[badge as keyof typeof institutionBranding];
    
    if (branding) {
      // Try to use real logo first
      if (branding.logoUrl && !logoErrors.has(badge)) {
        return (
          <div className={`w-16 h-16 ${branding.bgColor} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 p-2 border border-gray-100`}>
            <img 
              src={branding.logoUrl}
              alt={`${organization} logo`}
              className="w-full h-full object-contain filter hover:brightness-110 transition-all duration-300"
              onError={() => handleLogoError(badge)}
              loading="lazy"
            />
          </div>
        );
      }
      
      // Fallback to branded icon
      return (
        <div className={`w-16 h-16 bg-gradient-to-br ${branding.color} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300`}>
          <i className={`${branding.icon} text-2xl text-white`}></i>
        </div>
      );
    }
    
    // Final fallback with first letter and nice gradient
    return (
      <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
        <span className="text-white font-bold text-2xl">
          {organization.charAt(0)}
        </span>
      </div>
    );
  };

  const filteredCertifications = activeCategory === 'all' 
    ? certifications 
    : certifications.filter(cert => getCertificationCategory(cert) === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-[#0097A7]">
              Professional Certifications
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Continuous learning and professional development through industry-recognized certifications
          </p>
        </m.div>

        {/* Category Filters */}
        <m.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === category.id
                  ? 'bg-[#005A9C] text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#005A9C] hover:text-[#005A9C]'
              }`}
            >
              <i className={category.icon}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </m.div>

        {/* Statistics */}
        <m.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-[#005A9C] mb-2">{certifications.length}</div>
            <div className="text-gray-600">Total Certifications</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-[#00BFA5] mb-2">
              {certifications.filter(cert => cert.verified).length}
            </div>
            <div className="text-gray-600">Verified</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {new Set(certifications.map(cert => cert.organization)).size}
            </div>
            <div className="text-gray-600">Institutions</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {certifications.filter(cert => cert.status === 'IN_PROGRESS').length}
            </div>
            <div className="text-gray-600">In Progress</div>
          </div>
        </m.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertifications.map((cert, index) => (
            <m.div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onMouseEnter={() => setHoveredCert(index)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              {/* Header with Institution Logo */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-start space-x-4 mb-4">
                  {/* Institution Logo */}
                  <div className="flex-shrink-0">
                    {getInstitutionIcon(cert.badge, cert.organization)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-800 leading-tight pr-2">{cert.name}</h3>
                      {cert.verified && (
                        <div className="flex-shrink-0 ml-2">
                          <div className="bg-green-100 rounded-full p-1">
                            <i className="fas fa-check-circle text-green-600 text-sm"></i>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-[#005A9C] font-semibold text-sm mb-3">{cert.organization}</p>
                    
                    {/* Status and Level Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(cert.status)}`}>
                        {getStatusText(cert.status)}
                      </span>
                      {cert.level && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(cert.level)}`}>
                          {cert.level}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date and Credential Info */}
                <div className="mb-4">
                  {cert.date && (
                    <p className="text-gray-500 text-sm mb-1">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      Issued {cert.date}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="text-gray-400 text-xs">
                      <i className="fas fa-id-card mr-2"></i>
                      ID: {cert.credentialId}
                    </p>
                  )}
                  {cert.duration && (
                    <p className="text-gray-500 text-sm">
                      <i className="fas fa-clock mr-2"></i>
                      Duration: {cert.duration}
                    </p>
                  )}
                </div>

                {/* Description */}
                {cert.description && (
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                )}

                {/* Skills */}
                {cert.skills && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold">Skills Acquired:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, hoveredCert === index ? cert.skills.length : 4).map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-1 bg-gradient-to-r from-[#005A9C]/10 to-[#00BFA5]/10 text-[#005A9C] text-xs rounded-md border border-[#005A9C]/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && hoveredCert !== index && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                          +{cert.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {cert.credentialUrl && cert.credentialUrl !== '#' && (
                  <div className="pt-4 border-t">
                    <a 
                      href={cert.credentialUrl}
                      className="inline-flex items-center space-x-2 text-[#005A9C] hover:text-[#00BFA5] font-semibold text-sm transition-colors group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View Credential</span>
                      <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                    </a>
                  </div>
                )}
              </div>
            </m.div>
          ))}
        </div>

        {/* CTA Section */}
        <m.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-[#005A9C] to-[#00BFA5] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Continuous Learning Journey</h3>
            <p className="text-lg mb-6 opacity-90">
              Always expanding knowledge and staying current with industry trends and technologies
            </p>
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white text-[#005A9C] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span>Let's Collaborate</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}