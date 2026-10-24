import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectShowcase";
import { ReadingProgress } from "@/components/ReadingProgress";
import { WhatsAppButton } from "@/components/WhatsAppFab";
import { projects } from "@/data/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Project"} | Dielcha Digilab` }, { name: "description", content: loaderData?.summary ?? "" }] }),
  component: ProjectPage,
});

function Check() {
  return (<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--brand-green)]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.500 4.500 4.500L19 7.500" /></svg>);
}

function ProjectPage() {
  const p = Route.useLoaderData();
  const at = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(at - 1 + projects.length) % projects.length];
  const next = projects[(at + 1) % projects.length];

  return (
    <div className="flex min-h-screen flex-col">
      <ReadingProgress />
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="blue" crumbs={[{ label: "Projects", to: "/work" }, { label: p.category }]} title={p.title} intro={p.summary}>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="tag-yellow">{p.category}</span>
            {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="hero__btn hero__btn--ghost !py-1 !text-xs">View source →</a>}
          </div>
        </PageHero>

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-5">
            <div className="min-w-0 space-y-4">
              <ProjectGallery project={p} />

              <div className="card-s grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
                <div>
                  <h2 className="font-display text-base font-extrabold text-[#12344f]">Overview</h2>
                  <p className="mt-1.5 text-sm leading-6 text-[#3a4654]">{p.overview}</p>
                </div>
                <div>
                  <h2 className="font-display text-base font-extrabold text-[#12344f]">Objective</h2>
                  <p className="mt-1.5 text-sm leading-6 text-[#3a4654]">{p.objective}</p>
                </div>
              </div>

              <div className="card-s p-4 sm:p-5">
                <h2 className="font-display text-base font-extrabold text-[#12344f]">Design approach</h2>
                <ol className="flow mt-3 !gap-2.5" style={{ "--tone": "var(--brand-blue)" } as CSSProperties}>
                  {p.designApproach.map((s) => <li key={s} className="!items-start !text-[0.85rem] !font-medium leading-5 !text-[#3a4654]">{s}</li>)}
                </ol>
              </div>

              <div className="card-s p-4 sm:p-5">
                <h2 className="font-display text-base font-extrabold text-[#12344f]">Key decisions</h2>
                <ul className="mt-2.5 grid gap-2 text-sm leading-5 text-[#3a4654] sm:grid-cols-2">
                  {p.decisions.map((d) => <li key={d} className="flex gap-2"><Check />{d}</li>)}
                </ul>
              </div>

              {p.notes.length > 0 && (
                <div className="rounded-xl border border-[color-mix(in_srgb,var(--brand-yellow)_55%,#fff)] bg-[color-mix(in_srgb,var(--brand-yellow)_14%,#fff)] px-4 py-3 text-[0.83rem] leading-5 text-[#4b4310]">
                  {p.notes.map((n) => <p key={n}>{n}</p>)}
                </div>
              )}
            </div>

            <aside className="min-w-0 space-y-4 lg:sticky lg:top-20 lg:self-start">
              <div className="card-s p-4">
                <h2 className="font-display text-base font-extrabold text-[#12344f]">Technologies</h2>
                <div className="mt-2.5 flex flex-wrap gap-1.5">{p.technologies.map((t) => <span key={t} className="chip chip--blue">{t}</span>)}</div>
              </div>
              <div className="card-s p-4">
                <h2 className="font-display text-base font-extrabold text-[#12344f]">Deliverables</h2>
                <ul className="mt-2.5 space-y-1.5 text-sm text-[#3a4654]">{p.deliverables.map((d) => <li key={d} className="flex gap-2"><Check />{d}</li>)}</ul>
              </div>
              <div className="rounded-2xl bg-[var(--navy)] p-4 text-white shadow-lift">
                <p className="font-display text-lg font-extrabold leading-tight">Need something similar?</p>
                <p className="mt-1 text-[0.82rem] text-white/75">Send your requirements and we will scope it with you.</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link to="/start-a-project" search={{ service: p.category }} className="rounded-full bg-[var(--brand-yellow)] px-4 py-2.5 text-center text-sm font-bold text-[#151515] hover:bg-white">Start a project</Link>
                  <WhatsAppButton className="justify-center rounded-full" />
                </div>
              </div>
            </aside>
          </div>

          <nav className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="More projects">
            <Link to="/work/$slug" params={{ slug: prev.slug }} className="card-s group px-4 py-3 hover:border-[var(--brand-blue)]">
              <span className="text-xs font-bold text-muted-foreground">← Previous</span>
              <span className="mt-0.5 block truncate font-display font-extrabold text-[#12344f] group-hover:text-[var(--brand-blue)]">{prev.title}</span>
            </Link>
            <Link to="/work/$slug" params={{ slug: next.slug }} className="card-s group px-4 py-3 text-right hover:border-[var(--brand-blue)]">
              <span className="text-xs font-bold text-muted-foreground">Next →</span>
              <span className="mt-0.5 block truncate font-display font-extrabold text-[#12344f] group-hover:text-[var(--brand-blue)]">{next.title}</span>
            </Link>
          </nav>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
