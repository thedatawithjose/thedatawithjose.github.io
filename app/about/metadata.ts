import { Metadata } from 'next';
import { generateMetadata } from '../../lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "About Jose Acosta - Data Engineer",
  description: "Learn about Jose Acosta, a skilled Data Engineer with expertise in Python, SQL, AWS, and real-time data processing. Discover my experience building scalable data pipelines and trading algorithms.",
  keywords: [
    "Jose Acosta",
    "Data Engineer Experience", 
    "Python Developer",
    "SQL Database Expert",
    "AWS Cloud Engineer",
    "Data Pipeline Developer",
    "Trading Algorithm Developer",
    "ETL Developer",
    "About Data Engineer"
  ],
  canonical: "/about"
});

export { default } from './page';