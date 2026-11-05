import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/site";

const INTERVAL_MS = 6500;

/**
 * Split hero: copy on the left, the slide image on the right, each slide on its own tinted background.
 * Slides change automatically. Dots, arrows, swipe and the keyboard override them at any time,
 * and the timer restarts from the slide the visitor picked.
 * Images are never cropped: they scale down as a whole, and on phones the image stacks under the copy.
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = heroSlides.length;

  const go = (to: number) => setIndex(((to % count) + count) % count);

  // Auto-advance. `index` is a dependency so any manual change restarts the countdown.
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [paused, index, count]);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Dielcha Digilab"
      // Only a real mouse hover pauses. Touch and clicks never leave the slider stuck.
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setPaused(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setPaused(false); }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        if (start === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      {heroSlides.map((slide, i) => (
        <div key={slide.label} className={`hero__bg hero__bg--${slide.tone} ${i === index ? "is-active" : ""}`} aria-hidden="true" />
      ))}

      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">Product Design, Embedded Systems and IoT</h1>
          <p className="hero__sub">From idea to design to reality</p>

          <div className="hero__lists">
            {heroSlides.map((slide, i) => (
              <ul key={slide.label} className={`hero__list ${i === index ? "is-active" : ""}`} aria-hidden={i !== index}>
                {slide.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            ))}
          </div>

          <div className="hero__actions">
            <Link to="/start-a-project" className="btn btn--primary">Start a project</Link>
            <Link to="/work" className="btn btn--outline">View projects</Link>
          </div>

          <div className="hero__controls">
            <button type="button" className="hero__arrow" aria-label="Previous slide" onClick={() => go(index - 1)}>
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <div className="hero__dots">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={slide.label}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={`hero__dot ${i === index ? "is-active" : ""}`}
                />
              ))}
            </div>
            <button type="button" className="hero__arrow" aria-label="Next slide" onClick={() => go(index + 1)}>
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
            <span className="hero__label" aria-live="polite">{heroSlides[index]?.label}</span>
          </div>
        </div>

        <div className="hero__stage">
          {heroSlides.map((slide, i) => (
            <img
              key={slide.label}
              src={slide.image}
              alt={i === index ? slide.alt : ""}
              aria-hidden={i !== index}
              width={slide.width}
              height={slide.height}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              decoding="async"
              className={`hero__img hero__img--${slide.fit} ${i === index ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
