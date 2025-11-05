import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Configure for static export
export const dynamic = 'force-static';
export const revalidate = 300; // Revalidate every 5 minutes

interface BundleMetrics {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  firstLoadJS: number;
  budgetStatus: {
    js: 'within' | 'warning' | 'exceeded';
    css: 'within' | 'warning' | 'exceeded';
    total: 'within' | 'warning' | 'exceeded';
  };
  chunks: Array<{
    name: string;
    size: number;
    type: 'js' | 'css' | 'other';
  }>;
  recommendations: string[];
}

// Performance budgets (in bytes)
const BUDGETS = {
  totalJS: 244 * 1024,   // 244KB
  totalCSS: 50 * 1024,   // 50KB
  firstLoad: 128 * 1024, // 128KB
  total: 300 * 1024,     // 300KB
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getBudgetStatus(size: number, budget: number): 'within' | 'warning' | 'exceeded' {
  const ratio = size / budget;
  if (ratio <= 0.8) return 'within';
  if (ratio <= 1.0) return 'warning';
  return 'exceeded';
}

function analyzeBuildDirectory(): BundleMetrics | null {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    return null;
  }

  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;
  let imageSize = 0;
  let firstLoadJS = 0;
  const chunks: Array<{ name: string; size: number; type: 'js' | 'css' | 'other' }> = [];

  try {
    // Analyze static chunks
    const staticDir = path.join(buildDir, 'static');
    if (fs.existsSync(staticDir)) {
      const chunksDir = path.join(staticDir, 'chunks');
      if (fs.existsSync(chunksDir)) {
        const chunkFiles = fs.readdirSync(chunksDir);
        
        chunkFiles.forEach(file => {
          const filePath = path.join(chunksDir, file);
          const stats = fs.statSync(filePath);
          const size = stats.size;
          
          totalSize += size;
          
          if (file.endsWith('.js')) {
            jsSize += size;
            chunks.push({ name: file, size, type: 'js' });
            
            // Estimate first load JS (main chunks)
            if (file.includes('main') || file.includes('framework') || file.includes('webpack')) {
              firstLoadJS += size;
            }
          } else if (file.endsWith('.css')) {
            cssSize += size;
            chunks.push({ name: file, size, type: 'css' });
          } else {
            chunks.push({ name: file, size, type: 'other' });
          }
        });
      }

      // Analyze media files
      const mediaDir = path.join(staticDir, 'media');
      if (fs.existsSync(mediaDir)) {
        const mediaFiles = fs.readdirSync(mediaDir);
        mediaFiles.forEach(file => {
          const filePath = path.join(mediaDir, file);
          const stats = fs.statSync(filePath);
          imageSize += stats.size;
          totalSize += stats.size;
        });
      }
    }

    // Generate recommendations based on analysis
    const recommendations: string[] = [];
    
    if (jsSize > BUDGETS.totalJS) {
      recommendations.push(`JavaScript bundle is ${formatBytes(jsSize - BUDGETS.totalJS)} over budget`);
      recommendations.push('Consider code splitting and dynamic imports');
    }
    
    if (cssSize > BUDGETS.totalCSS) {
      recommendations.push(`CSS bundle is ${formatBytes(cssSize - BUDGETS.totalCSS)} over budget`);
      recommendations.push('Use CSS modules and remove unused styles');
    }
    
    if (firstLoadJS > BUDGETS.firstLoad) {
      recommendations.push('First load JS exceeds recommended size');
      recommendations.push('Move non-critical code to separate chunks');
    }

    // Find large chunks
    const largeChunks = chunks.filter(chunk => chunk.size > 50 * 1024);
    if (largeChunks.length > 0) {
      recommendations.push(`Found ${largeChunks.length} large chunks that could be optimized`);
    }

    if (recommendations.length === 0) {
      recommendations.push('Bundle size is within recommended limits');
      recommendations.push('Consider implementing progressive loading for better UX');
    }

    return {
      totalSize,
      jsSize,
      cssSize,
      imageSize,
      firstLoadJS,
      budgetStatus: {
        js: getBudgetStatus(jsSize, BUDGETS.totalJS),
        css: getBudgetStatus(cssSize, BUDGETS.totalCSS),
        total: getBudgetStatus(totalSize, BUDGETS.total),
      },
      chunks: chunks.sort((a, b) => b.size - a.size).slice(0, 10), // Top 10 largest chunks
      recommendations,
    };

  } catch (error) {
    console.error('Error analyzing build directory:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const metrics = analyzeBuildDirectory();
    
    if (!metrics) {
      return NextResponse.json(
        { 
          error: 'Build directory not found. Run "npm run build" first.',
          buildRequired: true 
        },
        { status: 404 }
      );
    }

    // Add cache headers for performance
    const response = NextResponse.json(metrics);
    response.headers.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    
    return response;

  } catch (error) {
    console.error('Bundle metrics API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze bundle metrics' },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint to trigger bundle analysis
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'analyze') {
      // In a real implementation, this could trigger a build and analysis
      const metrics = analyzeBuildDirectory();
      
      if (!metrics) {
        return NextResponse.json(
          { error: 'No build found to analyze' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        message: 'Bundle analysis completed',
        metrics,
        timestamp: new Date().toISOString(),
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Bundle analysis POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}