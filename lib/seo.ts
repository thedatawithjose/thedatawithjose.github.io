import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const siteConfig = {
  name: 'Jose Acosta - Data Engineer & Analytics Specialist',
  description: 'Data Engineer specializing in real-time data pipelines, trading algorithms, and scalable analytics solutions. Skilled in Python, SQL, AWS, and financial data systems.',
  url: 'https://datawithjose.tech',
  ogImage: '/images/jose.png',
  author: 'Jose Acosta',
  keywords: [
    'Data Engineer',
    'Data Analytics',
    'Trading Algorithms',
    'Python Developer',
    'SQL Developer',
    'AWS',
    'Real-time Data Processing',
    'Financial Data',
    'ETL Pipelines',
    'Data Architecture',
    'Machine Learning',
    'Business Intelligence',
    'Freelance Data Engineer',
    'Data Consultant'
  ],
  social: {
    linkedin: 'https://www.linkedin.com/in/datawithjose',
    github: 'https://github.com/thedatawithjose',
    instagram: 'https://www.instagram.com/datawithjose',
    email: 'datawithjose@outlook.com'
  }
};

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    author = siteConfig.author,
    ogImage = siteConfig.ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    canonical,
    noindex = false,
    nofollow = false
  } = config;

  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`;
  const allKeywords = [...new Set([...siteConfig.keywords, ...keywords])];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    
    // Icons and Favicon - Optimized for jose.png
    icons: {
      icon: [
        { url: '/images/jose.png', sizes: '32x32', type: 'image/png' },
        { url: '/images/jose.png', sizes: '16x16', type: 'image/png' }
      ],
      shortcut: '/images/jose.png',
      apple: '/images/jose.png'
    },
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
      type: ogType,
    },

    // Twitter
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@datawithjose',
    },

    // Robots
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Additional metadata
    category: 'Technology',
    classification: 'Data Engineering and Analytics Services',
    
    // Verification and analytics
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export { siteConfig };