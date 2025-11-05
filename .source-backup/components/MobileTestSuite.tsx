'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile, useDeviceOrientation, SwipeableCarousel } from './MobileEnhancements';

interface MobileTestResult {
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

export default function MobileTestSuite() {
  const [testResults, setTestResults] = useState<MobileTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const isMobile = useIsMobile();
  const orientation = useDeviceOrientation();

  const runMobileTests = async () => {
    setIsRunning(true);
    const results: MobileTestResult[] = [];

    // Test 1: Viewport Meta Tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    results.push({
      test: 'Viewport Meta Tag',
      status: viewportMeta ? 'pass' : 'fail',
      message: viewportMeta ? 'Viewport meta tag is present' : 'Missing viewport meta tag'
    });

    // Test 2: Touch Target Size
    const buttons = document.querySelectorAll('button, a');
    let smallTargets = 0;
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        smallTargets++;
      }
    });
    results.push({
      test: 'Touch Target Size',
      status: smallTargets === 0 ? 'pass' : smallTargets < 3 ? 'warning' : 'fail',
      message: `${smallTargets} elements smaller than 44px found`
    });

    // Test 3: Font Size
    const bodyFontSize = window.getComputedStyle(document.body).fontSize;
    const fontSize = parseInt(bodyFontSize);
    results.push({
      test: 'Font Size',
      status: fontSize >= 16 ? 'pass' : 'warning',
      message: `Base font size: ${fontSize}px`
    });

    // Test 4: Horizontal Scrolling
    const hasHorizontalScroll = document.body.scrollWidth > window.innerWidth;
    results.push({
      test: 'Horizontal Scrolling',
      status: hasHorizontalScroll ? 'fail' : 'pass',
      message: hasHorizontalScroll ? 'Horizontal scrolling detected' : 'No horizontal scrolling'
    });

    // Test 5: Touch Events
    const hasTouchSupport = 'ontouchstart' in window;
    results.push({
      test: 'Touch Support',
      status: hasTouchSupport ? 'pass' : 'warning',
      message: hasTouchSupport ? 'Touch events supported' : 'Touch events not detected'
    });

    // Test 6: Performance
    const performanceEntries = performance.getEntriesByType('navigation');
    const loadTime = performanceEntries.length > 0 ? 
      (performanceEntries[0] as PerformanceNavigationTiming).loadEventEnd - 
      (performanceEntries[0] as PerformanceNavigationTiming).loadEventStart : 0;
    
    results.push({
      test: 'Page Load Time',
      status: loadTime < 3000 ? 'pass' : loadTime < 5000 ? 'warning' : 'fail',
      message: `Load time: ${Math.round(loadTime)}ms`
    });

    // Test 7: Safe Area Support
    const hasSafeArea = CSS.supports('padding-top: env(safe-area-inset-top)');
    results.push({
      test: 'Safe Area Support',
      status: hasSafeArea ? 'pass' : 'warning',
      message: hasSafeArea ? 'Safe area insets supported' : 'Safe area insets not supported'
    });

    // Test 8: Orientation Support
    results.push({
      test: 'Orientation Detection',
      status: 'pass',
      message: `Current orientation: ${orientation}`
    });

    // Test 9: Text Readability
    const smallTexts = document.querySelectorAll('.text-xs, .text-sm');
    const readabilityIssues = Array.from(smallTexts).filter(el => {
      const styles = window.getComputedStyle(el);
      const fontSize = parseInt(styles.fontSize);
      return fontSize < 14;
    }).length;
    
    results.push({
      test: 'Text Readability',
      status: readabilityIssues === 0 ? 'pass' : readabilityIssues < 5 ? 'warning' : 'fail',
      message: `${readabilityIssues} elements with text smaller than 14px`
    });

    // Test 10: Grid Responsiveness
    const grids = document.querySelectorAll('[class*="grid-cols"]');
    let responsiveGrids = 0;
    grids.forEach(grid => {
      const classes = grid.className;
      if (classes.includes('sm:') || classes.includes('md:') || classes.includes('lg:')) {
        responsiveGrids++;
      }
    });
    
    results.push({
      test: 'Responsive Grids',
      status: responsiveGrids === grids.length ? 'pass' : 'warning',
      message: `${responsiveGrids}/${grids.length} grids are responsive`
    });

    setTestResults(results);
    setIsRunning(false);
  };

  useEffect(() => {
    // Auto-run tests on mobile devices
    if (isMobile) {
      setTimeout(runMobileTests, 1000);
    }
  }, [isMobile]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return 'fas fa-check-circle text-green-500';
      case 'warning':
        return 'fas fa-exclamation-triangle text-yellow-500';
      case 'fail':
        return 'fas fa-times-circle text-red-500';
      default:
        return 'fas fa-question-circle text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'fail':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  // Test carousel items
  const carouselItems = [
    <div key="1" className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4">Swipe Test 1</h3>
      <p>This is the first slide. Swipe left to see the next one!</p>
    </div>,
    <div key="2" className="p-8 bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4">Swipe Test 2</h3>
      <p>Great! You can swipe. Try swiping right to go back.</p>
    </div>,
    <div key="3" className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4">Swipe Test 3</h3>
      <p>Perfect! Swipe gestures are working correctly.</p>
    </div>
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);

  if (!isMobile) {
    return null; // Don't show anything on desktop
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-mobile-alt mr-2"></i>
            <span className="font-semibold">Mobile UX Test Suite</span>
          </div>
          <button
            onClick={runMobileTests}
            disabled={isRunning}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
          >
            {isRunning ? 'Testing...' : 'Run Tests'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-80 overflow-y-auto">
        {/* Device Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Device Info</h4>
          <div className="text-sm space-y-1">
            <div>Screen: {window.innerWidth}x{window.innerHeight}</div>
            <div>Orientation: {orientation}</div>
            <div>User Agent: {navigator.userAgent.substring(0, 50)}...</div>
          </div>
        </div>

        {/* Swipe Test */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Swipe Gesture Test</h4>
          <SwipeableCarousel
            currentIndex={carouselIndex}
            onIndexChange={setCarouselIndex}
          >
            {carouselItems}
          </SwipeableCarousel>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Test Results</h4>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className={`${getStatusIcon(result.status)} mr-2`}></i>
                      <span className="font-medium text-sm">{result.test}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{result.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {testResults.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm">
              <strong>Summary:</strong>{' '}
              {testResults.filter(r => r.status === 'pass').length} passed,{' '}
              {testResults.filter(r => r.status === 'warning').length} warnings,{' '}
              {testResults.filter(r => r.status === 'fail').length} failed
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}