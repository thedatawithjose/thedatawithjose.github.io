import Head from 'next/head';

interface SocialMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

export default function SocialMetaTags({
  title,
  description,
  image = '/images/profile-jose.png',
  url = 'https://thedatawithjose.github.io',
  type = 'article',
  author = 'Jose Acosta',
  publishedTime,
  tags = []
}: SocialMetaTagsProps) {
  const fullImageUrl = image.startsWith('http') ? image : `https://thedatawithjose.github.io${image}`;
  
  return (
    <Head>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Jose Acosta - Data Engineer" />
      <meta property="og:locale" content="en_US" />
      
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@datawithjose" />
      <meta name="twitter:site" content="@datawithjose" />

      {/* LinkedIn */}
      <meta property="og:image:alt" content={title} />
      
      {/* WhatsApp */}
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* General Meta */}
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={tags.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Head>
  );
}