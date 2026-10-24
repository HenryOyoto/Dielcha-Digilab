import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { resources } from "@/data/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/lab_/resources/$slug")({
  loader: ({ params }) => {
    const resource = resources.find((item) => item.slug === params.slug);
    if (!resource) throw notFound();
    return resource;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Resource"} | Dielcha Digilab` },
      { name: "description", content: loaderData?.description ?? "A reference from Dielcha Digilab." },
    ],
  }),
  component: ResourcePage,
});

function ResourcePage() {
  const resource = Route.useLoaderData();
  const [done, setDone] = useState<Set<string>>(new Set());
  const toggle = (p: string) => setDone((prev) => { const n = new Set(prev); if (n.has(p)) n.delete(p); else n.add(p); return n; });
  const pct = Math.round((done.size / resource.points.length) * 100);
  const others = resources.filter((r) => r.slug !== resource.slug);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="green" crumbs={[{ label: "Lab", to: "/lab" }, { label: resource.format }]} title={resource.title} intro={resource.description} />
        <section className="mx-auto max-w-5xl px-4 section sm:px-6">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-5">
            <div className="min-w-0 space-y-4">
              <div className="card-s p-4 sm:p-5">
                <h2 className="font-display text-base font-extrabold text-[#12344f]">About this resource</h2>
                <p className="mt-1.5 text-sm leading-6 text-[#3a4654]">{resource.detail}</p>
              </div>
              <div className="card-s p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-base font-extrabold text-[#12344f]">Try it: tick what you have covered</h2>
                  <span className="text-xs font-extrabold text-[var(--brand-green)]">{done.size}/{resource.points.length}</span>
                </div>
                <div className="progress mt-2.5" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Checklist progress"><span style={{ width: `${pct}%` }} /></div>
                <div className="mt-3 space-y-2">
                  {resource.points.map((p) => (
                    <button key={p} type="button" role="checkbox" aria-checked={done.has(p)} className="check-row" onClick={() => toggle(p)}>
                      <span className="check-box" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.500 4.500 4.500L19 7.500" /></svg>
                      </span>
                      {p}
                    </button>
                  ))}
                </div>
                {pct === 100 && <p className="mt-3 rounded-lg bg-[color-mix(in_srgb,var(--brand-green)_10%,#fff)] px-3 py-2 text-sm font-bold text-[var(--brand-green)]" role="status">Everything covered. Download the full {resource.format} to keep it.</p>}
              </div>
            </div>

            <aside className="min-w-0 space-y-4 md:sticky md:top-20 md:self-start">
              <div className="card-s overflow-hidden">
                <img src={resource.image} alt="" aria-hidden="true" decoding="async" className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <span className={`chip ${resource.format === "PDF" ? "chip--red" : "chip--green"}`}>{resource.fileLabel}</span>
                  <a href={resource.downloadUrl} target="_blank" rel="noreferrer" className="mt-3 block rounded-full bg-[var(--brand-blue)] px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-[var(--brand-red)]">{resource.downloadLabel}</a>
                </div>
              </div>
              <div className="card-s p-4">
                <p className="font-display text-sm font-extrabold text-[#12344f]">More from the lab</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {others.slice(0, 3).map((o) => <li key={o.slug}><Link to="/lab/resources/$slug" params={{ slug: o.slug }} className="footer-link">{o.title}</Link></li>)}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
