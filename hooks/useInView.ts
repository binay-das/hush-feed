import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0, triggerOnce = false } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const alreadyTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce && alreadyTriggered.current) return;
        
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            alreadyTriggered.current = true;
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce]);

  return { ref, inView };
}