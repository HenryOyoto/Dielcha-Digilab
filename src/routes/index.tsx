import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServiceAccordion } from "@/components/ServiceAccordion";
import { EngineeringWorkflow } from "@/components/EngineeringWorkflow";
import { WhatsAppButton } from "@/components/WhatsAppFab";
import { TechBadges } from "@/components/TechBadges";
import { projects } from "@/data/site";
import bgStart from "@/assets/bg-start.jpg";

const title = "DIELCHA DIGILAB | Electronics, Embedded Systems & Engineering Design";
const description = "DIELCHA DIGILAB designs and develops electronic hardware, embedded systems, connected devices, engineering designs and supporting software for products, businesses and technical teams.";

const whyDielcha = [
  { title: "Direct Engineering Communication", text: "You work directly on the engineering problem, with clear questions and clear answers at every stage.", color: "bg-primary text-primary-foreground" },
  { title: "Organized Deliverables", text: "Schematics, layouts, firmware, models and documentation are handed over in a clean, usable form.", color: "bg-secondary text-secondary-foreground" },
  { title: "Practical, Buildable Designs", text: "Designs are evaluated against real manufacturing, sourcing and assembly constraints, not just simulation.", color: "bg-destructive text-destructive-foreground" },
  { title: "Structured Process", text: "A consistent path from requirements to delivery keeps scope, cost and timeline clear from the start.", color: "bg-primary text-primary-foreground" },
];

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

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Four focused engineering services</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">Four practical areas covering electronic hardware, embedded systems, product design and the technical records needed to build, test and maintain them. Supporting software and automation can be added when the project requires it.</p>
            </div>
            <Link to="/services" className="text-sm font-semibold text-primary hover:text-destructive">All Services →</Link>
          </div>
          <div className="mt-8"><ServiceAccordion initial={null} /></div>
        </section>

        <section className="border-y border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <EngineeringWorkflow />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Selected Work</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">Examples of hardware, embedded, engineering design and Python automation work. Each project shows the kind of technical problem Dielcha can help develop, improve or document.</p>
            </div>
            <Link to="/work" className="text-sm font-semibold text-primary hover:text-destructive">View All Projects →</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <article key={p.slug} className="group overflow-hidden rounded-lg border border-border bg-card shadow-card hover:shadow-lift">
                <div className="aspect-[4/3] overflow-hidden"><img src={p.image} alt={p.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="p-5">
                  <h3 className="font-display font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                  <Link to="/work/$slug" params={{ slug: p.slug }} className="mt-4 inline-block text-sm font-semibold text-primary hover:text-destructive">View Project →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Tools &amp; Technologies</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">A working set of electronics, embedded, CAD, programming and development tools used across different project requirements.</p>
          <TechBadges />
        </section>

        <section className="border-y border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Why work with Dielcha</h2>
              <p className="mt-3 text-muted-foreground">A direct engineering approach focused on clear requirements, usable files and designs that can move beyond the screen.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {whyDielcha.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <span className={`inline-flex size-9 items-center justify-center rounded-full text-sm font-bold ${item.color}`}>•</span>
                  <h3 className="mt-4 font-display font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden">
          <img src={bgStart} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
          <div className="overlay-soft absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-3xl font-bold text-on-image md:text-4xl">Have a Product or Engineering Project?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-on-image-muted">Tell us what you are trying to build, improve or document. You can send requirements, drawings, existing files, photographs or a simple description of the idea.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/start-a-project" className="rounded-md bg-destructive px-7 py-3.5 text-sm font-semibold text-destructive-foreground hover:brightness-110">Start a Project</Link>
              <WhatsAppButton />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
