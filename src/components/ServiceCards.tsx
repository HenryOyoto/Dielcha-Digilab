import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/site";

const tones = ["blue", "green", "yellow", "red"] as const;

/** Four service cards: a photo, a plain promise, and a link to the detail page. */
export function ServiceCards() {
  return (
    <div className="svc-grid">
      {services.map((s, i) => (
        <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className={`svc-card tone-${tones[i % tones.length]}`}>
          <span className="svc-card__media">
            <img src={s.image} alt="" loading="lazy" />
            <span className="svc-card__num">{s.number}</span>
          </span>
          <span className="svc-card__body">
            <span className="svc-card__title">{s.title}</span>
            <span className="svc-card__text">{s.short}</span>
            <span className="svc-card__tags">
              {s.tags.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </span>
          </span>
          <span className="svc-card__go" aria-hidden="true">
            <ArrowUpRight className="size-5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
