import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  threshold?: number;
}

export function BackToTop({ threshold = 300 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
      size="icon"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
    </Button>
  );
}
