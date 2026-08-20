import { siteConfig } from './seo';

// Esquema principal de la persona/profesional
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jose Acosta',
    jobTitle: 'Quantitative Developer',
    description: 'Quantitative Developer building robust algorithmic trading systems — from research to execution. Backtesting infrastructure, live trading systems, and risk management backed by real-market experience.',
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
      name: 'Independent Quantitative Development & Consulting'
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Michigan',
        url: 'https://www.umich.edu'
      }
    ],
    knowsAbout: [
      'Quantitative Development',
      'Algorithmic Trading Systems',
      'Backtesting Infrastructure',
      'Live Trading Execution',
      'Trading Risk Management',
      'Python Programming',
      'Time-Series Analysis',
      'Statistical Modeling',
      'Market Data Pipelines',
      'Real-time Data Processing',
      'Financial Engineering',
      'Systematic Trading'
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
    serviceType: 'Quantitative Development and Algorithmic Trading Systems',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Quantitative Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Algorithmic Trading System Development',
          description: 'End-to-end design and implementation of robust algorithmic trading systems — from research and backtesting to live execution and monitoring.'
        },
        {
          '@type': 'Offer',
          name: 'Backtesting Infrastructure',
          description: 'High-performance backtesting frameworks with market data pipelines, quality gates, and reproducible research workflows.'
        },
        {
          '@type': 'Offer',
          name: 'Live Execution & Risk Systems',
          description: 'Production trading infrastructure with real-time execution, position management, risk controls, and 24/7 monitoring.'
        },
        {
          '@type': 'Offer',
          name: 'Quantitative Research Support',
          description: 'Time-series analysis, signal research, and data-driven strategy development with rigorous validation.'
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
    name: 'Quantitative Development Portfolio',
    author: {
      '@type': 'Person',
      name: 'Jose Acosta'
    },
    description: 'Portfolio showcasing quantitative development work including algorithmic trading systems, backtesting infrastructure, and market data pipelines.',
    url: `${siteConfig.url}/portfolio`,
    workExample: [
      {
        '@type': 'SoftwareApplication',
        name: 'Algorithmic Trading System',
        description: 'Real-time trading system processing market data with low latency for systematic strategies.',
        applicationCategory: 'Financial Technology',
        operatingSystem: 'Linux',
        programmingLanguage: 'Python'
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Backtesting & Research Infrastructure',
        description: 'Scalable backtesting and research platform using Python, Kafka, and time-series databases for financial market data.',
        applicationCategory: 'Financial Technology',
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
        name: 'What quantitative development services do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I offer end-to-end quantitative development services: algorithmic trading system design, backtesting infrastructure, live execution and risk systems, market data pipelines, and quantitative research support — from research to execution.'
        }
      },
      {
        '@type': 'Question',
        name: 'What technologies do you specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I specialize in Python, NumPy, pandas, statistical time-series modeling, PostgreSQL/TimescaleDB, Redis, Docker, and real-time market data processing for building robust algorithmic trading systems.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you build complete trading systems, not just strategies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. I build the full stack: research and backtesting infrastructure, live execution systems, risk controls, and monitoring. I have years of experience trading with real capital, so robustness is designed in from day one.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is your typical project timeline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project timelines vary based on complexity, ranging from 2-4 weeks for a research/backtesting engagement to 3-6 months for complete live trading infrastructure. I provide detailed estimates during initial consultations.'
        }
      }
    ]
  };
}