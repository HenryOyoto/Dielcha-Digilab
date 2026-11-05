import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { githubLink, githubProjects, projects } from "@/data/site";

export const Route = createFileRoute("/work/")({
  head: () => ({ meta: [{ title: "Projects - Dielcha Digilab" }, { name: "description", content: "Selected PCB design, embedded systems and IoT projects from Dielcha Digilab, with more work on GitHub." }] }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="blue" crumbs={[{ label: "Projects" }]} title="Projects" intro="Selected case studies. More work is on GitHub." />
        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <ProjectShowcase items={projects} />
        </section>

        <section className="border-y border-border bg-[var(--paper)]">
          <div className="mx-auto max-w-4xl px-4 section sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="section-title">More on GitHub</h2>
              <a href={githubLink} target="_blank" rel="noreferrer" className="btn btn--outline btn--sm">View all on GitHub</a>
            </div>
            <ul className="repo-list mt-6">
              {githubProjects.map((p) => (
                <li key={p.slug}>
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="repo">
                    <span className="min-w-0">
                      <span className="block font-display text-[1rem] font-extrabold leading-tight text-[#12344f]">{p.title}</span>
                      <span className="mt-0.5 block text-[0.82rem] leading-5 text-muted-foreground">{p.category}</span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-[var(--brand-blue)]">GitHub</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
