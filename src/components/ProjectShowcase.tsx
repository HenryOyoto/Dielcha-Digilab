import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { projectGallery, type Project } from "@/data/site";
import { useReveal } from "@/components/useReveal";

const icon = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (slug: string) => void }) {
  const ref = useReveal<HTMLButtonElement>((i % 3) * 90);
  return (
    <button ref={ref} type="button" className="pcard" onClick={() => onOpen(p.slug)} aria-haspopup="dialog" aria-label={`Quick view: ${p.title}`}>
      <img src={p.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="pcard__img" />
      <span className="pcard__tag">{p.category}</span>
      <span className="pcard__body">
        <span className="pcard__title block">{p.title}</span>
        <span className="pcard__view">
          Quick view
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" {...icon}><path d="M7 17 17 7M8 7h9v9" /></svg>
        </span>
      </span>
    </button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const gallery = projectGallery(project);
  const [idx, setIdx] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => setIdx((n) => (n + d + gallery.length) % gallery.length), [gallery.length]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [go, onClose]);

  const cur = gallery[idx];
  return (
    <div className="pmodal" role="dialog" aria-modal="true" aria-label={project.title} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pmodal__panel">
        <div className="pmodal__stage">
          <img key={cur.image} src={cur.image} alt={cur.caption} className="pmodal__main" decoding="async" />
          <span className="pmodal__caption">{cur.caption}</span>
          {gallery.length > 1 && (
            <>
              <button type="button" className="pmodal__nav pmodal__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...icon}><path d="m15 5-7 7 7 7" /></svg>
              </button>
              <button type="button" className="pmodal__nav pmodal__nav--next" onClick={() => go(1)} aria-label="Next image">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...icon}><path d="m9 5 7 7-7 7" /></svg>
              </button>
            </>
          )}
          <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...icon}><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        {gallery.length > 1 && (
          <div className="pmodal__thumbs" aria-label="Project images">
            {gallery.map((g, n) => (
              <button key={g.image} type="button" className="pmodal__thumb" aria-current={n === idx} aria-label={g.caption} onClick={() => setIdx(n)}>
                <img src={g.image} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        )}

        <div className="pmodal__info">
          <div className="min-w-0 flex-1" style={{ flexBasis: "18rem" }}>
            <span className="tag-yellow">{project.category}</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/75">{project.summary}</p>
          </div>
          <Link to="/work/$slug" params={{ slug: project.slug }} className="pmodal__cta" onClick={onClose}>
            Full case study
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...icon}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ProjectShowcase({ items, filterable = false }: { items: Project[]; filterable?: boolean }) {
  const [category, setCategory] = useState("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const categories = ["All", ...Array.from(new Set(items.map((p) => p.category)))];
  const shown = category === "All" ? items : items.filter((p) => p.category === category);
  const open = items.find((p) => p.slug === openSlug) ?? null;
  const close = useCallback(() => setOpenSlug(null), []);

  return (
    <div>
      {filterable && (
        <div className="pfilters" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button key={c} type="button" className="pfilter" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      )}
      <div className={`pgrid ${filterable ? "pgrid--wide mt-4" : ""}`}>
        {shown.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} onOpen={setOpenSlug} />)}
      </div>
      {open && <ProjectModal key={open.slug} project={open} onClose={close} />}
    </div>
  );
}

/** Inline gallery for the project page: same controls as the quick-view popup, without the dialog. */
export function ProjectGallery({ project }: { project: Project }) {
  const gallery = projectGallery(project);
  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx((n) => (n + d + gallery.length) % gallery.length);
  const cur = gallery[idx];
  if (!cur) return null;
  return (
    <div className="overflow-hidden rounded-2xl bg-[var(--navy)] shadow-lift" onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
      <div className="pmodal__stage">
        <img key={cur.image} src={cur.image} alt={cur.caption} className="pmodal__main" decoding="async" />
        <span className="pmodal__caption">{cur.caption}</span>
        {gallery.length > 1 && (
          <>
            <button type="button" className="pmodal__nav pmodal__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...icon}><path d="m15 5-7 7 7 7" /></svg>
            </button>
            <button type="button" className="pmodal__nav pmodal__nav--next" onClick={() => go(1)} aria-label="Next image">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...icon}><path d="m9 5 7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
      {gallery.length > 1 && (
        <div className="pmodal__thumbs" style={{ paddingBottom: "0.8rem" }}>
          {gallery.map((g, n) => (
            <button key={g.image} type="button" className="pmodal__thumb" aria-current={n === idx} aria-label={g.caption} onClick={() => setIdx(n)}>
              <img src={g.image} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
