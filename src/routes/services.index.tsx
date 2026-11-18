import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { ToolList } from "@/components/Toolbox";
import { services } from "@/data/site";

const tones = ["blue", "green", "yellow", "red"] as const;

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services - Dielcha Digilab" },
      { name: "description", content: "Electronics and PCB design, embedded systems and IoT, product CAD and technical documentation from Dielcha Digilab." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        tone="green"
        crumbs={[{ label: "Services" }]}
        title="Four ways we can help."
        intro="Whether you need a board, the code that runs on it, a case to put it in or the paperwork to go with it, we can take it from here."
      />

      <section className="section">
        <div className="container-x svc-rows">
          {services.map((s, i) => (
            <article key={s.slug} className={`svc-row tone-${tones[i % 4]} ${i % 2 ? "is-flip" : ""}`}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="svc-row__media" aria-label={s.title}>
                <span className="svc-row__back" aria-hidden="true" />
                <img src={s.image} alt="" loading="lazy" />
                <span className="svc-row__num">{s.number}</span>
              </Link>
              <div className="svc-row__body">
                <h2 className="h2 svc-row__title">{s.title}</h2>
                <p className="svc-row__short">{s.short}</p>
                <p className="svc-row__text">{s.overview}</p>
                <ul className="chips">
                  {s.capabilities.slice(0, 6).map((c) => (
                    <li key={c} className="chip">{c}</li>
                  ))}
                </ul>
                <ToolList keys={s.tools} />
                <Link to="/services/$slug" params={{ slug: s.slug }} className="btn btn--primary">
                  See how it works <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tint">
        <div className="container-x cta-strip">
          <h2 className="h2">Not sure which one fits? <span className="mark mark--gold">Just ask.</span></h2>
          <p className="lead">Describe what you have in a few lines and we will tell you honestly where to start.</p>
          <Link to="/start-a-project" className="btn btn--primary btn--lg">
            Start a project <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
