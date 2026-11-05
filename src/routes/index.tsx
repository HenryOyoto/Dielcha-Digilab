import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsStrip } from "@/components/ToolsStrip";
import { ServiceCards } from "@/components/ServiceCards";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { WhatsAppButton } from "@/components/WhatsAppFab";
import { githubLink, projects, workflowSteps } from "@/data/site";

const title = "Dielcha Digilab - Product Design, Embedded Systems & IoT";
const description = "PCB design and layout, embedded systems and IoT, product CAD and technical documentation, delivered online from Juja, Kenya.";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }] }),
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSlider />
        <ToolsStrip />

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="section-title">Services</h2>
            <Link to="/services" className="text-link">All services</Link>
          </div>
          <div className="mt-6"><ServiceCards /></div>
        </section>

        <section className="border-y border-border bg-[var(--paper)]">
          <div className="mx-auto max-w-7xl px-4 section sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="section-title">Projects</h2>
              <a href={githubLink} target="_blank" rel="noreferrer" className="text-link">More on GitHub</a>
            </div>
            <div className="mt-6"><ProjectShowcase items={projects} /></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 section sm:px-6">
          <h2 className="section-title">How it works</h2>
          <ol className="steps mt-6">
            {workflowSteps.map((s) => (
              <li key={s.title} className="step">
                <div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-[var(--navy)] text-white">
          <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Have a product or project?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/75 md:text-base">An idea, a sketch or existing files are enough to start.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/start-a-project" className="btn btn--yellow">Start a project</Link>
              <WhatsAppButton className="rounded-full" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
