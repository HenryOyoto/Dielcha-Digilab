import { useEffect, useRef } from "react";

/**
 * Fades an element in the first time it scrolls into view.
 * Elements already on screen on load are left alone, and nothing is hidden
 * when the visitor prefers reduced motion or the browser lacks IntersectionObserver.
 */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    el.classList.add("reveal-hide");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-hide");
          el.classList.add("reveal-in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}
