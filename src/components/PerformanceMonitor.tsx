import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor page load performance
    const measurePerformance = () => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const metrics = {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          ttfb: perfData.responseStart - perfData.requestStart,
          domInteractive: perfData.domInteractive - perfData.navigationStart,
        };

        // Only log if there are performance issues (over 3 seconds)
        if (metrics.domContentLoaded > 3000 || metrics.loadComplete > 5000) {
          console.warn('Performance Warning:', {
            domContentLoaded: `${metrics.domContentLoaded}ms`,
            loadComplete: `${metrics.loadComplete}ms`,
            ttfb: `${metrics.ttfb}ms`,
            domInteractive: `${metrics.domInteractive}ms`,
          });
        }
      }
    };

    // Check performance after page load
    if (document.readyState === 'complete') {
      setTimeout(measurePerformance, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(measurePerformance, 100);
      });
    }

    // Monitor memory usage in development
    if (process.env.NODE_ENV === 'development') {
      const checkMemory = () => {
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB threshold
            console.warn('High memory usage detected:', {
              used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
              total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
              limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`,
            });
          }
        }
      };

      const memoryInterval = setInterval(checkMemory, 10000); // Check every 10 seconds
      return () => clearInterval(memoryInterval);
    }
  }, []);

  return null; // This component doesn't render anything
}