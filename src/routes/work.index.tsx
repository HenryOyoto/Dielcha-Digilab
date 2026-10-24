import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { projects } from "@/data/site";

export const Route = createFileRoute("/work/")({
  head: () => ({ meta: [{ title: "Projects | Dielcha Digilab" }, { name: "description", content: "PCB design, embedded hardware, IoT, robotics and Python projects from Dielcha Digilab." }] }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero tone="blue" crumbs={[{ label: "Projects" }]} title="Projects" intro={`${projects.length} projects across PCB, embedded, IoT, robotics and software. Open one for a quick look, then read the full case study.`} />
        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <ProjectShowcase items={projects} filterable />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
