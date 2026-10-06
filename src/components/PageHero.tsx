import type { ReactNode } from "react";

type Props = {
  image: string;
  title: string;
  intro?: string;
  label?: string;
  tone?: "blue" | "green" | "red";
  children?: ReactNode;
};

export function PageHero({ image, title, intro, label, tone = "blue", children }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt=""
        aria-hidden
        width={1600}
        height={700}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="page-hero-overlay page-hero-overlay--black absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        {label && <p className="section-kicker text-on-image hero-copy">{label}</p>}
        <h1 className="hero-copy mt-4 max-w-4xl text-4xl font-bold text-on-image md:text-5xl">{title}</h1>
        {intro && <p className="hero-copy hero-copy--muted mt-5 max-w-2xl text-lg text-on-image-muted">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
