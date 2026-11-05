import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

type Tone = "blue" | "green" | "red" | "yellow";

/** Compact page banner: breadcrumb, title, one-line intro, optional right-hand aside. */
export function PageHero({
  title, intro, tone = "yellow", crumbs, aside, image, children,
}: {
  title: string; image?: string; intro?: string; tone?: Tone;
  crumbs?: { label: string; to?: "/" | "/services" | "/work" | "/lab" | "/about" }[];
  aside?: ReactNode; children?: ReactNode;
}) {
  return (
    <section
      className={`pagehead pagehead--${tone} ${image ? "pagehead--image" : ""}`}
      style={image ? ({ "--hero-image": `url("${image}")` } as CSSProperties) : undefined}
    >
      <div className={`pagehead__inner ${aside ? "has-aside" : ""}`}>
        <div className="min-w-0">
          {crumbs && (
            <nav className="pagehead__crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex gap-1.5"><span aria-hidden="true">/</span>{c.to ? <Link to={c.to}>{c.label}</Link> : <span className="text-white">{c.label}</span>}</span>
              ))}
            </nav>
          )}
          <h1 className="pagehead__title">{title}</h1>
          {intro && <p className="pagehead__intro">{intro}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
