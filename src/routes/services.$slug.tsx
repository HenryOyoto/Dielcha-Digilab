import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { ToolList } from "@/components/Toolbox";
import { WhatsAppLink } from "@/components/ContactLinks";
import { WhatsAppGlyph } from "@/components/SocialIcons";
import { serviceProjectCategories } from "@/data/content";
import { projects, services } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDescription },
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
});

const tones = ["blue", "green", "yellow", "red"] as const;

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const i = Math.max(0, services.findIndex((s) => s.slug === service.slug));
  const related = projects.filter((p) => (serviceProjectCategories[service.slug] ?? []).includes(p.category)).slice(0, 4);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <PageShell>
      <PageHero
        tone={tones[i]}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.title }]}
        title={service.title}
        intro={service.short}
        aside={<img src={service.image} alt="" decoding="async" className="pagehead__photo" />}
      />

      <section className="section">
        <div className={`container-x detail tone-${tones[i]}`}>
          <div className="detail__main">
            <div className="card">
              <h2 className="card__title">What this is</h2>
              <p className="card__text">{service.overview}</p>
              <p className="note">{service.requirement}</p>
            </div>

            <div className="card">
              <h2 className="card__title">How it works</h2>
              <ol className="flow">
                {service.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="card">
              <h2 className="card__title">What we can do</h2>
              <ul className="chips">
                {service.capabilities.map((c) => (
                  <li key={c} className="chip">{c}</li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2 className="card__title">Tools we use</h2>
              <ToolList keys={service.tools} />
            </div>

            {related.length > 0 && (
              <div className="card">
                <h2 className="card__title">Related projects</h2>
                <ul className="rowlist">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link to="/work/$slug" params={{ slug: p.slug }} className="rowlist__item">
                        <span>{p.title}</span>
                        <span className="chip">{p.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="detail__aside">
            <div className="card">
              <h2 className="card__title card__title--sm">You receive</h2>
              <ul className="checks">
                {service.deliverables.map((d) => (
                  <li key={d}><Check className="size-4" aria-hidden="true" />{d}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="card__title card__title--sm">Great for</h2>
              <ul className="checks">
                {service.audience.map((a) => (
                  <li key={a}><Check className="size-4" aria-hidden="true" />{a}</li>
                ))}
              </ul>
            </div>
            <div className="cta-card">
              <p className="cta-card__title">Want to start?</p>
              <p className="cta-card__text">Tell us what you have. We agree the scope with you before any work begins.</p>
              <Link to="/start-a-project" search={{ service: service.slug }} className="btn btn--gold">
                Start a project <ArrowRight className="size-4" />
              </Link>
              <WhatsAppLink className="btn btn--wa">
                <WhatsAppGlyph className="size-5" /> Chat on WhatsApp
              </WhatsAppLink>
            </div>
          </aside>
        </div>

        <div className="container-x others">
          <span className="others__label">Other services</span>
          {others.map((o) => (
            <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="pill-link">
              {o.title}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
