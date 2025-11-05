'use client';

import { useState, useEffect } from 'react';
import BundleAnalyzer from './BundleAnalyzer';

interface PerformanceAlert {
  timestamp: string;
  violations: Array<{
    type: string;
    current: number;
    budget: number;
    excess: number;
    severity: 'high' | 'medium' | 'low';
  }>;
  severity: 'high' | 'medium' | 'low';
}

interface PerformanceDashboardProps {
  className?: string;
}

export default function PerformanceDashboard({ className = '' }: PerformanceDashboardProps) {
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    fetchPerformanceData();
    
    // Set up periodic refresh
    const interval = setInterval(fetchPerformanceData, 5 * 60 * 1000); // Every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const fetchPerformanceData = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would fetch from an API
      // For now, we'll simulate some alerts
      const mockAlerts: PerformanceAlert[] = [
        {
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          violations: [],
          severity: 'low',
        }
      ];
      
      setAlerts(mockAlerts);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
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

  const getSeverityColor = (severity: 'high' | 'medium' | 'low'): string => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: 'high' | 'medium' | 'low'): string => {
    switch (severity) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return '✅';
      default: return '❓';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Performance Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
            </span>
            <button
              onClick={fetchPerformanceData}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Performance Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-green-600 text-lg mr-2">✅</span>
              <div>
                <div className="text-sm font-medium text-green-800">Bundle Status</div>
                <div className="text-xs text-green-600">Within budget limits</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-blue-600 text-lg mr-2">📊</span>
              <div>
                <div className="text-sm font-medium text-blue-800">Monitoring</div>
                <div className="text-xs text-blue-600">Active performance tracking</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-purple-600 text-lg mr-2">🎯</span>
              <div>
                <div className="text-sm font-medium text-purple-800">Optimization</div>
                <div className="text-xs text-purple-600">Budget-based alerts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bundle Analyzer */}
      <BundleAnalyzer />

      {/* Performance Alerts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Alerts</h3>
        
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-gray-400 text-4xl mb-2 block">🎉</span>
            <p className="text-gray-600">No performance alerts</p>
            <p className="text-sm text-gray-500 mt-1">All metrics are within budget limits</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{getSeverityIcon(alert.severity)}</span>
                    <div>
                      <div className="font-medium">
                        {alert.violations.length > 0 
                          ? `${alert.violations.length} Budget Violation${alert.violations.length > 1 ? 's' : ''}`
                          : 'All Clear'
                        }
                      </div>
                      <div className="text-sm opacity-75">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>

                {alert.violations.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {alert.violations.map((violation, vIndex) => (
                      <div key={vIndex} className="text-sm">
                        <span className="font-medium">{violation.type}:</span>{' '}
                        {formatBytes(violation.current)} (
                        {formatBytes(violation.excess)} over budget of {formatBytes(violation.budget)})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => window.open('/api/bundle-metrics', '_blank')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-blue-600 text-lg mb-1">📊</div>
            <div className="font-medium text-gray-900">View Metrics</div>
            <div className="text-sm text-gray-500">Raw bundle data</div>
          </button>

          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.alert('Run "npm run analyze" in your terminal to open the interactive bundle analyzer');
              }
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-green-600 text-lg mb-1">🔍</div>
            <div className="font-medium text-gray-900">Analyze Bundle</div>
            <div className="text-sm text-gray-500">Interactive analyzer</div>
          </button>

          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.alert('Run "npm run analyze:budget" in your terminal to check performance budgets');
              }
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-yellow-600 text-lg mb-1">🎯</div>
            <div className="font-medium text-gray-900">Check Budgets</div>
            <div className="text-sm text-gray-500">Budget analysis</div>
          </button>

          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.alert('Run "npm run monitor:watch" in your terminal to start continuous monitoring');
              }
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-purple-600 text-lg mb-1">👀</div>
            <div className="font-medium text-gray-900">Start Monitoring</div>
            <div className="text-sm text-gray-500">Continuous tracking</div>
          </button>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Performance Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Bundle Optimization:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Use dynamic imports for large components</li>
              <li>• Implement code splitting at route level</li>
              <li>• Remove unused dependencies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Performance Budgets:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• JavaScript: &lt; 244KB</li>
              <li>• CSS: &lt; 50KB</li>
              <li>• First Load JS: &lt; 128KB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}