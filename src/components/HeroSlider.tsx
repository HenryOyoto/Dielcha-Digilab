import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { brand, heroSlides } from "@/data/site";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 9000); return () => clearInterval(id); }, []);
  return (
    <section className="relative isolate overflow-hidden">
      {heroSlides.map((slide, i) => <img key={slide.label} src={slide.image} alt="" aria-hidden width={1600} height={900} loading={i === 0 ? "eager" : "lazy"} className={`absolute inset-0 size-full object-cover transition-opacity duration-[1800ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`} />)}
      <div className="hero-slide-overlay hero-slide-overlay--black absolute inset-0 is-active" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36">
        {/* Label hidden on the website: <p className="label-mono text-accent">{brand.name}</p> */}
        <h1 className="hero-copy mt-4 max-w-4xl text-4xl font-bold tracking-tight text-on-image md:text-6xl">Electronics, Embedded Systems &amp; Engineering Design</h1>
        <p className="hero-copy hero-copy--muted mt-5 max-w-3xl text-lg leading-8 text-on-image-muted md:text-xl">{brand.positioning}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/start-a-project" className="rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-destructive-foreground transition-colors hover:brightness-110">Start a Project</Link>
          <Link to="/work" className="rounded-md border border-on-image/60 px-6 py-3 text-sm font-semibold text-on-image transition-colors hover:bg-on-image hover:text-primary">View Our Projects</Link>
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-6">
          <div className="flex gap-2">{heroSlides.map((slide, i) => <button key={slide.label} type="button" aria-label={slide.label} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? "w-10 bg-accent" : "w-5 bg-on-image/50"}`} />)}</div>
          {/* Label hidden on the website: <p className="label-mono text-on-image">{heroSlides[index]?.label}</p> */}
        </div>
      </div>
    </section>
  );
}
