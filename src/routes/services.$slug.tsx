import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { WhatsAppButton } from "@/components/WhatsAppFab";
import { ServiceArt } from "@/components/Art";
import { Avatar } from "@/components/Avatars";
import { glow } from "@/components/ServiceBento";
import { serviceProjectCategories } from "@/data/content";
import { projects, services } from "@/data/site";
import type { CSSProperties } from "react";

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
const audienceAvatars = ["founder", "engineer", "institution"] as const;

function Check() {
  return (<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--brand-green)]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.500 4.500 4.500L19 7.500" /></svg>);
}

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const i = Math.max(0, services.findIndex((s) => s.slug === service.slug));
  const related = projects.filter((p) => (serviceProjectCategories[service.slug] ?? []).includes(p.category)).slice(0, 4);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          tone={tones[i]}
          crumbs={[{ label: "Services", to: "/services" }, { label: service.title }]}
          title={service.title}
          intro={service.short}
          aside={<div className="hidden w-64 rounded-2xl bg-white p-3 shadow-lift md:block"><ServiceArt index={i} className="h-auto w-full" /></div>}
        />

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-5">
            <div className="min-w-0 space-y-4">
              <div className="card-s p-4 sm:p-5">
                <h2 className="font-display text-lg font-extrabold text-[#12344f]">Overview</h2>
                <p className="mt-1.5 text-sm leading-6 text-[#3a4654]">{service.overview}</p>
                <p className="mt-2 rounded-lg bg-[var(--paper)] px-3 py-2 text-[0.82rem] leading-5 text-[#4a5866]">{service.requirement}</p>
              </div>

              <div className="card-s p-4 sm:p-5">
                <h2 className="font-display text-lg font-extrabold text-[#12344f]">How it works</h2>
                <ol className="flow flow--row mt-3" style={{ "--tone": glow[i] } as CSSProperties}>
                  {service.process.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>

              <div className="card-s p-4 sm:p-5">
                <h2 className="font-display text-lg font-extrabold text-[#12344f]">Capabilities</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {service.capabilities.map((c) => <span key={c} className="chip chip--blue">{c}</span>)}
                </div>
              </div>

              {related.length > 0 && (
                <div className="card-s p-4 sm:p-5">
                  <h2 className="font-display text-lg font-extrabold text-[#12344f]">Related projects</h2>
                  <ul className="mt-2 divide-y divide-[var(--color-border)]">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link to="/work/$slug" params={{ slug: p.slug }} className="flex items-center justify-between gap-3 py-2.5 text-sm font-semibold text-[#12344f] hover:text-[var(--brand-red)]">
                          <span className="min-w-0 truncate">{p.title}</span>
                          <span className="chip shrink-0">{p.category}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="min-w-0 space-y-4 lg:sticky lg:top-20 lg:self-start">
              <div className="card-s p-4">
                <h2 className="font-display text-base font-extrabold text-[#12344f]">You receive</h2>
                <ul className="mt-2.5 space-y-1.5 text-sm text-[#3a4654]">
                  {service.deliverables.map((d) => <li key={d} className="flex gap-2"><Check />{d}</li>)}
                </ul>
              </div>
              <div className="card-s p-4">
                <h2 className="font-display text-base font-extrabold text-[#12344f]">Built for</h2>
                <ul className="mt-2.5 space-y-2.5">
                  {service.audience.map((a, k) => (
                    <li key={a} className="flex items-center gap-2.5 text-sm text-[#3a4654]"><Avatar kind={audienceAvatars[k % audienceAvatars.length]} size={34} label="" />{a}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[var(--navy)] p-4 text-white shadow-lift">
                <p className="font-display text-lg font-extrabold leading-tight">Start this service</p>
                <p className="mt-1 text-[0.82rem] text-white/75">Tell us what you have. Scope is agreed before work begins.</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link to="/start-a-project" search={{ service: service.slug }} className="rounded-full bg-[var(--brand-yellow)] px-4 py-2.5 text-center text-sm font-bold text-[#151515] hover:bg-white">Start a project</Link>
                  <WhatsAppButton className="justify-center rounded-full" />
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-[#12344f]">Other services</span>
            {others.map((o) => (
              <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="pfilter">{o.title}</Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
