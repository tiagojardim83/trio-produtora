import { useEffect, useRef, useState } from "react";

/**
 * Tracks viewport intersection and replays on every entry — scrolling down
 * into the section or back up into it both re-trigger `inView`, so callers
 * can key CSS transitions off it for a repeatable reveal animation.
 *
 * threshold stays at 0 on purpose: for a tall element (e.g. a two-column
 * grid), requiring a large visible fraction means it never fires until the
 * section is scrolled deep into view. Firing on first pixel + trimming the
 * root with rootMargin gives a consistent trigger point regardless of the
 * observed element's height.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView } as const;
}
