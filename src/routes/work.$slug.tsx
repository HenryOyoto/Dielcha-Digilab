import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { projects } from "@/data/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Project"} | DIELCHA DIGILAB` }] }),
  component: ProjectPage,
});

function ProjectPage() {
  const p = Route.useLoaderData();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <Link to="/work" className="text-sm font-semibold text-primary hover:text-destructive">← Back to Projects</Link>
            <div className="mt-7 grid gap-9 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <p className="label-mono text-secondary">{p.category} · Engineering Case Study</p>
                <h1 className="mt-3 text-4xl font-bold text-primary md:text-5xl">{p.title}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground">{p.summary}</p>
              </div>
              <img src={p.image} alt={p.title} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="lab-detail-grid">
            <div className="min-w-0">
              <section className="engineering-card p-6 sm:p-8">
                <p className="label-mono text-primary">Engineering context</p>
                <h2 className="mt-2 text-2xl font-bold text-primary">What this project is about</h2>
                <p className="mt-4 text-base leading-8 text-foreground">{p.overview}</p>
                <p className="mt-4 text-base leading-8 text-foreground">The engineering focus is to turn the stated objective into a practical system with clear interfaces, deliberate component choices, accessible testing points and documentation that another engineer can understand and continue from.</p>
              </section>

              <section className="mt-7 rounded-xl border-l-4 border-l-destructive bg-white p-6 shadow-card sm:p-8">
                <p className="label-mono text-destructive">Objective</p>
                <h2 className="mt-2 text-2xl font-bold text-destructive">The problem being solved</h2>
                <p className="mt-4 text-base leading-8 text-foreground">{p.objective}</p>
              </section>

              <section className="mt-10">
                <p className="label-mono text-secondary">Implementation</p>
                <h2 className="mt-2 text-2xl font-bold text-primary">Design approach</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {p.designApproach.map((item, i) => (
                    <article key={item} className={`engineering-card p-5 ${i % 3 === 1 ? "border-t-4 border-t-secondary" : i % 3 === 2 ? "border-t-4 border-t-destructive" : "border-t-4 border-t-primary"}`}>
                      <span className={`label-mono ${i % 3 === 1 ? "text-secondary" : i % 3 === 2 ? "text-destructive" : "text-primary"}`}>Step {String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-3 text-sm leading-7 text-foreground">{item}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <p className="label-mono text-destructive">Key decisions</p>
                <h2 className="mt-2 text-2xl font-bold text-primary">Why the design is structured this way</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {p.decisions.map((item, i) => (
                    <div key={item} className="lab-section-card">
                      <h3 className="text-lg font-bold">Decision {i + 1}</h3>
                      <p className="mt-3 lab-reading text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {p.evidence.length > 0 && (
                <section className="mt-12">
                  <p className="label-mono text-secondary">Project evidence</p>
                  <h2 className="mt-2 text-2xl font-bold text-primary">Design views and technical evidence</h2>
                  <p className="mt-3 text-foreground">These views show the engineering work represented by this case study. Use the captions to understand what each view is intended to demonstrate.</p>
                  <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {p.evidence.map((g, i) => (
                      <figure key={g.caption} className="engineering-card overflow-hidden">
                        <img src={g.image} alt={g.caption} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                        <figcaption className="p-4 text-sm leading-6 text-foreground"><span className={`font-semibold ${i % 3 === 1 ? "text-secondary" : i % 3 === 2 ? "text-destructive" : "text-primary"}`}>{g.caption}</span></figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <section className="engineering-card p-6">
                <h2 className="text-xl font-bold text-primary">Tools and platforms</h2>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {p.technologies.map((x, i) => <span key={x} className={`rounded-md border px-3 py-2 text-sm ${i % 3 === 1 ? "border-secondary/30 text-secondary" : i % 3 === 2 ? "border-destructive/30 text-destructive" : "border-primary/20 text-primary"}`}>{x}</span>)}
                </div>
              </section>

              <section className="engineering-card p-6">
                <h2 className="text-xl font-bold text-secondary">What the work produces</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-foreground">
                  {p.deliverables.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />{x}</li>)}
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-primary p-6 text-primary-foreground shadow-card md:col-span-2 xl:col-span-1">
                <h2 className="text-xl font-bold text-white">Project status and notes</h2>
                <p className="mt-3 text-sm leading-7">{p.notes.join(" ")}</p>
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:text-destructive">View Repository →</a>
              </section>
            </section>
          </div>

          <section className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="engineering-card p-6"><p className="label-mono text-primary">01 · Understand</p><h2 className="mt-2 text-lg font-bold text-primary">Requirements first</h2><p className="mt-3 text-sm leading-7 text-foreground">The project begins by making the intended function, interfaces and constraints explicit before implementation decisions are locked in.</p></div>
            <div className="engineering-card p-6"><p className="label-mono text-secondary">02 · Engineer</p><h2 className="mt-2 text-lg font-bold text-secondary">Design for the real system</h2><p className="mt-3 text-sm leading-7 text-foreground">Hardware, firmware, software, mechanical access and manufacturing considerations are treated as connected parts of the same engineering problem.</p></div>
            <div className="engineering-card p-6"><p className="label-mono text-destructive">03 · Document</p><h2 className="mt-2 text-lg font-bold text-destructive">Make the result usable</h2><p className="mt-3 text-sm leading-7 text-foreground">Clear files, decisions, notes and evidence make the design easier to review, build, debug and improve in a future revision.</p></div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
