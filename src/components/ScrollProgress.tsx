import React, { useState, useEffect, useCallback } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  // Throttle function to limit how often the scroll handler runs
  const throttle = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    
    return (...args: any[]) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  };

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setProgress(Math.min(scrollPercent, 100));
  }, []);

  // Throttled scroll handler - only runs every 16ms (~60fps)
  const throttledUpdateProgress = useCallback(
    throttle(updateProgress, 16),
    [updateProgress]
  );

  useEffect(() => {
    // Initial progress calculation
    updateProgress();

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', throttledUpdateProgress, { passive: true });
    window.addEventListener('resize', throttledUpdateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledUpdateProgress);
      window.removeEventListener('resize', throttledUpdateProgress);
    };
  }, [throttledUpdateProgress, updateProgress]);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-transform duration-300 ease-out"
      style={{ 
        width: `${progress}%`,
        transformOrigin: 'left',
        willChange: 'width'
      }}
    />
  );
}