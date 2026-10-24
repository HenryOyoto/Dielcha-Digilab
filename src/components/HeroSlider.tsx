import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { heroSlides } from "@/data/site";
import { HeroBird } from "@/components/HeroBird";

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" aria-label="Dielcha Digilab">
      {heroSlides.map((slide, i) => (
        <img
          key={slide.label}
          src={slide.image}
          alt={i === index ? slide.label : ""}
          aria-hidden={i !== index}
          width={1600}
          height={900}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`hero__slide ${i === index ? "is-active" : ""}`}
        />
      ))}
      <div className="hero__shade" aria-hidden />
      <div className="hero__inner">
        <h1 className="hero__title hero-rise">Engineering Design, Embedded Systems and IoT</h1>
        <p className="hero__sub hero-rise">From idea to finished product</p>
        <div className="hero__bar hero-rise">
          <Link to="/start-a-project" className="hero__btn hero__btn--solid">Start a project</Link>
          <Link to="/work" className="hero__btn hero__btn--ghost">View projects</Link>
          <div className="hero__dots" role="tablist" aria-label="Hero images">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.label}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={slide.label}
                onClick={() => setIndex(i)}
                className={`hero__dot ${i === index ? "is-active" : ""}`}
              />
            ))}
          </div>
          <span className="hero__label hidden sm:inline">{heroSlides[index]?.label}</span>
        </div>
      </div>
      <HeroBird />
    </section>
  );
}
