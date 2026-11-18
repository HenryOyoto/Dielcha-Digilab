import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { OrbitArt } from "@/components/OrbitArt";

type Tone = "blue" | "green" | "red" | "yellow";

/**
 * Page banner: breadcrumb, large title, one-line intro and an optional right-hand aside.
 * Pass `image` for a photo banner (used on project pages), otherwise a soft tinted banner is drawn.
 */
export function PageHero({
  title,
  intro,
  tone = "blue",
  crumbs,
  aside,
  image,
  children,
}: {
  title: string;
  image?: string;
  intro?: string;
  tone?: Tone;
  crumbs?: { label: string; to?: "/" | "/services" | "/work" | "/lab" | "/about" }[];
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      className={`pagehead pagehead--${tone} ${image ? "pagehead--image" : ""}`}
      style={image ? ({ "--hero-image": `url("${image}")` } as CSSProperties) : undefined}
    >
      {!image && <OrbitArt className="pagehead__orbit" dot={false} />}
      <div className={`container-x pagehead__inner ${aside ? "has-aside" : ""}`}>
        <div className="min-w-0">
          {crumbs && (
            <nav className="pagehead__crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {crumbs.map((c) => (
                <span key={c.label} className="pagehead__crumb">
                  <span aria-hidden="true">/</span>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span className="pagehead__here">{c.label}</span>}
                </span>
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
