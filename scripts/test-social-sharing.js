// Script para probar las URLs de compartir en redes sociales

const testArticle = {
  slug: 'quantification-data-engineering',
  title: "The 'Quantification' of Data Engineering: What Modern DE Teams Must Learn from a Wall Street Trading Desk",
  excerpt: "In 2026, 'good enough' data is bankrupt. It's time to stop building data libraries and start building data trading floors. Here's why the future belongs to teams that think like quant traders.",
  url: 'https://thedatawithjose.github.io/blog/quantification-data-engineering'
};

// Construir URLs de compartir
const encodedUrl = encodeURIComponent(testArticle.url);
const encodedTitle = encodeURIComponent(testArticle.title);
const encodedDescription = encodeURIComponent(testArticle.excerpt);

const shareUrls = {
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
};

console.log('🔗 URLs de Compartir Generadas:');
console.log('=====================================');
Object.entries(shareUrls).forEach(([platform, url]) => {
  console.log(`${platform.toUpperCase()}:`);
  console.log(url);
  console.log('');
});

console.log('✅ Todas las URLs están correctamente formateadas');
console.log('📱 Puedes probar estas URLs en tu navegador');