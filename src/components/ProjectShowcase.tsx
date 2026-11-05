import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { projectGallery, type Project } from "@/data/site";

const icon = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Plain project cards: each links to its case study. */
export function ProjectShowcase({ items }: { items: Project[] }) {
  return (
    <div className="pgrid">
      {items.map((p) => (
        <Link key={p.slug} to="/work/$slug" params={{ slug: p.slug }} className="pcard">
          <span className="pcard__media">
            <img src={p.image} alt="" loading="lazy" decoding="async" className="pcard__img" />
          </span>
          <span className="pcard__body">
            <span className="pcard__cat">{p.category}</span>
            <span className="pcard__title">{p.title}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/** Inline gallery for the project page. */
export function ProjectGallery({ project }: { project: Project }) {
  const gallery = projectGallery(project);
  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx((n) => (n + d + gallery.length) % gallery.length);
  const cur = gallery[idx];
  if (!cur) return null;
  return (
    <div className="gallery" onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
      <div className="gallery__stage">
        <img key={cur.image} src={cur.image} alt={cur.caption} className="gallery__main" decoding="async" />
        <span className="gallery__caption">{cur.caption}</span>
        {gallery.length > 1 && (
          <>
            <button type="button" className="gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...icon}><path d="m15 5-7 7 7 7" /></svg>
            </button>
            <button type="button" className="gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Next image">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...icon}><path d="m9 5 7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
      {gallery.length > 1 && (
        <div className="gallery__thumbs">
          {gallery.map((g, n) => (
            <button key={g.image} type="button" className="gallery__thumb" aria-current={n === idx} aria-label={g.caption} onClick={() => setIdx(n)}>
              <img src={g.image} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
