import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { services, type Service } from "@/data/site";
import { useReveal } from "@/components/useReveal";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* Hand-drawn service glyphs: electricity, chip, solid, document. */
export const glyphs: ReactNode[] = [
  <svg key="bolt" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2 4.5 13.5h6L9.5 22l9-11.5h-6z" fill="currentColor" /></svg>,
  <svg key="chip" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><rect x="7" y="7" width="10" height="10" rx="1.6" /><path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" /></svg>,
  <svg key="solid" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M12 2.5 3.5 7v10L12 21.5 20.5 17V7z" /><path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" /></svg>,
  <svg key="doc" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M6.5 3h8l4 4v14h-12z" /><path d="M14.5 3v4h4M9.5 12.5h6M9.5 16.5h6" /></svg>,
];

export const glow = ["var(--brand-blue)", "var(--brand-green)", "var(--brand-yellow)", "var(--brand-red)"];
const area = ["bento__a", "bento__b", "bento__c", "bento__d"];
/* Per-photo framing so each card shows the interesting part of its picture. */
const zoom = [1, 1.15, 1, 1.4];
const origin = ["50% 50%", "40% 55%", "50% 40%", "30% 60%"];

function BentoCard({ s, i }: { s: Service; i: number }) {
  const ref = useReveal<HTMLAnchorElement>(i * 90);
  return (
    <Link
      ref={ref}
      to="/services/$slug"
      params={{ slug: s.slug }}
      className={`bento-card ${area[i] ?? ""}`}
      style={{ "--glow": glow[i % glow.length] } as CSSProperties}
    >
      <img src={s.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="bento-card__img" style={{ "--zoom": zoom[i], "--origin": origin[i] } as CSSProperties} />
      <span className="bento-card__badge" style={i === 2 ? { color: "#151515" } : undefined}>{glyphs[i % glyphs.length]}</span>
      <span className="bento-card__go" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} strokeWidth={2.2}><path d="M7 17 17 7M8 7h9v9" /></svg>
      </span>
      <span className="bento-card__num">{s.number}</span>
      <h3 className="bento-card__title">{s.title}</h3>
      <span className="bento-card__tags">
        {s.tags.slice(0, 4).map((t) => <span key={t} className="bento-card__tag">{t}</span>)}
      </span>
    </Link>
  );
}

export function ServiceBento() {
  return (
    <div className="bento">
      {services.map((s, i) => <BentoCard key={s.slug} s={s} i={i} />)}
    </div>
  );
}
