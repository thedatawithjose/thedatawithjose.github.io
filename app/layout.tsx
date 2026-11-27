import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./mobile-responsive-fixes.css";
import Script from "next/script";
import { generateMetadata } from "../lib/seo";
import { generatePersonSchema, generateWebsiteSchema } from "../lib/structured-data";
import StructuredData from "../components/StructuredData";
import dynamic from "next/dynamic";

import ErrorBoundary from "../components/ErrorBoundary";
import ConsentManager from "../components/ConsentManager";
import CookieConsent from "../components/CookieConsent";
import PageTransition from "../components/PageTransition";
import NavigationHandler from "../components/NavigationHandler";
import LazyMotionProvider from "../components/LazyMotionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: 'swap',
});

export const metadata: Metadata = generateMetadata({
  title: "Jose Acosta - Quantitative Developer | From Research to Execution",
  description: "Quantitative Developer building robust algorithmic trading systems — from research to execution. Backtesting infrastructure, live trading systems, and risk management backed by real-market experience. Python, time-series models, and low-latency pipelines.",
  keywords: [
    "Quantitative Developer",
    "Algorithmic Trading Systems",
    "Quant Developer",
    "Backtesting Infrastructure",
    "Live Trading Systems",
    "Trading Risk Management",
    "Python Quantitative Finance",
    "Time-Series Analysis",
    "Market Data Pipelines",
    "Systematic Trading",
    "Trading Algorithms",
    "Quantitative Research"
  ],
  ogType: "profile",
  canonical: "https://ajtradingsystems.com"
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050B14',
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

      </head>
      <body
        className={`${inter.variable} antialiased`}
      >

        {/* Navigation Handler */}
        <NavigationHandler />

        {/* Development-only components - removed to reduce bundle size */}

        {/* Consent Manager - Handles cookie consent and GA loading */}
        <ConsentManager>
          <LazyMotionProvider>
            {/* Error Boundary Wrapper */}
            <ErrorBoundary>
              <PageTransition>
                {children}
              </PageTransition>
            </ErrorBoundary>




            {/* Cookie Consent Banner */}
            <CookieConsent />
          </LazyMotionProvider>
        </ConsentManager>

        <Script id="retire-legacy-sw" strategy="afterInteractive" dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(async registrations => {
              for (const registration of registrations) {
                const worker = registration.active || registration.waiting || registration.installing;
                if (worker && new URL(worker.scriptURL).pathname === '/sw.js') {
                  await registration.unregister();
                }
              }
              if ('caches' in window) {
                for (const key of await caches.keys()) {
                  if (/^(portfolio|static|dynamic|pages)-v[0-9]+$/.test(key) || key === 'analytics-queue') await caches.delete(key);
                }
              }
            }).catch(() => {});
          }
        `}} />
      </body>
    </html>
  );
}
