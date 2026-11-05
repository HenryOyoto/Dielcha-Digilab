import { Link } from "@tanstack/react-router";
import { services } from "@/data/site";

/** Four plain service cards: photo, title and one line. No badges or icons. */
export function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map((s) => (
        <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="service-card">
          <img src={s.image} alt="" loading="lazy" decoding="async" className="service-card__img" />
          <span className="service-card__body">
            <span className="service-card__title">{s.title}</span>
            <span className="service-card__text">{s.short}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
