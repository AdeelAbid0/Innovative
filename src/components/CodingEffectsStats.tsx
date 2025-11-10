import React, { useEffect, useState } from 'react';

/**
 * Development-only component to monitor coding effects performance
 * Shows FPS and memory usage
 * Remove or disable in production
 */
export function CodingEffectsStats() {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;

        // Measure memory if available
        if ((performance as any).memory) {
          const memoryMB = (performance as any).memory.usedJSHeapSize / 1048576;
          setMemory(Math.round(memoryMB));
        }
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Toggle visibility with keyboard shortcut (Ctrl+Shift+D)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-[9999] bg-black/80 backdrop-blur-sm border border-primary/30 rounded-lg p-4 font-mono text-xs">
      <div className="space-y-2">
        <div className="text-primary font-semibold border-b border-primary/30 pb-2 mb-2">
          Coding Effects Stats
        </div>
        
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">FPS:</span>
          <span className={`font-semibold ${fps >= 55 ? 'text-green-500' : fps >= 30 ? 'text-yellow-500' : 'text-red-500'}`}>
            {fps}
          </span>
        </div>

        {memory > 0 && (
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Memory:</span>
            <span className="text-primary">{memory} MB</span>
          </div>
        )}

        <div className="text-[10px] text-muted-foreground pt-2 border-t border-primary/20">
          Press Ctrl+Shift+D to toggle
        </div>
      </div>
    </div>
  );
}

/**
 * Usage in HomePage.tsx or App.tsx (development only):
 * 
 * import { CodingEffectsStats } from '../CodingEffectsStats';
 * 
 * // Add anywhere in JSX (preferably at root level)
 * <CodingEffectsStats />
 */
