declare global {
  interface Window {
    gtag: (
      command: 'config' | 'consent' | 'event',
      targetId: string | 'update',
      config?: {
        analytics_storage?: 'granted' | 'denied';
        ad_storage?: 'granted' | 'denied';
        [key: string]: any;
      }
    ) => void;
  }
}

export {};