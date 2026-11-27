'use client';
import { useEffect, useCallback } from 'react';
import { initWebVitals } from '../lib/web-vitals';
import { trackEvent } from '../lib/analytics';
export default function WebVitalsTracker({ debug = false }: { debug?: boolean }) {
  useEffect(() => { initWebVitals(); }, [debug]);
  return null;
}
export function useWebVitals() {
  const trackCustomMetric = useCallback((name: string, value: number, _additionalData?: unknown) => {
    if (Number.isFinite(value)) trackEvent('performance_metric', { metric_name: name, value });
  }, []);
  return { trackCustomMetric };
}
