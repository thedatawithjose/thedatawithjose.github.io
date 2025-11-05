import { NextRequest, NextResponse } from 'next/server';
import { withSecurity, withLogging } from '../../../../lib/api-security';

async function handleWebVitalsReport(request: NextRequest) {
  try {
    const report = await request.json();
    
    // Validate the report
    if (!report.timestamp || !report.url) {
      return NextResponse.json(
        { error: 'Invalid web vitals report' },
        { status: 400 }
      );
    }

    // Calculate overall performance score
    const performanceScore = calculatePerformanceScore(report);
    
    // In development, log the complete report
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals Report]', {
        url: report.url,
        performanceScore,
        metrics: {
          LCP: report.lcp ? `${report.lcp}ms` : 'N/A',
          CLS: report.cls ? report.cls.toFixed(3) : 'N/A',
          INP: report.inp ? `${report.inp}ms` : 'N/A',
          FCP: report.fcp ? `${report.fcp}ms` : 'N/A',
          TTFB: report.ttfb ? `${report.ttfb}ms` : 'N/A',
        },
        timestamp: new Date(report.timestamp).toISOString(),
      });
    }

    // In production, store the complete report
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement actual storage
      // await storeWebVitalsReport({
      //   ...report,
      //   performanceScore,
      //   createdAt: new Date(),
      // });
    }

    return NextResponse.json({ 
      success: true, 
      performanceScore 
    });
  } catch (error) {
    console.error('Error processing web vitals report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculatePerformanceScore(report: any): number {
  let score = 100;
  let totalWeight = 0;

  // LCP (25% weight)
  if (report.lcp) {
    const lcpScore = report.lcp <= 2500 ? 100 : report.lcp <= 4000 ? 50 : 0;
    score += lcpScore * 0.25;
    totalWeight += 0.25;
  }

  // INP (25% weight) - replaces FID in modern Core Web Vitals
  if (report.inp) {
    const inpScore = report.inp <= 200 ? 100 : report.inp <= 500 ? 50 : 0;
    score += inpScore * 0.25;
    totalWeight += 0.25;
  }

  // CLS (25% weight)
  if (report.cls !== undefined) {
    const clsScore = report.cls <= 0.1 ? 100 : report.cls <= 0.25 ? 50 : 0;
    score += clsScore * 0.25;
    totalWeight += 0.25;
  }

  // FCP (15% weight)
  if (report.fcp) {
    const fcpScore = report.fcp <= 1800 ? 100 : report.fcp <= 3000 ? 50 : 0;
    score += fcpScore * 0.15;
    totalWeight += 0.15;
  }

  // TTFB (10% weight)
  if (report.ttfb) {
    const ttfbScore = report.ttfb <= 800 ? 100 : report.ttfb <= 1800 ? 50 : 0;
    score += ttfbScore * 0.10;
    totalWeight += 0.10;
  }

  // Normalize score based on available metrics
  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) / 100 : 0;
}

// Apply security middleware
export const POST = withLogging(
  withSecurity(handleWebVitalsReport, {
    rateLimit: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 requests per minute
    allowedMethods: ['POST'],
  })
);