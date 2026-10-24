import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { ServiceArt } from "@/components/Art";
import { glyphs, glow } from "@/components/ServiceBento";
import { intents } from "@/data/content";
import { services } from "@/data/site";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [{ title: "Services | Dielcha Digilab" }, { name: "description", content: "Electronics and PCB design, embedded systems and IoT, product CAD and technical documentation from Dielcha Digilab." }] }),
  component: ServicesPage,
});

function ServicesPage() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="green" crumbs={[{ label: "Services" }]} title="Services" intro="Four focused services for electronic hardware, embedded systems, product design and documentation. Related software and other disciplines can be discussed when they support your project." />
        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-bold text-[#12344f]">I want to</span>
            {intents.map((i) => (
              <button key={i.slug} type="button" className="pfilter" aria-pressed={picked === i.slug} onClick={() => setPicked(picked === i.slug ? null : i.slug)}>{i.label}</button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {services.map((s, i) => (
              <Link
                key={s.slug} to="/services/$slug" params={{ slug: s.slug }}
                className={`card-s finder-card group flex flex-col overflow-hidden sm:flex-row ${picked === s.slug ? "is-picked" : ""}`}
                style={{ "--glow": glow[i] } as CSSProperties}
              >
                <div className="bg-[var(--paper)] p-2 sm:w-44 sm:shrink-0"><ServiceArt index={i} className="mx-auto h-auto w-full max-w-[14rem]" /></div>
                <div className="min-w-0 flex-1 p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg text-white [&_svg]:size-4" style={{ background: glow[i], color: i === 2 ? "#151515" : "#fff" }}>{glyphs[i]}</span>
                    <h2 className="font-display text-[1.02rem] font-extrabold leading-tight text-[#12344f]">{s.title}</h2>
                  </div>
                  <p className="mt-2 text-[0.84rem] leading-5 text-muted-foreground">{s.short}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {s.tags.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <span className="mt-3 inline-block text-sm font-bold text-[var(--brand-blue)] group-hover:text-[var(--brand-red)]">View service →</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground">Not sure which fits? <Link to="/start-a-project" className="font-bold text-[var(--brand-blue)] hover:text-[var(--brand-red)]">Describe the project</Link> and we will point you the right way.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
