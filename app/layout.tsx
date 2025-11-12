import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./mobile-responsive-fixes.css";
import Script from "next/script";
import { generateMetadata } from "../lib/seo";
import { generatePersonSchema, generateWebsiteSchema } from "../lib/structured-data";
import StructuredData from "../components/StructuredData";
import WebVitalsTracker from "../components/WebVitalsTracker";
import dynamic from "next/dynamic";

import ErrorBoundary from "../components/ErrorBoundary";
import ConsentManager from "../components/ConsentManager";
import WhatsAppButton from "../components/WhatsAppButton";
import CookieConsent from "../components/CookieConsent";
import PageTransition from "../components/PageTransition";
import NavigationHandler from "../components/NavigationHandler";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: 'swap',
});

export const metadata: Metadata = generateMetadata({
  title: "Jose Acosta - Data Engineer & Trading Algorithm Specialist",
  description: "Data Engineer specializing in real-time data pipelines, algorithmic trading systems, and scalable analytics solutions. Expert in Python, SQL, AWS, Kafka, and financial data processing.",
  keywords: [
    "Data Engineer",
    "Algorithmic Trading",
    "Real-time Data Processing", 
    "Python Developer",
    "AWS Data Engineer",
    "Apache Kafka",
    "Financial Data Systems",
    "ETL Pipelines",
    "Trading Algorithms",
    "Data Analytics Consultant",
    "Freelance Data Engineer",
    "Business Intelligence"
  ],
  ogType: "profile",
  canonical: "https://datawithjose.tech"
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical CSS and performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Inter font preload for better performance */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" 
          as="style" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Preload poster image instead of video for better LCP */}
        <link
          rel="preload"
          href="/images/video-poster.jpg"
          as="image"
          media="(min-width: 768px)"
        />
        
        {/* Preload critical images */}
        <link rel="preload" href="/images/profile-jose.png" as="image" />
        <link rel="preload" href="/images/logo_v2.svg" as="image" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://formsubmit.co" />
        
        {/* FontAwesome CSS with optimized loading */}
        <link 
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          as="style"
          crossOrigin="anonymous"
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
        
        {/* Structured Data */}
        <StructuredData data={[generatePersonSchema(), generateWebsiteSchema()]} />
        
        {/* Google Analytics - Now loaded by ConsentManager after user consent */}
        
        {/* Vercel Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="https://va.vercel-scripts.com/v1/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {/* Web Vitals Tracking */}
        <WebVitalsTracker debug={process.env.NODE_ENV === 'development'} />
        
        {/* Navigation Handler */}
        <NavigationHandler />
        
        {/* Development-only components - removed to reduce bundle size */}
        
        {/* Consent Manager - Handles cookie consent and GA loading */}
        <ConsentManager>
          {/* Error Boundary Wrapper */}
          <ErrorBoundary>
            <PageTransition>
              {children}
            </PageTransition>
          </ErrorBoundary>
          
          {/* WhatsApp Floating Button */}
          <WhatsAppButton />
          
          {/* Cookie Consent Banner */}
          <CookieConsent />
        </ConsentManager>
        
        {/* Service Worker Registration */}
        <Script
          id="sw-registration"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
        
        {/* Intersection Observer polyfill for older browsers */}
        <Script
          src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
