import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/site";
import { OrbitArt } from "@/components/OrbitArt";

const INTERVAL_MS = 6500;

/**
 * Home page hero: an inviting headline on the left, and a slow image stage on the right.
 * The slides cycle on their own, pause on hover or focus, and stay still for visitors who prefer less motion.
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = heroSlides.length;

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(q.matches);
    const on = () => setReduced(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, reduced, count]);

  const go = (n: number) => setIndex(((n % count) + count) % count);
  const slide = heroSlides[index];

  return (
    <section
      className={`hero hero--${slide.tone}`}
      aria-roledescription="carousel"
      aria-label="Featured engineering work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="hero__dots-bg" aria-hidden="true" />
      <OrbitArt className="hero__orbit" />

      <div className="container-x hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            Got an idea?
            <span className="hero__title-line">
              Let&rsquo;s make it <span className="mark mark--gold">real.</span>
            </span>
          </h1>
          <p className="hero__sub">
            Bring us a rough sketch, a half-built prototype or just a problem that will not leave you alone. We will work it out with you, one step at a time.
          </p>
          <div className="hero__actions">
            <Link to="/start-a-project" className="btn btn--primary btn--lg">
              Tell us your idea <ArrowRight className="size-5" />
            </Link>
            <Link to="/work" className="btn btn--ghost btn--lg">
              See what we have built
            </Link>
          </div>
          <p className="hero__note">No pressure. A rough idea is a perfectly good place to start.</p>
        </div>

        <div className="hero__stage">
          <div className="stage" aria-live="polite">
            {heroSlides.map((s, i) => (
              <div key={s.label} className={`stage__slide ${i === index ? "is-on" : ""}`} aria-hidden={i !== index}>
                <img
                  src={s.image}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  className="stage__img"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </div>
            ))}
            <span className="stage__pad stage__pad--a" aria-hidden="true" />
            <span className="stage__pad stage__pad--b" aria-hidden="true" />
          </div>

          <div className="hero__ctrl" role="group" aria-label="Slide controls">
            <button type="button" className="ctl" onClick={() => go(index - 1)} aria-label="Previous slide">
              <ChevronLeft className="size-[18px]" />
            </button>
            <div className="dots">
              {heroSlides.map((s, i) => (
                <button key={s.label} type="button" className={`dot ${i === index ? "is-on" : ""}`} aria-label={`Show ${s.label}`} aria-current={i === index} onClick={() => go(i)} />
              ))}
            </div>
            <button type="button" className="ctl" onClick={() => go(index + 1)} aria-label="Next slide">
              <ChevronRight className="size-[18px]" />
            </button>
            <span className="hero__caption">{slide.label}</span>
          </div>
        </div>
      </div>

      <svg className="hero__wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 50C200 5 420 95 700 52 980 8 1200 85 1440 30V90H0Z" />
      </svg>
    </section>
  );
}
