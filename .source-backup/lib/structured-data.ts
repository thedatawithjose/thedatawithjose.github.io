import { siteConfig } from './seo';

// Esquema principal de la persona/profesional
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jose Acosta',
    jobTitle: 'Data Engineer',
    description: 'Data Engineer specializing in real-time data pipelines, trading algorithms, and scalable analytics solutions.',
    url: siteConfig.url,
    image: `${siteConfig.url}/images/profile-jose.png`,
    email: siteConfig.social.email,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.instagram
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance Data Engineering Consultant'
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Michigan',
        url: 'https://www.umich.edu'
      }
    ],
    knowsAbout: [
      'Data Engineering',
      'Python Programming',
      'SQL Database Management',
      'AWS Cloud Services',
      'Apache Kafka',
      'Real-time Data Processing',
      'Trading Algorithms',
      'Financial Data Analysis',
      'ETL/ELT Pipelines',
      'Machine Learning',
      'Business Intelligence'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'IBM Data Engineering Professional Certificate',
        credentialCategory: 'Professional Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'IBM'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Python 3 Programming Specialization',
        credentialCategory: 'Specialization',
        recognizedBy: {
          '@type': 'Organization',
          name: 'University of Michigan'
        }
      }
    ]
  };
}

// Esquema para el sitio web profesional
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo_v2.svg`,
    image: `${siteConfig.url}/images/profile-jose.png`,
    founder: {
      '@type': 'Person',
      name: 'Jose Acosta'
    },
    serviceType: 'Data Engineering and Analytics Consulting',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Data Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Real-time Data Pipeline Development',
          description: 'Design and implementation of scalable real-time data processing systems using Apache Kafka, Spark, and cloud technologies.'
        },
        {
          '@type': 'Offer',
          name: 'Trading Algorithm Development',
          description: 'Custom algorithmic trading strategies with backtesting, risk management, and performance optimization.'
        },
        {
          '@type': 'Offer',
          name: 'Data Analytics and BI Solutions',
          description: 'End-to-end analytics solutions including data modeling, dashboard development, and business intelligence implementation.'
        },
        {
          '@type': 'Offer',
          name: 'Cloud Data Architecture',
          description: 'AWS-based data architecture design and implementation for scalable, cost-effective data solutions.'
        }
      ]
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: siteConfig.social.email,
      availableLanguage: ['English', 'Spanish']
    }
  };
}

// Esquema para testimoniales/reviews
export function generateReviewSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '4',
      bestRating: '5',
      worstRating: '5'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Paul Reina'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Jose revolutionized our real-time streaming architecture. We were struggling with event ordering and backpressure in our Kafka streams processing financial market data.',
        datePublished: '2024-10-15'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Daniel Graham'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Jose developed our proprietary scalping algorithm for crypto markets with good execution speed and reliable performance.',
        datePublished: '2024-09-28'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Caterina Abanoni'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Working with Jose on our EdTech data platform was extraordinary. He architected a Lambda architecture using Apache Spark and Delta Lake.',
        datePublished: '2024-08-12'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Roberto Carrillo'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Jose built our multi-asset momentum strategy that combines traditional technical indicators with alternative data sources.',
        datePublished: '2024-07-22'
      }
    ]
  };
}

// Esquema para proyectos/portfolio
export function generatePortfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Data Engineering Portfolio',
    author: {
      '@type': 'Person',
      name: 'Jose Acosta'
    },
    description: 'Portfolio showcasing data engineering projects including real-time trading systems, ETL pipelines, and analytics platforms.',
    url: `${siteConfig.url}/portfolio`,
    workExample: [
      {
        '@type': 'SoftwareApplication',
        name: 'High-Frequency Trading System',
        description: 'Real-time trading system processing market data with low latency for cryptocurrency markets.',
        applicationCategory: 'Financial Technology',
        operatingSystem: 'Linux',
        programmingLanguage: 'Python'
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Real-time Data Pipeline',
        description: 'Scalable data processing pipeline using Apache Kafka and Spark for financial market data.',
        applicationCategory: 'Data Processing',
        operatingSystem: 'Cloud',
        programmingLanguage: ['Python', 'SQL']
      }
    ]
  };
}

// Esquema para artículos/blog
export function generateArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: 'Jose Acosta',
      url: siteConfig.url
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo_v2.svg`
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    url: article.url,
    image: article.image ? `${siteConfig.url}${article.image}` : `${siteConfig.url}/images/profile-jose.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

// Esquema FAQ para la página de servicios
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What data engineering services do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I offer comprehensive data engineering services including real-time data pipeline development, trading algorithm creation, cloud data architecture, ETL/ELT implementation, and business intelligence solutions.'
        }
      },
      {
        '@type': 'Question',
        name: 'What technologies do you specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I specialize in Python, SQL, Apache Kafka, Apache Spark, AWS cloud services, PostgreSQL, Docker, Kubernetes, and various data processing frameworks for building scalable data solutions.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you work with financial data and trading systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, I have solid experience developing trading algorithms, processing financial market data in real-time, and building trading systems with good performance.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is your typical project timeline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project timelines vary based on complexity, ranging from 2-4 weeks for simple integrations to 3-6 months for comprehensive data platform implementations. I provide detailed estimates during initial consultations.'
        }
      }
    ]
  };
}