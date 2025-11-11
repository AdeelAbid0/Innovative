import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface UseOptimizedScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useOptimizedScrollAnimation(
  options: UseOptimizedScrollAnimationOptions = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    once = true,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use requestIdleCallback for better performance
    const scheduleAnimation = (callback: () => void) => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(callback, { timeout: 100 });
      } else {
        requestAnimationFrame(callback);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scheduleAnimation(() => {
              setIsVisible(true);
              if (once) {
                observer.unobserve(element);
              }
            });
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { elementRef, isVisible };
}

// Simple component wrapper for scroll animations
export function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
  ...options
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
} & UseOptimizedScrollAnimationOptions) {
  const { elementRef, isVisible } = useOptimizedScrollAnimation(options);

  return (
    <div
      ref={elementRef}
      className={`scroll-fade-in ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
