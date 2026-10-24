import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { articles, resources } from "@/data/site";

export const Route = createFileRoute("/lab")({
  head: () => ({ meta: [{ title: "Lab | Dielcha Digilab" }, { name: "description", content: "Checklists, worksheets and technical notes from Dielcha Digilab." }] }),
  component: LabPage,
});

const noteCategories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

function LabPage() {
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? articles : articles.filter((a) => a.category === cat);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="green" crumbs={[{ label: "Lab" }]} title="Lab" intro="Practical checklists, worksheets and notes on PCB design, hardware and embedded development." />

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <h2 className="font-display text-xl font-extrabold text-[#12344f]">Checklists & worksheets</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {resources.map((r) => (
              <Link key={r.slug} to="/lab/resources/$slug" params={{ slug: r.slug }} className="card-s group flex items-stretch gap-3 overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift">
                <img src={r.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-28 shrink-0 object-cover sm:w-32" />
                <div className="min-w-0 py-3 pr-3">
                  <span className={`chip ${r.format === "PDF" ? "chip--red" : "chip--green"}`}>{r.format}</span>
                  <h3 className="mt-1.5 font-display text-[0.98rem] font-extrabold leading-tight text-[#12344f]">{r.title}</h3>
                  <p className="mt-1 line-clamp-2 text-[0.8rem] leading-5 text-muted-foreground">{r.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-[var(--paper)]">
          <div className="mx-auto max-w-7xl px-4 section sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-extrabold text-[#12344f]">Technical notes</h2>
              <div className="pfilters" role="group" aria-label="Filter notes">
                {noteCategories.map((c) => <button key={c} type="button" className="pfilter" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
              </div>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {shown.map((a) => (
                <Link key={a.slug} to="/lab/articles/$slug" params={{ slug: a.slug }} className="card-s group flex items-stretch gap-3 overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift">
                  <img src={a.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-28 shrink-0 object-cover sm:w-32" />
                  <div className="min-w-0 py-3 pr-3">
                    <span className="chip chip--blue">{a.category}</span>
                    <h3 className="mt-1.5 font-display text-[0.98rem] font-extrabold leading-tight text-[#12344f]">{a.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[0.8rem] leading-5 text-muted-foreground">{a.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
