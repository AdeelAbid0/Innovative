import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
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
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
}

export function useStaggeredAnimation(itemCount: number, options: UseScrollAnimationOptions = {}) {
  const { elementRef, isVisible } = useScrollAnimation(options);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setVisibleItems(prev => {
          const nextIndex = prev.findIndex(item => !item);
          if (nextIndex === -1) {
            clearInterval(timer);
            return prev;
          }
          const newArray = [...prev];
          newArray[nextIndex] = true;
          return newArray;
        });
      }, 150); // Stagger delay of 150ms

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return { elementRef, isVisible, visibleItems };
}