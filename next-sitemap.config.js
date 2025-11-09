/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://datawithjose.tech',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  
  // Exclude paths
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  
  // Additional paths
  additionalPaths: async (config) => [
    await config.transform(config, '/portfolio/financial-data-pipeline'),
    await config.transform(config, '/portfolio/edgar-sec-parser'),
    await config.transform(config, '/portfolio/mean-reversion-ou'),
    await config.transform(config, '/portfolio/moving-average-bot'),
  ],
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    additionalSitemaps: [
      'https://datawithjose.tech/sitemap.xml',
    ],
  },
  
  transform: async (config, path) => {
    // Custom priority based on page importance
    let priority = 0.7;
    let changefreq = 'monthly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.includes('/portfolio') || path.includes('/services')) {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.includes('/blog')) {
      priority = 0.6;
      changefreq = 'weekly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};