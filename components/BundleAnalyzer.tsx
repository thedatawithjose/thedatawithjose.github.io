'use client';

import { useState, useEffect } from 'react';

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
}

interface BundleAnalyzerProps {
  className?: string;
}

export default function BundleAnalyzer({ className = '' }: BundleAnalyzerProps) {
  const [metrics, setMetrics] = useState<BundleMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBundleMetrics();
  }, []);

  const fetchBundleMetrics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/bundle-metrics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.buildRequired) {
          setError('Build required. Run "npm run build" first to analyze bundle.');
        } else {
          setError(errorData.error || 'Failed to fetch bundle metrics');
        }
        return;
      }

      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      setError('Failed to fetch bundle metrics');
      console.error('Bundle metrics error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: 'within' | 'warning' | 'exceeded'): string => {
    switch (status) {
      case 'within': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'exceeded': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: 'within' | 'warning' | 'exceeded'): string => {
    switch (status) {
      case 'within': return '✅';
      case 'warning': return '⚠️';
      case 'exceeded': return '❌';
      default: return '❓';
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-red-600">
          <h3 className="text-lg font-semibold mb-2">Bundle Analysis Error</h3>
          <p>{error}</p>
          <button
            onClick={fetchBundleMetrics}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const budgets = {
    js: 244 * 1024,   // 244KB
    css: 50 * 1024,   // 50KB
    total: 300 * 1024, // 300KB
    firstLoad: 128 * 1024, // 128KB
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Bundle Analysis</h3>
        <button
          onClick={fetchBundleMetrics}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total Bundle</span>
            <span className={`text-sm font-semibold ${getStatusColor(metrics.budgetStatus.total)}`}>
              {getStatusIcon(metrics.budgetStatus.total)} {formatBytes(metrics.totalSize)}
            </span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                metrics.budgetStatus.total === 'within' ? 'bg-green-500' :
                metrics.budgetStatus.total === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((metrics.totalSize / budgets.total) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Budget: {formatBytes(budgets.total)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">First Load JS</span>
            <span className="text-sm font-semibold text-gray-900">
              {formatBytes(metrics.firstLoadJS)}
            </span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                metrics.firstLoadJS <= budgets.firstLoad ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((metrics.firstLoadJS / budgets.firstLoad) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Budget: {formatBytes(budgets.firstLoad)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">JavaScript</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getStatusColor(metrics.budgetStatus.js)}`}>
              {getStatusIcon(metrics.budgetStatus.js)}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {formatBytes(metrics.jsSize)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">CSS</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getStatusColor(metrics.budgetStatus.css)}`}>
              {getStatusIcon(metrics.budgetStatus.css)}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {formatBytes(metrics.cssSize)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-600">Images</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatBytes(metrics.imageSize)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Performance Budget Status</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <span className="text-blue-600 text-sm">💡</span>
          <div className="text-xs text-blue-800">
            <p className="font-medium mb-1">Optimization Tips:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Use dynamic imports for large components</li>
              <li>• Implement code splitting at route level</li>
              <li>• Run "npm run analyze" for detailed analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}