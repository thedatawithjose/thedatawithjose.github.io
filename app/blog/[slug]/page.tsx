
import { getArticleData, getAllArticleIds, Article } from '@/lib/articles';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import SocialShareButtons from '../../../components/SocialShareButtons';
import SocialMetaTags from '../../../components/SocialMetaTags';
import { Metadata } from 'next';
import '../blog.css';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articleData = await getArticleData(slug);
  const fullUrl = `https://datawithjose.tech/blog/${slug}`;
  const imageUrl = articleData.image?.startsWith('http') ? articleData.image : `https://datawithjose.tech${articleData.image}`;
  
  return {
    title: `${articleData.title} | Jose Acosta - Data Engineer`,
    description: articleData.excerpt,
    openGraph: {
      title: articleData.title,
      description: articleData.excerpt,
      url: fullUrl,
      siteName: 'Jose Acosta - Data Engineer',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: articleData.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: articleData.date,
      authors: [articleData.author],
      tags: articleData.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: articleData.title,
      description: articleData.excerpt,
      images: [imageUrl],
      creator: '@datawithjose',
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articleData = await getArticleData(slug);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* 2026 Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0A192F] text-white py-20 md:py-32 overflow-hidden">
        {/* 2026 Background Effects */}
        <div className="absolute inset-0">
          {/* Primary Gradient with Mesh Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00BFA5]/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#6366F1]/15 via-transparent to-transparent"></div>
          
          {/* Organic Blob Shapes - 2026 Trend */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#00BFA5]/8 to-[#42A5F5]/8 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/5 w-[500px] h-[300px] bg-gradient-to-tr from-[#8B5CF6]/6 to-[#06B6D4]/6 rounded-[40%_60%_70%_30%/40%_70%_30%_60%] blur-2xl animate-pulse blob-delayed"></div>
          
          {/* Glassmorphism Layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-[0.5px]"></div>
          
          {/* Noise Texture - 2026 Subtle Detail */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay hero-noise-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 2026 Breadcrumb with Glassmorphism */}
          <nav className="mb-12">
            <div className="inline-flex items-center space-x-1 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <Link href="/" className="text-gray-300 hover:text-[#00BFA5] transition-all duration-300 font-medium text-sm px-2 py-1 rounded-full hover:bg-white/10">
                Home
              </Link>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <Link href="/blog" className="text-gray-300 hover:text-[#00BFA5] transition-all duration-300 font-medium text-sm px-2 py-1 rounded-full hover:bg-white/10">
                Blog
              </Link>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span className="text-[#00BFA5] font-semibold text-sm px-2 py-1 bg-[#00BFA5]/10 rounded-full">Article</span>
            </div>
          </nav>

          <div className="max-w-5xl">
            {/* 2026 Category Badge with Micro-interaction */}
            <div className="mb-8">
              <div className="inline-flex items-center group cursor-default">
                <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#00BFA5]/20 to-[#42A5F5]/20 backdrop-blur-md border border-white/20 px-5 py-2.5 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#00BFA5]/25">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA5]/10 to-[#42A5F5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00BFA5] rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-[#00BFA5] tracking-wide">
                      {articleData.category || 'Data Engineering'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 2026 Variable Typography with Enhanced Gradient */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 leading-[1.05] tracking-[-0.02em] font-display">
              <span className="bg-gradient-to-br from-white via-gray-50 via-[#E0F2FE] to-[#00BFA5] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                {articleData.title}
              </span>
            </h1>
            
            {/* 2026 Enhanced Excerpt with Better Spacing */}
            <div className="mb-12 max-w-4xl">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed font-light tracking-wide">
                {articleData.excerpt}
              </p>
            </div>
            
            {/* 2026 Meta Information with Glassmorphism Cards */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Author Card */}
              <div className="group flex items-center space-x-3 bg-white/8 backdrop-blur-lg rounded-2xl px-5 py-3 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/12">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFA5] to-[#42A5F5] flex items-center justify-center shadow-lg">
                    <i className="fas fa-user text-white text-sm"></i>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <span className="font-semibold text-white text-sm">{articleData.author}</span>
                  <div className="text-xs text-gray-400">Data Engineer</div>
                </div>
              </div>
              
              {/* Date & Time Pills */}
              <div className="flex items-center gap-3">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 text-sm">
                  <div className="w-2 h-2 bg-[#00BFA5] rounded-full"></div>
                  <span className="text-gray-300">{new Date(articleData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 text-sm">
                  <div className="w-2 h-2 bg-[#42A5F5] rounded-full"></div>
                  <span className="text-gray-300">12 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Article Image */}
            <div className="relative mb-16">
              <div className="relative h-80 sm:h-96 md:h-[28rem] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={articleData.image}
                  alt={`Cover image for ${articleData.title}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-all duration-700 group-hover:scale-105"
                />
                {/* Modern Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-6 left-6">
                  <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Featured Article</span>
                  </div>
                </div>
                
                {/* Reading Progress Indicator */}
                <div className="absolute bottom-6 right-6">
                  <div className="bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    <span className="text-white text-sm font-medium">
                      <i className="fas fa-clock mr-2"></i>
                      12 min read
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#00BFA5]/20 to-[#42A5F5]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#005A9C]/20 to-[#00BFA5]/20 rounded-full blur-xl"></div>
            </div>

            {/* Content */}
            <div className="grid lg:grid-cols-4 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-3 max-w-none">
                <div 
                  className="prose prose-xl max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-5xl prose-h1:text-gray-900 prose-h1:mb-12 prose-h1:mt-0 prose-h1:leading-tight
                    prose-h2:text-4xl prose-h2:text-[#005A9C] prose-h2:mt-20 prose-h2:mb-12 prose-h2:pb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:leading-tight
                    prose-h3:text-3xl prose-h3:text-[#00BFA5] prose-h3:mt-16 prose-h3:mb-8 prose-h3:font-semibold prose-h3:leading-tight
                    prose-h4:text-2xl prose-h4:text-gray-800 prose-h4:mt-12 prose-h4:mb-6 prose-h4:font-medium
                    prose-p:text-gray-700 prose-p:text-xl prose-p:leading-9 prose-p:mb-10 prose-p:font-normal
                    prose-a:text-[#005A9C] prose-a:font-medium prose-a:no-underline hover:prose-a:text-[#00BFA5] hover:prose-a:underline prose-a:transition-colors
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-em:text-gray-600 prose-em:italic
                    prose-code:bg-blue-50 prose-code:text-[#005A9C] prose-code:px-4 prose-code:py-2 prose-code:rounded-lg prose-code:font-mono prose-code:text-base prose-code:font-medium
                    prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:to-gray-800 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:p-10 prose-pre:shadow-2xl prose-pre:border prose-pre:border-gray-700 prose-pre:overflow-x-auto prose-pre:my-12
                    prose-pre:code:bg-transparent prose-pre:code:text-gray-100 prose-pre:code:p-0 prose-pre:code:text-base prose-pre:code:leading-7
                    prose-blockquote:border-l-4 prose-blockquote:border-[#00BFA5] prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-teal-50 prose-blockquote:p-10 prose-blockquote:rounded-r-2xl prose-blockquote:shadow-lg prose-blockquote:my-12
                    prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:leading-8
                    prose-ul:space-y-4 prose-ul:my-12 prose-li:text-gray-700 prose-li:text-xl prose-li:leading-8 prose-li:pl-2
                    prose-ol:space-y-4 prose-ol:my-12
                    prose-li:marker:text-[#00BFA5] prose-li:marker:font-bold
                    prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-16 prose-img:border prose-img:border-gray-200
                    prose-hr:border-gray-300 prose-hr:my-20
                    prose-table:shadow-lg prose-table:rounded-xl prose-table:overflow-hidden prose-table:my-12
                    prose-thead:bg-gray-50 prose-th:text-gray-900 prose-th:font-semibold prose-th:p-6 prose-th:text-lg
                    prose-td:p-6 prose-td:border-gray-200 prose-td:text-lg
                    [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: articleData.contentHtml as string }} 
                />
                
                {/* Article End - Social Share */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Did you find this article helpful?
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Share it with your professional network and help others discover these insights
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <SocialShareButtons
                      url={`/blog/${slug}`}
                      title={articleData.title}
                      description={articleData.excerpt}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Author Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#00BFA5] shadow-lg">
                        <Image
                          src="/images/profile-jose.png"
                          alt="Jose Acosta - Data Engineer"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{articleData.author}</h3>
                      <p className="text-sm text-gray-600 mb-4">Data Engineer & Algorithmic Trading Specialist</p>
                      <Link 
                        href="/about"
                        className="inline-flex items-center text-[#005A9C] hover:text-[#00BFA5] font-medium text-sm transition-colors"
                      >
                        Learn More
                        <i className="fas fa-arrow-right ml-2"></i>
                      </Link>
                    </div>
                  </div>

                  {/* Share This Article */}
                  <div className="bg-gradient-to-br from-[#00BFA5]/10 to-[#42A5F5]/10 p-6 rounded-xl border border-[#00BFA5]/20">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                      <i className="fas fa-share-alt text-[#00BFA5] mr-2"></i>
                      Share Article
                    </h3>
                    <SocialShareButtons
                      url={`/blog/${slug}`}
                      title={articleData.title}
                      description={articleData.excerpt}
                    />
                  </div>

                  {/* Social Links */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Connect with Me</h3>
                    <div className="flex space-x-3">
                      <a 
                        href="https://www.linkedin.com/in/datawithjose" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                        aria-label="LinkedIn"
                      >
                        <i className="fab fa-linkedin text-lg"></i>
                      </a>
                      <a 
                        href="https://www.instagram.com/datawithjose" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition-colors text-center"
                        aria-label="Instagram"
                      >
                        <i className="fab fa-instagram text-lg"></i>
                      </a>
                      <a 
                        href="https://github.com/thedatawithjose" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors text-center"
                        aria-label="GitHub"
                      >
                        <i className="fab fa-github text-lg"></i>
                      </a>
                    </div>
                  </div>

                  {/* Back to Blog */}
                  <div className="bg-gradient-to-br from-[#005A9C] to-[#00BFA5] p-6 rounded-xl text-white text-center">
                    <h3 className="font-bold mb-2">More Articles</h3>
                    <p className="text-sm opacity-90 mb-4">Explore more insights on data engineering and trading</p>
                    <Link 
                      href="/blog"
                      className="inline-flex items-center bg-white text-[#005A9C] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      All Articles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles CTA */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Continue Reading</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover more insights on data engineering, algorithmic trading, and high-performance systems
          </p>
          <Link 
            href="/blog"
            className="bg-[#005A9C] hover:bg-[#003D7A] text-white px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg font-semibold inline-flex items-center"
          >
            <i className="fas fa-book-open mr-3"></i>
            Explore All Articles
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const paths = getAllArticleIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}
